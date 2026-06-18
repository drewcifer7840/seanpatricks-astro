# lane

> **Read this file FIRST at the start of every session.**
> This is the project's current brain state. Update it whenever the picture changes.

## Project
**Name:** Sean Patrick's Emerald Isle — restaurant site (Astro)
**Workspace:** `C:\Users\andre\Desktop\seanpatricks-astro\`
**Status:** Live production site, paying client. User is a solopreneur developer (Builderius LTD), not the restaurant owner.
**Stack:** Astro 6.4.6, Node 22.12+, zero integrations configured. 3-tier CSS architecture in `src/styles/`.
**Memory system:** TurboKarth — `turbokarth/{lane.md, journal/, breadcrumbs.md, summary.md}` + `AGENTS.md` at project root. Installed 2026-06-16.

## Current State (as of 2026-06-17 20:38)
**Site is fully production-ready, under git, on GitHub, working CMS, and meta tags are now wired through to the page head.** Pages CMS hosted at app.pagescms.org is connected to the GitHub repo with a structured-form config (`.pages.yml`, 390 lines) that mirrors the Zod schema. Restaurant owner can now edit menus through a real form UI; edits commit to the .md files in GitHub automatically. The full round-trip (CMS edit → commit → .md → dev server hot reload → visible in browser) is verified working.

**Open work:**
- 🟢 **Cloudflare Pages deploy** — user's CF account exists (used for proxy elsewhere), but the site is not yet deployed there. CF Pages would auto-deploy on every commit to main.
- 🟢 **Owner invite** — Pages CMS supports email invites, so the owner doesn't need a GitHub account. 30 sec in the Pages CMS UI.
- 🟡 **CMS scope question (NEW — needs design decision)** — see "Scoping the CMS" section below. Should the client have power to add/remove entire sections and packages, or should the CMS be scoped to "edit existing content" only? User raised this; decision pending.
- 🟢 **End-to-end test** — DONE. The 35→36 summary edit on banquet-lunch and the "MAX" insertion on dinner-menu both round-tripped successfully.
- 🟢 **Meta tags wired** — DONE (commit `5dd9af3`). All 8 package pages now read `data.title` and `data.summary` from frontmatter and pass them to BaseLayout. `<title>` and `<meta name="description">` are now live-editable through Pages CMS.

**File structure now (24 routes total):**
- 21 page folders: about, banquet-beverage, banquet-cocktails, banquet-dinner, banquet-lunch, breakfast, brunch-buffet, catering, cocktail-parties, contact, dinner-menu, drinks-menu, gallery, holiday-easter, holiday-mothers-day, hours, lunch-menu, packages, special-packages, terms, wedding
- 3 top-level `.astro` files: `index.astro` (home page, URL `/`), `holiday-new-years-eve.astro`, `holiday-st-patricks-day.astro`
- The home page is at top-level on purpose — `src/pages/index.astro` is the Astro convention for the site root, NOT `src/pages/index/index.astro` (which would map to `/index/` and 404 the home link in the nav header). Learned this the hard way on 2026-06-17.
- The 5 page folders created in the 06-16 evening (catering, packages, special-packages, wedding, brunch-buffet) contain only `index.astro` — no `*.css` file, since all their styles are in `MenuPackage.astro`
- 8 package pages (banquet-*, breakfast, holiday-easter, holiday-mothers-day, cocktail-parties) have small per-page `*.css` files (~400 bytes each) that hold just the `.sp-pkg` wrapper style. This is leftover from the 06-16 page-folder refactor and is technically a small duplication. Could be cleaned up by having MenuPackage render the wrapper itself; not done yet.
- `.pages.yml` at the repo root — Pages CMS schema config (390 lines, structured form for all menus). May be revised in a future session to scope down the destructive controls (see "Scoping the CMS" section).

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
8. **Git + GitHub as the source of truth** — site committed, on GitHub at `drewcifer7840/seanpatricks-astro`. Local user `drewcifer7840` / noreply email.
9. **Pages CMS hosted at app.pagescms.org** as the content editor UI. Chosen over Decap CMS (OAuth setup friction) and Sanity (data lock-in, free tier limits). Trade-off: bus factor of 1 (Ronan Berder, single maintainer), mitigated by data living in git (swappable to any other editor).
10. **No `type: code` in `.pages.yml`** — Pages CMS code field crashes with `lintFn` error on frontmatter data. Workaround: use structured forms (nested `type: object` with `list.collapsible`) for everything. Code field might be safe for body content of .md files, not frontmatter.
11. **Wire frontmatter to page meta** — package pages (8 of them) read `data.title` and `data.summary` from their .md frontmatter via `getEntry()`, with a hardcoded fallback. Before this fix (commit `5dd9af3`, 2026-06-17 evening), the page title and meta description were hardcoded — so editing `summary` in Pages CMS had no visible effect. Now `<title>` and `<meta name="description">` in the generated HTML are live-editable through the CMS. SEO is now in the owner's hands.

## Constraints
- **5-hour coding window limit on user's token plan.** Sessions can be cut off mid-task. TurboKarth memory system exists because of this.
- **Token budget** — user is on Starter plan (~0.5B tokens/mo), considering upgrade to ~1.7B tier. Has 12% affiliate discount code to apply via support ticket.
- Git repo now exists on this project. Commit history in `git log`.
- `npm run dev` works (Astro builds pages on demand). `npm run build` now works (was broken by Zod schema bug, fixed 2026-06-16).

## Known Bugs / Cleanup Backlog

### 🔴 All fixed
- ~~Build bug: `banquet-dinner.md` Zod schema mismatch~~ — fixed by switching all 7 pricelist subSections to `columns` shape.
- ~~Build bug: `holiday-easter.md` & `holiday-mothers-day.md` contact field required name+title~~ — fixed by making them optional in schema.
- ~~Dead `MenuPage.astro` component~~ — deleted.
- ~~`terms.astro` back link → `index.html`~~ — fixed to `/`.
- ~~Dead `body { background: ... }` rules in 9 package/holiday pages~~ — all removed.
- ~~Pages CMS `lintFn` error on code field~~ — worked around by using structured form (no code field at all).

### 🟡 Design / consistency calls (open)
- None — all morning + afternoon cleanup done.

### 🟢 Production hygiene / deployment (open)
- **No deploy yet.** Site is on the user's old shared hosting. Plan: deploy to Cloudflare Pages (free, auto-deploys on git push). User has CF account already.
- No sitemap, robots.txt, or 404 page.
- Contact form `_next` URL → `https://www.spatricks.com/contact.html?sent=1` (old domain).
- `astro.config.mjs` is empty — no integrations, no image optimization.
- 8 small per-page `*.css` files (banquet-*, breakfast, holiday-easter, holiday-mothers-day, cocktail-parties) with redundant `.sp-pkg` wrapper style — could be moved into MenuPackage.

### 🟢 Pages CMS follow-ups (after first end-to-end test)
- Verify the structured form works for all section layouts (items, sides, pricelist, wine, info, promo) — the user only saw the list view work this session, hasn't tried editing yet
- Test the 4-level deep nesting (subSections > columns > items) — possible UI limit
- Test the `string` field with `list: true` for simple string arrays (group items, info card items) — uncertain Pages CMS support
- Invite the restaurant owner to Pages CMS via email (30 sec in the UI)

## Scoping the CMS (NEW — open design decision)

User reflection (2026-06-17 evening): the CMS may be overpowered for what the client actually needs. A restaurant owner typically only needs to:
- Add new meal listings
- Change prices
- Change descriptions

They probably do NOT need to:
- Add/remove entire menu sections
- Add/remove packages within a page
- Change layout types (items / sides / pricelist / wine / info / promo)
- Change page-level structural metadata (service, priceTier)

User's framing: "some powers best be not accessible to the uninitiated."

**Possible paths:**
1. **Hide destructive fields in `.pages.yml`** — keep only the "edit" controls. Simplest. Client sees a tamer form. Dev retains full power by editing .md directly.
2. **Role-based access** — Pages CMS doesn't support roles. Would need a different CMS or a fork.
3. **Two configs** — one for client (scoped), one for dev (full). Complexity cost.
4. **Trust the client + revert** — give full power, watch the commits, revert bad edits. Cheapest setup, most risk.

**My recommendation: Path 1.** Update `.pages.yml` to omit section/package add/remove controls and layout-type selector. Keep all field-level edits. Build a quick "owner user guide" doc showing what they can and can't do.

**Pending:** user decision on which path (or if scope-down is the right move at all).

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
- `src/content/menus/` — markdown content for menu pages (the CMS edits these)
- `src/content.config.ts` — Zod schema for menus collection
- `src/styles/` — global 3-tier CSS (system, header, footer, components, styles)
- `src/layouts/BaseLayout.astro` — top-level layout, imports all global CSS
- `public/` — static assets
- `dist/` — build output
- `turbokarth/` — memory system (this folder)
- `AGENTS.md` — entry point for any future agent
- `.pages.yml` — Pages CMS structured-form config (390 lines), read by app.pagescms.org
- GitHub repo: `https://github.com/drewcifer7840/seanpatricks-astro`
- Pages CMS hosted: `app.pagescms.org` (signed in as the GitHub user)
