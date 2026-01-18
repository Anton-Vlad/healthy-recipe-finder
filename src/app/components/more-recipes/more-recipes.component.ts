import {Component, Input} from '@angular/core';
import { RecipeService, Recipe } from "../../services/recipe.service";
import {RecipeGridComponent} from '../recipe-grid/recipe-grid.component';
import {ContainerComponent} from '../container/container.component';

@Component({
  selector: 'app-more-recipes',
  imports: [
    RecipeGridComponent,
    ContainerComponent
  ],
  templateUrl: './more-recipes.component.html',
  styleUrl: './more-recipes.component.css'
})
export class MoreRecipesComponent {
  @Input() max = 3;
  @Input() ignoredRecipeIds: string[] = [];
  moreRecipes: Recipe[] = [];
  loading = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.moreRecipes = data
          .filter(recipe => !this.ignoredRecipeIds.includes(String(recipe.id)))
          .sort((a, b) => Math.random() - 0.5)
          .slice(0, this.max);
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading more recipes:', err);
        this.loading = false;
      }
    });
  }
}
