import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Recipe, RecipeService} from '../../services/recipe.service';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ContainerComponent} from '../../components/container/container.component';
import { RecipeTimesComponent } from '../../components/recipe-times/recipe-times.component';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule, ContainerComponent, NgOptimizedImage, RecipeTimesComponent, RouterLink],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  recipe: Recipe|null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      setTimeout(() => {
        const id = params['id'];
        this.recipeService.getRecipeById(id).subscribe({
          next: (data: Recipe) => {
            this.recipe = data;
            this.loading = false;
          },
          error: (err: any) => {
            console.error('Recipe not found:', err.message);
            this.loading = false;
            this.error = 'Recipe not found or backend is not running';
          }
        });
      }, 500)
    });
  }
}
