/**
 * badges.ts
 * ---------
 * The controlled vocabulary for menu item "feature pills" — the small
 * colored tags that appear under a menu item's description (e.g. "Signature",
 * "New", "Gluten Free", "New Add-on").
 *
 * ── WordPress-style "taxonomy" framing ─────────────────────────────
 * In WordPress, a taxonomy is a named, controlled vocabulary of terms
 * (like "Tags" or "Categories") that posts can be associated with. The
 * vocabulary lives in one place and is referenced everywhere.
 *
 * That's what this file is. The vocabulary for badges is defined once
 * here, and:
 *   • The card component (MenuSection.astro) reads from it to render pills
 *   • Pages CMS reads from it (synced by hand into .pages.yml) to show
 *     a multi-select dropdown to the client
 *   • Any future agent / Astro / API code can import the same vocabulary
 *
 * ── How to add a new badge ─────────────────────────────────────────
 * 1. Add a new entry to BADGES below (slug, label — keep it short)
 * 2. Add the slug to the `options.values` list in `.pages.yml` under
 *    the `badges` field in the items schema
 * 3. (Optional) Add a CSS variant in MenuSection.astro's `<style>` block
 *    if you want a new color
 *
 * Existing data won't break. Clients won't be able to add new badges
 * (only pick from the dropdown) — that's the whole point of a controlled
 * vocabulary.
 *
 * ── Existing badges (do not change slugs without data migration) ───
 * • signature  — chef's signature item (brand accent)
 * • new        — new menu item (callout)
 * • gf         — gluten free (neutral)
 * • new-addon  — new add-on option (callout)
 */

export interface Badge {
  /** Stable identifier stored in the .md frontmatter. Do not rename. */
  slug: string;
  /** Human-readable label shown in the rendered pill. */
  label: string;
}

export const BADGES: readonly Badge[] = [
  { slug: 'signature', label: 'Signature' },
  { slug: 'new', label: 'New' },
  { slug: 'gf', label: 'Gluten Free' },
  { slug: 'new-addon', label: 'New Add-on' },
] as const;

export type BadgeSlug = (typeof BADGES)[number]['slug'];

/**
 * Look up the display label for a badge slug.
 * Falls back to title-casing the slug if it's not in the vocabulary
 * (so unknown slugs don't crash the page).
 */
export const badgeLabel = (slug: string): string => {
  const found = BADGES.find((b) => b.slug === slug);
  if (found) return found.label;
  return slug.charAt(0).toUpperCase() + slug.slice(1);
};
