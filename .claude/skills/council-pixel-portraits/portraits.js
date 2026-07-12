/* =====================================================================
   Council Pixel Portraits — the 50 advisors
   ---------------------------------------------------------------------
   One entry per advisor. Each picks a face TEMPLATE (see pixel-art.js)
   and fills it with signature colours:
     hair  : k black · n dk-brown · m brown · y blonde · g grey · z white
     skin  : s light · t medium · u tan · v brown · w deep
     shirt : brand / signature colour (B black, N navy, U blue, R red,
             J leather, P purple, T teal, O orange, G green, Y gold,
             C cyan, Q rose, F white, H grey, D slate)
     beard : (optional) overrides beard colour
     cap   : (optional) cap colour for the `cap` template
   Signature traits are noted per person so they read as themselves at
   14x14: Jobs' round glasses + black turtleneck, Bezos bald, Musk black
   tee, Zuckerberg grey tee, Gates big glasses, Phil Knight sunglasses,
   Sam Walton's ball cap, etc.
   ===================================================================== */
(function () {
  const MENTORS = [
    // --- Strategy & Capital -------------------------------------------
    { name: 'Jeff Bezos',     domain: 'Strategy & Capital', template: 'maleBald',                skin: 's', shirt: 'N' },
    { name: 'Charlie Munger', domain: 'Strategy & Capital', template: 'maleRecedingGlasses',     hair: 'z', skin: 's', shirt: 'N' },
    { name: 'Warren Buffett', domain: 'Strategy & Capital', template: 'maleRecedingGlasses',     hair: 'z', skin: 's', shirt: 'N' },
    { name: 'Peter Thiel',    domain: 'Strategy & Capital', template: 'maleShort',               hair: 'm', skin: 's', shirt: 'D' },
    { name: 'Ray Dalio',      domain: 'Strategy & Capital', template: 'maleShort',               hair: 'z', skin: 's', shirt: 'U' },
    { name: 'Larry Fink',     domain: 'Strategy & Capital', template: 'maleRecedingGlasses',     hair: 'g', skin: 's', shirt: 'N' },
    { name: 'Jamie Dimon',    domain: 'Strategy & Capital', template: 'maleShort',               hair: 'g', skin: 's', shirt: 'N' },
    { name: 'Lou Gerstner',   domain: 'Strategy & Capital', template: 'maleRecedingGlasses',     hair: 'g', skin: 's', shirt: 'N' },

    // --- Founders ------------------------------------------------------
    { name: 'Naval Ravikant',  domain: 'Founders', template: 'maleBaldBeard',  skin: 'u', shirt: 'B', beard: 'k' },
    { name: 'Paul Graham',     domain: 'Founders', template: 'maleShort',      hair: 'g', skin: 's', shirt: 'H' },
    { name: 'Reid Hoffman',    domain: 'Founders', template: 'maleShort',      hair: 'n', skin: 's', shirt: 'U' },
    { name: 'Sara Blakely',    domain: 'Founders', template: 'femaleLong',     hair: 'y', skin: 's', shirt: 'R' },
    { name: 'Melanie Perkins', domain: 'Founders', template: 'femaleLong',     hair: 'n', skin: 's', shirt: 'T' },

    // --- Product & Design ---------------------------------------------
    { name: 'Steve Jobs',        domain: 'Product & Design', template: 'maleRecedingGlassesBeard', hair: 'g', skin: 's', shirt: 'B', beard: 'g' },
    { name: 'Brian Chesky',      domain: 'Product & Design', template: 'maleShort',                hair: 'k', skin: 's', shirt: 'H' },
    { name: 'Stewart Butterfield', domain: 'Product & Design', template: 'maleShortGlassesBeard',  hair: 'm', skin: 's', shirt: 'P' },
    { name: 'Tobi Lütke',        domain: 'Product & Design', template: 'maleShortGlassesBeard',    hair: 'm', skin: 's', shirt: 'G' },

    // --- AI & Deep Tech ------------------------------------------------
    { name: 'Demis Hassabis', domain: 'AI & Deep Tech', template: 'maleShort', hair: 'k', skin: 's', shirt: 'U' },
    { name: 'Dario Amodei',   domain: 'AI & Deep Tech', template: 'maleShort', hair: 'n', skin: 's', shirt: 'O' },
    { name: 'Sam Altman',     domain: 'AI & Deep Tech', template: 'maleShort', hair: 'm', skin: 's', shirt: 'H' },
    { name: 'Andrew Ng',      domain: 'AI & Deep Tech', template: 'maleShort', hair: 'k', skin: 't', shirt: 'U' },
    { name: 'Elon Musk',      domain: 'AI & Deep Tech', template: 'maleShort', hair: 'n', skin: 's', shirt: 'B' },

    // --- Hardware ------------------------------------------------------
    { name: 'Jensen Huang', domain: 'Hardware', template: 'maleShortGlasses', hair: 'k', skin: 't', shirt: 'J' },
    { name: 'Lisa Su',      domain: 'Hardware', template: 'femaleLong',       hair: 'k', skin: 't', shirt: 'R' },

    // --- SaaS & Platforms ---------------------------------------------
    { name: 'Marc Benioff',    domain: 'SaaS & Platforms', template: 'maleShortBeard',      hair: 'k', skin: 's', shirt: 'U', beard: 'k' },
    { name: 'Frank Slootman',  domain: 'SaaS & Platforms', template: 'maleBald',            skin: 's', shirt: 'N' },
    { name: 'Patrick Collison', domain: 'SaaS & Platforms', template: 'maleShort',          hair: 'm', skin: 's', shirt: 'P' },
    { name: 'Satya Nadella',   domain: 'SaaS & Platforms', template: 'maleRecedingGlasses', hair: 'k', skin: 't', shirt: 'D' },

    // --- Big Tech ------------------------------------------------------
    { name: 'Tim Cook',       domain: 'Big Tech', template: 'maleShort',            hair: 'z', skin: 's', shirt: 'N' },
    { name: 'Sundar Pichai',  domain: 'Big Tech', template: 'maleShortBeard',       hair: 'k', skin: 't', shirt: 'U', beard: 'g' },
    { name: 'Larry Page',     domain: 'Big Tech', template: 'maleShort',            hair: 'g', skin: 's', shirt: 'H' },
    { name: 'Eric Schmidt',   domain: 'Big Tech', template: 'maleRecedingGlasses',  hair: 'g', skin: 's', shirt: 'N' },
    { name: 'Mark Zuckerberg', domain: 'Big Tech', template: 'maleShort',           hair: 'm', skin: 's', shirt: 'H' },
    { name: 'Bill Gates',     domain: 'Big Tech', template: 'maleRecedingGlasses',  hair: 'm', skin: 's', shirt: 'H' },

    // --- Growth & Marketing -------------------------------------------
    { name: 'Seth Godin',   domain: 'Growth & Marketing', template: 'maleBaldGlasses', skin: 's', shirt: 'Y' },
    { name: 'Alex Hormozi', domain: 'Growth & Marketing', template: 'maleBaldBeard',   skin: 's', shirt: 'B', beard: 'k' },
    { name: 'Andrew Chen',  domain: 'Growth & Marketing', template: 'maleShort',       hair: 'k', skin: 't', shirt: 'H' },
    { name: 'Phil Knight',  domain: 'Growth & Marketing', template: 'maleSunglasses',  hair: 'z', skin: 's', shirt: 'B' },

    // --- Leadership & Culture -----------------------------------------
    { name: 'Ben Horowitz',  domain: 'Leadership & Culture', template: 'maleBaldBeard', skin: 's', shirt: 'H', beard: 'g' },
    { name: 'Mary Barra',    domain: 'Leadership & Culture', template: 'femaleLong',    hair: 'm', skin: 's', shirt: 'U' },
    { name: 'Howard Schultz', domain: 'Leadership & Culture', template: 'maleReceding', hair: 'g', skin: 's', shirt: 'G' },
    { name: 'Indra Nooyi',   domain: 'Leadership & Culture', template: 'femaleLong',    hair: 'k', skin: 'u', shirt: 'N' },

    // --- Consumer & Retail --------------------------------------------
    { name: 'Sam Walton',     domain: 'Consumer & Retail', template: 'cap',       hair: 'g', skin: 's', shirt: 'U', cap: 'U' },
    { name: 'Bernard Arnault', domain: 'Consumer & Retail', template: 'maleShort', hair: 'z', skin: 's', shirt: 'N' },

    // --- Media & Audience ---------------------------------------------
    { name: 'Bob Iger',       domain: 'Media & Audience', template: 'maleShort',        hair: 'z', skin: 's', shirt: 'N' },
    { name: 'Oprah Winfrey',  domain: 'Media & Audience', template: 'femaleLong',       hair: 'k', skin: 'w', shirt: 'P' },
    { name: 'Zhang Yiming',   domain: 'Media & Audience', template: 'maleShortGlasses', hair: 'k', skin: 't', shirt: 'H' },
    { name: 'Reed Hastings',  domain: 'Media & Audience', template: 'maleShortBeard',   hair: 'g', skin: 's', shirt: 'R', beard: 'g' },

    // --- Emerging Markets ---------------------------------------------
    { name: 'Jack Ma',      domain: 'Emerging Markets', template: 'maleShort', hair: 'k', skin: 't', shirt: 'O' },
    { name: 'Pavel Durov',  domain: 'Emerging Markets', template: 'maleShort', hair: 'k', skin: 's', shirt: 'B' },
  ];

  // domain -> accent colour (for badges in the gallery)
  const DOMAIN_COLORS = {
    'Strategy & Capital': '#2563eb',
    'Founders': '#16a34a',
    'Product & Design': '#db2777',
    'AI & Deep Tech': '#7c3aed',
    'Hardware': '#0d9488',
    'SaaS & Platforms': '#0ea5e9',
    'Big Tech': '#f59e0b',
    'Growth & Marketing': '#ea580c',
    'Leadership & Culture': '#dc2626',
    'Consumer & Retail': '#65a30d',
    'Media & Audience': '#c026d3',
    'Emerging Markets': '#0891b2',
  };

  window.MENTORS = MENTORS;
  window.DOMAIN_COLORS = DOMAIN_COLORS;
})();
