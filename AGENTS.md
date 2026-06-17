# AGENTS.md

> **If you are an AI agent reading this:** start with `turbokarth/lane.md`. It has the project's current state, decisions, constraints, and cleanup backlog. Then read `turbokarth/summary.md` and the latest entry in `turbokarth/journal/`.

---

# Sean Patrick's Emerald Isle — Astro site

## Project type
Live production restaurant site. Paying client. Treat all changes as deployment-affecting.

## Stack
- **Astro 6.4.6** (no integrations configured)
- **Node 22.12+** (installed at `C:\nvm4w\nodejs\npm.cmd`)
- **CSS:** hand-rolled 3-tier architecture in `src/styles/` (system.css, styles.css, header.css, footer.css, components.css)
- **No git** repository on this project
- **No CI / deploy automation** configured

## Commands
```bash
npm run dev      # start dev server on http://localhost:4321/
npm run build    # ✓ clean — 24 pages, ~6s
npm run preview  # preview the production build
```

> **Important for shell usage on this machine:** `cmd.exe` is blocked by permissions. Use `Start-Process -FilePath "C:\nvm4w\nodejs\npm.cmd" -ArgumentList "run","dev" -WorkingDirectory "<project>" -RedirectStandardOutput <log> -RedirectStandardError <log> -NoNewWindow -PassThru` (permission already granted).

## Directory layout
```
seanpatricks-astro/
├── AGENTS.md                            # this file
├── turbokarth/                          # memory system
│   ├── lane.md                          # current project state
│   ├── summary.md                       # human recap
│   ├── breadcrumbs.md                   # file/idea relationships
│   └── journal/                         # dated task logs
└── src/
    ├── pages/                           # 24 routes total
    │   ├── about/{index.astro, about.css}
    │   ├── brunch-buffet/{index.astro, brunch-buffet.css}
    │   ├── catering/{index.astro, catering.css}
    │   ├── contact/{index.astro, contact.css}
    │   ├── dinner-menu/{index.astro, dinner-menu.css}     # uses MenuSection
    │   ├── drinks-menu/{index.astro, drinks-menu.css}     # uses MenuSection
    │   ├── gallery/{index.astro, gallery.css}
    │   ├── hours/{index.astro, hours.css}
    │   ├── index.astro                                    # home page (top-level, NOT in a folder)
    │   ├── lunch-menu/{index.astro, lunch-menu.css}      # uses MenuSection
    │   ├── packages/{index.astro, packages.css}           # uses .sp-catering* class names
    │   ├── special-packages/{index.astro, special-packages.css}
    │   ├── terms/{index.astro, terms.css}
    │   ├── wedding/{index.astro, wedding.css}
    │   ├── cocktail-parties/{index.astro, cocktail-parties.css}
    │   ├── banquet-beverage/{index.astro, ...}
    │   ├── banquet-cocktails/
    │   ├── banquet-dinner/
    │   ├── banquet-lunch/
    │   ├── breakfast/
    │   ├── holiday-easter/
    │   ├── holiday-mothers-day/
    │   ├── holiday-new-years-eve.astro                    # hand-coded coming-soon
    │   └── holiday-st-patricks-day.astro                  # hand-coded coming-soon
    │
    ├── components/
    │   ├── MenuSection.astro           # universal menu section renderer (6 layouts)
    │   ├── MenuPriceList.astro         # extracted sub-component for beer list
    │   ├── MenuPackage.astro           # package page renderer (4 sub-section types)
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── FooterColumns.astro
    │   └── Hours.astro
    │
    ├── content/
    │   ├── menus/                      # markdown for all menu/package pages
    │   └── config.ts                   # Zod schema for menus collection
    │
    ├── layouts/
    │   └── BaseLayout.astro            # wraps all pages, imports global CSS + Header/Footer
    │
    └── styles/
        ├── system.css                  # tokens, body bg, font, reset
        ├── styles.css
        ├── header.css
        ├── footer.css
        └── components.css
```

## CSS architecture rules
1. **Each page is a self-contained folder** with `index.astro` + `{name}.css`. No exceptions, no global styles.
2. **No `is:global` on page styles.** Astro scopes `import './page.css'` automatically.
3. **Body-level rules** belong on a wrapper class (e.g. `.sp-hours-page`, `.terms`), not on `body`, because scoped CSS doesn't apply to elements rendered by the layout.
4. **Redundant globals** (like `body { background: var(--bg-page) }`) — do NOT include in page CSS. They're already in `src/styles/system.css`.

## Content collection schema
Single `menus` collection (`src/content/menus/*.md`) with two shapes per entry:
- **`sections` array** — for menu-list pages (dinner, lunch, drinks). 6 layout discriminators: `items` / `sides` / `pricelist` / `wine` / `info` / `promo`. Renders via `MenuSection.astro`.
- **`packages` array** — for package pages (banquet-*, breakfast, holiday-easter, holiday-mothers-day, cocktail-parties). Each package has identity (label, price, meta) + subSections. Renders via `MenuPackage.astro`.

Common frontmatter: `title`, `summary`, `service` (enum), `priceTier` ($, $$, $$$).

For `type: pricelist` subSections, use the `columns: [{ items: [{name, price}] }]` shape — NOT `items: [{name, price}]` directly. The flat shape is a Zod schema error.

## Conventions
- BEM naming: `.sp-{page}__{element}--{modifier}` (e.g. `.sp-catering__split`, `.sp-gallery__filter-btn[aria-pressed="true"]`)
- Display headings: `font-family: var(--font-display)` (Playfair Display from Google Fonts)
- Body text: `font-family: var(--font-body)` (Lora)
- Color tokens: `var(--text-brand)`, `var(--bg-surface)`, `var(--border-brand)`, etc. — all defined in `src/styles/system.css`

## What NOT to do
- Don't introduce new CSS variable names — use the existing system in `src/styles/system.css`.
- Don't add `is:global` back to any page styles.
- Don't touch the `src/styles/*.css` global files unless explicitly asked.
- Don't auto-extract the "catering pattern" into a shared component without explicit user OK — it's a design decision, not mechanical.
- Don't use `cmd.exe` from shell. Use `Start-Process -FilePath "C:\nvm4w\nodejs\npm.cmd"`.
- Don't write `body { background }` rules in page CSS — system.css handles it.

## Memory system
- Project-local: `turbokarth/lane.md` (current state), `turbokarth/journal/` (history), `turbokarth/breadcrumbs.md` (relationships), `turbokarth/summary.md` (recap).
- Mavis-native: `~/.mavis/scratchpads/<session>/scratchpad.md` (in-session), `~/.mavis/memory/user.md` (cross-project user prefs).
- **Startup ritual:** read `turbokarth/lane.md` → `summary.md` → latest journal entry → breadcrumbs.md. Output 3-4 sentence orientation. Ask if user wants to continue.
- **Shutdown ritual:** update lane.md → write journal entry → update breadcrumbs → update summary → tell user.
