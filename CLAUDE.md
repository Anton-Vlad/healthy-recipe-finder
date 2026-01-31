# Healthy Recipe Finder

Angular 19 web app for browsing and filtering healthy recipes. Users search by ingredients/title and filter by prep/cook time. All data is static (no backend) — loaded from `public/data.json` at build time.

## Tech Stack

- **Angular 19.2** — standalone components, signals, no NgModules
- **TypeScript 5.7** — strict mode enabled
- **Tailwind CSS 3.4** — utility-first styling in templates
- **RxJS 7.8** — used in services (observables wrapping static data)
- **Karma + Jasmine** — unit testing
- **No HTTP** — data imported statically via `import recipesData from '../../../public/data.json'` in `recipe.service.ts:3`

## Commands

```bash
npm start       # Dev server → http://localhost:4200/
npm run build   # Production build → dist/healthy-recipe-finder/
npm run watch   # Dev build with file watching
npm test        # Unit tests via Karma + Jasmine
```

## Project Structure

```
src/app/
├── app.routes.ts                  # Route definitions (4 routes + wildcard)
├── app.config.ts                  # Providers: zone detection, router
├── services/
│   └── recipe.service.ts          # Data access — getAllRecipes(), getRecipeById()
├── pages/
│   ├── home/                      # Static landing page
│   ├── about/                     # Static about page
│   ├── recipes/                   # Recipe listing — filtering, signals, URL sync
│   └── recipe-details/            # Single recipe view with loading/error states
└── components/
    ├── menu/                      # Nav bar — desktop + mobile hamburger
    ├── container/                 # Responsive layout wrapper (<ng-content>)
    ├── banner/                    # CTA banner
    ├── differentiators/           # Reusable feature list section
    ├── recipe-grid/               # Card grid display
    ├── recipe-times/              # Servings/prep/cook badges
    ├── more-recipes/              # Random related recipes
    └── recipe-filters/            # Filter controls
        ├── search-filter/         #   Text search input
        ├── max-prep-time/         #   Prep time dropdown
        └── max-cook-time/         #   Cook time dropdown

public/
├── data.json                      # Recipe database (8 recipes, 233 lines)
└── recipes/                       # Recipe images

src/styles.css                     # Global design system — CSS variables, typography presets
```

## Routes (`src/app/app.routes.ts`)

| Path | Component |
|------|-----------|
| `/` | HomeComponent |
| `/about` | AboutComponent |
| `/recipes` | RecipesComponent (query params: `prepTime`, `cookTime`, `search`) |
| `/recipes/:id` | RecipeDetailsComponent |
| `**` | Redirect → `/` |

## Recipe Data Shape (`recipe.service.ts:5-18`)

Fields: `id`, `title`, `slug`, `image` (large/small), `overview`, `servings`, `prepMinutes`, `cookMinutes`, `ingredients[]`, `instructions[]`

## Key Architecture Decisions

- **Signals for UI state** — filter state and derived data use `signal()` / `computed()` (`recipes.component.ts:25-50`)
- **Observables in services** — service methods return `Observable<>` wrapping static data
- **Client-side filtering** — computed signal in RecipesComponent, not the service
- **URL-synced filters** — `effect()` syncs signal state ↔ query params (`recipes.component.ts:57-59, 75-115`)
- **Mixed old/new Angular APIs** — `@Input()` and `input()`, `*ngFor` and `@for` coexist (incremental migration)
- **Template-driven forms** — `[(ngModel)]` in filter components, not reactive forms

## Additional Documentation

Check these files for deeper context when working on specific areas:

| File | When to check |
|------|--------------|
| `.claude/docs/architectural_patterns.md` | Modifying data flow, state management, routing, or DI |
| `.claude/docs/component_patterns.md` | Adding/modifying components — input/output conventions, lifecycle patterns |
| `.claude/docs/styling_patterns.md` | Styling changes — design system variables, breakpoints, Tailwind usage |
