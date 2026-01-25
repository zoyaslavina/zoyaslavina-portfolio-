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
--primary-orange: #FF6B35    --claude-orange: #CC785C
--bg-dark: #1a1a1a           --bg-card: #252525
--text-primary: #e0e0e0      --text-secondary: #a0a0a0
```

Typography: Georgia (headers), Inter via Google Fonts (body)

## Content Placeholders

Replace `[bracketed text]` throughout `index.html`:
- Hero: photo, name, tagline, bio paragraphs
- Timeline: dates and `--start`/`--end` values for positioning
- Cards: publications, experience entries, blog posts, book covers
