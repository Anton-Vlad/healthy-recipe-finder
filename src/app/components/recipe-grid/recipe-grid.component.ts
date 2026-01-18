import {Component, Input} from '@angular/core';
import {Recipe} from '../../services/recipe.service';
import {RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RecipeTimesComponent} from '../recipe-times/recipe-times.component';

@Component({
  selector: 'app-recipe-grid',
  imports: [
    RouterLink,
    CommonModule,
    NgOptimizedImage,
    RecipeTimesComponent
  ],
  templateUrl: './recipe-grid.component.html',
  styleUrl: './recipe-grid.component.css'
})
export class RecipeGridComponent {
  @Input() recipes: Recipe[] = [];
}
