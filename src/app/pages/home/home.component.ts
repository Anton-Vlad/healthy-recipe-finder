import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterLink } from '@angular/router';
import {ContainerComponent} from '../../components/container/container.component';
import {BannerComponent} from '../../components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ContainerComponent, NgOptimizedImage, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
