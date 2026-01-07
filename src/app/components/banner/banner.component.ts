import { Component } from '@angular/core';
import {ContainerComponent} from "../container/container.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-banner',
    imports: [
        ContainerComponent,
        RouterLink
    ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}
