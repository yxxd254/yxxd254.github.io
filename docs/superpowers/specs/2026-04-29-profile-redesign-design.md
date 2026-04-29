# Profile Site Redesign — Spec

## Goal

Redesign the entire personal profile site UI, rewrite code, and make the design support rich/verbose content. Primary colors and basic content text are preserved. Blogs remain WIP and untouched.

## Architecture

```
ProfileYX/
├── index.html          ← single page, all sections (scrollable)
├── styles.css          ← fully rewritten, same color palette
├── main.js             ← nav scroll spy, reveal animations, clock, maintenance
├── blogs.html          ← WIP (unchanged)
├── post.html           ← WIP (unchanged)
├── posts/              ← blog data (unchanged)
├── *.png               ← background images (unchanged)
```

- **No framework** — plain HTML, CSS, JS.
- **No build step** — `index.html` opens directly in browser.
- **Single page** — all content sections on one scrollable page with sticky nav.
- **Blog pages** (`blogs.html`, `post.html`) remain separate and are not redesigned.

## Pages / Sections

### Single Page (`index.html`)

**Sections (top to bottom):**

1. **Hero** — Name, subtitle, badges (Vibe Coder, Weeb), GMT+8 live clock.
2. **About / Profile** — Bio card (paragraph text), meta info (timezone, identity, notes, no-hello).
3. **Skills** — Responsive grid of skill cards. Each card: title, chips, multi-line paragraph description, optional bullet list of details.
4. **Gaming** — Responsive grid of game cards. Each card: title, status chip, multi-line paragraph description, item rows (game name → status).
5. **Contact** — Link cards (Discord, Roblox, GitHub). Each with label and link.
6. **Footer** — Minimal footer with actual content (not empty).

### Separate Pages (WIP, Unchanged)

- `blogs.html` — blog list with manifest.json + fetch
- `post.html` — individual blog post with marked.js
- `posts/manifest.json` + `posts/*.md` — blog data

## Navigation

- **Sticky header** — fixed at top, dark bg with blur.
- **Anchor links** — smooth scroll to sections (`#about`, `#skills`, `#gaming`, `#contact`).
- **Blogs link** — normal link to `blogs.html` (separate page, no smooth scroll).
- **Scroll spy** — highlight active nav item based on visible section.
- **Mobile** — nav wraps gracefully or uses simple toggle.

## Component Design

### Reusable Card System

All sections use a single, consistent card system:

```
.card                   ← dark bg, pink border, rounded, padding
  .card h3              ← Chakra Petch, uppercase, letter-spaced
  .card p               ← multi-line paragraph, supports rich text
  .card ul / li         ← optional bullet detail list
  .card .chip           ← small tag/badge pill
  .card .status-*       ← color-coded status chips (active, inactive, etc.)
  .card .item-row       ← key-value row (label + detail)
```

### Section Layout

Each section:
- Has a section heading (h2, uppercase, letter-spaced)
- Uses CSS Grid (`repeat(auto-fit, minmax(...))`) for responsive cards
- Cards fill available width naturally

### Color Palette (Preserved)

- `--accent-500: #ff7bbf` (pink, primary)
- `--accent-400: #ff9fd3`
- `--accent-200: #ffd2e8`
- `--teal-400: #5cffdf` (secondary accent)
- `--bg-950: #0d1310` through `--bg-800: #1a241f` (dark backgrounds)
- `--ink-100` through `--ink-300` (text colors)
- `--grid-line` (background grid pattern)

## Interactivity

- **Scroll reveal** — IntersectionObserver fades in sections.
- **Smooth scroll** — CSS `scroll-behavior: smooth` + JS offset for sticky header height.
- **Live clock** — GMT+8, updates every second (existing feature).
- **Maintenance banner** — `?inactive` query param shows a site-wide banner.
- **Focus-visible** — explicit `:focus-visible` styles for keyboard navigation.

## Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, etc.)
- ARIA labels on nav
- Focus-visible outlines
- Sufficient color contrast
- `<meta name="description">` on all pages

## Non-Goals

- Do NOT redesign blog pages (`blogs.html`, `post.html`)
- Do NOT change blog data format or rendering
- Do NOT change the color palette
- Do NOT change the core identity content (name, badges, game list, contact links)
- Do NOT add frameworks or build tools

## Content Notes

The user will add their own detailed content after the redesign is done. The HTML structure and CSS must support:

- Multi-line paragraph descriptions in skill/game cards
- Bullet-point detail lists within cards
- Color-coded status chips
- All cards expanding naturally with content (no fixed heights)
