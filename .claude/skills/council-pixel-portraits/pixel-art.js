/* =====================================================================
   Council Pixel Portraits — pixel-art engine
   ---------------------------------------------------------------------
   Ported from the Qoyod Growth-Agent dashboard technique:
   a palette (char -> hex) + a grid (rows of chars) + a generator that
   turns each opaque char into a 1x1 <rect> inside an SVG.

   This file adds a TEMPLATE layer on top: reusable 14x14 face archetypes
   with placeholder chars (X=hair, S=skin, C=shirt/clothing, B=beard,
   K=cap) that `buildPortrait` fills in per-person. That lets one grid
   describe dozens of recognisable faces just by swapping colours.

   Everything is exposed on window.PIXEL so plain <script> includes work
   over file:// (no build step, no server).
   ===================================================================== */
(function () {
  // --- Palette: single char -> hex. '.' is transparent. -----------------
  const PALETTE = {
    '.': null,
    // skin tones (light -> deep)
    's': '#f7d2b0', 't': '#e7b48c', 'u': '#cf9a68', 'v': '#a56a3e', 'w': '#7c4a29',
    // hair / facial hair
    'k': '#141414', // black
    'n': '#2f2013', // dark brown
    'm': '#6d4726', // brown
    'y': '#caa03f', // blonde
    'g': '#9aa0a6', // grey
    'z': '#e6e8eb', // white / silver
    // face features
    'e': '#141414', // eye / dark frame
    'M': '#b3603f', // mouth
    'l': '#d1567a', // lipstick
    'L': '#dbeafe', // glasses lens (light)
    // clothing / brand colours
    'B': '#141414', // black turtleneck / tee
    'H': '#9aa0a6', // grey tee
    'N': '#1e2a44', // navy suit
    'U': '#2563eb', // blue
    'R': '#dc2626', // red
    'J': '#4a2f1a', // leather (brown-black)
    'P': '#7c3aed', // purple
    'T': '#0d9488', // teal
    'O': '#ea580c', // orange
    'G': '#16a34a', // green
    'Y': '#eab308', // gold / yellow
    'C': '#06b6d4', // cyan
    'Q': '#db2777', // rose / pink
    'F': '#f1f3f5', // white shirt
    'D': '#475569', // slate / charcoal
  };

  /* --- Face templates (14x14). Placeholder chars get filled by
     buildPortrait; literals (e M l L .) render as-is. --------------------
       X = hair      S = skin       C = shirt/clothing
       B = beard     K = cap                                              */
  const TEMPLATES = {
    maleShort: [
      '..............', '....XXXXXX....', '...XXXXXXXX...', '..XXXXXXXXXX..',
      '..XSSSSSSSSX..', '..XSeSSSSeSX..', '..XSSSSSSSSX..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleShortGlasses: [
      '..............', '....XXXXXX....', '...XXXXXXXX...', '..XXXXXXXXXX..',
      '..XSSSSSSSSX..', '..XLLeSSeLLX..', '..XSSSSSSSSX..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleShortBeard: [
      '..............', '....XXXXXX....', '...XXXXXXXX...', '..XXXXXXXXXX..',
      '..XSSSSSSSSX..', '..XSeSSSSeSX..', '..XSSSSSSSSX..', '..BBBBBBBBBB..',
      '..BBBBMMBBBB..', '...BBBBBBBB...', '....BBBBBB....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleShortGlassesBeard: [
      '..............', '....XXXXXX....', '...XXXXXXXX...', '..XXXXXXXXXX..',
      '..XSSSSSSSSX..', '..XLLeSSeLLX..', '..XSSSSSSSSX..', '..BBBBBBBBBB..',
      '..BBBBMMBBBB..', '...BBBBBBBB...', '....BBBBBB....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleReceding: [
      '..............', '....XXXXXX....', '...XSSSSSSX...', '..XSSSSSSSSX..',
      '..XSSSSSSSSX..', '..XSeSSSSeSX..', '..XSSSSSSSSX..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleRecedingGlasses: [
      '..............', '....XXXXXX....', '...XSSSSSSX...', '..XSSSSSSSSX..',
      '..XSSSSSSSSX..', '..XLLeSSeLLX..', '..XSSSSSSSSX..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleRecedingGlassesBeard: [ // Steve Jobs archetype
      '..............', '....XXXXXX....', '...XSSSSSSX...', '..XSSSSSSSSX..',
      '..XSSSSSSSSX..', '..XLLeSSeLLX..', '..XSSSSSSSSX..', '..BBBBBBBBBB..',
      '..BBBBMMBBBB..', '...BBBBBBBB...', '....BBBBBB....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleBald: [
      '..............', '..............', '....SSSSSS....', '...SSSSSSSS...',
      '..SSSSSSSSSS..', '..SSeSSSSeSS..', '..SSSSSSSSSS..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleBaldGlasses: [
      '..............', '..............', '....SSSSSS....', '...SSSSSSSS...',
      '..SSSSSSSSSS..', '..SLLeSSeLLS..', '..SSSSSSSSSS..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleBaldBeard: [
      '..............', '..............', '....SSSSSS....', '...SSSSSSSS...',
      '..SSSSSSSSSS..', '..SSeSSSSeSS..', '..SSSSSSSSSS..', '..BBBBBBBBBB..',
      '..BBBBMMBBBB..', '...BBBBBBBB...', '....BBBBBB....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    maleSunglasses: [
      '..............', '....XXXXXX....', '...XXXXXXXX...', '..XXXXXXXXXX..',
      '..XSSSSSSSSX..', '..XeeeSSeeeX..', '..XSSSSSSSSX..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    femaleLong: [
      '..............', '....XXXXXX....', '...XXXXXXXX...', '..XXXXXXXXXX..',
      '..XSSSSSSSSX..', '..XSeSSSSeSX..', '..XSSSSSSSSX..', '..XSSSSSSSSX..',
      '..XSSSllSSSX..', '..XSSSSSSSSX..', '...XSSSSSSX...', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    femaleLongGlasses: [
      '..............', '....XXXXXX....', '...XXXXXXXX...', '..XXXXXXXXXX..',
      '..XSSSSSSSSX..', '..XLLeSSeLLX..', '..XSSSSSSSSX..', '..XSSSSSSSSX..',
      '..XSSSllSSSX..', '..XSSSSSSSSX..', '...XSSSSSSX...', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
    cap: [ // Sam Walton archetype (ball cap + glasses)
      '..............', '...KKKKKKKK...', '..KKKKKKKKKK..', '..KKKKKKKKKK..',
      '..XSSSSSSSSX..', '..XLLeSSeLLX..', '..XSSSSSSSSX..', '..SSSSSSSSSS..',
      '..SSSSMMSSSS..', '...SSSSSSSS...', '....SSSSSS....', '...CCCCCCCC...',
      '..CCCCCCCCCC..', '.CCCCCCCCCCCC.',
    ],
  };

  // Fill a template's placeholders with a person's colours -> final grid.
  function buildPortrait(spec) {
    const map = {
      X: spec.hair || 'k',
      S: spec.skin || 's',
      C: spec.shirt || 'U',
      B: spec.beard || spec.hair || 'k',
      K: spec.cap || 'U',
    };
    const tpl = TEMPLATES[spec.template];
    if (!tpl) throw new Error('Unknown template: ' + spec.template);
    return tpl.map((row) =>
      [...row].map((ch) => (map[ch] !== undefined ? map[ch] : ch)).join('')
    );
  }

  // Render a grid (rows of palette chars) to an inline SVG string.
  function renderSVG(rows, scale = 6) {
    const h = rows.length, w = rows[0].length;
    let rects = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const c = PALETTE[rows[y][x]];
        if (c) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`;
      }
    }
    return `<svg viewBox="0 0 ${w} ${h}" width="${w * scale}" height="${h * scale}" ` +
      `shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
  }

  // Convenience: spec -> SVG in one call.
  function portraitSVG(spec, scale = 6) {
    return renderSVG(buildPortrait(spec), scale);
  }

  window.PIXEL = { PALETTE, TEMPLATES, buildPortrait, renderSVG, portraitSVG };
})();
