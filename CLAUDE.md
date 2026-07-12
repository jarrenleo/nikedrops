# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server at http://localhost:3000
- `npm run build` — production build (use this to verify changes; there are no tests)
- `npm run lint` — ESLint via Next.js

Requires a `.env` with `MONGODB_URI`. Without it, the upcoming-list API fails but the app shell still runs.

## What this app is

Nike Drops is a Next.js App Router SPA (JavaScript, not TypeScript) that shows upcoming Nike/SNKRS releases per country and exposes product details Nike normally hides (stock levels, release method, cart limit). Routes:

- `/` — client redirect to `/[country]` (country from localStorage, default SG)
- `/[country]` — upcoming releases grouped by date (`Upcoming` → `UpcomingList`)
- `/[country]/[sku]` — product detail (`Product`)

Pages are thin wrappers; all real UI lives in client components under `app/_components/`.

## Data flow

Two distinct data sources behind internal API routes:

- `/api/upcoming` — reads MongoDB (`sneakify` db, collections named `{snkrs|nike}-{country}`, e.g. `snkrs-sg`). The collections are populated by an external scraper project, not this repo.
- `/api/product` and `/api/search` — hit Nike's live `product_feed/threads/v3` API directly. Parsing quirks live in `app/_lib/utils.js`, `product_data.js` (product route), and `query_data.js` (search route) — e.g. AU uses marketplace `ASTLA`, per-country string slicing in `extractPublishedName`, `releaseTimestamp` derived from `launchView.startEntryDate || commerceStartDate`.

Client fetching uses TanStack Query with `staleTime: Infinity`. The product page seeds itself instantly via `placeholderData` looked up from the `["upcomingCards", channel, country]` cache (see `Product.js`); when `isPlaceholderData` is true, only partial fields exist (name/price/status/imageUrl) and missing sections render `Skeleton`s — preserve this contract when touching the product query or list item shape.

## Global state

`ContextProvider` holds `channel` ("SNKRS Web" | "Nike.com"), `country`, and `timeZone`, persisted to localStorage. It renders `null` until mounted, so the entire tree below it is client-rendered after hydration — components can assume `window` exists.

## Theming

`next-themes` with `attribute="class"` + HSL CSS variables defined in `globals.css` and mapped in `tailwind.config.js`. Status/stock colors use the custom `green/yellow/orange/red` tokens via `getStatusColour`/`getStockLevelColour`.

## Motion system (easy to break — read before touching)

Two independent View Transition types are scoped by classes on `<html>`; they must never overlap:

- `html.theme-transition` — theme toggle clip-path ripple (`ThemeToggle.js` sets the class and `--ripple-x/y/r`; keyframes in `globals.css`).
- `html.nav-transition` — card ↔ product hero shared-element morph. `app/_lib/view_transition.js` wraps `router.push` in `document.startViewTransition` and holds the snapshot until `ViewTransitionHandler` (mounted in `layout.js`) observes the pathname change. The morphing element is whichever node carries `data-vt-hero`, and the CSS name applies **only** while `html.nav-transition` is present — exactly one element may carry the attribute at a time (card click handlers sweep old ones).

Supporting rules:

- `FadeInImage` intentionally uses a CSS opacity transition (not Motion) so browser-cached images paint at full opacity on the first frame; a Motion-driven fade makes view-transition snapshots capture a transparent hero.
- `MotionConfig reducedMotion="user"` wraps the app; both view-transition helpers also skip entirely under `prefers-reduced-motion`. Keep new animations behind these.
- Loading states use layout-matching skeletons (`UpcomingSkeleton`, `ProductSkeleton`), not the full-screen `Loader` (that ring is still used inside the search dropdown).

## Conventions

- Path alias `@/*` from repo root (`jsconfig.json`).
- Private App Router folders: `_components/` (grouped by feature), `_lib/`, `_providers/`.
- Formatting via Prettier with `prettier-plugin-tailwindcss` — keep Tailwind classes in sorted order.
- API routes return `{ error: message }` with status 500 on failure; client fetchers throw `Error(data.error)` and rely on TanStack Query error states.
