# Changelog

## v3.0: toonfacts (one skill)
Combines `cartoon-3d-short` (v2.1, the renderer and look rules) and `new-video` (the idea-to-MP4 pipeline) into a single skill with modes: New, Update, Continue, Review, Ideas, Upgrade.
- `SKILL.md` routes by what the user says; `docs/` holds the mode instructions; `docs/engine.md` is the former cartoon skill.
- New **Update** mode: classifies a change (looks only, spoken words, scenes, publish text, audio), keeps old versions, re-renders only what changed and runs a regression check.
- Automatic preflight: self-update by `git pull`, tool checks, ElevenLabs MCP detection, legacy cleanup.
- Voiceover: downloads the ElevenLabs audio automatically when possible, otherwise opens the link and writes `NEEDS_AUDIO.md`.
- Keeps everything from cartoon-3d-short v2.x: captions, viral story format, funny rules, framing limits, lighting, continuous camera flow, reactions and dialogue beats, set dressing and real 3D depth, the six rules for every video, the quality gate.

History before v3: the full README, CHANGELOG and original wording of both earlier repos (shorts-studio-skill, new-video-skill) are archived in `docs/history/`. Based on mromidev/claude-animated-shorts (MIT).
