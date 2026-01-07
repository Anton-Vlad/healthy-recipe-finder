import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {BannerComponent} from '../../components/banner/banner.component';
import {ContainerComponent} from '../../components/container/container.component';
import {NgOptimizedImage} from '@angular/common';
import {DifferentiatorsComponent} from '../../components/differentiators/differentiators.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, BannerComponent, ContainerComponent, NgOptimizedImage, DifferentiatorsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
