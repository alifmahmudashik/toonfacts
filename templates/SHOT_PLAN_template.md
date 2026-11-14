# Shot plan template (copy for every new video)

Fill in one row per shot BEFORE building `story.ts`. A shot that cannot fill every column is not ready.

| # | Time | Beat / voice line | Camera flow (stops, move names, fly-through?) | Depth layers: foreground / mid / background | Props (count, names) and background characters | Light preset | Caption height (% of frame) | Reactions (0-3 f before word) and idle motion | Surfaces check (no blank slab over 8 %) |
|---|------|-------------------|-----------------------------------------------|---------------------------------------------|-----------------------------------------------|--------------|-----------------------------|---------------------------------------------------------------|------------------------------------------|
| 1 |      |                   |                                               |                                             |                                               |              |                             |                                                               |                                          |

## Physical truth, per shot (fill this in too; it becomes the `assertScene` call)

A shot is a claim about the world. Write the claim down here, then make the code
assert it. Leave a cell empty only when the shot genuinely has none of that kind.

| # | Must be READ (sign, paper, label) | Who LOOKS at what (character -> target) | What is AIMED at what (gun, arm, telescope -> target) | What is HELD, in which hand | Key light direction, and what casts a shadow where |
|---|-----------------------------------|------------------------------------------|--------------------------------------------------------|------------------------------|-----------------------------------------------------|
| 1 |                                   |                                          |                                                        |                              |                                                     |

- Anything in the READ column must be whole, inside the safe area and at least 10 % of frame height. If the shot is too tight for that, the shot is too tight.
- Every look the narration mentions goes in the LOOKS column. If the voice says they stared at it, they face it.
- Text printed on a prop is fitted with `fitText` / `drawFittedText`, never typed at a fixed size.
- Held props are children of the hand and sit nearer the camera than the torso.

## Whole-video checks (all must be yes)
- `assertScene` passes for every shot and every flow stop (safe area, read, looks, aim, held)?
- Every shot has 3 depth layers and solid 3D props? (flat planes only for paper, posters, distant skylines)
- 12+ props per place, 6+ in every wide, background characters in every interior and street?
- No flat or unlit surface over 8 % of the frame, empty floor under 25 % of a wide?
- At least two fly-through or pass-by camera moments, and the hero object is shown from changing angles?
- Captions never cover a face, key prop or bubble (caption height set per shot)?
- No character frozen for more than about 0.5 s (blinks, sways, idle loops, prop wobbles)?
- Last shot is a held payoff or laugh beat, and any named destination or sign is fully readable?
- At most 2 hard cuts per 60 s, each subject change inside a place is a flow?
- One optional dialogue beat at most 2 per video, narrator voice only?
