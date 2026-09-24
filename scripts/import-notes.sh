#!/usr/bin/env bash
#
# Turn a handwritten PDF (iPad export, scan, whatever) into a log post.
#
# Each page is rendered, then recoloured: how dark a pixel is becomes how
# opaque it is, painted in the site's ink colour. The paper falls away and the
# handwriting sits directly on the page background, so it matches the rest of
# the site instead of being a white rectangle dropped into it.
#
# Usage:
#   scripts/import-notes.sh <file.pdf> <post number> [title]
#
# Example:
#   scripts/import-notes.sh ~/Downloads/VAEs.pdf 15 "Notes on VAEs"
#
# Writes assets/notes/<slug>/ and _posts/<date>-<slug>.md, then tells you what
# to fill in. Nothing is committed for you.

set -euo pipefail

INK="0xED,0xED,0xE6"   # --text
DPI=150                # render resolution before downscaling
WIDTH=1400             # final page width in px
QUALITY=82

die() { printf 'error: %s\n' "$1" >&2; exit 1; }

[ $# -ge 2 ] || die "usage: scripts/import-notes.sh <file.pdf> <post number> [title]"

PDF=$1
NUMBER=$2
TITLE=${3:-}

[ -f "$PDF" ] || die "no such file: $PDF"
[[ $NUMBER =~ ^[0-9]+$ ]] || die "post number must be a number, got: $NUMBER"
command -v pdftoppm >/dev/null || die "pdftoppm not found — brew install poppler"
command -v cwebp    >/dev/null || die "cwebp not found — brew install webp"
python3 -c 'import PIL, numpy' 2>/dev/null || die "python3 needs pillow and numpy — pip3 install pillow numpy"

REPO=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$REPO"

# Derive the slug from the title when given, otherwise from the filename.
BASIS=${TITLE:-$(basename "$PDF" .pdf)}
SLUG=$(printf '%s' "$BASIS" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E -e "s/'//g" -e 's/[^a-z0-9]+/-/g' -e 's/^-+//' -e 's/-+$//')
[ -n "$SLUG" ] || die "could not build a slug from: $BASIS"

DATE=$(date +%Y-%m-%d)
OUTDIR="assets/notes/$SLUG"
POST="_posts/$DATE-$SLUG.md"

[ -e "$POST" ] && die "post already exists: $POST"

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

printf 'rendering %s at %s dpi...\n' "$(basename "$PDF")" "$DPI"
pdftoppm -r "$DPI" -png "$PDF" "$TMP/page"

mkdir -p "$OUTDIR"
rm -f "$OUTDIR"/page-*.webp

for src in "$TMP"/page-*.png; do
  n=$(basename "$src" .png); n=${n#page-}
  python3 - "$src" "$TMP/$n.png" "$INK" "$WIDTH" <<'PY'
import sys
from PIL import Image
import numpy as np

src, dst, ink, width = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
r, g, b = (int(c, 16) for c in ink.split(','))

a = np.asarray(Image.open(src).convert('RGB'), dtype=np.float32) / 255.0
lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]

# Darkness becomes opacity. The small offset drops paper texture and JPEG-ish
# noise to fully transparent; the divisor keeps faint ruled lines visible.
alpha = np.clip((1.0 - lum - 0.04) / 0.80, 0.0, 1.0)

out = np.zeros(a.shape[:2] + (4,), dtype=np.uint8)
out[..., 0], out[..., 1], out[..., 2] = r, g, b
out[..., 3] = (alpha * 255).astype(np.uint8)

im = Image.fromarray(out, 'RGBA')
im.thumbnail((width, width * 8), Image.LANCZOS)
im.save(dst)
PY
  cwebp -quiet -q "$QUALITY" -alpha_q 90 "$TMP/$n.png" -o "$OUTDIR/page-$n.webp"
  printf '  page %s -> %s\n' "$n" "$OUTDIR/page-$n.webp"
done

# Keep the searchable, printable original alongside the pages.
cp "$PDF" "$OUTDIR/source.pdf"

PAGES=$(ls "$OUTDIR"/page-*.webp | wc -l | tr -d ' ')
PADDED=$(printf '%03d' "$NUMBER")

{
  printf -- '---\n'
  printf 'title: "%s"\n' "${TITLE:-$BASIS}"
  printf 'number: %s\n' "$NUMBER"
  printf 'date: %s\n' "$DATE"
  printf 'tag: notes\n'
  # Word count would read these image-only posts as "1 min"; a page is about a minute.
  printf 'minutes: %s\n' "$PAGES"
  printf -- '---\n\n'
  printf 'TODO: a line or two of context before the pages.\n\n'
  for f in "$OUTDIR"/page-*.webp; do
    n=$(basename "$f" .webp); n=${n#page-}
    printf '![Handwritten notes, page %s](/%s){: .note-page loading="lazy"}\n\n' "$((10#$n))" "$f"
  done
  printf '[source pdf](/%s/source.pdf)\n' "$OUTDIR"
} > "$POST"

printf '\ndone — %s page(s), post #%s\n' "$PAGES" "$PADDED"
printf '  pages: %s/\n' "$OUTDIR"
printf '  post:  %s\n' "$POST"
printf '\nnext: replace the TODO line, then bundle exec jekyll serve to check it.\n'
