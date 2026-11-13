#!/usr/bin/env bash
# Usage: review_video.sh <video.mp4> [out_dir]
# Makes contact sheets and prints objective checks (duration, size, hard cuts, loudness).
# Look at the sheets yourself afterwards: the rules for "3D depth", "blank slabs", captions and ending need eyes.
set -euo pipefail
V="${1:?video path}"; OUT="${2:-review}"; mkdir -p "$OUT"; rm -f "$OUT"/sheet_*.jpg "$OUT"/f_*.jpg
DUR=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$V")
W=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 "$V")
H=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=nw=1:nk=1 "$V")
echo "duration_s=$DUR size=${W}x${H}"
# hard cuts (scene score > 0.25); dissolves and camera flows do not count
CUTS=$(ffmpeg -nostats -i "$V" -vf "select='gt(scene,0.25)',showinfo" -an -f null - 2>&1 | grep -o "pts_time:[0-9.]*" | sed 's/pts_time://' | awk 'BEGIN{p=-9}{ if($1-p>1.0) printf "%s ", $1; p=$1 }')
NC=$(echo "$CUTS" | wc -w)
echo "hard_cuts=$NC at: $CUTS"
# loudness
LU=$(ffmpeg -nostats -i "$V" -af ebur128 -f null - 2>&1 | grep -A12 "Summary" | grep -E "^\s+I:" | awk '{print $2}')
echo "loudness_LUFS=$LU (target -16 to -13)"
# contact sheets: one frame every ~3.2 s, 8 per sheet
N=$(python3 -c "import math;print(max(1,math.ceil($DUR/3.2)))")
for i in $(seq 0 $((N-1))); do t=$(python3 -c "print(round(0.6+$i*3.2,2))"); ffmpeg -v error -y -ss "$t" -i "$V" -frames:v 1 -vf scale=360:640 "$OUT/f_$(printf %03d $i).jpg"; done
ls "$OUT"/f_*.jpg > "$OUT/list.txt"; split -l 8 -d -a 2 "$OUT/list.txt" "$OUT/chunk_"
for c in "$OUT"/chunk_*; do
  n=$(wc -l < "$c"); ins=""; lay=""; k=0
  for f in $(cat "$c"); do ins="$ins -i $f"; x=$(( (k%4)*360 )); y=$(( (k/4)*640 )); lay="$lay${lay:+|}${x}_${y}"; k=$((k+1)); done
  if [ "$n" -eq 1 ]; then cp $(cat "$c") "$OUT/sheet_${c##*_}.jpg"; else
    ffmpeg -v error -y $ins -filter_complex "xstack=inputs=$n:layout=$lay" "$OUT/sheet_${c##*_}.jpg"; fi
done
rm -f "$OUT"/chunk_* "$OUT"/list.txt
echo "sheets: $(ls "$OUT"/sheet_*.jpg | tr '\n' ' ')"
# verdict lines
python3 - "$DUR" "$NC" "${LU:-0}" <<'PY'
import sys
d,nc,lu=float(sys.argv[1]),int(sys.argv[2]),float(sys.argv[3])
print("CHECK duration 30-70 s:", "OK" if 30<=d<=70 else "FAIL")
print("CHECK hard cuts <= 2 per 60 s:", "OK" if nc <= max(2, round(d/30)) else "FAIL")
print("CHECK loudness -16..-13:", "OK" if -16.5<=lu<=-12.5 else "FAIL")
PY
