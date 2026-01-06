import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterLink } from '@angular/router';
import {ContainerComponent} from '../../components/container/container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ContainerComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
