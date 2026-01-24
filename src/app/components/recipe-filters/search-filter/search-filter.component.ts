import {Component, EventEmitter, input, Output, signal, effect} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
  @Output() searchChange = new EventEmitter<string>();

  initialValue = input<string>('');
  searchTerm = '';

  constructor() {
    effect(() => {
      this.searchTerm = this.initialValue();
    });
  }

  onSearchChange(value: string) {
    this.searchChange.emit(value || '');
  }
}
