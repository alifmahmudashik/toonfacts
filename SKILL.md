---
name: toonfacts
description: Make animated cartoon fact shorts in the Ricks Clips style (2D characters in a colourful 3D world, expressive narrator, word-by-word captions) with Remotion and three.js, end to end. Modes: new video (topic, research, script, ElevenLabs voiceover, build, self-review, render), update an existing video, continue, review, ideas. Use for "new video", "new video about X", "update video <slug>", "continue video <slug>", "review video", "give me video ideas", or any request for a viral animated fact short.
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
| "video ideas", "give me ideas" | **Ideas** | `docs/new-video.md` Phase 1 only: score 10 candidates, log them in `_ideas.md`, show the top 5, build nothing |
| "update the skill" | **Upgrade** | Preflight step 2 only, then report the version change |
If the request is unclear, choose New when no video is named and Update when one is. How the video is built and how it must look is in `docs/engine.md`; both New and Update use it.

## Operating rules (all modes)
- **Do not ask questions.** Make reasonable choices, write them in the video's `NOTES.md`, keep going. Stop only when the voiceover cannot be created (see `docs/new-video.md` Phase 3), a needed tool is missing, or a decision cannot be undone.
- **Save everything in the project** under `video-ideas/<slug>/` (slug = title as lower-case words joined by hyphens). Never leave work only in the conversation.
- **Spend ElevenLabs credits once per voiceover** (one take). Regenerate only when the spoken words change or the audio is unusable.
- **Never print or save API keys.** The ElevenLabs MCP is added by the user in Claude Code; use it as connected.
- **Never publish or upload** a video. Delivery is the MP4 plus `publish.md`.
- Final reply: a few lines (what was made or changed, where it is, the choices that matter, one next step). No step-by-step recap.

## Preflight (silent, every run, every mode)
1. **Project and folders.** Find the Remotion project (the folder with `package.json` and `src/`). Create `video-ideas/` and `video-ideas/_ideas.md` if missing.
2. **Keep this skill current.** If this skill folder is a git clone, run a quiet `git pull --ff-only` and read `CHANGELOG.md` for what changed; mention the new version in the final reply only if it changed. If it is not a git clone, skip.
3. **Tools.** Check `ffmpeg`, Python 3 and `@remotion/three` (install `@remotion/three` and `three` in the project if missing). Find the ElevenLabs MCP tools (names like `text_to_speech`, `generate_speech`, `creative_generate_speech`, `list_voices`, `speech_to_text`, `transcribe`); load them with ToolSearch if deferred. If there are none, continue up to the voiceover, write `NEEDS_AUDIO.md` explaining that the ElevenLabs MCP must be connected (or the audio supplied), and stop there.
4. **Old separate skills.** If `.claude/skills/cartoon-3d-short/` or `.claude/skills/new-video/` also exist, do not use them. Tell the user once in the final reply that they can remove those two folders, because this skill replaces both.
5. **Legacy helper files.** Delete `video-ideas/SKILL-UPDATE.md` (first line starts "# Instructions for Claude Code") and `video-ideas/README.md` (first line "# video-ideas") if present. Never delete anything else.

## Folder layout
```
video-ideas/
  _ideas.md                # every topic used or rejected (read first, append last)
  <slug>/
    script.md  voiceover.mp3  words.json  NOTES.md  REVIEW.md  CHANGES.md  publish.md
out/
  <slug>.mp4               # current version
  <slug>_v1.mp4 ...        # earlier versions kept by Update mode
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
