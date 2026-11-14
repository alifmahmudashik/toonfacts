# Mode: new video

Full pipeline from idea to rendered MP4. For **Continue**: read `videos/<slug>/` (and its `source/`) and jump to the first missing phase (voiceover, words.json, build, review, render). Preflight (see `SKILL.md`) has already run. Rules that apply everywhere are in `SKILL.md` (no questions, one voice take, no keys, never publish).

## Phase 1: Idea (skip if the user gave a topic)
Goal: the topic with the best STORY, not the most trending one. Read `references/story_format.md` first (the two story shapes, the hook section, what a weak list-story looks like).

1. **History.** Read `videos/_ideas.md` (date, slug, shape, score per line). Never repeat a topic or its angle.
2. **Search wide, at least 6 searches, across both shapes.** The channel is animated true stories, history and interesting facts, so look for both:
   - **Shape A, character stories:** cons, mistakes, rivalries, accidents, loopholes, stunts, "the one who was ignored and was right".
   - **Shape B, question stories:** why a thing is called what it is called; why an object is shaped that way; why an odd rule, border, building or custom exists; an interesting fact with a real mechanism behind it.
   Also check what people are actually watching and asking right now, but only as a tie-breaker. Collect 12-15 candidates, each with a one-line story, its shape (A or B), a source link, and a note on where the best detail is.
3. **Reject list-topics, not fact topics.** "Several facts about X" with nothing at stake is out. But the same material is allowed the moment it becomes Shape B: one question at the top, the obvious answer knocked down, and a reveal that is stranger than the assumption. Try that conversion before dropping an idea.
4. **Draft one hook per shortlisted candidate, before scoring.** One sentence, no context, under about 14 spoken words, following the hook rules in `references/story_format.md`. A topic whose hook needs a second sentence to make sense is not a topic yet. This hook is a test, not a commitment: Phase 2 writes the real one.
5. **Score 0-3** on each of these. The first item depends on the shape:
   - **Drive** - Shape A: one clear character with a want. Shape B: a question people half-wonder about, with a believable wrong answer to knock down.
   - **Hook** - the draft hook opens a real question with no context, and could not open a hundred other videos.
   - **Obstacle and reversal** - it gets worse, then turns, at about 70 %.
   - **Surprise** - a true detail that sounds wrong.
   - **Stakes** - what is lost or won, even if small and funny.
   - **Drawable** - it can be shown as funny pictures with a cheap set.
   - **Debatable ending** - a comment starts.
   - **Verifiable** - two independent sources.
   - **Safe** - no real victims mocked, no hate, no living private people, no medical, legal or political claims.
   A candidate scoring 0 on **drive**, **hook**, **reversal** or **verifiable** is out. Pick the top total (ties: the more visual one).
6. If the user said "surprise me" or nothing, this choice is final: do not ask. Log all candidates in `videos/_ideas.md` as `date | slug | shape | score | picked or rejected | one-line story | source`. In `source/NOTES.md` write one line on why this story won.

**Ideas mode:** steps 1-5, then show the top 5 as a short list (title, its shape, the one-line story, the draft hook, why it wins, a source link). Build nothing.

## Phase 2: Research and script
1. **Research for the story, not just the facts.** Search at least 8 times and read the best sources in full (WebFetch). Find: who the real people or animals were and what each wanted; the exact order of events; the numbers, dates and places; the best true quote or detail; the funniest true moment; where sources disagree. Write a fact list with links under "Fact notes" in `source/script.md`. Mark disputes and keep the visuals generic there. Invented dialogue is flagged as a comic dramatisation, never presented as a quote.
2. **Story spine (must pass before writing).** Fill in `templates/script_template.md`, section "Story spine". First name the **shape** (A character story or B question story, see `references/story_format.md`), because it decides the logline and the beat names:
   - **Logline** in one sentence. Shape A: `[Character] wants [goal], but [obstacle], so [action], until [twist].` Shape B: `Everyone assumes [wrong answer], but [fact that kills it], so [the search narrows], until [the real answer, which is stranger].`
   - **The question** the viewer needs answered, opened in the first 3 s and answered only at the end.
   - **Beats as "but / therefore"**: 6-9 beats, each linked to the previous one by BUT or THEREFORE, never "and then". Each beat must change something: the stakes rise, someone is proven wrong, or the answer gets worse. A beat that only adds a fact is cut.
   - **Names cap:** at most 4 named people, places or countries. Merge or drop the rest.
   - **The reversal** at about 70 % of the video, and the closing line that gives the opening line a new meaning.
   If any line is missing or the story is still a list, change the angle or the topic. Do not write the script yet.
3. **Hook gate (the script is not written until this passes).** The first line decides whether the video is watched at all, so it gets its own pass. Read the hook section of `references/story_format.md` and work through it in order:
   - **Draft 8 hooks**, spread across at least 4 of the 6 patterns there (contradiction, weird action, impossible number, named wrong assumption, direct dare, status flip). Eight, not five: the good one is rarely in the first three.
   - **Strike out any that break a rewrite rule** in that section: needs a second sentence, announces a topic, could open any other video, spoils the payoff, carries two or more names, starts with "Did you know" or other throat-clearing, or puts its best word in the first half.
   - **Score the survivors 0-3** on: question opened (how badly does a stranger need the answer), specific to this story, understandable cold, lands on its strongest word, speakable by an excited person in one breath. Pick the highest.
   - **Run the 3-second test.** Judge the winner alone, with no title and no context, as if heard mid-scroll with the sound half on: can a stranger say what question this video will answer? If not, it fails and you draft again. Do not carry a failing hook forward on the grounds that the rest of the script is good.
   - Write the winner, its pattern, its score and the 7 rejects into `source/NOTES.md`, and the winner into the script template's "Hook chosen" line.
   - The hook is also the first thing the cold read in step 5 judges, the first line of the review checklist, and the seed for the title and the first description line in Phase 2b. If any of those three later says the hook is weak, come back here and redraft rather than patching around it.
4. **Write the script** (120-150 spoken words, about 40-55 s with pauses) from the spine. A small question or surprise every 8-10 s; a gag every 4-6 s, at least three kinds; the clue is shown before the payoff; numbers and years written as spoken and shown as digits in captions. Expressive, fun narrator who reacts like a real person telling a story (the characters keep deadpan faces). At most 2 dialogue beats, each a quoted line of 8 words or fewer read by the narrator. The last line pays off the question and echoes the first line.
5. **Cold read (fresh eyes).** Before any voice credits are spent, have the script judged by someone who has not seen the work: if the Agent tool is available, start a separate agent with only the script and `templates/review_checklist.md` (script section), asking it to act as a bored viewer scrolling Shorts and answer, hook first: after the first sentence alone, what question do I think this video answers, and do I care? then, would I swipe at 3 s? at 15 s? where did I get lost or bored? which line is the best, which is dead weight? what did I expect and not get? Otherwise do it yourself in a separate pass, reading only the script text. Rewrite what it flags. Up to 2 rounds; keep the verdict in `source/NOTES.md`.
6. **Shot plan.** Fill in `templates/SHOT_PLAN_template.md` for every shot: camera flow, three depth layers, props list and background characters, light preset, caption height, reactions and idle motion, and the ending beat. 12-16 places for 60 s, 7-10 for 40 s. Every important beat gets a picture that carries the joke without the words; no unreadable close-ups (a prop in frame must be recognisable) and no blank placeholder screens or maps.
7. Self-check the script against `templates/review_checklist.md` (script section). Fix and continue. Do not wait for approval.

## Phase 2b: Publish research (title, description, hashtags, tags)
Goal: a `videos/<slug>/publish.txt` that gives the video its best chance to be found and watched. Base it on research done now with WebSearch/WebFetch, not on memory: rules and trends change. Use `templates/publish_template.txt` and save every source link in its "Research notes". **It is a plain text file: no Markdown.** No `#` headings, no `**bold**`, no backticks, no tables. The user copies straight out of it, so anything they paste must be exactly what YouTube should receive.
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
   - **Thumbnail:** the frame time (the clearest funny moment: a character face, the prop that matters, and no caption on screen) **and the cover text, which is required, not optional.** 2-4 words, upper case. Rules for the words:
     - They must **not repeat the title**. The title and the thumbnail are read together, so saying the same thing twice wastes the only two pieces of text a viewer gets. Title asks, thumbnail shows the absurd object, or the other way round.
     - Never a sentence, never a line lifted from the script, never a caption from the video.
     - No spoiler of the payoff, and nothing the video does not deliver.
     - Name the thing that makes someone stop: the absurd object, the impossible number, the question. "A USED UNIFORM", "1 BIRD, 0 WINS", "WHY THE HOLES?"
     Write the chosen words, two rejected options, and the `--focus` / `--zoom` values that worked into `publish.txt`. Phase 6 builds it.
   - **Posting:** best day and time for the target audience if the research found a source, otherwise say "no reliable source found" and give no time.
5. Be honest: if the research is thin, say so in the file. Do not invent statistics, view counts or "viral scores". Keep real people's names out of titles if a claim is disputed.
6. If the story or title changes later (Update mode), redo only the parts of this research that the change affects.

## Phase 3: Voiceover and word timings (ElevenLabs)
1. **Find the tool.** Look for ElevenLabs MCP tools (names like `text_to_speech`, `generate_speech`, `creative_generate_speech`, `list_voices`, `speech_to_text`, `transcribe`). Load them with ToolSearch if deferred.
2. **Voice and performance.** Default voice "Jack - Social Media Creator" (voice id `EgaoTKAPI20lafqnhSqN`, young, casual) if available, otherwise a young, conversational male English voice from the voice list. Model `eleven_v4` (or `eleven_v3`): it reads inline audio tags.

   **Aim for natural, not performed.** The goal is someone telling you something interesting across a table, not a presenter doing a bit. Over-acting is what makes a voice sound like AI: the model takes any invitation to perform and overshoots it. The pictures and the facts carry the comedy, so the narrator can stay dry and let them land.

   - **No laughter at all. Zero.** Never `[laughs]`, `[chuckles]`, `[giggles]`, `[laughs harder]`, `[snickers]`, and never "haha" or "heh" in the text. This is not a budget of one: the model renders a laugh tag generously and then keeps the amusement in its voice for the lines after it, which is exactly what makes a take sound fake. A narrator sounds amused through timing and dryness, never through laughing at their own joke.
   - **At most 3 tags in the whole script**, and never on two sentences in a row. Most lines carry no tag. A tag every sentence is the other reason a take sounds synthetic: real speech does not change register that often.
   - **Prefer the quiet tags:** `[curious]`, `[deadpan]`, `[short pause]`, `[whispers]`. Use `[excited]`, `[surprised]`, `[gasps]` and `[mischievously]` sparingly and never more than once each per video. They push the model toward the hyped-up delivery this rule exists to prevent.
   - **No exclamation marks in the voiceover text**, and at most ONE capitalised punch word in the whole script, on the payoff. Both are read as instructions to perform.
   - Use "..." and `[short pause]` before punch words; the pause does the work an exclamation mark would have done badly. Keep numbers and years as written.
   - Tags are not spoken, so strip them for the captions and for `words.json` (the script text without tags is the caption text).

   Typical shape for a 130-word script: `[curious]` on the hook, nothing through the setup, `[deadpan]` on the absurd fact, a `[short pause]` before the payoff word, nothing at the end. That is three tags, and it will sound more human than ten.

3. **Generate once**, with only the final voiceover text from `script.md`, one take. Save the audio as `videos/<slug>/source/voiceover.mp3`:
   - If the tool writes files, point it at the slug folder.
   - If it returns a download link (or a flow or file URL), **download it automatically** whenever the environment allows (a direct file URL with `curl -L -o`, a signed audio URL, or the connector's own download or export tool). Check that the file is real audio with `ffprobe` and that its length is plausible.
4. **Check the take before using it.** Run `python3 tools/check_voice.py videos/<slug>/source/voiceover.mp3` (add `--words <n>` with the script's spoken word count for a speed check). It reports duration, loudness, pause structure and the seconds where delivery is faster than any natural narration, which is where laughter and rushed performance show up. Open those timestamps and listen before going on.
   - **Regenerating for a bad performance is allowed, once.** The one-take rule exists to stop idle re-rolls, not to force a laughing take into a video. If the check flags burst seconds, or you hear laughter, or it sounds performed, cut the tags down (towards the three above, laughter to zero), regenerate once, and write both the reason and what you changed in `source/NOTES.md`. If the second take is still wrong, keep the better one, say so in `NOTES.md`, and continue.
5. **If the audio cannot be downloaded automatically** (the link needs a signed-in browser, or the shell cannot reach the site):
   - Open the URL for the user in their browser (Claude in Chrome, if available) so the page is ready.
   - Finish Phase 2 and write `videos/<slug>/NEEDS_AUDIO.md` with the link and the exact steps: download the audio, save it as `voiceover.mp3` in `videos/<slug>/source/`.
   - Tell the user in two lines what to do, then stop (or, if the session can wait, check the folder for the file every minute for up to 10 minutes). When they say "continue video <slug>", resume at step 5.
6. **Word timings:** make `words.json` (`{word, start, end}` in seconds) with the connected speech-to-text tool, or a local one (`faster-whisper`, `whisper`), or the ElevenLabs speech-to-text API if a key exists. Replace the transcribed words with the SCRIPT spelling and keep the timings. Check the audio length with `ffprobe` and compare with the script (30-70 s). If it is far off, tighten the script or the pauses and note it. Do not regenerate unless the audio is unusable.
7. Re-time the shot plan to the real word timings.

## Phase 4: Build the video (`docs/engine.md`)
1. Read `docs/engine.md` and follow it stage by stage: `story.ts` from the shot plan, continuous camera flows, word-by-word captions from `words.json`, per-place lighting, solid 3D set dressing, reaction faces and idle motion, sound design and music at the right levels. Apply every point of "Rules for every video" while building, not afterwards.
2. Run its Quality gate and a 15 s test clip (hook plus 2-3 shots) first. Fix, then build the rest.
3. Render at 1440x2560 (`--scale 1.3333`) into `work/<slug>/render/<slug>.mp4` (scratch). The final copy is made in Phase 6.

## Phase 5: Self-review loop
Follow `docs/review.md` (up to 2 rounds), then continue.

## Phase 6: Deliver
1. **Final video:** copy the approved render to `videos/<slug>/<slug>.mp4`. This is the only file the user needs to upload.
2. **Thumbnail: design one.** A frame with a word on it is not a thumbnail. The cover is its own picture, built in three layers, and it may show things the video never shows: the character can be posed, re-rendered or drawn on its own for the cover.
   ```
   python3 tools/make_thumbnail.py --video videos/<slug>/<slug>.mp4 --time <s> \
       --kicker "<YEAR OR LABEL>" --text "<LINE ONE|LINE TWO>" \
       --bg burst --accent yellow --hero 0.60 --out videos/<slug>/thumbnail.jpg
   ```
   It writes 2160 x 3840, which is what YouTube recommends for a Shorts custom thumbnail (9:16, JPG or PNG, minimum 640 px tall), plus `thumbnail_small.png`.

   **Layer 1, the background: made, never the video's own set.** Pick with `--bg`: `burst` (radial rays behind the character), `grid` (perspective grid running to a glowing horizon), `split` (bold diagonal colour block), `blur` (the frame itself, darkened and thrown out of focus) as the last resort. It must be darker and simpler than the character so the character pops.

   **Layer 2, the character: cut out and big.** The tool cuts it from the frame by reading this channel's style, flat saturated fills inside thick black outlines against a desaturated set, then adds a rim light and a drop shadow so it lifts off the background. It should stand in the lower half and fill about 55-65 % of the height (`--hero`), with the face clearly visible and reacting.
   - **Pick a frame where the cutout can work:** one character, facing the camera, a clear expression, nothing crossing in front of it, and **no caption on screen** (a caption sits on the body and ends up in the cutout). Pick a frame between spoken words.
   - The tool prints what share of the frame the cutout covered. Under about 2 % means it failed.
   - **If no frame works, make the picture instead.** Render the character on its own over a plain background, or pose it for the cover, save a PNG with a transparent background and pass `--cutout <file>`. The cover does not have to be a moment from the video. This is the better route whenever the best frame is crowded or the character is small in every shot.

   **Layer 3, the text: stacked, not one flat line.** `--text` takes lines split by `|`. The longest line is set biggest in the accent colour, the others smaller in white, and `--kicker` puts a small line above it (a year, a place, a label: "1906", "WORLD WAR", "TRUE STORY").
   - 2-4 words a line, 6 words in total at most. Two lines beats three.
   - It must **not repeat the title**. Title and cover are the only two pieces of text a viewer gets; one asks, the other names the absurd thing.
   - No spoiler, nothing the video does not deliver, never a sentence lifted from the script.

   **Then judge it at the right size.** Open `thumbnail_small.png`. That is roughly how big it is on a phone. If the words are not instantly readable and the character not instantly recognisable there, fix it: fewer words, a bigger `--hero`, a simpler background. Do not skip this; a cover admired at full size and unreadable at thumbnail size has failed. `--guides` marks the strips YouTube covers with its own title and channel name.

3. **Finish `publish.txt`:** fill in the real length, file names and posting checklist; make sure the title and description match what the finished video actually says.
4. **Tidy:** the video folder holds only `<slug>.mp4`, `thumbnail.jpg`, `publish.txt`, `source/` and `versions/`. Scratch stays in `work/<slug>/`. Append the finished topic to `videos/_ideas.md` with the date and slug.
5. Reply with: the title (chosen headline), the length, the folder path `videos/<slug>/`, the three things the user should know (choices made, anything uncertain or below 8), and one next step. Send the MP4 itself if a way to send files is available.
6. Do not recap the process step by step.

## Common failures to avoid
- Starting the build before the voiceover exists: timing then has to be redone.
- Captions from the speech-to-text spelling instead of the script spelling.
- Skipping the sheets review. Numbers pass while a flat blank wall, a cropped sign or a frozen character is obvious to the eye.
- Regenerating the voice to fix a script change: edit the script before generating, once.
- Real-person claims: keep defamatory or unverified details out; stay with what the sources agree on.
