#!/usr/bin/env python3
"""Build a designed Shorts thumbnail, instead of grabbing a raw frame.

YouTube's own spec for a Shorts custom thumbnail is 2160 x 3840 (9:16), JPG or
PNG, minimum 640 px tall. A thumbnail is judged at about the size of a thumbnail,
so this crops to the subject, lifts it off the background and puts two to four
huge words where nothing else covers them.

    python3 tools/make_thumbnail.py --video videos/<slug>/<slug>.mp4 --time 3.9 \
        --text "A USED UNIFORM" --out videos/<slug>/thumbnail.jpg

    python3 tools/make_thumbnail.py --frame still.png --text "WHY?" --out t.jpg

Needs Pillow (pip install pillow); --video also needs ffmpeg on PATH.
"""
import argparse, os, shutil, subprocess, sys, tempfile

try:
    from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
except ImportError:
    sys.exit("Needs Pillow:  pip install pillow")

W, H = 2160, 3840            # YouTube's recommended Shorts thumbnail size
BRAND = (0, 168, 255)        # Taofiq Clips blue
INK = (17, 17, 17)
SIDE = 0.07                  # side margin, fraction of width
TOP_UI = 0.06                # keep text out of the very top
BOTTOM_UI = 0.18             # YouTube puts the title and channel over the bottom

FONTS = [
    "C:/Windows/Fonts/impact.ttf", "C:/Windows/Fonts/ariblk.ttf",
    "/System/Library/Fonts/Supplemental/Impact.ttf",
    "/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def find_font(user):
    for p in ([user] if user else []) + FONTS:
        if p and os.path.exists(p):
            return p
    sys.exit("No heavy font found. Pass --font with a path to a bold TTF.")


def grab(video, t):
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg not found on PATH.")
    out = os.path.join(tempfile.mkdtemp(), "f.png")
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", video,
                        "-frames:v", "1", out], capture_output=True, text=True)
    if r.returncode or not os.path.exists(out):
        sys.exit(f"Could not read a frame at {t}s\n{r.stderr.strip()}")
    return Image.open(out).convert("RGB")


def fill(img, zoom, focus):
    """Crop to 9:16 around the focus point, zoom in, scale to W x H."""
    iw, ih = img.size
    tw, th = iw, int(iw * H / W)
    if th > ih:
        th, tw = ih, int(ih * W / H)
    tw, th = int(tw / zoom), int(th / zoom)
    cx = iw / 2
    cy = min(max(ih * focus, th / 2), ih - th / 2)
    left = int(min(max(cx - tw / 2, 0), iw - tw))
    top = int(cy - th / 2)
    return img.crop((left, top, left + tw, top + th)).resize((W, H), Image.LANCZOS)


def vignette(img, strength=0.55):
    g = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(g)
    pad = int(W * 0.30)
    d.ellipse((-pad, -pad, W + pad, H + pad), fill=255)
    g = g.filter(ImageFilter.GaussianBlur(W * 0.16))
    dark = Image.new("RGB", (W, H), (0, 0, 0))
    return Image.composite(img, Image.blend(img, dark, strength), g)


def metrics(font_path, size):
    """One place that decides stroke, 3D depth and line spacing for a size.

    The offset must clear the stroke or the colour side is hidden behind black,
    and the line spacing must clear both or the slab of one line lands in the
    line above it.
    """
    sw = max(int(size * 0.13), 2)
    off = max(int(sw * 1.45), 10)
    sp = int(size * 0.06) + off
    return ImageFont.truetype(font_path, size), sw, sp, off


def fit(draw, text, font_path, maxw, maxh, start):
    """Largest size at which the text, its stroke and its 3D side fit the box."""
    size = start
    while size > 40:
        f, sw, sp, off = metrics(font_path, size)
        box = draw.multiline_textbbox((0, 0), text, font=f, spacing=sp, stroke_width=sw)
        if (box[2] - box[0]) + off <= maxw and (box[3] - box[1]) + off <= maxh:
            return f, sw, sp, off, box
        size -= 8
    f, sw, sp, off = metrics(font_path, 40)
    return f, sw, sp, off, (0, 0, 0, 0)


def wrap(text, limit=11):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if cur and len(cur) + 1 + len(w) > limit:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    return "\n".join(lines[:3])


def main():
    a = argparse.ArgumentParser()
    src = a.add_mutually_exclusive_group(required=True)
    src.add_argument("--video")
    src.add_argument("--frame")
    a.add_argument("--time", type=float, default=0.0, help="seconds into the video")
    a.add_argument("--text", required=True, help="2-4 words. Not the title again.")
    a.add_argument("--out", required=True)
    a.add_argument("--focus", type=float, default=0.42,
                   help="0 top, 1 bottom: where the subject's face sits in the frame")
    a.add_argument("--zoom", type=float, default=1.25, help="1.0 = no crop, 1.4 = tight")
    a.add_argument("--pos", choices=["top", "bottom"], default="top")
    a.add_argument("--band", action="store_true", help="solid colour bar behind the text")
    a.add_argument("--font")
    a.add_argument("--guides", action="store_true", help="also write _guides.png with safe zones")
    args = a.parse_args()

    if len(args.text.split()) > 5:
        print("  ! That is more than 5 words. Nobody reads a sentence at thumbnail size.")

    font_path = find_font(args.font)
    if args.frame and not os.path.exists(args.frame):
        sys.exit(f"No file at {args.frame}")
    if args.video and not os.path.exists(args.video):
        sys.exit(f"No file at {args.video}")
    img = grab(args.video, args.time) if args.video else Image.open(args.frame).convert("RGB")
    img = fill(img, args.zoom, args.focus)
    img = ImageEnhance.Color(img).enhance(1.18)
    img = ImageEnhance.Contrast(img).enhance(1.10)
    img = vignette(img)

    text = wrap(args.text.upper())
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    maxw = int(W * (1 - 2 * SIDE))
    maxh = int(H * 0.21)
    font, sw, sp, off, box = fit(d, text, font_path, maxw, maxh, 420)
    tw, th = box[2] - box[0], box[3] - box[1]
    x = (W - tw) / 2 - box[0]
    y = (H * TOP_UI + maxh / 2 - th / 2) if args.pos == "top" else (H * (1 - BOTTOM_UI) - th - box[1])

    if args.band:
        pad = int(th * 0.30)
        d.rectangle((0, y + box[1] - pad, W, y + box[1] + th + pad), fill=BRAND + (235,))

    # Every copy keeps the same stroke_width: PIL offsets each line of
    # multiline_text by stroke_width, so a copy drawn without one sits higher and
    # its colour leaks out above the line. The deepest slab carries the black
    # edge; the copies in front of it are stroked in the brand colour, so the 3D
    # side reads as colour rather than a black smear.
    d.multiline_text((x + off, y + off), text, font=font, fill=BRAND, align="center",
                     spacing=sp, stroke_width=sw, stroke_fill=INK)
    for i in range(off - 1, 0, -1):
        d.multiline_text((x + i, y + i), text, font=font, fill=BRAND, align="center",
                         spacing=sp, stroke_width=sw, stroke_fill=BRAND)
    d.multiline_text((x, y), text, font=font, fill=(255, 255, 255), align="center",
                     spacing=sp, stroke_width=sw, stroke_fill=INK)

    out = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")

    os.makedirs(os.path.dirname(os.path.abspath(args.out)) or ".", exist_ok=True)
    q = 92
    while True:
        out.save(args.out, quality=q, subsampling=0, optimize=True)
        if os.path.getsize(args.out) <= 2_000_000 or q <= 60:
            break
        q -= 6

    if args.guides:
        g = out.copy()
        gd = ImageDraw.Draw(g, "RGBA")
        gd.rectangle((0, 0, W, H * TOP_UI), fill=(255, 0, 0, 70))
        gd.rectangle((0, H * (1 - BOTTOM_UI), W, H), fill=(255, 0, 0, 70))
        gd.rectangle((0, 0, W * SIDE, H), fill=(255, 0, 0, 50))
        gd.rectangle((W * (1 - SIDE), 0, W, H), fill=(255, 0, 0, 50))
        gp = os.path.splitext(args.out)[0] + "_guides.png"
        g.save(gp)
        print(f"  guides      {gp}")

    small = out.resize((W // 12, H // 12), Image.LANCZOS)
    sp_path = os.path.splitext(args.out)[0] + "_small.png"
    small.save(sp_path)

    kb = os.path.getsize(args.out) / 1024
    print(f"\n  {args.out}")
    print(f"  size        {W} x {H}  (YouTube recommends 2160 x 3840 for Shorts)")
    print(f"  file        {kb:.0f} KB, quality {q}")
    print(f"  text        \"{args.text}\"  at {font.size} px  ({tw * 100 // W}% of width)")
    print(f"  preview     {sp_path}  <- open this. If you cannot read the words")
    print("              at that size, the thumbnail fails. Use fewer, bigger words.")
    if tw < W * 0.55:
        print("  ! Text is under 55% of the width. Shorten it or it will vanish in the shelf.")
    print()


if __name__ == "__main__":
    main()
