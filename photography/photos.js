// photos.js — curated street photography pool
//
// Four chapters, organised by emotional register and visual grammar.
// The 3-day rotation draws from all 77 photos regardless of chapter.
//
// ── Chapter 1: Northern Light ──────────────────────────────────────────────
//    Warsaw (2024), Berlin, London, Tallinn.
//    Grey-cool palette, diffuse northern light, classical European street
//    photography tradition. The camera is cold but curious.
//
// ── Chapter 2: Stone & Salt ────────────────────────────────────────────────
//    Porto, Bragança, Côa Valley, Tenerife.
//    Atlantic and Mediterranean warmth, direct sun on old stone, azulejo
//    tiles, volcanic rock. Decay worn as beauty.
//
// ── Chapter 3: The Grid ────────────────────────────────────────────────────
//    New York, San Francisco, California, Stanford.
//    American urban geometry: scale, contrast, grid streets, light falling
//    between buildings that dwarf everything human.
//
// ── Chapter 4: Here ────────────────────────────────────────────────────────
//    Białystok, Kraków, Warsaw (special/early), In Transit.
//    The familiar made strange. Polish home cities and the planes that
//    connect home to everywhere else.
//
// Fields:
//   thumb       — path relative to root index.html
//   full        — same (replace thumb with smaller file once optimised)
//   alt         — screen-reader description
//   caption     — shown under grid tile and in lightbox
//   orientation — 'landscape' | 'portrait'  ← update portrait shots after review
//   theme       — chapter slug

window.PHOTOS = [

  // ── Chapter 1: Northern Light ─────────────────────────────────────────────

  // Warsaw · 2024
  { thumb: 'assets/photography_assets/PL-WARSAW-24.jpg',       full: 'assets/photography_assets/PL-WARSAW-24.jpg',       alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW2-24.jpg',      full: 'assets/photography_assets/PL-WARSAW2-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW3-24.jpg',      full: 'assets/photography_assets/PL-WARSAW3-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW4-24.jpg',      full: 'assets/photography_assets/PL-WARSAW4-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW5-24.jpg',      full: 'assets/photography_assets/PL-WARSAW5-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW6-24.jpg',      full: 'assets/photography_assets/PL-WARSAW6-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW7-24.jpg',      full: 'assets/photography_assets/PL-WARSAW7-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW8-24.jpg',      full: 'assets/photography_assets/PL-WARSAW8-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW9-24.jpg',      full: 'assets/photography_assets/PL-WARSAW9-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW10-24.jpg',     full: 'assets/photography_assets/PL-WARSAW10-24.jpg',     alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/PL-WARSAW11-24.jpg',     full: 'assets/photography_assets/PL-WARSAW11-24.jpg',     alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'northern-light' },

  // Berlin · 2024
  { thumb: 'assets/photography_assets/DE-BERLIN-24.jpg',       full: 'assets/photography_assets/DE-BERLIN-24.jpg',       alt: 'Street scene, Berlin 2024',        caption: 'Berlin · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/DE-BERLIN2-24.jpg',      full: 'assets/photography_assets/DE-BERLIN2-24.jpg',      alt: 'Street scene, Berlin 2024',        caption: 'Berlin · 2024',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/DE-BERLIN3-24.jpg',      full: 'assets/photography_assets/DE-BERLIN3-24.jpg',      alt: 'Street scene, Berlin 2024',        caption: 'Berlin · 2024',         theme: 'northern-light' },

  // London · 2025
  { thumb: 'assets/photography_assets/UK-LONDON-25.jpg',       full: 'assets/photography_assets/UK-LONDON-25.jpg',       alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON1-25.jpg',      full: 'assets/photography_assets/UK-LONDON1-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON2-25.jpg',      full: 'assets/photography_assets/UK-LONDON2-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON3-25.jpg',      full: 'assets/photography_assets/UK-LONDON3-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON4-25.jpg',      full: 'assets/photography_assets/UK-LONDON4-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON5-25.jpg',      full: 'assets/photography_assets/UK-LONDON5-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON6-25.jpg',      full: 'assets/photography_assets/UK-LONDON6-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON7-25.jpg',      full: 'assets/photography_assets/UK-LONDON7-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON8-25.jpg',      full: 'assets/photography_assets/UK-LONDON8-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON9-25.jpg',      full: 'assets/photography_assets/UK-LONDON9-25.jpg',      alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON10-25.jpg',     full: 'assets/photography_assets/UK-LONDON10-25.jpg',     alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON11-25.jpg',     full: 'assets/photography_assets/UK-LONDON11-25.jpg',     alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON12-25.jpg',     full: 'assets/photography_assets/UK-LONDON12-25.jpg',     alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON13-25.jpg',     full: 'assets/photography_assets/UK-LONDON13-25.jpg',     alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON14-25.jpg',     full: 'assets/photography_assets/UK-LONDON14-25.jpg',     alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },
  { thumb: 'assets/photography_assets/UK-LONDON15-25.jpg',     full: 'assets/photography_assets/UK-LONDON15-25.jpg',     alt: 'Street scene, London 2025',        caption: 'London · 2025',         theme: 'northern-light' },

  // Tallinn · 2024
  { thumb: 'assets/photography_assets/EE-TALLINN-24.jpg',      full: 'assets/photography_assets/EE-TALLINN-24.jpg',      alt: 'Street scene, Tallinn 2024',       caption: 'Tallinn · 2024',        theme: 'northern-light' },

  // ── Chapter 2: Stone & Salt ───────────────────────────────────────────────

  // Porto · 2024
  { thumb: 'assets/photography_assets/PT-PORTO-24.jpg',        full: 'assets/photography_assets/PT-PORTO-24.jpg',        alt: 'Street scene, Porto 2024',         caption: 'Porto · 2024',          theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/PT-PORTO2-24.jpg',       full: 'assets/photography_assets/PT-PORTO2-24.jpg',       alt: 'Street scene, Porto 2024',         caption: 'Porto · 2024',          theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/PT-PORTO3-24.jpg',       full: 'assets/photography_assets/PT-PORTO3-24.jpg',       alt: 'Street scene, Porto 2024',         caption: 'Porto · 2024',          theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/PT-PORTO4-24.jpg',       full: 'assets/photography_assets/PT-PORTO4-24.jpg',       alt: 'Street scene, Porto 2024',         caption: 'Porto · 2024',          theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/PT-PORTO5-24.jpg',       full: 'assets/photography_assets/PT-PORTO5-24.jpg',       alt: 'Street scene, Porto 2024',         caption: 'Porto · 2024',          theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/PT-PORTO6-24.jpg',       full: 'assets/photography_assets/PT-PORTO6-24.jpg',       alt: 'Street scene, Porto 2024',         caption: 'Porto · 2024',          theme: 'stone-salt' },

  // Bragança · 2024
  { thumb: 'assets/photography_assets/PT-BRAGANCA-24.jpg',     full: 'assets/photography_assets/PT-BRAGANCA-24.jpg',     alt: 'Street scene, Bragança 2024',      caption: 'Bragança · 2024',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/PT-BRAGANCA2-24.jpg',    full: 'assets/photography_assets/PT-BRAGANCA2-24.jpg',    alt: 'Street scene, Bragança 2024',      caption: 'Bragança · 2024',       theme: 'stone-salt' },

  // Côa Valley · 2024
  { thumb: 'assets/photography_assets/PT-COA-24.jpg',          full: 'assets/photography_assets/PT-COA-24.jpg',          alt: 'Côa Valley, Portugal 2024',        caption: 'Côa Valley · 2024',     theme: 'stone-salt' },

  // Tenerife · 2025
  { thumb: 'assets/photography_assets/ES-TENERIFE-25.jpg',     full: 'assets/photography_assets/ES-TENERIFE-25.jpg',     alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENIRIFE-25.jpg',     full: 'assets/photography_assets/ES-TENIRIFE-25.jpg',     alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE3-25.jpg',    full: 'assets/photography_assets/ES-TENERIFE3-25.jpg',    alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE4-25.jpg',    full: 'assets/photography_assets/ES-TENERIFE4-25.jpg',    alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE5-25.jpg',    full: 'assets/photography_assets/ES-TENERIFE5-25.jpg',    alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE6-25.jpg',    full: 'assets/photography_assets/ES-TENERIFE6-25.jpg',    alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE7-25.jpg',    full: 'assets/photography_assets/ES-TENERIFE7-25.jpg',    alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE8-25.jpg',    full: 'assets/photography_assets/ES-TENERIFE8-25.jpg',    alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE9-25.jpg',    full: 'assets/photography_assets/ES-TENERIFE9-25.jpg',    alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE10-25.jpg',   full: 'assets/photography_assets/ES-TENERIFE10-25.jpg',   alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE11-25.jpg',   full: 'assets/photography_assets/ES-TENERIFE11-25.jpg',   alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE12-25.jpg',   full: 'assets/photography_assets/ES-TENERIFE12-25.jpg',   alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE13-25.jpg',   full: 'assets/photography_assets/ES-TENERIFE13-25.jpg',   alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },
  { thumb: 'assets/photography_assets/ES-TENERIFE14-25.jpg',   full: 'assets/photography_assets/ES-TENERIFE14-25.jpg',   alt: 'Street scene, Tenerife 2025',      caption: 'Tenerife · 2025',       theme: 'stone-salt' },

  // ── Chapter 3: The Grid ───────────────────────────────────────────────────

  // New York · 2024
  { thumb: 'assets/photography_assets/USA-NY-24.jpg',          full: 'assets/photography_assets/USA-NY-24.jpg',          alt: 'Street scene, New York 2024',      caption: 'New York · 2024',       theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-NY1-24.jpg',         full: 'assets/photography_assets/USA-NY1-24.jpg',         alt: 'Street scene, New York 2024',      caption: 'New York · 2024',       theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-NY2-24.jpg',         full: 'assets/photography_assets/USA-NY2-24.jpg',         alt: 'Street scene, New York 2024',      caption: 'New York · 2024',       theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-NY3-24.jpg',         full: 'assets/photography_assets/USA-NY3-24.jpg',         alt: 'Street scene, New York 2024',      caption: 'New York · 2024',       theme: 'the-grid' },

  // San Francisco · 2024
  { thumb: 'assets/photography_assets/USA-SF-24.jpg',          full: 'assets/photography_assets/USA-SF-24.jpg',          alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-SF1-24.jpg',         full: 'assets/photography_assets/USA-SF1-24.jpg',         alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-SF2-24.jpg',         full: 'assets/photography_assets/USA-SF2-24.jpg',         alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-SF3-24.jpg',         full: 'assets/photography_assets/USA-SF3-24.jpg',         alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-SF4-24.jpg',         full: 'assets/photography_assets/USA-SF4-24.jpg',         alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-SF5-24.jpg',         full: 'assets/photography_assets/USA-SF5-24.jpg',         alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-SF6-24.jpg',         full: 'assets/photography_assets/USA-SF6-24.jpg',         alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-SF7-24.jpg',         full: 'assets/photography_assets/USA-SF7-24.jpg',         alt: 'Street scene, San Francisco 2024', caption: 'San Francisco · 2024',  theme: 'the-grid' },

  // California · 2024
  { thumb: 'assets/photography_assets/USA-CALIFORNIA-24.jpg',  full: 'assets/photography_assets/USA-CALIFORNIA-24.jpg',  alt: 'Street scene, California 2024',    caption: 'California · 2024',     theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-CALIFORNIA2-24.jpg', full: 'assets/photography_assets/USA-CALIFORNIA2-24.jpg', alt: 'Street scene, California 2024',    caption: 'California · 2024',     theme: 'the-grid' },
  { thumb: 'assets/photography_assets/USA-CALIFORNIA3-24.jpg', full: 'assets/photography_assets/USA-CALIFORNIA3-24.jpg', alt: 'Street scene, California 2024',    caption: 'California · 2024',     theme: 'the-grid' },

  // Stanford · 2024
  { thumb: 'assets/photography_assets/USA-STANFORD-24.jpg',    full: 'assets/photography_assets/USA-STANFORD-24.jpg',    alt: 'Street scene, Stanford 2024',      caption: 'Stanford · 2024',       theme: 'the-grid' },

  // ── Chapter 4: Here ───────────────────────────────────────────────────────

  // Białystok · 2024
  { thumb: 'assets/photography_assets/PL-BIALYSTOK-24.jpg',    full: 'assets/photography_assets/PL-BIALYSTOK-24.jpg',    alt: 'Street scene, Białystok 2024',     caption: 'Białystok · 2024',      theme: 'here' },
  { thumb: 'assets/photography_assets/PL-BIALYSTOK1-24.jpg',   full: 'assets/photography_assets/PL-BIALYSTOK1-24.jpg',   alt: 'Street scene, Białystok 2024',     caption: 'Białystok · 2024',      theme: 'here' },

  // Kraków · 2024
  { thumb: 'assets/photography_assets/PL-KRAKOW-24.jpg',       full: 'assets/photography_assets/PL-KRAKOW-24.jpg',       alt: 'Street scene, Kraków 2024',        caption: 'Kraków · 2024',         theme: 'here' },

  // Warsaw — early and special
  { thumb: 'assets/photography_assets/PL-WARSAW1-24.jpg',      full: 'assets/photography_assets/PL-WARSAW1-24.jpg',      alt: 'Street scene, Warsaw 2024',        caption: 'Warsaw · 2024',         theme: 'here' },
  { thumb: 'assets/photography_assets/PL-WARSAW-SPECIAL-24.jpg', full: 'assets/photography_assets/PL-WARSAW-SPECIAL-24.jpg', alt: 'Street scene, Warsaw 2024',    caption: 'Warsaw · 2024',         theme: 'here' },

  // In Transit
  { thumb: 'assets/photography_assets/PLANE1-24.jpg',          full: 'assets/photography_assets/PLANE1-24.jpg',          alt: 'In transit, 2024',                 caption: 'In Transit · 2024',     theme: 'here' },
  { thumb: 'assets/photography_assets/PLANE2-25.jpg',          full: 'assets/photography_assets/PLANE2-25.jpg',          alt: 'In transit, 2025',                 caption: 'In Transit · 2025',     theme: 'here' }

];
