import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import recipesData from '../../../public/data.json';

export interface RecipeImage {
  large: string;
  small: string;
}

export interface Recipe {
  id: number;
  title: string;
  slug: string;
  image: RecipeImage;
  overview: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: string[];
  instructions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = recipesData;

  getAllRecipes(): Observable<Recipe[]> {
    return of([...this.recipes]);
  }

  getRecipeById(id: number): Observable<Recipe | undefined> {
    return of(this.recipes.find(recipe => recipe.id === id));
  }

  getRecipeBySlug(slug: string): Observable<Recipe | undefined> {
    return of(this.recipes.find(recipe => recipe.slug === slug));
  }

  searchRecipes(query: string): Observable<Recipe[]> {
    const filtered = this.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.overview.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }
}
