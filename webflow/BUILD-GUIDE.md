# Ben Bivins Tree Experts — Webflow Build Guide

Everything you need to rebuild the site in Webflow. The live static site is your
visual reference — keep it open side-by-side:

- **Reference site:** https://oakleafdave.github.io/benbivins-tree-experts/
- **Source code (for exact CSS values):** https://github.com/OakLeafDave/benbivins-tree-experts

## What's in this folder

| File | Use |
|---|---|
| `blog-posts.csv` | Import → **Blog Posts** CMS Collection (54 items) |
| `service-areas.csv` | Import → **Service Areas** CMS Collection (22 town/county pages) |
| `pages/*.html` | Clean body HTML for the 15 hand-built static pages — paste into Rich Text blocks |

All images in the CSVs point to your live GitHub Pages URLs, so Webflow pulls and
re-hosts them automatically on import. No manual image uploads needed for CMS items.

---

## 1. Design tokens (set these first)

**Google Fonts** (Project Settings → Fonts → add):
- **Barlow Condensed** — headings, buttons, nav (weights 500/600/700)
- **Inter** — body text (weights 400/500/600/700)

**Colors** (create as Webflow Swatches):

| Name | Hex | Use |
|---|---|---|
| Forest Green | `#199727` | primary brand / links |
| Green Dark | `#14721E` | link hover, headings accent |
| Green Deep | `#0E5417` | dark hero gradient |
| Lime | `#7FBA42` | eyebrows, nav hover |
| Orange | `#F9941C` | primary CTA buttons |
| Orange Dark | `#E07D05` | CTA hover |
| Charcoal | `#171717` | header / footer bg |
| Charcoal 2 | `#242424` | dropdown bg |
| Ink | `#1E2420` | body headings/text |
| Muted | `#5F6B62` | secondary text |
| Line | `#E5E9E4` | borders |
| BG Alt | `#F4F7F2` | alternating section bg |

**Type scale:** H1 clamp 2–3.2rem 700 uppercase (Barlow Condensed) · H2 ~2rem ·
H3 ~1.3rem · body 1.06rem/1.65 (Inter). Headings use `letter-spacing: .01em`,
UPPERCASE for hero/section titles, normal-case inside article prose.

**Buttons:**
- Primary CTA: Orange bg, white text, 10px radius, Barlow Condensed uppercase,
  padding .95rem 1.8rem, subtle drop shadow. Hover → Orange Dark, lift 2px.
- Ghost (on dark): transparent bg, white text, 2px white 55% border.

---

## 2. Global: Navbar (with the two dropdowns)

Use a Webflow **Navbar** component + two **Dropdown** components. Structure exactly
mirrors his live menu:

```
Home
Services ▾   (dropdown; parent links to /tree-service)
   ├ Tree Removal              /tree-removal
   ├ Emergency Tree Service    /emergency-tree-service
   ├ Pruning, Trimming & Crown Reduction   /pruning-trimming
   └ Firewood                  /firewood
About Us ▾   (dropdown; parent links to /about-us)
   ├ Why Choose Us             /why-choose-us
   ├ Licensed and Insured      /licensed-and-insured
   ├ FAQ                       /faq
   ├ Job Opportunities         /job-opportunities
   └ Testimonials             /testimonials
Service Areas   /service-areas
Blog            /blog
609-698-4992    tel:+16096984992   (lime colored)
[ Get a Free Quote ]  → /contact  (orange button)
```

Above the navbar, add a thin **top bar** (Charcoal bg): left = "📍 76 S Main St,
Barnegat, NJ 08005 • Licensed & Insured", right = "★★★★★ 60+ Five-Star Reviews"
and the phone. Dropdown menus: Charcoal 2 bg, 12px radius, white links, hover =
Forest Green fill.

**Footer** (Charcoal bg): logo + blurb, then 3 link columns (Services / Company /
Contact) — copy the columns from the reference site footer.

---

## 3. CMS Collections

### Collection A — "Blog Posts"  (URL path: `/blog`)
Create these fields, then import `blog-posts.csv` and map columns → fields:

| Webflow field | Type | CSV column |
|---|---|---|
| Name | Plain text (default) | Name |
| Slug | Slug (default) | Slug |
| Post Summary | Plain text | Post Summary |
| Post Body | **Rich text** | Post Body |
| Main Image | **Image** | Main Image |
| Published Date | Date/Time | Published Date |
| SEO Title | Plain text | SEO Title |
| SEO Description | Plain text | SEO Description |

### Collection B — "Service Areas"  (URL path: `/service-areas`)
Import `service-areas.csv`:

| Webflow field | Type | CSV column |
|---|---|---|
| Name | Plain text | Name |
| Slug | Slug | Slug |
| City | Plain text | City |
| Intro Summary | Plain text | Intro Summary |
| Body Content | **Rich text** | Body Content |
| Main Image | **Image** | Main Image |
| SEO Title / SEO Description | Plain text | (matching cols) |

> **Import tip:** On the import screen, set the Main Image column type to "Image"
> and Webflow will fetch each image from its URL. Set Post Body / Body Content to
> "Rich text" — Webflow parses the HTML (headings, paragraphs, images, links).

### Collection Templates (design once → all pages generated)
- **Blog Post template:** page hero with green gradient band → H1 = Name, breadcrumb
  Home › Blog › Name → Published Date → Rich text (Post Body) → CTA band → footer.
- **Service Area template:** same hero → H1 = Name → Rich text (Body Content) →
  CTA band. Optionally add a static "Towns we serve" list linking other Service
  Area items (Collection List filtered).

Style the Rich Text element once (see prose styles in the reference `style.css`):
links = Green Dark underlined, images = 12px radius + soft shadow, `.alignright`/
`.alignleft` float classes for the inset photos.

---

## 4. Static pages (build by hand, 15 total)

Each has clean body HTML in `pages/<slug>.html` — paste into a Rich Text block, or
rebuild with native Webflow sections for the key ones. Pages:

- **Home** — rebuild with real sections (hero, services grid, why-choose-us, stats,
  gallery, service areas, reviews, quote form). Reference site homepage is the model.
- Tree Service (services overview), Tree Removal, Emergency Tree Service,
  Pruning/Trimming (`tree-care-ocean-county`), Firewood, Tree Care
- About Us, Why Choose Us, Licensed and Insured, FAQ, Job Opportunities, Testimonials
- Service Areas (index — add a Collection List of the Service Areas collection)
- Contact Us — use a native **Webflow Form** (Name, Phone, Email, Service select,
  Details) so submissions actually email you. Set the form notification in
  Project Settings → Forms.

---

## 5. Order of operations (fastest path)

1. Add fonts + color swatches + button classes.
2. Build Navbar (with dropdowns) + top bar + Footer as global symbols.
3. Create the two CMS Collections and **import the CSVs**.
4. Design the two Collection page templates → 74 pages populate instantly.
5. Build the Home page, then the remaining static pages (paste from `pages/`).
6. Wire the Contact form. Publish.

Fonts, colors, and every section's exact spacing/shadow are in the reference
`style.css` if you want pixel-accurate values while styling in Webflow.
