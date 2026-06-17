import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * MENUS COLLECTION
 * ----------------
 * Structured menu data for the menu pages. Author menus as
 * Markdown frontmatter and render them through MenuSection.astro
 * (and the page that consumes the entry). This is the single
 * source of truth for menu content — pages compose, never duplicate.
 *
 * The schema covers the full shape we see on Sean Patrick's menu
 * pages: single prices, multi-price (cup/bowl), section footnotes,
 * dietary badges, and signature items.
 */

const badgeEnum = z.enum(['signature', 'new', 'gf', 'new-addon']);

const menuItem = z.object({
  name: z.string(),
  description: z.string().optional(),
  // Single price, e.g. "$14.50". Use priceOptions for multi-price.
  price: z.string().optional(),
  // Multi-price (cup/bowl, large/side, full/shrimp, etc.)
  priceOptions: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ).optional(),
  // True → card gets the brand-accent border on the left.
  signature: z.boolean().default(false),
  // Badges shown beneath the description.
  badges: z.array(badgeEnum).optional(),
  // Optional italic sub-text (e.g. wine region: "California", "Italy")
  region: z.string().optional(),
});

const menuSection = z.object({
  heading: z.string(),
  // Discriminator for the section's layout. Defaults to "items"
  // (the standard card grid used by lunch/dinner). Other values:
  //   sides      — 2-column block of plain list items (Sides & Add-Ons)
  //   pricelist  — auto-fit grid of compact name+price rows (beers)
  //   wine       — house wine + glass groups + bottles (the wine list)
  //   info       — 3-column info cards (Beverages / Kids / Dessert)
  //   promo      — promo cards (Happy Hour / Weekly Specials)
  layout: z.enum(['items', 'sides', 'pricelist', 'wine', 'info', 'promo']).default('items'),
  // Optional italic note shown between the heading and the items grid.
  note: z.string().optional(),
  // Section footnote (markdown allowed). E.g. "Protein add-ons: ..."
  footnote: z.string().optional(),
  // Standard menu items (the usual card grid). Used by layout="items".
  items: z.array(menuItem).optional(),
  // Sides layout: 2-column block of plain list items.
  groups: z.array(
    z.object({
      title: z.string(),
      items: z.array(z.string()),
    }),
  ).optional(),
  // Pricelist layout: auto-fit grid of name+price rows. Each column
  // is a list of {name, price} rows rendered as a compact card.
  columns: z.array(
    z.object({
      items: z.array(
        z.object({
          name: z.string(),
          price: z.string(),
        }),
      ),
    }),
  ).optional(),
  // Wine layout. house is a highlighted block at the top; glassGroups
  // are the "by the glass" sub-sections; bottles is the by-the-bottle
  // grid (uses standard menuItem shape with optional region).
  house: z.object({
    heading: z.string(),
    list: z.string(),
  }).optional(),
  glassGroups: z.array(
    z.object({
      label: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          price: z.string(),
          region: z.string(),
        }),
      ),
    }),
  ).optional(),
  bottles: z.array(menuItem).optional(),
  // Info layout: heading + bulleted-list cards.
  infoCards: z.array(
    z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
  ).optional(),
  // Promo layout: heading + optional hours + list, accent border.
  promos: z.array(
    z.object({
      heading: z.string(),
      hours: z.string().optional(),
      items: z.array(z.string()),
    }),
  ).optional(),
});

const menus = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/menus' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    service: z.enum(['lunch', 'dinner', 'banquet', 'catering', 'holiday', 'cocktails', 'beverage', 'brunch', 'breakfast']).default('banquet'),
    priceTier: z.enum(['$', '$$', '$$$']).optional(),
    // Menu-page layout: an array of sections (lunch, dinner, drinks).
    sections: z.array(menuSection).optional(),
    // Package-page layout: an array of "sticky identity + content" cards
    // (breakfast, banquets, holidays). Used when the page is a set of
    // discrete offers rather than a single menu list.
    packages: z.array(
      z.object({
        label: z.string(),
        // When true, renders as a single-column sub-card (no left identity).
        // Used for trailing sections like "Upgrades" or "Punch".
        compact: z.boolean().default(false),
        // Small uppercase label above the title (e.g. "Holiday Dining").
        eyebrow: z.string().optional(),
        meta: z.string().optional(),
        // Label for the reservations callout (e.g. "Reservations Suggested").
        reserveLabel: z.string().optional(),
        // Single price. For multiple, use `prices` below.
        price: z.string().optional(),
        priceUnit: z.string().optional(),
        prices: z.array(
          z.object({
            amount: z.string(),
            unit: z.string(),
          }),
        ).optional(),
        // Pricing tier table (used by holiday pages — Adults/Children/Free).
        priceTable: z.array(
          z.object({
            label: z.string(),
            amount: z.string(),
            free: z.boolean().optional(),
          }),
        ).optional(),
        // Italic rule note box (e.g. "Minimum 35 Adult Guests").
        ruleNote: z.string().optional(),
        // Contact callout at the bottom of the identity panel.
        // name/title are optional — some pages (e.g. holidays) only show
        // a phone number under a "Reservations Suggested" label.
        contact: z.object({
          name: z.string().optional(),
          title: z.string().optional(),
          phone: z.string().optional(),
          text: z.string().optional(),
        }).optional(),
        // Sub-sections in the content panel.
        subSections: z.array(
          z.object({
            title: z.string(),
            // Optional italic note above the items.
            note: z.string().optional(),
            // 'items' (default) is a bullet list.
            // 'pricelist' is name+price rows (potentially in columns).
            // 'sides' is a 2-col grid of plain list items.
            // 'upgrades' is bold-name + description (Carving Station, etc).
            type: z.enum(['items', 'pricelist', 'sides', 'upgrades']).default('items'),
            items: z.array(z.string()).optional(),
            // For 'pricelist': one or more columns of {name, price} rows.
            columns: z.array(
              z.object({
                items: z.array(
                  z.object({
                    name: z.string(),
                    price: z.string(),
                  }),
                ),
              }),
            ).optional(),
          }),
        ).optional(),
        // Optional footer note below the content panel.
        footerNote: z.string().optional(),
      }),
    ).optional(),
  }),
});

export const collections = { menus };
