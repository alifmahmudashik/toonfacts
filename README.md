# toonfacts

One Claude Code skill for animated cartoon fact shorts in the Ricks Clips style: simple 2D characters in a colourful 3D world, an expressive narrator, word-by-word captions, camera that flows between subjects. Rendered with three.js inside Remotion on your own PC, with an ElevenLabs voiceover.

Based on [mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) (MIT).

## Say what you want
| You say | What happens |
|---|---|
| `new video` / `new video about <topic>` / `surprise me` | Picks the topic, researches it, writes the script, shot plan and captions, creates the ElevenLabs voiceover, builds the video, reviews its own frames, fixes problems, renders the MP4 |
| `update video <slug>` + what to change | Redoes only what changed (new audio only if the spoken words change), keeps the old version, re-renders, checks nothing else broke |
| `continue video <slug>` | Resumes after a manual step, for example saving the audio |
| `review video <slug>` | Contact sheets and checks, scored against the rules, with fixes |
| `video ideas` | Scores 10 topic candidates and shows the best 5 |

## Requirements
Install these yourself first. Claude cannot install them for you without admin rights on some PCs.

| Need | Why | Check |
|---|---|---|
| [Claude Code](https://claude.com/claude-code) (terminal or VS Code extension) | Runs the skill | `claude --version` |
| [Node.js](https://nodejs.org) 18 or newer (LTS) and npm | Remotion, three.js | `node -v` |
| [Git](https://git-scm.com) | Installs and updates the skill | `git --version` |
| [Python 3](https://python.org) | Helper scripts (`numpy`, `scipy`, `pillow`) | `python --version` |
| [ffmpeg](https://ffmpeg.org) (includes `ffprobe`), on PATH | Audio, video review | `ffmpeg -version` |
| [Google Chrome](https://google.com/chrome) | Remotion renders with it | opens normally |
| An **ElevenLabs MCP connector**, added by you in Claude Code | Voiceover | `/mcp` in Claude Code lists it |
| About 5 GB free disk | Each render makes a temp bundle of about 1.3 GB | |

Windows tip: `winget install OpenJS.NodeJS.LTS Git.Git Python.Python.3.12 Gyan.FFmpeg Google.Chrome`, then close and reopen the terminal.

## Set up on a new PC (one paste)
1. Install the requirements above and add the ElevenLabs MCP in Claude Code.
2. Create or open an empty folder for your videos, open a terminal there, run `claude`.
3. Paste this whole block:

```text
Set up this folder for the toonfacts skill so that "new video" works. Do every step, fix problems yourself, and report what you did at the end.

1. Check tools: node -v, npm -v, git --version, python --version (or python3), ffmpeg -version, ffprobe -version, and that Google Chrome is installed. If any is missing, tell me exactly what to install and stop; do not guess.

2. Remotion project: if this folder has no package.json, create a Remotion project here with the blank TypeScript template (npx create-video@latest, choose blank, TypeScript, no Tailwind, no skills prompt) or equivalent files, so src/index.ts and src/Root.tsx exist. If it already has a Remotion project, reuse it.

3. Install packages with npm, all Remotion packages on the exact same version:
   remotion @remotion/cli @remotion/three @remotion/renderer @remotion/bundler react react-dom three @types/three @react-three/fiber @react-three/postprocessing postprocessing
   Make sure @react-three/fiber and three are versions compatible with the installed React. Then run npx tsc --noEmit or npx remotion versions and fix anything that fails.

4. Python packages: pip install numpy scipy pillow (use --break-system-packages only if pip refuses on Linux). Verify with python -c "import numpy, scipy, PIL".

5. Install the skill: git clone https://github.com/alifmahmudashik/toonfacts .claude/skills/toonfacts . Confirm .claude/skills/toonfacts/SKILL.md exists directly inside that folder. Remove any old skills named cartoon-3d-short, shorts-studio-skill or new-video from .claude/skills and ~/.claude/skills, because toonfacts replaces them (tell me which you removed).

6. Project files: copy .claude/skills/toonfacts/templates/scripts/ to ./scripts/ if missing. Create video-ideas/ and out/. Add out/, node_modules/ and video-ideas/*/voiceover.mp3 to .gitignore if the folder is a git repo.

7. Chrome path: open scripts/bridge-stills.mjs. It hardcodes browserExecutable as C:/Program Files/Google/Chrome/Application/chrome.exe. Find where Chrome really is on this PC (Windows, macOS or Linux) and change the path to match, keeping chromiumOptions { gl: "angle" }.

8. Temp folder: Remotion bundles are about 1.3 GB each and never auto-deleted. Pick a drive with 5 GB or more free, create a REMOTION_TMP folder there, set the REMOTION_TMP environment variable permanently (setx on Windows, shell profile on macOS/Linux) and for this session, and tell me the path.

9. 3D asset kit: the renderer loads Kenney CC0 .glb models from public/bridge/kenney/<name>.glb (names listed in KENNEY in .claude/skills/toonfacts/templates/bridge/world.ts: trees, bushes, flowers, grass, lantern, cart, stalls, banners, windmill, canoe and similar). They are not in the skill repo. Create public/bridge/kenney/. If I have an older project with that folder, ask me for its path and copy it. Otherwise download the free Kenney packs (kenney.nl, CC0, for example Nature Kit and Fantasy Town Kit), copy the needed .glb files there under those exact names, and list any name you could not find. Missing files do not crash the render (they are skipped), but scenes will have fewer props.

10. Sanity checks: run ffmpeg -version; python -c "import numpy, scipy, PIL"; npx remotion compositions src/index.ts; render one small test still with npx remotion still to out/_setup_test.png and show me that it opened without errors; then delete the test file.

11. ElevenLabs: check that an ElevenLabs MCP connector with a speech tool (creative_generate_speech) is available in this session. If not, tell me to add it in Claude Code (/mcp) and restart. Do not generate any audio now.

12. Finish with a short report: versions installed, paths set (skill, REMOTION_TMP, Chrome), anything missing, and the exact next line for me to type: new video about <topic>.
```

4. When it finishes, restart Claude Code once (so the skill and MCP load), then say `new video`.

### Manual alternative
In an existing Remotion project:

```
npm i three @types/three @remotion/three @remotion/renderer @remotion/bundler @react-three/fiber @react-three/postprocessing postprocessing
pip install numpy scipy pillow
git clone https://github.com/alifmahmudashik/toonfacts .claude/skills/toonfacts
```

`SKILL.md` must sit directly inside `.claude/skills/toonfacts/`. Then say `new video`. The skill updates itself from the repo each run (`git pull`). Setting it up for every project: clone into `~/.claude/skills/toonfacts` instead. If you used the older `cartoon-3d-short` and `new-video` skills, remove them: this skill replaces both.

## Moving to another PC later
Your work is the `video-ideas/` folder (scripts, voiceovers, notes) and `public/bridge/kenney/`. Copy those, then run the one-paste setup above. Everything else is reinstalled.

## Troubleshooting
- Skill not found: `SKILL.md` is not directly in `.claude/skills/toonfacts/`. Restart Claude Code.
- Render shows a blank or black frame: wrong Chrome path in `scripts/bridge-stills.mjs`, or Chrome missing.
- Disk fills up: delete old folders in your `REMOTION_TMP` path.
- No voiceover: the ElevenLabs MCP is not connected (`/mcp`). The skill will then give you the audio URL and ask you to save the file as `voiceover.mp3`, then say `continue video <slug>`.

## What it creates
```
video-ideas/
  _ideas.md
  <slug>/  script.md  voiceover.mp3  words.json  NOTES.md  REVIEW.md  CHANGES.md  publish.md
out/<slug>.mp4
```

## What is inside
`SKILL.md` (modes and rules), `docs/` (new, update, review, engine), `references/`, `templates/` (renderer source, audio, scripts, shot plan), `tools/review_video.sh`. See `CHANGELOG.md`.
