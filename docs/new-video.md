# Mode: new video

Full pipeline from idea to rendered MP4. Preflight (see `SKILL.md`) has already run. Rules that apply everywhere are in `SKILL.md` (no questions, one voice take, no keys, never publish).

## Phase 1: Idea (skip if the user gave a topic)
Read `references/story_format.md` for what makes a Ricks-style short work. Then:
1. Read `video-ideas/_ideas.md`. Never repeat a topic.
2. Brainstorm 10 candidates. Score each 0-3 on: **visual** (one picture explains the weird action), **surprise** (a true detail that sounds wrong), **laugh at a genius / confident fool** (an overconfident character is proven wrong or right), **cause and effect** (a physical or logical reason, easy analogy), **debatable ending** (a comment starts), **safe** (no real victims mocked, no hate, no living private people, no medical or political claims). Pick the top score; break ties by the more visual one.
3. If the user said "surprise me" or nothing, this choice is final. Log all 10 candidates in `_ideas.md` (picked one marked).

## Phase 2: Research and script
1. **Facts first.** Search the web for at least 2 independent sources. Write a fact list with source links in `script.md` under "Fact notes". Mark anything that sources disagree on and keep the visuals generic there. Any invented dialogue must be flagged as a comic dramatisation, never as a quote.
2. **Write the script** with the six beats in `references/story_format.md`: hook in the first 3 s, the laugh, they all look right, the clue, the payoff, the explanation, a callback twist that starts an argument. 120-150 spoken words (about 40-55 s with pauses). Deadpan narrator. A gag every 4-6 s, at least three kinds. At most 2 dialogue beats, each a quoted line of 8 words or fewer read by the narrator. Numbers and years are written the way they are spoken, and shown as digits in captions.
3. **Shot plan.** Fill in `templates/SHOT_PLAN_template.md` for every shot: camera flow, three depth layers, props list and background characters, light preset, caption height, reactions and idle motion, and the ending beat. 12-16 places for 60 s, 7-10 for 40 s.
4. Write `script.md` using `templates/script_template.md`, and `publish.md` (title pattern "Why X ...", "How X ...", "What X really meant", no spoiler; 2-3 line description; 5-8 hashtags; a debate-starting pinned comment).
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

## Phase 4: Build the video (`docs/engine.md`)
1. Read `docs/engine.md` and follow it stage by stage: `story.ts` from the shot plan, continuous camera flows, word-by-word captions from `words.json`, per-place lighting, solid 3D set dressing, reaction faces and idle motion, sound design and music at the right levels. Apply every point of "Rules for every video" while building, not afterwards.
2. Run its Quality gate and a 15 s test clip (hook plus 2-3 shots) first. Fix, then build the rest.
3. Render at 1440x2560 (`--scale 1.3333`) into `out/<slug>.mp4`.

## Phase 5: Self-review loop
Follow `docs/review.md` (up to 2 rounds), then continue.

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
