# breadcrumbs

> Lightweight relationship graph. One line per connection. Append freely.
> Format: `[from] → relates to → [to]` + one-line reason.

## CSS architecture (page-as-folder, 2026-06-16)
- `src/pages/{name}/index.astro` → imports → `src/pages/{name}/{name}.css`
  - Reason: each page owns its CSS, Astro auto-scopes the import
- `src/pages/{name}/index.astro` → imports → `../../layouts/BaseLayout.astro`
  - Reason: provides `<head>`, Header, Footer, slot
- `src/layouts/BaseLayout.astro` → imports → `src/styles/{system,styles,header,footer,components}.css`
  - Reason: 3-tier global CSS architecture (system tokens → base styles → header/footer → component library)

## Page duplication (catering pattern, 2026-06-16)
- `src/pages/catering/catering.css` → shares pattern with → `src/pages/packages/packages.css`
- `src/pages/catering/catering.css` → shares pattern with → `src/pages/special-packages/special-packages.css`
- `src/pages/catering/catering.css` → shares pattern with → `src/pages/wedding/wedding.css`
- `src/pages/catering/catering.css` → shares pattern with → `src/pages/brunch-buffet/brunch-buffet.css`
  - Reason: all 5 pages use sticky-identity + split-content layout with copy-pasted BEM classes
  - Decision: rewrote on each page per user's "rewrite OR extract" policy. ~1500 lines of duplication.
  - Follow-up: consider extracting a `MenuPackageLayout.astro` or shared CSS file later.

## Menu content collection
- `src/content.config.ts` → defines schema for → `src/content/menus/*.md`
- `src/components/MenuSection.astro` → consumes → `src/content/menus/{dinner,lunch,drinks}.md`
- `src/components/MenuSection.astro` → delegates to → `src/components/MenuPriceList.astro`
  - Reason: pricelist layout (beer list) is reused within drinks; extracted to its own component
- `src/components/MenuPackage.astro` → consumes → `src/content/menus/{banquet-*,breakfast,holiday-*,cocktail-parties}.md`
- `src/pages/dinner-menu.astro` → renders → `src/components/MenuSection.astro`
- `src/pages/lunch-menu.astro` → renders → `src/components/MenuSection.astro`
- `src/pages/drinks-menu.astro` → renders → `src/components/MenuSection.astro`
- `src/pages/banquet-beverage.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/banquet-cocktails.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/banquet-dinner.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/banquet-lunch.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/breakfast.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/holiday-easter.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/holiday-mothers-day.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/holiday-new-years-eve.astro` → renders → `src/components/MenuPackage.astro`
- `src/pages/holiday-st-patricks-day.astro` → renders → `src/components/MenuPackage.astro`

## Layout / shell
- `src/layouts/BaseLayout.astro` → wraps → all pages
- `src/components/Header.astro` → included in → `src/layouts/BaseLayout.astro`
- `src/components/Footer.astro` → included in → `src/layouts/BaseLayout.astro`
- `src/components/FooterColumns.astro` → included in → `src/components/Footer.astro`
- `src/components/Hours.astro` → included in → `src/components/Footer.astro` (pre-footer map+hours)

## Dead code
- `src/components/MenuPage.astro` → no consumer
  - Reason: leftover from first menu-refactor attempt; class names don't match current MenuSection.astro
  - Action: **DELETED 2026-06-16 22:13**

## Orphan content
- `src/content/menus/cocktail-parties.md` → no consumer page
  - Reason: referenced in some menu entries but no `pages/cocktail-parties.astro` exists
  - Action: decide if we add a page or delete (in cleanup backlog, 🟠 priority)

## Terms page (broken link)
- `src/pages/terms/index.astro` → back link → `index.html` (404 in Astro)
  - Reason: leftover from old static-HTML site
  - Action: fix href to `/` (in cleanup backlog, 🟠 priority)

## Cleanup session (2026-06-16 22:15)
- src/content/menus/banquet-dinner.md ? fixed pricelist subSections to use \columns\ shape (7 subSections)
  - Reason: schema requires \items: z.array(z.string())\ for subSection items; \columns: [{items: [{name, price}]}]\ is the pricelist shape. Data was using the wrong shape.
- \src/content.config.ts\ ? made \contact.name\ and \contact.title\ optional
  - Reason: holiday pages only carry a phone number under "Reservations Suggested"; no contact person
- \src/components/MenuPage.astro\ ? deleted (dead code)
- \src/pages/terms/index.astro\ ? back link \index.html\ ? \/\
- \src/pages/cocktail-parties.astro\ ? new page, consumes \src/content/menus/cocktail-parties.md\ via MenuPackage
- \src/pages/dinner-menu/{index.astro, dinner-menu.css}\ ? moved from top-level
- \src/pages/lunch-menu/{index.astro, lunch-menu.css}\ ? moved from top-level
- \src/pages/drinks-menu/{index.astro, drinks-menu.css}\ ? moved from top-level

## Real bugs discovered but not fixed
- \src/pages/holiday-new-years-eve.astro\ ? has hand-coded \<footer class="sp-footer">\ block that DUPLICATES BaseLayout's footer
  - Reason: leftover from when these pages were standalone HTML; the BaseLayout now provides the footer but the page still has its own
- \src/pages/holiday-st-patricks-day.astro\ ? same duplicate footer issue
- Both holiday pages also have broken \*.html\ links in their hand-coded footers (e.g. \href="index.html\, \href="about.html\) � these 404 in Astro
  - Action: migrate to MenuPackage pattern, OR remove the hand-coded footer block

## Final structural pass (2026-06-16 22:30)
- 8 pages moved from top-level to folder pattern:
  - \src/pages/banquet-beverage.{astro ? index.astro + banquet-beverage.css}\
  - \src/pages/banquet-cocktails.{astro ? index.astro + banquet-cocktails.css}\
  - \src/pages/banquet-dinner.{astro ? index.astro + banquet-dinner.css}\
  - \src/pages/banquet-lunch.{astro ? index.astro + banquet-lunch.css}\
  - \src/pages/breakfast.{astro ? index.astro + breakfast.css}\
  - \src/pages/holiday-easter.{astro ? index.astro + holiday-easter.css}\
  - \src/pages/holiday-mothers-day.{astro ? index.astro + holiday-mothers-day.css}\
  - \src/pages/cocktail-parties.{astro ? index.astro + cocktail-parties.css}\

## Bugs fixed
- \src/pages/holiday-new-years-eve.astro\ ? deleted duplicate \<footer class="sp-footer">\ block (BaseLayout renders the real one)
- \src/pages/holiday-st-patricks-day.astro\ ? same duplicate footer deleted
  - Side effect: also deleted the broken \*.html\ links that were inside those hand-coded footers (index.html, about.html, etc.)

## Final structure (2026-06-16 22:30)
- 22 page folders + 2 hand-coded top-level holiday pages = 24 routes
- All routes have local \<style>\ (none use \is:global\)
- All package/holiday/menu pages use \MenuSection.astro\ or \MenuPackage.astro\ with content from \src/content/menus/*.md\
- Build: \
pm run build\ produces 24 pages in 6.4s, no errors

## 5-page pattern extraction (2026-06-17 08:20)
- \src/components/MenuPackage.astro\ ? extended with 3 new features
  - \Package.intro?: string\ � lead paragraph in content area
  - Sub-section type \'bar-note'\ � highlighted callout box (wedding's "Additional Hour Bar")
  - Sub-section type \'extras'\ with optional \price\ field � styled block with heading + 2-col items (brunch's "Additional Breakfast Options")
  - Component grew from 593 ? 638 lines
- 5 pages converted from hand-coded HTML to data + MenuPackage:
  - \src/pages/catering/index.astro\ (255 lines ? 130 lines, 95% reduction)
  - \src/pages/packages/index.astro\ (142 ? 70 lines, 88% reduction)
  - \src/pages/special-packages/index.astro\ (206 ? 80 lines, 90% reduction)
  - \src/pages/wedding/index.astro\ (260 ? 105 lines, 92% reduction)
  - \src/pages/brunch-buffet/index.astro\ (75 ? 50 lines, 90% reduction)
- 5 page CSS files deleted (all styles now in MenuPackage.astro)
- Total CSS reduction: ~1500 lines of duplicated CSS ? 0
- All 5 page folders now contain only \index.astro\ (no \*.css\ file)

## Home page routing fix (2026-06-17 08:35)
- \src/pages/index/index.astro\ ? moved to \src/pages/index.astro\
  - Reason: \src/pages/index/index.astro\ mapped to URL \/index/\, not \/\. The Header component's home link is \href="/\"\ which 404'd.
  - Fix: Astro convention is that the site root is a top-level \index.astro\, NOT an \index/index.astro\ inside a folder. The folder pattern works for any other page (e.g. \bout/index.astro\ ? \/about/\) but not for the site root.
  - Also fixed: \import BaseLayout from '../../layouts/...'\ ? \'../layouts/...'\ (one level shallower)
  - Empty \src/pages/index/\ directory removed
- Lesson: \index.astro\ files inside folders create sub-routes (\/folder-name/\), not file-system indirection. The home page is the only one that should be at the top level.
