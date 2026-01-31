import { Component, Output, EventEmitter, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-max-prep-time',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './max-prep-time.component.html',
  styleUrl: './max-prep-time.component.css'
})
export class MaxPrepTimeComponent {
  @Output() filterChange = new EventEmitter<number | null>();

  initialValue = input<number | null>(null);
  selectedTime = signal<string>('');

  constructor() {
    // Set initial value when component loads
    effect(() => {
      const initial = this.initialValue();
      if (initial !== null) {
        this.selectedTime.set(initial.toString() + 'm');
      } else {
        this.selectedTime.set('');
      }
    });
  }

  onTimeChange(value: string) {
    this.filterChange.emit(value ? parseInt(value.replace('m', '')) : null);
  }
}
