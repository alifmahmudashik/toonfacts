# Changelog

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
