# Review loop (used by new video, update video and review modes)

1. Run `tools/review_video.sh work/<slug>/render/<slug>.mp4 work/<slug>/review` (a finished video: `videos/<slug>/<slug>.mp4`). It prints duration, hard cuts, loudness and makes contact sheets.
2. **Confirm the scene gate still passes:** `python3 tools/check_scene.py src/videos/<name>`. If it fails now, shots were added or changed without their assertions, and the review below cannot be trusted.
3. **Judge the hook first.** Read the script's first sentence alone, with no title and no context, and look at the first 3 seconds on the contact sheet. Run the hook block at the top of `templates/review_checklist.md`. A failing hook is a script fix, not a polish note: say so plainly in `REVIEW.md` and, in Update mode, redraft it through the hook gate (`docs/new-video.md` Phase 2 step 3).
4. **Look at every sheet** (open the images) and go through `templates/review_checklist.md` (video section). Score each item out of 10. Be strict: name what is wrong, not only what is right.
5. Anything below 8, or any FAIL line, gets fixed in the project (not papered over): set dressing, blank surfaces, caption collisions, framing, the ending beat, idle motion, camera flow, audio level. Re-render and re-run the review.
6. Write the scores, the problems found and the fixes into `videos/<slug>/source/REVIEW.md`. After two rounds, accept the result, list anything still below 8 in `source/REVIEW.md`, and finish.

