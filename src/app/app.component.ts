import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContainerComponent, MenuComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'healthy-recipe-finder';

  constructor(public router: Router) {}

  isRecipesRoute(): boolean {
    return this.router.url.includes('/recipes');
  }
}
