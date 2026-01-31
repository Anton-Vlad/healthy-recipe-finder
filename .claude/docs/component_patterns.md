# Component Patterns

## Component Inventory

14 components total across pages (4) and reusable components (10).

### Pages
| Component | File | Complexity |
|-----------|------|-----------|
| HomeComponent | `src/app/pages/home/home.component.ts` | Static template |
| AboutComponent | `src/app/pages/about/about.component.ts` | Static template |
| RecipesComponent | `src/app/pages/recipes/recipes.component.ts` | Heavy — signals, filtering, URL sync (128 lines) |
| RecipeDetailsComponent | `src/app/pages/recipe-details/recipe-details.component.ts` | Route params, loading/error states |

### Reusable Components
| Component | File | Purpose |
|-----------|------|---------|
| MenuComponent | `src/app/components/menu/menu.component.ts` | Nav with mobile hamburger |
| ContainerComponent | `src/app/components/container/container.component.ts` | Layout wrapper via `<ng-content>` |
| BannerComponent | `src/app/components/banner/banner.component.ts` | CTA banner |
| DifferentiatorsComponent | `src/app/components/differentiators/differentiators.component.ts` | Reusable list section |
| RecipeGridComponent | `src/app/components/recipe-grid/recipe-grid.component.ts` | Card grid |
| RecipeTimesComponent | `src/app/components/recipe-times/recipe-times.component.ts` | Prep/cook time display |
| MoreRecipesComponent | `src/app/components/more-recipes/more-recipes.component.ts` | Random recipe suggestions |
| MaxPrepTimeComponent | `src/app/components/recipe-filters/max-prep-time/max-prep-time.component.ts` | Dropdown filter |
| MaxCookTimeComponent | `src/app/components/recipe-filters/max-cook-time/max-cook-time.component.ts` | Dropdown filter |
| SearchFilterComponent | `src/app/components/recipe-filters/search-filter/search-filter.component.ts` | Text search input |

## Input Patterns — Two Styles Coexist

### Classic `@Input()` Decorator
- `menu.component.ts:12-19` — `logo`, `navLinks`, `ctaButtonLabel`, `ctaButtonRoute`
- `differentiators.component.ts:15-17` — `customClasses`, `title`, `items`
- `recipe-times.component.ts:12` — `recipe: Recipe|null`
- `more-recipes.component.ts:16-17` — `max`, `ignoredRecipeIds`

### Modern `input()` Signal Function
- `recipe-grid.component.ts:19` — `recipes = input<Recipe[]>([])`
- `max-prep-time.component.ts:15` — `initialValue = input<number | null>(null)`
- `max-cook-time.component.ts:17` — `initialValue = input<number | null>(null)`
- `search-filter.component.ts:14` — `initialValue = input<string>('')`

## Output Pattern

All outputs use classic `@Output() + EventEmitter`:
- `max-prep-time.component.ts:13` — `filterChange: EventEmitter<number | null>`
- `max-cook-time.component.ts:15` — `filterChange: EventEmitter<number | null>`
- `search-filter.component.ts:12` — `searchChange: EventEmitter<string>`

## Lifecycle Hooks

- `ngOnInit` used in 3 components but `implements OnInit` only declared on `RecipesComponent` (line 24)
- `RecipeDetailsComponent` (line 26) and `MoreRecipesComponent` (line 23) define `ngOnInit()` without the interface
- No `ngOnDestroy` anywhere — no subscription cleanup
- `effect()` in constructors replaces some lifecycle logic in filter components

## Template Control Flow — Two Styles Coexist

### Modern `@for` Block Syntax
- `recipe-grid.component.html:2` — `@for (recipe of recipes(); track recipe.id)`

### Legacy `*ngIf` / `*ngFor` Directives
- `recipe-details.component.html:3,11,15,34,54`
- `recipes.component.html:30,32`
- `menu.component.html:13,35,38`
- `differentiators.component.html:10`
- `recipe-times.component.html:1`

## Error/Loading State Pattern

- `recipe-details.component.html:15,74-76` — `*ngIf="!loading && recipe; else noData"` with `<ng-template #noData>`
- `recipes.component.html:30,32` — separate `*ngIf` checks for loading and empty results

## Form Binding

Filter components use `[(ngModel)]` with `FormsModule` (template-driven, not reactive forms):
- `max-prep-time.component.html:6`
- `max-cook-time.component.html:6`
- `search-filter.component.html:4`

## Standalone Declarations

Inconsistent — some components explicitly declare `standalone: true` while others omit it (relying on Angular 19 default):
- Explicit: `home.component.ts:9`, `about.component.ts:9`, `container.component.ts:5`, `max-prep-time.component.ts:7`
- Implicit (omitted): all other components
