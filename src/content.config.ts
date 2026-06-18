import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections for Sean Patrick's Emerald Isle.
 *
 * Layout: one collection per Custom Post Type (CPT) in WP terms.
 * Each CPT has a focused schema that only exposes the fields relevant
 * to that content category. Pages CMS (`.pages.yml`) mirrors this split
 * so the editor UI only shows fields relevant to the entry being edited.
 *
 * CPT map:
 *   menu             — dine-in menus (lunch, dinner, drinks)
 *   banquet_package  — group/banquet offerings (lunch, dinner, breakfast, cocktail parties)
 *   beverage_service — beverage packages (open bar, beer/wine/soda)
 *   holiday_special  — holiday events (Easter, Mother's Day, etc.)
 *
 * The catering_event CPT (catering, packages, wedding, brunch-buffet,
 * special-packages) is queued for a future session — those 5 pages still
 * have local data in their .astro files. See lane.md "Scoping the CMS".
 */

// ---------------------------------------------------------------------------
// Shared fragments
// ---------------------------------------------------------------------------

const badgeEnum = z.enum(['signature', 'new', 'gf', 'new-addon']);

const menuItem = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string().optional(),
  priceOptions: z.array(
    z.object({ label: z.string(), value: z.string() }),
  ).optional(),
  signature: z.boolean().default(false),
  badges: z.array(badgeEnum).optional(),
  region: z.string().optional(),
});

const menuSection = z.object({
  heading: z.string(),
  layout: z.enum(['items', 'sides', 'pricelist', 'wine', 'info', 'promo']).default('items'),
  note: z.string().optional(),
  footnote: z.string().optional(),
  items: z.array(menuItem).optional(),
  groups: z.array(
    z.object({ title: z.string(), items: z.array(z.string()) }),
  ).optional(),
  columns: z.array(
    z.object({
      items: z.array(z.object({ name: z.string(), price: z.string() })),
    }),
  ).optional(),
  house: z.object({ heading: z.string(), list: z.string() }).optional(),
  glassGroups: z.array(
    z.object({
      label: z.string(),
      items: z.array(z.object({ name: z.string(), price: z.string(), region: z.string() })),
    }),
  ).optional(),
  bottles: z.array(menuItem).optional(),
  infoCards: z.array(
    z.object({ heading: z.string(), items: z.array(z.string()) }),
  ).optional(),
  promos: z.array(
    z.object({
      heading: z.string(),
      hours: z.string().optional(),
      items: z.array(z.string()),
    }),
  ).optional(),
});

const packageEntry = z.object({
  label: z.string(),
  compact: z.boolean().default(false),
  eyebrow: z.string().optional(),
  meta: z.string().optional(),
  reserveLabel: z.string().optional(),
  price: z.string().optional(),
  priceUnit: z.string().optional(),
  prices: z.array(
    z.object({ amount: z.string(), unit: z.string() }),
  ).optional(),
  priceTable: z.array(
    z.object({ label: z.string(), amount: z.string(), free: z.boolean().optional() }),
  ).optional(),
  ruleNote: z.string().optional(),
  contact: z.object({
    name: z.string().optional(),
    title: z.string().optional(),
    phone: z.string().optional(),
    text: z.string().optional(),
  }).optional(),
  subSections: z.array(
    z.object({
      title: z.string(),
      note: z.string().optional(),
      type: z.enum(['items', 'pricelist', 'sides', 'upgrades']).default('items'),
      items: z.array(z.string()).optional(),
      columns: z.array(
        z.object({
          items: z.array(z.object({ name: z.string(), price: z.string() })),
        }),
      ).optional(),
    }),
  ).optional(),
  footerNote: z.string().optional(),
});

// ---------------------------------------------------------------------------
// CPT 1: Dine-in menu (lunch, dinner, drinks)
// ---------------------------------------------------------------------------

const menu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/menu' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    service: z.enum(['lunch', 'dinner', 'cocktails']).default('lunch'),
    priceTier: z.enum(['$', '$$', '$$$']).optional(),
    sections: z.array(menuSection).optional(),
  }),
});

// ---------------------------------------------------------------------------
// CPT 2: Banquet package (banquet lunches/dinners, cocktail parties, breakfast)
// ---------------------------------------------------------------------------

const banquet_package = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/banquet_package' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    service: z.enum(['banquet', 'cocktails', 'breakfast']).default('banquet'),
    priceTier: z.enum(['$', '$$', '$$$']).optional(),
    packages: z.array(packageEntry).optional(),
  }),
});

// ---------------------------------------------------------------------------
// CPT 3: Beverage service (open bar, beer/wine/soda packages)
// ---------------------------------------------------------------------------

const beverage_service = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/beverage_service' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    service: z.enum(['beverage']).default('beverage'),
    priceTier: z.enum(['$', '$$', '$$$']).optional(),
    packages: z.array(packageEntry).optional(),
  }),
});

// ---------------------------------------------------------------------------
// CPT 4: Holiday special (Easter, Mother's Day, etc.)
// ---------------------------------------------------------------------------

const holiday_special = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/holiday_special' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    service: z.enum(['holiday']).default('holiday'),
    priceTier: z.enum(['$', '$$', '$$$']).optional(),
    packages: z.array(packageEntry).optional(),
  }),
});

export const collections = {
  menu,
  banquet_package,
  beverage_service,
  holiday_special,
};
