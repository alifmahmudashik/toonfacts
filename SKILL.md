---
name: toonfacts
description: Make animated cartoon fact shorts (story-first, hook-gated: true stories, history and interesting facts, each built on one question opened in the first three seconds) in the Ricks Clips style (2D characters in a colourful 3D world, natural dry narrator, word-by-word captions) with Remotion and three.js, end to end. Modes: new video (topic, research, script, ElevenLabs voiceover, build, self-review, render), update an existing video, continue, review, ideas. Use for "new video", "new video about X", "update video <slug>", "continue video <slug>", "review video", "give me video ideas", or any request for a viral animated fact short.
---

# Toonfacts: animated cartoon fact shorts, one skill

Say what you want in plain words. This one skill does the whole job: idea, facts, script, shot plan, captions, ElevenLabs voiceover, build, self-review, render, and later updates. Never ask the user to explain the style: it is defined in this skill.

## Modes (pick from the user's words)
| User says | Mode | Read |
|---|---|---|
| "new video", "new video about X", "surprise me", "make the next short" | **New** | `docs/new-video.md` |
| "update video <slug>", "fix the video", "change X in <slug>", "apply the latest rules" | **Update** | `docs/update-video.md` |
| "continue video <slug>" (after a manual step such as saving the audio) | **Continue** | `docs/new-video.md`, resume at the first missing phase |
| "review video", "check <slug>", "check this mp4" | **Review** | `docs/review.md` only |
| "video ideas", "give me ideas" | **Ideas** | `docs/new-video.md` Phase 1 only: research true stories and interesting facts, score them on story strength and hook strength, log them in `videos/_ideas.md`, show the top 5 with a one-line story, its shape and a draft hook, build nothing |
| "update the skill" | **Upgrade** | Preflight step 2 only, then report the version change |
If the request is unclear, choose New when no video is named and Update when one is. How the video is built and how it must look is in `docs/engine.md`; both New and Update use it.

## Operating rules (all modes)
- **The hook is a gate, not a flourish.** No script is written until a first line passes the hook gate in `docs/new-video.md` Phase 2, and no video is delivered until the hook block at the top of `templates/review_checklist.md` passes. A weak first line is a reason to redraft, never something to patch around later.
- **Do not ask questions.** Make reasonable choices, write them in the video's `NOTES.md`, keep going. Stop only when the voiceover cannot be created (see `docs/new-video.md` Phase 3), a needed tool is missing, or a decision cannot be undone.
- **One folder per video, everything inside it:** `videos/<slug>/` (slug = title as lower-case words joined by hyphens). Final MP4 and `publish.md` at the top, working files in `source/`, old renders in `versions/`. Scratch (stills, contact sheets, test renders) goes only in `work/<slug>/`. Never leave work only in the conversation.
- **Spend ElevenLabs credits once per voiceover** (one take). Regenerate only when the spoken words change, the audio is unusable, or the take fails the performance check in `docs/new-video.md` Phase 3 step 4 (laughter or over-acting) - then once more, with the tags cut down.
- **Natural beats expressive.** The narrator never laughs: no `[laughs]` or `[chuckles]` anywhere, at most 3 tags in a whole script, and no exclamation marks in the voiceover text. The pictures carry the comedy; a narrator laughing at their own joke is the clearest sign of an AI take.
- **Never print or save API keys.** The ElevenLabs MCP is added by the user in Claude Code; use it as connected.
- **Never publish or upload** a video. Delivery is the final MP4, its thumbnail and a researched `publish.md` (title, description, hashtags, tags).
- Final reply: a few lines (what was made or changed, where it is, the choices that matter, one next step). No step-by-step recap.

## Preflight (silent, every run, every mode)
1. **Project and folders.** Find the Remotion project (the folder with `package.json` and `src/`). Create `videos/`, `videos/_ideas.md` and `work/` if missing.
2. **Keep this skill current.** If this skill folder is a git clone, run a quiet `git pull --ff-only` and read `CHANGELOG.md` for what changed; mention the new version in the final reply only if it changed. If it is not a git clone, skip.
3. **Tools.** Check `ffmpeg`, Python 3 and `@remotion/three` (install `@remotion/three` and `three` in the project if missing). Find the ElevenLabs MCP tools (names like `text_to_speech`, `generate_speech`, `creative_generate_speech`, `list_voices`, `speech_to_text`, `transcribe`); load them with ToolSearch if deferred. If there are none, continue up to the voiceover, write `NEEDS_AUDIO.md` explaining that the ElevenLabs MCP must be connected (or the audio supplied), and stop there.
4. **Old separate skills.** If `.claude/skills/cartoon-3d-short/` or `.claude/skills/new-video/` also exist, do not use them. Tell the user once in the final reply that they can remove those two folders, because this skill replaces both.
5. **Legacy helper files.** Delete `video-ideas/SKILL-UPDATE.md` (first line starts "# Instructions for Claude Code") and `video-ideas/README.md` (first line "# video-ideas") if present. Never delete anything else.
6. **Migrate the old layout (once, by moving, never deleting).** If `video-ideas/` or `out/` exist from an older version:
   - `video-ideas/_ideas.md` becomes `videos/_ideas.md`.
   - For each `video-ideas/<slug>/`: `publish.md` goes to `videos/<slug>/publish.md`; every other file (`script.md`, `voiceover*.mp3`, `words.json`, `NOTES.md`, `REVIEW.md`, `CHANGES.md`, `NEEDS_AUDIO.md`, review sheets) goes to `videos/<slug>/source/`.
   - Match each final render in `out/` to its slug by file name or title (`out/<slug>.mp4`, or a name like `The_Man_Who_...`): the newest becomes `videos/<slug>/<slug>.mp4`, older ones `videos/<slug>/versions/<slug>_v1.mp4`, `_v2.mp4` by date.
   - Everything else in `out/` (stills, contact sheets, QA, test renders, per-video scratch folders) is moved to `work/legacy-out/`, and the two helper files above to `work/legacy/`. Anything you cannot match stays there too.
   - When done, list what moved where in the final reply (one short list) and tell the user the empty `video-ideas/` and `out/` folders can be deleted. Do not touch `src/`, `public/`, `scripts/`, `audio/` or `backup/`, and leave any files already in `work/` where they are.

## Folder layout
```
videos/                        # everything finished or in progress, one folder per video
  _ideas.md                    # every topic used or rejected (read first, append last)
  <slug>/
    <slug>.mp4                 # FINAL video: the file to upload
    thumbnail.jpg              # built cover, 2160x3840 (not a raw frame)
    publish.md                 # title, description, hashtags, tags, category, pinned comment + research sources
    source/                    # script.md  voiceover.mp3  words.json  NOTES.md  REVIEW.md  CHANGES.md
    versions/                  # earlier renders: <slug>_v1.mp4 ... (kept by Update mode)
work/                          # scratch, safe to delete: stills, contact sheets, QA, test renders, REMOTION_TMP if no other drive
  <slug>/
```

## What is in this skill
| Path | What it is |
|---|---|
| `docs/new-video.md` | New and Continue: idea, research, script, voiceover, build, review, delivery |
| `docs/update-video.md` | Update: classify the change, protect old versions, apply, re-render, regression check |
| `docs/review.md` | The review loop (contact sheets, checks, scores, fixes) |
| `docs/engine.md` | How the video is built and must look: pipeline, rules for every video, framing, lighting, camera flow, captions, reactions, quality gate |
| `references/story_format.md` | The six-beat story format, comedy toolbox, pacing numbers |
| `references/` (other) | Style bible, measured reports, reference frames and sheets |
| `templates/` | Renderer source (`bridge/`), audio synthesis, scripts, shot plan, script and review templates |
| `docs/history/` | Archive of the two earlier repos' README, CHANGELOG and original wording. Not instructions |
| `tools/review_video.sh` | Length, hard-cut and loudness checks plus contact sheets |
| `tools/make_thumbnail.py` | Builds a designed 2160x3840 Shorts thumbnail from a frame plus 2-4 words |
| `tools/check_voice.py` | Checks a voiceover take: speed, pauses, loudness, and the seconds where delivery is too fast (laughter, rushing) |
