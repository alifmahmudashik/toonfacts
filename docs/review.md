# Review loop (used by new video, update video and review modes)

1. Run `tools/review_video.sh out/<slug>.mp4 video-ideas/<slug>/review`. It prints duration, hard cuts, loudness and makes contact sheets.
2. **Look at every sheet** (open the images) and go through `templates/review_checklist.md` (video section). Score each item out of 10. Be strict: name what is wrong, not only what is right.
3. Anything below 8, or any FAIL line, gets fixed in the project (not papered over): set dressing, blank surfaces, caption collisions, framing, the ending beat, idle motion, camera flow, audio level. Re-render and re-run the review.
4. Write the scores, the problems found and the fixes into `REVIEW.md`. After two rounds, accept the result, list anything still below 8 in `REVIEW.md`, and finish.

