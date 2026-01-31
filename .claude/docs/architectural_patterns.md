# Architectural Patterns

## Application Bootstrap

Module-less standalone Angular 19 app. No `NgModule` anywhere.

- Bootstrap: `src/main.ts:1-6` — `bootstrapApplication(AppComponent, appConfig)`
- Config: `src/app/app.config.ts:1-8` — provides zone change detection and router only

## Routing

Flat routing with no lazy loading, guards, or resolvers (`src/app/app.routes.ts:1-14`).
Routes use numeric `:id` params despite the data model having a `slug` field.
Wildcard `**` redirects to root (line 13).

## Dependency Injection

All services use `providedIn: 'root'` singleton pattern:
- `src/app/services/recipe.service.ts:23-24`

Constructor injection throughout:
- `src/app/pages/recipes/recipes.component.ts:52-56` — RecipeService, ActivatedRoute, Router
- `src/app/pages/recipe-details/recipe-details.component.ts:21-24` — ActivatedRoute, RecipeService
- `src/app/components/more-recipes/more-recipes.component.ts:21` — RecipeService

## State Management (Hybrid Signals + Observables)

The codebase mixes three reactivity approaches:

### Angular Signals (modern)
Used for component UI state and derived filtering:
- `src/app/pages/recipes/recipes.component.ts:25-30` — `signal()` for filter state
- `src/app/pages/recipes/recipes.component.ts:32-50` — `computed()` for derived filtered results
- `src/app/pages/recipes/recipes.component.ts:57-59` — `effect()` for URL sync side effect
- Filter components: `max-prep-time.component.ts:16`, `max-cook-time.component.ts:18`, `search-filter.component.ts:14`

### RxJS Observables
Used in services for data access:
- `src/app/services/recipe.service.ts:29-61` — all methods return `Observable<>`
- Components subscribe in `ngOnInit` or route param handlers

### Plain Properties
Some components use neither signals nor observables:
- `src/app/pages/recipe-details/recipe-details.component.ts:16-19`
- `src/app/components/more-recipes/more-recipes.component.ts:18-19`
- `src/app/components/menu/menu.component.ts:21`

## Data Loading

No HTTP calls. Data is statically imported at build time:
- `src/app/services/recipe.service.ts:3` — `import recipesData from '../../../public/data.json'`
- `src/app/services/recipe.service.ts:27` — stored as `private recipes: Recipe[]`
- Service wraps data in `of()` observables to simulate async behavior

## Component Communication

**Parent → Child**: Input bindings using both `@Input()` decorators and `input()` signal functions (see `component_patterns.md` for details).

**Child → Parent**: `@Output() EventEmitter` consistently used for filter events:
- `max-prep-time.component.ts:13`, `max-cook-time.component.ts:15`, `search-filter.component.ts:12`

**Content Projection**: `ContainerComponent` uses `<ng-content>` as a layout wrapper (`src/app/components/container/container.component.html:2`).

## Filtering Pipeline (Client-Side)

All filtering happens in `RecipesComponent` via computed signals:
1. `allRecipes` signal populated from service (`recipes.component.ts:25`)
2. `computed()` filters by prepTime, cookTime, and searchTerm (`recipes.component.ts:32-50`)
3. Search matches against `recipe.title` and `recipe.ingredients[]` (case-insensitive)

## URL Synchronization

Filters persist to URL query params for shareable/bookmarkable state:
- **URL → State**: `recipes.component.ts:75-88` reads `prepTime`, `cookTime`, `search` from query params on init
- **State → URL**: `recipes.component.ts:57-59` effect triggers `updateUrlParams()` on signal changes
- **Restore**: Signal inputs flow URL state back to child filter components (`recipes.component.html:16,20,24`)

## Simulated Loading Delay

Both data-fetching pages wrap service calls in `setTimeout(..., 500)`:
- `src/app/pages/recipes/recipes.component.ts:65`
- `src/app/pages/recipe-details/recipe-details.component.ts:28`

## Known Issues

- **No subscription cleanup**: No component implements `OnDestroy` or uses `takeUntil`/`DestroyRef`
- **Unused service methods**: `getRecipeBySlug()` (line 51) and `searchRecipes()` (line 55) are never called
- **Debug artifact**: `max-cook-time.component.ts:26` has a leftover `console.log()`
- **Biased shuffle**: `more-recipes.component.ts:28` uses `Math.random() - 0.5` sort (not a uniform shuffle)
