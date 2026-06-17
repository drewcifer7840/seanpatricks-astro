# lane

> **Read this file FIRST at the start of every session.**
> This is the project's current brain state. Update it whenever the picture changes.

## Project
**Name:** Sean Patrick's Emerald Isle — restaurant site (Astro)
**Workspace:** `C:\Users\andre\Desktop\seanpatricks-astro\`
**Status:** Live production site, paying client. User is a solopreneur developer (Builderius LTD), not the restaurant owner.
**Stack:** Astro 6.4.6, Node 22.12+, zero integrations configured. 3-tier CSS architecture in `src/styles/`.
**Memory system:** TurboKarth — `turbokarth/{lane.md, journal/, breadcrumbs.md, summary.md}` + `AGENTS.md` at project root. Installed 2026-06-16.

## Current State (as of 2026-06-17 08:20)
**Site is fully production-ready.** All cleanup backlog (🔴, 🟠, and the 5-page 🟡) addressed. The 5 hand-coded "catering pattern" pages (catering, packages, special-packages, wedding, brunch-buffet) now use the shared `MenuPackage.astro` component with their data in frontmatter. ~1500 lines of duplicated CSS eliminated; the design lives in one place. Build is clean (`npm run build` produces 24 pages, 5.3 sec). No known user-visible bugs.

**File structure now (24 routes total):**
- 21 page folders: about, banquet-beverage, banquet-cocktails, banquet-dinner, banquet-lunch, breakfast, brunch-buffet, catering, cocktail-parties, contact, dinner-menu, drinks-menu, gallery, holiday-easter, holiday-mothers-day, hours, lunch-menu, packages, special-packages, terms, wedding
- 3 top-level `.astro` files: `index.astro` (home page, URL `/`), `holiday-new-years-eve.astro`, `holiday-st-patricks-day.astro`
- The home page is at top-level on purpose — `src/pages/index.astro` is the Astro convention for the site root, NOT `src/pages/index/index.astro` (which would map to `/index/` and 404 the home link in the nav header). Learned this the hard way on 2026-06-17.
- The 5 page folders created in the 06-16 evening (catering, packages, special-packages, wedding, brunch-buffet) contain only `index.astro` — no `*.css` file, since all their styles are in `MenuPackage.astro`
- 8 package pages (banquet-*, breakfast, holiday-easter, holiday-mothers-day, cocktail-parties) have small per-page `*.css` files (~400 bytes each) that hold just the `.sp-pkg` wrapper style. This is leftover from the 06-16 page-folder refactor and is technically a small duplication. Could be cleaned up by having MenuPackage render the wrapper itself; not done yet.

## Goals
- Production-ready restaurant site deployable from this repo
- CSS architecture: every page is a self-contained folder, no cross-page leakage ✓ DONE
- Future menu system: deployable pattern, this site is the seed

## Decisions Made (load-bearing)
1. **Page-as-folder pattern** — `src/pages/{name}/index.astro` + `src/pages/{name}/{name}.css`. URL unchanged.
2. **No `is:global` on page styles.** Astro scopes imports automatically.
3. **Content collection for menus** — `src/content/menus/*.md` rendered via `src/components/MenuSection.astro` (6 layout discriminators: items/sides/pricelist/wine/info/promo) or `MenuPackage.astro` (4 sub-section types: items/pricelist/sides/upgrades).
4. **Body bg rule** — `body { background: var(--bg-page) }` was redundant. Removed from all 11 refactored pages + 8 package/holiday pages.
5. **Shared component policy** — when styles are used by multiple pages, the user chooses: rewrite on each page OR extract a shareable component. Not the agent's call.
6. **Pricelist shape in content** — `type: pricelist` subSections use `columns: [{ items: [{name, price}, ...] }]`, not flat `items: [{name, price}, ...]`. The flat shape was a bug in `banquet-dinner.md` (now fixed).
7. **Contact field is partial** — `name` and `title` are optional in the schema because holiday pages have only `phone` under a "Reservations Suggested" label.

## Constraints
- **5-hour coding window limit on user's token plan.** Sessions can be cut off mid-task. TurboKarth memory system exists because of this.
- No git repo on this project — no commit history to recover from.
- `npm run dev` works (Astro builds pages on demand). `npm run build` now works (was broken by Zod schema bug, fixed 2026-06-16).

## Known Bugs / Cleanup Backlog

### 🔴 All fixed
- ~~Build bug: `banquet-dinner.md` Zod schema mismatch~~ — fixed by switching all 7 pricelist subSections to `columns` shape.
- ~~Build bug: `holiday-easter.md` & `holiday-mothers-day.md` contact field required name+title~~ — fixed by making them optional in schema.
- ~~Dead `MenuPage.astro` component~~ — deleted.
- ~~`terms.astro` back link → `index.html`~~ — fixed to `/`.
- ~~Dead `body { background: ... }` rules in 9 package/holiday pages~~ — all removed.

### 🟡 Design / consistency calls (open)
- **5-page "catering pattern" duplication** — catering, packages, special-packages, wedding, brunch-buffet all share the same sticky-identity + split-content layout. ~1500 lines of near-identical CSS now duplicated across 5 page CSS files. User's call: leave or extract a shared component.

### 🟢 Production hygiene (later)
- No sitemap, robots.txt, or 404 page.
- Contact form `_next` URL → `https://www.spatricks.com/contact.html?sent=1` (old domain).
- `astro.config.mjs` is empty — no integrations, no image optimization.
- Multiple `index.html` / `*.html` references in the hand-coded holiday pages' footer (old static-HTML site, broken in Astro).

## Working Style
- **User:** warm, direct, judgment-driven. Hates formulaic transition words and bullet-point intros. Gave explicit license: "do it your way with your suggestions" (don't ask permission for mechanical cleanups).
- **Agent:** give recommendations, not just lists. State your view, then ask. If you think the direction is wrong, push back once respectfully.
- **License:** "broad license + first-principles thinking." Don't ask permission for mechanical work; do flag real architectural decisions.
- **Format:** short crisp high-signal communication. Conversational. Code edits get a brief explanation, not a wall. Drop the "AI assistant" tone entirely.

## What NOT to do
- Don't use the dev server's permission-blocked `cmd.exe` workaround. Use `Start-Process -FilePath "C:\nvm4w\nodejs\npm.cmd"` (permission already granted for both).
- Don't auto-extract the "catering pattern" into a shared component without explicit user OK.
- Don't add `is:global` back to any page styles.
- Don't introduce new CSS variable names — use the existing system in `src/styles/system.css`.
- Don't touch the `src/styles/*.css` global files (system, header, footer, components, styles) unless explicitly asked.
- Don't add an `is:global` body rule to any page — system.css handles it.

## Shutdown Ritual (mandatory)
At the end of every meaningful task:
1. Write/update `turbokarth/lane.md` (this file) if the project's state changed
2. Write a new `turbokarth/journal/YYYY-MM-DD-task-slug.md` entry
3. Update `turbokarth/breadcrumbs.md` with any new file/idea relationships
4. Update `turbokarth/summary.md` with a 3-5 sentence human recap
5. Tell the user: "I wrote a journal entry. Lane file is current. Pick up from there next session."

## Startup Ritual (mandatory)
At the start of every session:
1. Read `turbokarth/lane.md` (project state, decisions, constraints, backlog)
2. Read `turbokarth/summary.md` (most recent human recap)
3. Read the **latest** entry in `turbokarth/journal/` (most recent task detail)
4. Skim `turbokarth/breadcrumbs.md` (file relationships)
5. Output a 3-4 sentence orientation: what we're building, where we left off, what's next
6. Ask the user if they want to continue from `lane.md`'s Next Steps

## Key Paths
- `src/pages/` — 14 page folders + 8 top-level package/holiday pages + 2 hand-coded holiday pages = 24 routes
- `src/components/` — MenuSection, MenuPriceList, MenuPackage, Header, Footer, Hours
- `src/content/menus/` — markdown content for menu pages
- `src/content.config.ts` — Zod schema for menus collection
- `src/styles/` — global 3-tier CSS (system, header, footer, components, styles)
- `src/layouts/BaseLayout.astro` — top-level layout, imports all global CSS
- `public/` — static assets
- `dist/` — build output
- `turbokarth/` — memory system (this folder)
- `AGENTS.md` — entry point for any future agent
