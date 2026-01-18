import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule, RouterLinkActive, NgOptimizedImage],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() logo: string = "Logo";
  @Input() navLinks: { label: string; route: string }[] = [
    { label: "Home", route: "/" },
    { label: "About", route: "/about" },
    { label: "Recipes", route: "/recipes" }
  ];
  @Input() ctaButtonLabel: string = "Browse recipes";
  @Input() ctaButtonRoute: string = "/recipes";

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
