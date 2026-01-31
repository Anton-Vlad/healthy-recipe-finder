# Styling Patterns

## Architecture Overview

Three-layer styling approach:
1. **Tailwind CSS** — utility classes in templates for layout, spacing, responsive design
2. **Global CSS variables + custom classes** — design system in `src/styles.css`
3. **Component-scoped CSS** — nearly all empty; only `menu.component.css` has styles

## Global Design System (`src/styles.css`, 202 lines)

### CSS Custom Properties (lines 9-26)

**Neutral palette:**
- `--color-neutral-900` (#163A34) through `--color-neutral-0` (#FFFFFF) — 6 shades

**Accent colors:**
- `--color-orange-500` (#FE9F6B)
- `--color-teal-500` (#49AC9B)
- `--color-indigo-500` (#697DDB)

**Font families:**
- `--font-nunito` — headings
- `--font-nunito-sans` — body text

### Typography Presets (lines 34-130)

10 text preset classes: `.text-preset-1` (largest) through `.text-preset-10` (smallest).
- Presets 1-2 have responsive variants at 640px and 1024px breakpoints
- Used directly in templates, not via Tailwind `@apply`

### Custom Utility Classes (lines 132-163)

Hand-written `.text-neutral-*`, `.bg-neutral-*`, `.border-neutral-*` classes referencing CSS variables.
These shadow Tailwind's default color utilities since both systems are active.

### Global Element Styles (lines 165-201)

- Body: `--color-neutral-100` background
- Paragraphs: `--color-neutral-500` text color
- Headings (h1-h6): `--color-neutral-900` text color
- Links: hover transitions
- `.active-link::after`: orange underline indicator for active nav

### Global Border Override (lines 28-31)

All elements default to `border-color: var(--color-neutral-300)`.

## Tailwind Usage in Templates

### Layout Patterns
- Flexbox: `flex`, `flex-row`, `flex-col`, `justify-between`, `items-center`
- Grid: `grid`, `grid-cols-1`, `lg:grid-cols-3`, `gap-8`

### Responsive Prefixes
Mobile-first with `md:` and `lg:` breakpoints:
- Container widths: `px-4 md:px-8 md:max-w-[704px] lg:max-w-[1192px]` (`container.component.html:1`)
- Show/hide: `hidden lg:flex` / `flex lg:hidden` for mobile menu (`menu.component.html:12,27`)
- Grid columns: `grid-cols-1 md:grid-cols-1 lg:grid-cols-3` (`recipe-grid.component.html:1`)

### Arbitrary Values
Used for specific dimensions: `h-[300px]`, `w-[60px]`, `max-w-[790px]`

## Component-Scoped CSS

Almost all component `.css` files are **empty**. All styling is done via Tailwind utilities and global classes.

Exception: `src/app/components/menu/menu.component.css` (26 lines) — defines `slideDown`/`slideUp` keyframe animations for mobile menu toggle.

## Image Handling

- `NgOptimizedImage` with `ngSrc` and `priority` attribute for above-fold images
- Responsive images via `srcset` with multiple sizes: `home.component.html:37-40`, `about.component.html:27-29`
- Inline SVG for icons throughout templates (no icon library)

## Breakpoints Summary

| Breakpoint | CSS Media Query | Tailwind Prefix | Usage |
|-----------|----------------|-----------------|-------|
| Mobile | default | (none) | Base styles |
| Tablet | 640px / 768px | `md:` | Container width, image sizes |
| Desktop | 1024px | `lg:` | Grid columns, menu toggle, container width |
| Wide | — | `xl:` | Used once in `about.component.html:36` |
