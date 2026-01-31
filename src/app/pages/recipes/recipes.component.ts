import {Component, OnInit, signal, computed, effect} from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";
import { RecipeService, Recipe } from "../../services/recipe.service";
import {CommonModule} from '@angular/common';
import {RecipeGridComponent} from '../../components/recipe-grid/recipe-grid.component';
import {MaxPrepTimeComponent} from '../../components/recipe-filters/max-prep-time/max-prep-time.component';
import {MaxCookTimeComponent} from '../../components/recipe-filters/max-cook-time/max-cook-time.component';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchFilterComponent} from '../../components/recipe-filters/search-filter/search-filter.component';

@Component({
  selector: 'app-recipes',
  imports: [
    ContainerComponent,
    CommonModule,
    RecipeGridComponent,
    MaxPrepTimeComponent,
    MaxCookTimeComponent,
    SearchFilterComponent
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  allRecipes = signal<Recipe[]>([]);
  loading = signal(true);

  maxPrepTime = signal<number | null>(null);
  maxCookTime = signal<number | null>(null);
  searchTerm = signal('');

  hasActiveFilters = computed(() => {
    return this.maxPrepTime() !== null || this.maxCookTime() !== null || this.searchTerm() !== '';
  });

  recipes = computed(() => {
    return this.allRecipes().filter(recipe => {
      if (this.maxPrepTime() != null && recipe.prepMinutes > this.maxPrepTime()!) {
        return false;
      }
      if (this.maxCookTime() != null && recipe.cookMinutes > this.maxCookTime()!) {
        return false;
      }
      if (this.searchTerm()) {
        const searchLower = this.searchTerm().toLowerCase();
        const matchesName = recipe.title.toLowerCase().includes(searchLower);
        const matchesIngredients = recipe.ingredients?.some(
          ingredient => ingredient.toLowerCase().includes(searchLower)
        );
        return matchesName || matchesIngredients;
      }
      return true;
    });
  });

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    effect(() => {
      this.updateUrlParams();
    });
  }

  ngOnInit() {
    this.initializeFiltersFromUrl();

    setTimeout(() => {
      this.recipeService.getAllRecipes().subscribe({
        next: (data: Recipe[]) => {
          this.allRecipes.set(data);
          this.loading.set(false);
        }
      });
    }, 500);
  }

  private initializeFiltersFromUrl() {
    this.route.queryParams.subscribe(params => {
      // Only set filters if we haven't already (to avoid overwriting user changes)
      if (params['prepTime']) {
        this.maxPrepTime.set(parseInt(params['prepTime']));
      }
      if (params['cookTime']) {
        this.maxCookTime.set(parseInt(params['cookTime']));
      }
      if (params['search']) {
        this.searchTerm.set(params['search']);
      }
    });
  }

  private updateUrlParams() {
    const queryParams: any = {};

    if (this.maxPrepTime() === 0 || this.maxPrepTime()) {
      queryParams.prepTime = this.maxPrepTime();
    } else {
      queryParams.prepTime = null;
    }
    if (this.maxCookTime() === 0 || this.maxCookTime()) {
      queryParams.cookTime = this.maxCookTime();
    } else {
      queryParams.cookTime = null;
    }
    if (this.searchTerm()) {
      queryParams.search = this.searchTerm();
    } else {
      queryParams.search = null;
    }

    // Update URL without triggering navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onPrepTimeFilterChange(maxTime: number | null) {
    this.maxPrepTime.set(maxTime);
  }

  onCookTimeFilterChange(maxTime: number | null) {
    this.maxCookTime.set(maxTime);
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm.set(searchTerm.trim());
  }

  clearFilters() {
    this.maxPrepTime.set(null);
    this.maxCookTime.set(null);
    this.searchTerm.set('');
  }
}
