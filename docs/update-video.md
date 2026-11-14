# Mode: update an existing video

Use for "update video <slug>", "fix the video", "change the ending of <slug>", "make it funnier", "redo the lighting", or "apply the new skill rules to <slug>". Preflight (see `SKILL.md`) has already run.

## 1. Find the video and the request
- `<slug>` is the folder name in `videos/`. If none is named, use the most recently changed folder that has a `<slug>.mp4`.
- The request is plain words from the user, or "fix what REVIEW.md lists". If the request is only "update" or "apply the latest rules", the request is: bring the video up to the current rules in `docs/engine.md` ("Rules for every video"), re-run the hook gate (`docs/new-video.md` Phase 2 step 3) against the current first line, and fix everything `docs/review.md` finds.
- Read `videos/<slug>/source/script.md`, `NOTES.md`, `REVIEW.md` and `CHANGES.md` (if present) and `publish.md`, and the current render's contact sheets (`tools/review_video.sh`) so the starting point is known.

## 2. Classify the change (this decides what is redone)
| Change | Redo |
|---|---|
| Looks only: sets, props, lighting, camera, captions, faces, ending beat, idle motion, framing | Project code only. No new audio. |
| Words of the script (any spoken sentence) | Script, one new voice take, new `words.json`, re-time shots, then the affected shots |
| Weak hook (the first line fails the review checklist's hook block) | Hook gate in `docs/new-video.md` Phase 2 step 3, then the opening line of the script, one new voice take, and shot 1 if the picture no longer matches the line |
| New or removed scenes | Shot plan, `story.ts`, affected shots; new audio only if spoken words change |
| Title, description, hashtags | `publish.md` only: redo the research steps of `docs/new-video.md` Phase 2b that the change affects |
| Thumbnail only (weak cover, unreadable words, caption in the frame) | `tools/make_thumbnail.py` with a new frame time, cover text or `--focus`/`--zoom`; update the Thumbnail section of `publish.md`. No render, no new audio |
| Music or sound effects | Audio mix only |
State the class in `source/CHANGES.md` before starting. If the spoken words or the story change, the title, description and tags in `publish.md` are re-checked at the end.

## 3. Protect the old version
- Copy the current `videos/<slug>/<slug>.mp4` to `videos/<slug>/versions/<slug>_v<N>.mp4` (N = the version being replaced, starting at 1). Never overwrite it.
- If the voiceover changes, keep the old one as `source/voiceover_v<N>.mp3`. A new voice take spends credits: do it once, only when the spoken words changed (see `docs/new-video.md`, Phase 3, for tools, download and the manual fallback).

## 4. Apply the change
- Edit only what the change needs. Do not touch unrelated shots; the rest of the video stays exactly as it was.
- Follow `docs/engine.md` for how things are built, and "Rules for every video" for anything you add or touch.
- Render a 15 s test of the changed shots first, then the full video to `work/<slug>/render/<slug>_v<N+1>.mp4` and, once it passes review, copy it to `videos/<slug>/<slug>.mp4` as the current version. Rebuild `thumbnail.jpg` with `tools/make_thumbnail.py` if the picture changed (never re-extract a raw frame), and check it at small size.

## 5. Review
- Run `docs/review.md` on the full video (up to 2 rounds).
- Regression check: compare the contact sheets of the shots you did not touch with the old version. They must look the same. If one changed, find out why and fix it.

## 6. Log and report
- Append to `videos/<slug>/source/CHANGES.md`: date, the request, the change class, files touched, version numbers, review scores.
- Reply with: what changed, the new file path, anything still below 8, and one next step. Keep it short.
