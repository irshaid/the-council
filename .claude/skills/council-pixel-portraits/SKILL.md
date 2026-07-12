---
name: council-pixel-portraits
description: Draw recognisable 14x14 pixel-art character portraits as pure inline SVG (no image files). Use when you need avatars/characters for a set of people or personas — e.g. "The Council" advisors/mentors, a team page, or any agent-persona lineup. Ships a palette, reusable face templates, a generator, and 50 ready advisor portraits.
---

# Council Pixel Portraits

Generate distinct pixel-art portraits for a roster of people using nothing but
a colour palette + character grids + an SVG generator. Ported from the Qoyod
Growth-Agent dashboard technique and generalised so one small grid can describe
dozens of recognisable faces.

## Files

- `pixel-art.js` — the engine: `PALETTE`, `TEMPLATES`, `buildPortrait`,
  `renderSVG`, `portraitSVG`. Exposed on `window.PIXEL` (plain script, works
  over `file://` and in Node with `global.window = {}`).
- `portraits.js` — the 50 advisors (`window.MENTORS`) + `DOMAIN_COLORS`.
- `gallery.html` — self-contained viewer (theme toggle + domain filters).

## How it works (3 layers)

1. **Palette** — a char → hex map. `.` is transparent. Grouped into skin tones
   (`s t u v w`), hair (`k n m y g z`), features (`e` eye, `M` mouth, `l`
   lipstick, `L` lens), and clothing/brand colours (`B N U R J P T O G Y C Q F H D`).
2. **Templates** — 14×14 face archetypes written as row strings with
   *placeholder* chars: `X`=hair, `S`=skin, `C`=shirt, `B`=beard, `K`=cap.
   Archetypes cover short/receding/bald/female-long hair, ± glasses, ± beard,
   sunglasses, and a ball-cap. Literals (`e M l L`) render as-is.
3. **Generator** — `buildPortrait(spec)` fills the placeholders with the
   person's colours; `renderSVG(rows)` turns every opaque char into a 1×1
   `<rect>` inside a `shape-rendering="crispEdges"` SVG.

## Add a new person

```js
{ name: 'Ada Lovelace', domain: 'Founders',
  template: 'femaleLong', hair: 'n', skin: 's', shirt: 'P' }
```

Pick the closest `template`, then set `hair` / `skin` / `shirt` (and optional
`beard` / `cap`). Signature traits are what make a 14×14 face read as a real
person: give each a distinct combo — bald vs. hair colour, glasses on/off,
beard, sunglasses, a brand-coloured shirt.

## Add a new face shape

Add a 14×14 entry to `TEMPLATES` in `pixel-art.js` using the placeholder chars.
Keep every row exactly 14 chars and the grid 14 rows so portraits line up.

## Render anywhere

```js
const svg = window.PIXEL.portraitSVG(mentor, 8); // scale 8 → 112×112px
el.innerHTML = svg;
```

## Preview

Open `gallery.html` (over a local server if `file://` is blocked:
`python3 -m http.server` in this folder).
