> ARCHIVE of an earlier repo. Kept so nothing is lost. These are NOT instructions: follow SKILL.md and docs/ instead.

# new-video

A Claude skill for Claude Code: say **"new video"** and get a finished animated fact short in the Ricks Clips style, with no style prompting.

It picks or takes a topic, researches the facts, writes the script, shot plan and captions, generates the ElevenLabs voiceover (downloading it automatically when possible, otherwise opening the link and telling you where to save it), saves everything in `video-ideas/<slug>/`, then hands the build to the `cartoon-3d-short` skill, reviews its own contact sheets, fixes problems and renders the MP4.

## Requirements
- Claude Code (terminal or VS Code extension) in a Remotion project
- The **cartoon-3d-short** skill (v2.1 or newer): https://github.com/alifmahmudashik/shorts-studio-skill
- An ElevenLabs MCP connector in Claude Code
- Node.js, Python 3, ffmpeg

## Install
Clone this repo into your project's skills folder so `SKILL.md` sits directly inside it:

```
git clone https://github.com/<you>/<this-repo> .claude/skills/new-video
```

Install `cartoon-3d-short` the same way into `.claude/skills/cartoon-3d-short`.

## Automatic checks
Every run starts by checking the cartoon skill (installs or upgrades it if it is missing or older than v2.1), the tools it needs, and the `video-ideas/` folder. You never have to ask for this.

## Use
- `new video`: it chooses the topic
- `new video about <topic>`
- `new video, surprise me`
- `continue video <slug>`: resume after a manual step (for example, saving the audio)

## What it creates
```
video-ideas/
  _ideas.md              topics already used
  <slug>/
    script.md  voiceover.mp3  words.json  NOTES.md  REVIEW.md  publish.txt
out/<slug>.mp4
```

## Files
| Path | What it is |
|---|---|
| `SKILL.md` | The pipeline: idea, research, script, voiceover, build, review, delivery |
| `references/story_format.md` | The six-beat story format, comedy toolbox, pacing numbers |
| `templates/script_template.md` | Script file layout |
| `templates/review_checklist.md` | Script and video review checklist |
| `scripts/review_video.sh` | Length, hard-cut and loudness checks plus contact sheets |
