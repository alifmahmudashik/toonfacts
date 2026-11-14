#!/usr/bin/env python3
"""Check an ElevenLabs take before it goes into a video.

Reports duration, loudness, pause structure and the seconds where delivery runs
faster than natural narration. Those fast seconds are where laughter and rushed
performance show up, so they are the places to listen.

    python3 tools/check_voice.py videos/<slug>/source/voiceover.mp3 --words 134

Needs ffmpeg on PATH, plus numpy and scipy. Exits 1 if anything fails, so it can
gate a pipeline.
"""
import argparse, os, shutil, subprocess, sys, tempfile

try:
    import numpy as np
    from scipy.io import wavfile
    from scipy.signal import find_peaks
except ImportError:
    sys.exit("Needs numpy and scipy:  pip install numpy scipy")

# Natural narration for this channel sits at 3.5-3.7 words per second. Syllables
# run a little above that. Anything sustained past 8 peaks per second is faster
# than speech and is usually laughter, a stumble, or the model rushing a line.
BURST_RATE = 8
SR = 16000


def load(path):
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg not found on PATH.")
    tmp = os.path.join(tempfile.mkdtemp(), "v.wav")
    r = subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", path, "-ac", "1", "-ar", str(SR), tmp],
        capture_output=True, text=True)
    if r.returncode or not os.path.exists(tmp):
        sys.exit(f"ffmpeg could not read {path}\n{r.stderr.strip()}")
    sr, x = wavfile.read(tmp)
    if x.ndim > 1:
        x = x.mean(1)
    return sr, x.astype(float) / 32768.0


def envelope(x, sr, hop=0.010, win=0.025):
    h, w = int(hop * sr), int(win * sr)
    n = max((len(x) - w) // h, 1)
    return np.array([np.sqrt((x[i * h:i * h + w] ** 2).mean()) for i in range(n)]), hop


def lufs(path):
    r = subprocess.run(
        ["ffmpeg", "-v", "info", "-i", path, "-af", "loudnorm=print_format=summary",
         "-f", "null", "-"], capture_output=True, text=True)
    for line in r.stderr.splitlines():
        if "Input Integrated" in line:
            try:
                return float(line.split(":")[1].strip().split()[0])
            except (IndexError, ValueError):
                return None
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("audio")
    ap.add_argument("--words", type=int, help="spoken word count of the script")
    a = ap.parse_args()
    if not os.path.exists(a.audio):
        sys.exit(f"No file at {a.audio}")

    sr, x = load(a.audio)
    env, hop = envelope(x, sr)
    dur = len(x) / sr
    db = 20 * np.log10(env + 1e-9)
    peak, floor = np.percentile(db, 95), np.percentile(db, 5)

    # pauses
    quiet = db < (peak - 25)
    runs, i, n = [], 0, len(env)
    while i < n:
        if quiet[i]:
            j = i
            while j < n and quiet[j]:
                j += 1
            runs.append((i * hop, (j - i) * hop))
            i = j
        else:
            i += 1
    pauses = [r for r in runs if r[1] >= 0.25]
    silence = sum(r[1] for r in runs)

    # fast seconds
    pk, _ = find_peaks(env, height=env.max() * 0.12, distance=int(0.06 / hop))
    pts = pk * hop
    rate = [((pts >= s) & (pts < s + 1)).sum() for s in range(int(dur))]
    burst = [s for s, r in enumerate(rate) if r >= BURST_RATE]

    il = lufs(a.audio)
    problems, notes = [], []

    print(f"\n  {os.path.basename(a.audio)}")
    print(f"  duration        {dur:5.1f} s")
    if a.words:
        wps = a.words / dur
        print(f"  speaking rate   {wps:5.2f} words/s  ({a.words} words)")
        if wps > 4.0:
            problems.append(f"Too fast at {wps:.2f} words/s. Natural is 3.5-3.7; cut words or add pauses.")
        elif wps < 3.0:
            notes.append(f"Slow at {wps:.2f} words/s. Fine if deliberate.")
    print(f"  loudness        {il:5.1f} LUFS" if il is not None else "  loudness        unknown")
    print(f"  pauses >=0.25s  {len(pauses):5d}   (one every {dur / max(len(pauses), 1):.1f} s)")
    print(f"  silence         {100 * silence / dur:5.0f} %")
    print(f"  dynamic range   {peak - floor:5.1f} dB")

    if il is not None and not (-17 <= il <= -12):
        notes.append(f"Loudness {il:.1f} LUFS is outside -16 to -13; the mix step will correct it.")
    if len(pauses) < dur / 6:
        problems.append("Almost no pauses. The take will sound breathless; add [short pause] and cut words.")
    if silence / dur < 0.12:
        problems.append("Under 12 % silence. Real narration breathes; this will sound synthetic.")

    if burst:
        groups, cur = [], [burst[0]]
        for s in burst[1:]:
            if s - cur[-1] <= 1:
                cur.append(s)
            else:
                groups.append(cur)
                cur = [s]
        groups.append(cur)
        spans = ", ".join(f"{g[0]}-{g[-1] + 1}s" if len(g) > 1 else f"{g[0]}-{g[0] + 1}s" for g in groups)
        print(f"\n  LISTEN HERE: {spans}")
        print("  Delivery runs faster than speech in these seconds. That is usually laughter,")
        print("  a stumble, or the model rushing. Open the file at those times before using it.")
        if len(burst) >= 4:
            problems.append(
                f"{len(burst)} fast seconds spread through the take. If any of them is laughter, "
                "cut every laugh tag, drop to at most 3 tags in the script, and regenerate once.")
    else:
        print("\n  No unnaturally fast stretches found.")

    if problems:
        print("\n  PROBLEMS")
        for p in problems:
            print(f"  - {p}")
    if notes:
        print("\n  Notes")
        for nt in notes:
            print(f"  - {nt}")
    if not problems:
        print("\n  Take looks usable. Still listen to any LISTEN HERE spans above.")
    print()
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
