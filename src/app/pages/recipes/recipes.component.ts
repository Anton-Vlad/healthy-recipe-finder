import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";
import { RecipeService, Recipe } from "../../services/recipe.service";
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {RecipeTimesComponent} from '../../components/recipe-times/recipe-times.component';

@Component({
  selector: 'app-recipes',
  imports: [
    ContainerComponent,
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    RecipeTimesComponent
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  loading = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    // @ts-ignore
    setTimeout(() => {
      this.recipeService.getAllRecipes().subscribe({
        next: (data: Recipe[]) => {
          this.recipes = data;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error loading recipes:', err);
          this.loading = false;
        }
      });
    }, 500)

  }
}
