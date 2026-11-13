# toonfacts

One Claude Code skill for animated cartoon fact shorts in the Ricks Clips style: simple 2D characters in a colourful 3D world, a deadpan narrator, word-by-word captions, camera that flows between subjects. Rendered with three.js inside Remotion on your own PC, with an ElevenLabs voiceover.

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
- Claude Code (terminal or the VS Code extension) in a Remotion project
- An **ElevenLabs MCP connector**, added by you in Claude Code
- Node.js, Python 3, ffmpeg

## Install
In your Remotion project:

```
git clone https://github.com/<you>/<this-repo> .claude/skills/toonfacts
```

`SKILL.md` must sit directly inside `.claude/skills/toonfacts/`. Then say `new video`. The skill updates itself from the repo each run (`git pull`). If you used the older `cartoon-3d-short` and `new-video` skills, remove them: this skill replaces both.

## What it creates
```
video-ideas/
  _ideas.md
  <slug>/  script.md  voiceover.mp3  words.json  NOTES.md  REVIEW.md  CHANGES.md  publish.md
out/<slug>.mp4
```

## What is inside
`SKILL.md` (modes and rules), `docs/` (new, update, review, engine), `references/`, `templates/` (renderer source, audio, scripts, shot plan), `tools/review_video.sh`. See `CHANGELOG.md`.
