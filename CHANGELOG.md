# Changelog

## v3.9 - the thumbnail is a design, not a frame with a word on it
- v3.8 still started from a video frame and wrote text over it, so covers stayed flat: the character small and lost in its own set, no focal point, nothing that stops a scroll.
- **The cover is now built in three layers.** A made background, the character cut out and placed large over it, and stacked text above. `tools/make_thumbnail.py` does all three.
- **Backgrounds are made, not taken from the video:** `--bg burst` (radial rays behind the character), `grid` (perspective grid to a glowing horizon), `split` (diagonal colour block), `blur` (the frame darkened and defocused) as a last resort.
- **The character is cut out of the frame.** The cutout reads this channel's art style - flat saturated fills inside thick black outlines, against a desaturated set - then gets a rim light and a drop shadow so it lifts off the background. It fills 55-65 % of the height with `--hero`.
- Filling holes in that cutout needed a rule of its own: a face is an enclosed hole and must be filled, while the gap between two legs is also enclosed but opens at the feet, and filling it drags the floor in. Holes whose bottom edge sits on the bottom of the character are left alone.
- **The cover no longer has to be a moment from the video.** When no frame cuts cleanly, render or pose the character on its own over a plain background and pass `--cutout`. Phase 6 now says so outright.
- **Text is stacked, not one flat line:** lines split by `|`, the longest set biggest in the accent colour, the rest white, plus an optional `--kicker` above (a year, a place, "TRUE STORY"). 2-4 words a line, 6 at most, and still never a repeat of the title.
- Checklist and `publish.md` updated to match: background style, kicker, lines, rejected options and the build command are all recorded, and the small preview is still what the cover is judged at.

## v3.8 - thumbnails are built, not grabbed
- A raw frame is not a thumbnail. The old Phase 6 ran one `ffmpeg -ss` and shipped whatever came out, so covers arrived with the video's own caption burnt into them (a meaningless half-sentence out of context), the character small, and half the picture empty floor.
- **New `tools/make_thumbnail.py`.** Takes a frame (or a video plus a time) and 2-4 words, crops to the subject with `--focus` and `--zoom`, lifts it off the background with a saturation, contrast and vignette pass, and sets the words in the channel's style: white face, heavy black outline, blue 3D side. Writes 2160 x 3840, which is what YouTube recommends for a Shorts custom thumbnail (9:16, JPG or PNG, minimum 640 px tall), and keeps the file under 2 MB.
- It also writes `thumbnail_small.png` at a twelfth scale. **That preview is the test**: a thumbnail is judged at the size of a thumbnail, and the checklist now says to open it rather than admiring the full-size version. `--guides` draws the safe zones; `--band` puts a solid bar behind the words for a busy frame.
- **Cover text is now required, not optional**, and Phase 2b decides it with the rest of the publish research: 2-4 words, upper case, never a sentence or a line from the script, no spoiler, and it must not repeat the title. The title and the cover are the only two pieces of text a viewer gets, so they are not allowed to say the same thing.
- Phase 6 picks the frame on stated rules (one character, face large, prop visible, no caption on screen) and tunes the crop until the face fills the upper half.
- Nothing important goes in the bottom 18 %, where YouTube lays the title and channel name over the cover.
- New thumbnail block in `templates/review_checklist.md`; `publish.md` records the frame time, the chosen and rejected cover text, and the exact build command. Update mode gains a thumbnail-only change class that needs no render and no new audio.

## v3.7 - a narrator who does not laugh
- **Laughter is banned outright.** The old rule allowed one `[laughs]` or `[chuckles]` per video; takes still came back laughing throughout, because the model renders a laugh tag generously and keeps the amusement running into the lines after it. The budget is now zero, "haha" in the text included.
- **Tags are capped at 3 per script**, never on consecutive sentences, with the quiet ones preferred (`[curious]`, `[deadpan]`, `[short pause]`, `[whispers]`). `[excited]` and `[mischievously]` are no longer the default opener: they are what pushed the delivery into hyped-up AI territory.
- **No exclamation marks in the voiceover text**, and one capitalised punch word per script instead of one per beat. Both read as instructions to perform.
- The goal is stated plainly in `docs/new-video.md` Phase 3: someone telling you something across a table, not a presenter doing a bit. The pictures carry the comedy, so the narrator stays dry.
- **New `tools/check_voice.py`**, run as Phase 3 step 4 before the take is used. Reports duration, speaking rate against the script's word count, loudness, pause count and silence share, and prints LISTEN HERE spans for every second where delivery runs faster than speech, which is where laughter and rushing show up. Exits 1 on a real problem so it can gate the pipeline.
- **One retake is now allowed for a bad performance**, with the reason and the tag changes recorded in `NOTES.md`. The one-take rule was never meant to force a laughing take into a video.
- Voice line added to the review checklist's audio section.

## v3.6 - hook gate, and interesting facts are back
- **The hook is now a gate.** `docs/new-video.md` Phase 2 step 3 will not let the script be written until a first line passes: draft 8 hooks across at least 4 of 6 named patterns, strike the ones that break a rewrite rule, score the survivors, then run a 3-second test on the winner judged cold with no title. A failing hook is redrafted, never carried forward because the rest of the script is good.
- `references/story_format.md` has a full **hook section**: what a hook must be, 6 patterns with real examples, 7 rewrite triggers, and the 3-second test.
- The hook is judged again at three later points: the cold read answers it first, `templates/review_checklist.md` opens with its own hook block (script line and the first 3 seconds of the render), and `docs/review.md` step 2 judges it before anything else.
- **Two story shapes, so interesting-fact topics are allowed again.** Shape A is the character story (a want, an obstacle). Shape B is the question story, where the question is the protagonist and the viewer's wrong assumption is the obstacle: "turkeys are from America, so why the Asian name?". Phase 1 searches for both, scores "drive" per shape, and the six beats have a Shape B column.
- Phase 1 no longer drops a fact topic for having no protagonist. It tries the Shape B conversion first, and only rejects a list with no question at the top. Topic types restored: names and words, object shapes, odd rules and borders, mechanisms behind everyday facts.
- `templates/script_template.md` records the shape, the hook's pattern and its 3-second test result; `_ideas.md` lines now carry the shape.
- Update mode gains a "weak hook" change class, and "apply the latest rules" re-runs the hook gate on the existing first line.

## v3.5: story first
- Replaced the five lanes and trend-chasing with a story engine: one protagonist with a want and an obstacle, one open question, "but / therefore" beats, a reversal near 70 %, at most 4 names, a closing line that echoes the first. List-stories ("several facts about X") are rejected.
- Phase 1 searches for true stories with a person or animal, a want and a reversal; popularity is only a tie-breaker. New scoring: protagonist, obstacle and reversal, surprise, stakes, drawable, debatable, verifiable, safe.
- Phase 2: deeper research (8+ searches, read sources in full), a Story spine that must pass before writing, 5 hook options, and a cold read by a separate agent (bored-viewer test) before any voice credits are spent. New "Story spine" section in `templates/script_template.md`; story checks in `templates/review_checklist.md`.
- Shot plan: every key beat needs a picture that carries the joke; no unreadable close-ups or blank placeholder screens.

## v3.4: trend-researched ideas and five lanes
- Phase 1 is now research first: it searches what is being watched, searched and talked about now, collects 15-20 ideas with evidence links, and scores them (new: heat, verifiable, drawable; timely or evergreen).
- Five lanes (story, loophole, why-can't, weird modern, how-it-works) with lane rotation (never the same lane more than twice in a row) and steering words: "new video trending", "new video science", etc.
- `videos/_ideas.md` now records lane, timely/evergreen, score and evidence. `NOTES.md` records why the topic was chosen. No invented popularity numbers.

## v3.3: tidy folders and researched publish file
- New layout: `videos/<slug>/` holds the final `<slug>.mp4`, `thumbnail.jpg`, `publish.md`, `source/` and `versions/`. Scratch (stills, sheets, test renders) goes to `work/<slug>/`. `video-ideas/` and `out/` are gone; Preflight step 6 migrates old projects by moving files, never deleting.
- New Phase 2b "Publish research" in `docs/new-video.md`: current YouTube rules, a competitor scan, keyword research, then title (3 options), description, hashtags, tags, category, upload questions, pinned comment, thumbnail frame and posting time, all with sources. New `templates/publish_template.md`.
- Phase 6 now extracts `thumbnail.jpg` and finalises `publish.md`; Update mode keeps old renders in `versions/` and refreshes the publish research when the story changes.
- README: new folder layout and an updated "Update an existing project" command that migrates the old folders.

## v3.2: no downloaded 3D models
- Removed the Kenney `.glb` dependency. `templates/bridge/props.ts` builds lanterns, carts, market stalls, benches, windmill, canoe, flowers, grass and lilies in code; `loadKit()` in `world.ts` now returns them (no GLTFLoader, no `public/bridge/kenney/`). Trees, bushes, hedges and banners were already code-built.
- README: new-PC setup no longer downloads assets; added an "Update an existing project" paste-in command.

## v3.1: expressive narrator
- Voiceover is no longer deadpan. Default voice is now Jack - Social Media Creator (`EgaoTKAPI20lafqnhSqN`); the script is written with ElevenLabs `eleven_v4` audio tags (`[excited]`, `[curious]`, `[sarcastic]`, `[gasps]`, `[sighs]`, short pauses) and one capitalised punch word per beat.
- At most ONE laugh tag per video, never `[laughs harder]`; amusement comes from tone.
- Tags are stripped for captions and `words.json`. Characters keep deadpan faces.
- Updated: `docs/new-video.md` (Phase 2 and 3), `docs/engine.md`, `references/story_format.md`, templates, README, SKILL.md.

## v3.0: toonfacts (one skill)
Combines `cartoon-3d-short` (v2.1, the renderer and look rules) and `new-video` (the idea-to-MP4 pipeline) into a single skill with modes: New, Update, Continue, Review, Ideas, Upgrade.
- `SKILL.md` routes by what the user says; `docs/` holds the mode instructions; `docs/engine.md` is the former cartoon skill.
- New **Update** mode: classifies a change (looks only, spoken words, scenes, publish text, audio), keeps old versions, re-renders only what changed and runs a regression check.
- Automatic preflight: self-update by `git pull`, tool checks, ElevenLabs MCP detection, legacy cleanup.
- Voiceover: downloads the ElevenLabs audio automatically when possible, otherwise opens the link and writes `NEEDS_AUDIO.md`.
- Keeps everything from cartoon-3d-short v2.x: captions, viral story format, funny rules, framing limits, lighting, continuous camera flow, reactions and dialogue beats, set dressing and real 3D depth, the six rules for every video, the quality gate.

History before v3: the full README, CHANGELOG and original wording of both earlier repos (shorts-studio-skill, new-video-skill) are archived in `docs/history/`. Based on mromidev/claude-animated-shorts (MIT).
