# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for a research position application. Dark-themed, minimal aesthetic inspired by saffronhuang.com. Static site with no build process—vanilla HTML/CSS/JS.

## Running the Project

```bash
python -m http.server 8000
# Open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Architecture

**Three-file structure:**
- `index.html` — Semantic HTML with ARIA attributes; sections: hero/about, timeline, research, experience, blog, reading, contact
- `styles.css` — CSS custom properties in `:root`, responsive breakpoints at 768px/600px/900px, `prefers-reduced-motion` support
- `script.js` — IIFE pattern, Intersection Observer for animations, no dependencies

**Timeline component** (`#timeline`): Horizontal scrollable bars with click-to-expand popups. Bar positions use CSS `--start`/`--end` custom properties (each year = 14.28% width). Rows via `data-row` attribute (0-3). Ongoing items have `.ongoing` class with arrow indicator.

**Animation system:** Section fade-in, keyword pulse highlights (`[data-highlight]`), staggered timeline bars. All animations disabled when `prefers-reduced-motion: reduce`.

## Design Tokens (CSS Custom Properties)

```css
--accent: #7CC4F5            --accent-soft: #5BA3D0
--bg-dark: #1a1a1a           --bg-card: #252525
--text-primary: #e0e0e0      --text-secondary: #a0a0a0
```

Typography: Georgia (headers), Inter via Google Fonts (body)

## Changing the Accent Colour

The accent is two colours: a main one (`--accent`) and a softer second one (`--accent-soft`).

| Palette | Main | Second | Main as RGB | Second as RGB |
|---|---|---|---|---|
| Light blue (current) | `#7CC4F5` | `#5BA3D0` | `124, 196, 245` | `91, 163, 208` |
| Orange (original) | `#FF6B35` | `#CC785C` | `255, 107, 53` | `204, 120, 92` |

**Must be changed by hand**, because these hold the colour directly (search for the hex or RGB values above):
- `styles.css` `:root`: `--accent`, `--accent-soft`, `--shadow-glow`
- `styles.css` RGB glows and tints: `body.mode-photography .toggle-ball`, `.profile-photo`, `.bio-glow`, `.timeline-wrapper::-webkit-scrollbar-thumb` and its `:hover`, `.duration-bar.ongoing`, `.timeline-popup`, `.tag`
- `index.html` SVG `fill`: the two hero waves and two contact waves (commented out, so only visible if restored)

**Follow the tokens automatically** (no edit needed):
- Site-wide: links, focus outlines, nav and card link underlines, section title underlines, `.highlight` keywords
- Hero: profile photo ring, name cursor, bio glow and scrollbar, Read more toggle, scroll indicator
- Timeline: line, bars, ongoing arrows, popups, dates, distinctions, tags, overlap indicator, scrollbar
- Cards: `.badge` and `.badge-preprint`, book status badges (inline styles in `index.html`), experience hover border, title underline and company name
- Blog: card Instant View link, and in the post modal the badge, links, bold text, section titles, quote border and divider
- Photography (`photography/photography.css`): scroll hint, liked heart, used-like pips, focus outlines, lightbox close and arrow hovers
- Other: photography toggle ball, contact link hover

Text on accent fills is `--bg-dark`, so a new accent needs to be light enough for dark text to read on it. Update the token line under Design Tokens when the palette changes for good.

## Content Placeholders

Replace `[bracketed text]` throughout `index.html`:
- Hero: photo, name, tagline, bio paragraphs
- Timeline: dates and `--start`/`--end` values for positioning
- Cards: publications, experience entries, blog posts, book covers
