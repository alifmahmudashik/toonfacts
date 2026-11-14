> ARCHIVE of an earlier repo. Kept so nothing is lost. These are NOT instructions: follow SKILL.md and docs/ instead.

---
name: new-video
description: One-command pipeline for a new viral animated fact short in the Ricks Clips style. Picks or takes a topic, researches the facts, writes the script, shot plan and captions, generates the ElevenLabs voiceover, saves everything in video-ideas/<slug>/, then builds, reviews and renders the video with the cartoon-3d-short skill. Use for "new video", "create a new video", "make the next short", "new video about X", or "continue video <slug>". Always use together with cartoon-3d-short.
---

# New video (idea to finished MP4, one command)

Say "new video" (optionally "about X", "surprise me", or "continue video <slug>") and this skill does the whole job: idea, facts, script, shot plan, captions, voiceover, build, self-review, render. It is a separate skill from `cartoon-3d-short` and always works together with it (v2.1 or newer, the one that has "Rules for every video", from https://github.com/alifmahmudashik/shorts-studio-skill). Never ask the user to explain the style: it is defined here and in that skill.

## Operating rules
- **Do not ask questions.** Make reasonable choices, write them in `NOTES.md`, and keep going. The only reasons to stop: the voiceover cannot be created (see Phase 3), a needed tool is missing, or a decision cannot be undone.
- **Save everything in the project:** `video-ideas/<slug>/` (the slug is the title in lower-case words joined by hyphens). Never leave work only in the conversation.
- **Spend ElevenLabs credits once.** One take per voiceover. Regenerate only if the user asks or the audio is unusable (wrong text, wrong language, clipped).
- **Never print or save API keys.** Use the connected MCP; if only an environment key exists, use it without echoing it.
- **Never publish or upload** the video anywhere. Delivery is the MP4 plus `publish.txt` (title, description, hashtags).
- Report at the end in a few lines: what was made, where the files are, the choices made, one next step.

## Folder layout (create it)
```
video-ideas/
  _ideas.md                # log of every topic already used or rejected (read first, append last)
  <slug>/
    script.md              # title, voiceover text, shot plan (from SHOT_PLAN_template.md), fact notes + sources
    voiceover.mp3          # ElevenLabs audio
    words.json             # word timings for captions (script spelling, speech timings)
    NOTES.md               # choices made, assumptions, anything uncertain
    REVIEW.md              # review scores and fixes per round
    publish.txt             # title, description, hashtags, pinned comment
  ../out/<slug>.mp4        # final render (in the Remotion project's out/ folder)
```

## Phase 0: Preflight (silent, automatic, every run)
The user never has to ask for these checks. Do them first, quietly, and mention them in the final reply only if something changed.
1. **Project and folders.** Find the Remotion project (the folder with `package.json` and `src/`). Create `video-ideas/` and `video-ideas/_ideas.md` if missing.
2. **Keep the cartoon skill current.**
   - Find `.claude/skills/cartoon-3d-short/SKILL.md` in the project, then `~/.claude/skills/cartoon-3d-short/SKILL.md`.
   - If it is missing, or does not contain the heading "Rules for every video" (older than v2.1), install the latest: back up the old folder, then `git clone https://github.com/alifmahmudashik/shorts-studio-skill` into `.claude/skills/cartoon-3d-short/` so `SKILL.md` sits directly inside it and `templates/` and `references/` sit next to it.
   - If it is a git clone and current, run a quiet `git pull --ff-only` to pick up newer rules.
   - If it still cannot be found or installed, stop and say so: this skill writes the script and voiceover, the cartoon skill builds the video.
3. **Tools.** Check `ffmpeg`, Python 3 and `@remotion/three`. Find the ElevenLabs tools (see Phase 3) and note which exist.
4. **Clean up legacy helper files** from the old manual setup, only these two, and only if their first line matches:
   - `video-ideas/SKILL-UPDATE.md` (first line starts with "# Instructions for Claude Code") and
   - `video-ideas/README.md` (first line is "# video-ideas").
   Delete them (this skill now does what they described). Never delete anything else.
5. **Resume.** If the request says "continue video <slug>", read that folder and jump to the first missing phase (voiceover, words.json, build, review, render).

## Phase 1: Idea (skip if the user gave a topic)
Read `references/story_format.md` for what makes a Ricks-style short work. Then:
1. Read `video-ideas/_ideas.md`. Never repeat a topic.
2. Brainstorm 10 candidates. Score each 0-3 on: **visual** (one picture explains the weird action), **surprise** (a true detail that sounds wrong), **laugh at a genius / confident fool** (an overconfident character is proven wrong or right), **cause and effect** (a physical or logical reason, easy analogy), **debatable ending** (a comment starts), **safe** (no real victims mocked, no hate, no living private people, no medical or political claims). Pick the top score; break ties by the more visual one.
3. If the user said "surprise me" or nothing, this choice is final. Log all 10 candidates in `_ideas.md` (picked one marked).

## Phase 2: Research and script
1. **Facts first.** Search the web for at least 2 independent sources. Write a fact list with source links in `script.md` under "Fact notes". Mark anything that sources disagree on and keep the visuals generic there. Any invented dialogue must be flagged as a comic dramatisation, never as a quote.
2. **Write the script** with the six beats in `references/story_format.md`: hook in the first 3 s, the laugh, they all look right, the clue, the payoff, the explanation, a callback twist that starts an argument. 120-150 spoken words (about 40-55 s with pauses). Deadpan narrator. A gag every 4-6 s, at least three kinds. At most 2 dialogue beats, each a quoted line of 8 words or fewer read by the narrator. Numbers and years are written the way they are spoken, and shown as digits in captions.
3. **Shot plan.** Fill in `.claude/skills/cartoon-3d-short/templates/SHOT_PLAN_template.md` for every shot: camera flow, three depth layers, props list and background characters, light preset, caption height, reactions and idle motion, and the ending beat. 12-16 places for 60 s, 7-10 for 40 s.
4. Write `script.md` using `templates/script_template.md`, and `publish.txt` (title pattern "Why X ...", "How X ...", "What X really meant", no spoiler; 2-3 line description; 5-8 hashtags; a debate-starting pinned comment).
5. **Self-check the script** against `templates/review_checklist.md` (script section). Fix and continue. Do not wait for approval.

## Phase 3: Voiceover and word timings (ElevenLabs)
1. **Find the tool.** Look for ElevenLabs MCP tools (names like `text_to_speech`, `generate_speech`, `creative_generate_speech`, `list_voices`, `speech_to_text`, `transcribe`). Load them with ToolSearch if deferred.
2. **Voice:** default "Dan - Friendly, Relaxed & Real" (voice id `XA3P1cj7XJexe6Zq0ATX`) if it is available, otherwise a clear, warm, mid-range male English voice from the voice list. Model `eleven_v4` if offered, otherwise `eleven_multilingual_v2`. No exaggerated emotion: deadpan. Use "..." for short pauses before punch words.
3. **Generate once**, with only the final voiceover text from `script.md`, one take. Save the audio as `video-ideas/<slug>/voiceover.mp3`:
   - If the tool writes files, point it at the slug folder.
   - If it returns a download link (or a flow or file URL), **download it automatically** whenever the environment allows (a direct file URL with `curl -L -o`, a signed audio URL, or the connector's own download or export tool). Check that the file is real audio with `ffprobe` and that its length is plausible.
4. **If the audio cannot be downloaded automatically** (the link needs a signed-in browser, or the shell cannot reach the site):
   - Open the URL for the user in their browser (Claude in Chrome, if available) so the page is ready.
   - Finish Phase 2 and write `video-ideas/<slug>/NEEDS_AUDIO.md` with the link and the exact steps: download the audio, save it as `voiceover.mp3` in `video-ideas/<slug>/`.
   - Tell the user in two lines what to do, then stop (or, if the session can wait, check the folder for the file every minute for up to 10 minutes). When they say "continue video <slug>", resume at step 5.
5. **Word timings:** make `words.json` (`{word, start, end}` in seconds) with the connected speech-to-text tool, or a local one (`faster-whisper`, `whisper`), or the ElevenLabs speech-to-text API if a key exists. Replace the transcribed words with the SCRIPT spelling and keep the timings. Check the audio length with `ffprobe` and compare with the script (30-70 s). If it is far off, tighten the script or the pauses and note it. Do not regenerate unless the audio is unusable.
6. Re-time the shot plan to the real word timings.

## Phase 4: Build the video (cartoon-3d-short)
1. Load `cartoon-3d-short` and follow it stage by stage: `story.ts` from the shot plan, continuous camera flows, word-by-word captions from `words.json`, per-place lighting, solid 3D set dressing, reaction faces and idle motion, sound design and music at the right levels. Apply every point of "Rules for every video" while building, not afterwards.
2. Run its Quality gate and a 15 s test clip (hook plus 2-3 shots) first. Fix, then build the rest.
3. Render at 1440x2560 (`--scale 1.3333`) into `out/<slug>.mp4`.

## Phase 5: Self-review loop (up to 2 rounds)
1. Run `scripts/review_video.sh out/<slug>.mp4 video-ideas/<slug>/review`. It prints duration, hard cuts, loudness and makes contact sheets.
2. **Look at every sheet** (open the images) and go through `templates/review_checklist.md` (video section). Score each item out of 10. Be strict: name what is wrong, not only what is right.
3. Anything below 8, or any FAIL line, gets fixed in the project (not papered over): set dressing, blank surfaces, caption collisions, framing, the ending beat, idle motion, camera flow, audio level. Re-render and re-run the review.
4. Write the scores, the problems found and the fixes into `REVIEW.md`. After two rounds, accept the result, list anything still below 8 in `REVIEW.md`, and finish.

## Phase 6: Deliver
1. Append the finished topic to `_ideas.md` with the date and slug.
2. Reply with: the title, the length, the path of `out/<slug>.mp4`, the three things the user should know (choices made, anything uncertain or below 8), and one next step. Send the MP4 itself if a way to send files is available.
3. Do not recap the process step by step.

## Common failures to avoid
- Starting the build before the voiceover exists: timing then has to be redone.
- Captions from the speech-to-text spelling instead of the script spelling.
- Skipping the sheets review. Numbers pass while a flat blank wall, a cropped sign or a frozen character is obvious to the eye.
- Regenerating the voice to fix a script change: edit the script before generating, once.
- Real-person claims: keep defamatory or unverified details out; stay with what the sources agree on.
