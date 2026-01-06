import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  template: `<section class="w-full px-4 md:px-8 md:max-w-[704px] lg:max-w-[1192px] lg:px-4 mx-auto"><ng-content></ng-content></section>`
})
export class ContainerComponent {}
