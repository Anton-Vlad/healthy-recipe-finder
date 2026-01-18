import {Component, Input} from '@angular/core';
import { Recipe } from '../../services/recipe.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-recipe-times',
  imports: [CommonModule],
  templateUrl: './recipe-times.component.html',
  styleUrl: './recipe-times.component.css'
})
export class RecipeTimesComponent {
  @Input() recipe: Recipe|null = null;
}
