import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: '**', redirectTo: '' }
];
