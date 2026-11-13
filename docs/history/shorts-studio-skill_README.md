> ARCHIVE of an earlier repo. Kept so nothing is lost. These are NOT instructions: follow SKILL.md and docs/ instead.

# Claude Animated Shorts (v2)

A Claude skill for making **viral, funny, 35-70 s vertical animated story shorts**: 2D characters in a colourful 3D world, with ink outlines, painted sets, lens blur, a varied always-moving camera, **word-by-word subtitles**, synthesized sound effects and music. Everything is rendered with three.js inside Remotion on your own PC, with no AI video generator.

Based on [mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) (MIT), with the v2 additions listed in `CHANGELOG.md`.

## What's new in v2
- Word-by-word **captions** (`templates/bridge/Captions.tsx`)
- The six-beat **viral story format** and a **comedy engine**
- **Framing rules** (safe area, max zoom) with an automatic check (`templates/bridge/framing.ts`)
- **Continuous camera flow** (`templates/bridge/flow.ts`): the camera travels from the tower to the crowd to one face with no cut, like the reference channel
- **Reaction faces and optional dialogue beats** (narrator-read lines, faces sell the joke, no lip-sync)
- **Lighting** presets and rules for interiors, night and sunrise, plus shadow rules
- **Camera variety** (orbit, pull-back, parallax, rack focus, cutaways) and hard cuts only for gags
- **Real 3D depth and set dressing** minimums (layers, solid props, background life, no blank surfaces), caption-collision and ending rules
- A **quality gate** and a 15 s test clip before every full render

## What's inside
| Path | What it is |
|---|---|
| `SKILL.md` | The skill: pipeline, rules, look values, viral format, funny rules, subtitles, framing, lighting, camera |
| `templates/bridge/` | The source of the bridge short, plus `Captions.tsx`, `framing.ts` and `flow.ts` |
| `templates/audio/` | Synthesized sound: SFX, music, the mix with ducking and loudness |
| `templates/scripts/` | Stills, side-by-side sheets, shot merge, frame-by-frame QA, framing and flow self-tests |
| `templates/SHOT_PLAN_template.md` | Per-shot planning table and whole-video checklist, used for every new short |
| `templates/SCRIPT_viral_example.md` | A worked viral + funny script with gags, camera and light plan |
| `references/` | Style bible, measured reports and reference frames (for style study only) |

## Companion skill
The one-command pipeline (idea, research, script, ElevenLabs voiceover, build, review) lives in its own repo: https://github.com/alifmahmudashik/new-video-skill . It uses this skill to build the video.

## Install
You need Node.js, Python 3, ffmpeg and [Remotion](https://www.remotion.dev/) with `@remotion/three`.

**Claude Code / VS Code (Claude Code extension)**
1. Clone or download this repo to `~/.claude/skills/cartoon-3d-short/` (all projects), or to `<your-project>/.claude/skills/cartoon-3d-short/` (one project). `SKILL.md` must sit directly inside that folder.
2. Open your Remotion project in VS Code and start a new Claude Code session so it picks up the skill.
3. Say: *"Use the cartoon-3d-short skill and make a short about …"*. For a first try, ask for the 15 s test clip.

**Claude chat (claude.ai)**
1. Zip a folder named `cartoon-3d-short` that contains `SKILL.md`, `templates/` and `references/STYLE_BIBLE.md` (the release zip `cartoon-3d-short.zip` already has this layout).
2. In Claude, go to Settings → Capabilities → Skills → Upload skill, and upload the zip.
3. In chat, ask for a script, shot plan and captions. Rendering needs Claude Code on your PC, because it runs Remotion locally.

## Notes
- Set `REMOTION_TMP` to a folder on a big drive. Every Remotion bundle copies `public/` (~1.3 GB) into the temp folder.
- Story, characters and voice should always be your own. Use the references for the look, not the content.
- YouTube does not pay for mass-produced or reused content: pick original stories, get the facts right, and give your hero your own look.

## License
The code and docs are MIT (see `LICENSE`). The reference frames are included for style study only.
