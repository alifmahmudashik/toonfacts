# Mode: new video

Full pipeline from idea to rendered MP4. For **Continue**: read `videos/<slug>/` (and its `source/`) and jump to the first missing phase (voiceover, words.json, build, review, render). Preflight (see `SKILL.md`) has already run. Rules that apply everywhere are in `SKILL.md` (no questions, one voice take, no keys, never publish).

## Phase 1: Idea (skip if the user gave a topic)
Read `references/story_format.md` (what makes a short work, and the five lanes). Ideas come from research, not from memory.

1. **History and lane.** Read `videos/_ideas.md` (each line has a date, slug and lane). Never repeat a topic. Choose the lane: if the user named one or said "trending", use it. Otherwise rotate: aim for about one third timeless stories (lane A), one third trending (any lane, picked by heat), one third weird modern or science (lanes C-E), and never the same lane more than twice in a row.
2. **Research what is working now** (WebSearch and WebFetch, current year, at least 6 searches). Look for: recent popular Shorts and videos on story, loophole, "why can't" and "how does X really work" topics (titles, hooks, view counts only if actually visible); what is in the news or going around this week and last; what people search and ask (autocomplete, "people also ask", forums and Q&A sites); anniversaries and events coming within 2 weeks. Collect 15-20 raw ideas, each with a lane and an evidence link. Do not copy another channel's video: take the topic or pattern and find your own angle.
3. **Score every idea 0-3** on: **visual** (one picture explains the weird action), **surprise** (a true detail that sounds wrong), **confident assumption** (an overconfident person, rule or belief is proven wrong or right), **cause and effect** (a physical or logical reason, easy analogy), **debatable ending** (a comment starts), **safe** (no real victims mocked, no hate, no living private people, no medical, legal or political claims), **heat** (evidence it is being watched, searched or talked about now; 0 if you found none), **verifiable** (two independent sources exist), **drawable** (it can be shown as funny pictures, and the set is cheap: a modern or science setting that needs a brand-new set scores lower than one we can dress with existing props). Timely news topics must also be fast to make; mark each idea `timely` or `evergreen`.
4. **Pick** the top total for the chosen lane (ties: the more visual one). If the user said "surprise me" or nothing, this choice is final: do not ask. Log all candidates in `videos/_ideas.md` as `date | slug | lane | timely/evergreen | score | picked or rejected | evidence link`.
5. In `source/NOTES.md` write one line saying why this topic and lane were chosen and what evidence of heat was found (or "no reliable trend evidence found"). Never invent popularity numbers.

**Ideas mode:** do steps 1-3 and show the top 5 as a short list (title, lane, one line of why, evidence link, timely or evergreen). Build nothing.

## Phase 2: Research and script
1. **Facts first.** Search the web for at least 2 independent sources. Write a fact list with source links in `script.md` under "Fact notes". Mark anything that sources disagree on and keep the visuals generic there. Any invented dialogue must be flagged as a comic dramatisation, never as a quote.
2. **Write the script** with the six beats in `references/story_format.md`: hook in the first 3 s, the laugh, they all look right, the clue, the payoff, the explanation, a callback twist that starts an argument. 120-150 spoken words (about 40-55 s with pauses). Expressive, fun narrator who reacts like a real person telling a story (the characters keep deadpan faces). A gag every 4-6 s, at least three kinds. At most 2 dialogue beats, each a quoted line of 8 words or fewer read by the narrator. Numbers and years are written the way they are spoken, and shown as digits in captions.
3. **Shot plan.** Fill in `templates/SHOT_PLAN_template.md` for every shot: camera flow, three depth layers, props list and background characters, light preset, caption height, reactions and idle motion, and the ending beat. 12-16 places for 60 s, 7-10 for 40 s.
4. Write `videos/<slug>/source/script.md` using `templates/script_template.md`.
5. **Self-check the script** against `templates/review_checklist.md` (script section). Fix and continue. Do not wait for approval.

## Phase 2b: Publish research (title, description, hashtags, tags)
Goal: a `videos/<slug>/publish.md` that gives the video its best chance to be found and watched. Base it on research done now with WebSearch/WebFetch, not on memory: rules and trends change. Use `templates/publish_template.md` and save every source link in its "Research notes".
1. **Platform rules (current year).** Search YouTube's own help pages first (then reputable creator-tool blogs) for: Shorts title length and truncation, how many hashtags count and where they show, description limits, tags and how much they matter, categories, and the disclosure questions asked at upload (made for kids, altered or synthetic content). Write down what the sources say, with links. Do not state a rule you did not find.
2. **Competitor scan.** Search for 6-10 successful Shorts and videos on similar story or history fact topics, and on this topic itself. Note for each: title wording and length, the hook pattern, hashtags and tags if visible, and any view counts you actually see. Look for patterns (curiosity gap, "Why / How" openers, numbers, a character label) and for the gap: what nobody has titled yet. Never copy a title.
3. **Keywords.** Search the topic's natural phrases and look at autocomplete, "people also ask" and related searches. Pick 1 primary keyword and 5-8 secondary ones that people really type, in words a viewer would use.
4. **Write the package:**
   - **Title:** 3 options, then the chosen one. Under 60 characters so it is not cut off, primary keyword near the front, a curiosity gap, no spoiler of the payoff, no lie. Say why it won.
   - **Description:** the first 2 lines carry the primary keyword and the hook (they show in search), then 2-3 plain sentences, a line of sources (the real facts with links), a short subscribe line, and the hashtags at the end.
   - **Hashtags:** 3-5 chosen from the research (topic, history/facts, genre, and `#Shorts`), as the rules you found allow.
   - **Tags:** 8-12 keyword tags from the keyword list, specific first, broad last, within the character limit you found.
   - **Category** and the upload questions (made for kids, altered or synthetic content): the answer for each with the source or the reason.
   - **Pinned comment:** a question that starts an argument about the ending.
   - **Thumbnail:** the frame time to use (the clearest funny moment, character face and no caption over it) and optional 2-4 word cover text. Phase 6 extracts it.
   - **Posting:** best day and time for the target audience if the research found a source, otherwise say "no reliable source found" and give no time.
5. Be honest: if the research is thin, say so in the file. Do not invent statistics, view counts or "viral scores". Keep real people's names out of titles if a claim is disputed.
6. If the story or title changes later (Update mode), redo only the parts of this research that the change affects.

## Phase 3: Voiceover and word timings (ElevenLabs)
1. **Find the tool.** Look for ElevenLabs MCP tools (names like `text_to_speech`, `generate_speech`, `creative_generate_speech`, `list_voices`, `speech_to_text`, `transcribe`). Load them with ToolSearch if deferred.
2. **Voice and performance.** Default voice "Jack - Social Media Creator" (voice id `EgaoTKAPI20lafqnhSqN`, young, casual, enthusiastic) if available, otherwise a young, expressive, conversational male English voice from the voice list. Model `eleven_v4` (or `eleven_v3`): it reads inline audio tags. A flat voice is the most common reason a video feels boring, so write the text WITH direction:
   - Put a tag right before the words it colours, and change tags only where the delivery changes: `[excited]`, `[curious]`, `[mischievously]`, `[sarcastic]`, `[surprised]`, `[deadpan]`, `[sighs]`, `[gasps]`, `[short pause]`.
   - Typical shape: open `[curious]` or `[excited]` on the hook, `[mischievously]` into the setup, `[sarcastic]` or `[deadpan]` on the absurd fact, `[gasps]` or a CAPITALISED word on the payoff, `[sighs]` or `[deadpan]` on the ending.
   - **Laughing is rare:** at most ONE `[laughs]` or `[chuckles]` in the whole video, and only after the biggest gag. Never `[laughs harder]`. Real narrators sound amused through tone, not constant laughter.
   - Capitalise one punch word per beat at most. Use "..." and `[short pause]` before punch words. Keep numbers and years as written.
   - Tags are not spoken, so strip them for the captions and for `words.json` (the script text without tags is the caption text).
3. **Generate once**, with only the final voiceover text from `script.md`, one take. Save the audio as `videos/<slug>/source/voiceover.mp3`:
   - If the tool writes files, point it at the slug folder.
   - If it returns a download link (or a flow or file URL), **download it automatically** whenever the environment allows (a direct file URL with `curl -L -o`, a signed audio URL, or the connector's own download or export tool). Check that the file is real audio with `ffprobe` and that its length is plausible.
4. **If the audio cannot be downloaded automatically** (the link needs a signed-in browser, or the shell cannot reach the site):
   - Open the URL for the user in their browser (Claude in Chrome, if available) so the page is ready.
   - Finish Phase 2 and write `videos/<slug>/NEEDS_AUDIO.md` with the link and the exact steps: download the audio, save it as `voiceover.mp3` in `videos/<slug>/source/`.
   - Tell the user in two lines what to do, then stop (or, if the session can wait, check the folder for the file every minute for up to 10 minutes). When they say "continue video <slug>", resume at step 5.
5. **Word timings:** make `words.json` (`{word, start, end}` in seconds) with the connected speech-to-text tool, or a local one (`faster-whisper`, `whisper`), or the ElevenLabs speech-to-text API if a key exists. Replace the transcribed words with the SCRIPT spelling and keep the timings. Check the audio length with `ffprobe` and compare with the script (30-70 s). If it is far off, tighten the script or the pauses and note it. Do not regenerate unless the audio is unusable.
6. Re-time the shot plan to the real word timings.

## Phase 4: Build the video (`docs/engine.md`)
1. Read `docs/engine.md` and follow it stage by stage: `story.ts` from the shot plan, continuous camera flows, word-by-word captions from `words.json`, per-place lighting, solid 3D set dressing, reaction faces and idle motion, sound design and music at the right levels. Apply every point of "Rules for every video" while building, not afterwards.
2. Run its Quality gate and a 15 s test clip (hook plus 2-3 shots) first. Fix, then build the rest.
3. Render at 1440x2560 (`--scale 1.3333`) into `work/<slug>/render/<slug>.mp4` (scratch). The final copy is made in Phase 6.

## Phase 5: Self-review loop
Follow `docs/review.md` (up to 2 rounds), then continue.

## Phase 6: Deliver
1. **Final video:** copy the approved render to `videos/<slug>/<slug>.mp4`. This is the only file the user needs to upload.
2. **Thumbnail:** extract the frame chosen in `publish.md` with `ffmpeg -ss <time> -i videos/<slug>/<slug>.mp4 -frames:v 1 -q:v 2 videos/<slug>/thumbnail.jpg`, check that it shows a clear face or action and no caption over it, and pick another frame if not.
3. **Finish `publish.md`:** fill in the real length, file names and posting checklist; make sure the title and description match what the finished video actually says.
4. **Tidy:** the video folder holds only `<slug>.mp4`, `thumbnail.jpg`, `publish.md`, `source/` and `versions/`. Scratch stays in `work/<slug>/`. Append the finished topic to `videos/_ideas.md` with the date and slug.
5. Reply with: the title (chosen headline), the length, the folder path `videos/<slug>/`, the three things the user should know (choices made, anything uncertain or below 8), and one next step. Send the MP4 itself if a way to send files is available.
6. Do not recap the process step by step.

## Common failures to avoid
- Starting the build before the voiceover exists: timing then has to be redone.
- Captions from the speech-to-text spelling instead of the script spelling.
- Skipping the sheets review. Numbers pass while a flat blank wall, a cropped sign or a frozen character is obvious to the eye.
- Regenerating the voice to fix a script change: edit the script before generating, once.
- Real-person claims: keep defamatory or unverified details out; stay with what the sources agree on.
