import { Component, Input } from '@angular/core';
import {ContainerComponent} from "../container/container.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-differentiators',
  imports: [
    ContainerComponent,
    CommonModule
  ],
  templateUrl: './differentiators.component.html',
  styleUrl: './differentiators.component.css'
})
export class DifferentiatorsComponent {
  @Input() customClasses: string = "";
  @Input() title: string = "Our Differentiators";
  @Input() items: { title: string; description: string }[] = [];
}
