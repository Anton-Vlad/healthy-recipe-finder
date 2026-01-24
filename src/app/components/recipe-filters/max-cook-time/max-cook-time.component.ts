import {Component, EventEmitter, input, Output, signal, effect} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-max-cook-time',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './max-cook-time.component.html',
  styleUrl: './max-cook-time.component.css'
})
export class MaxCookTimeComponent {
  @Output() filterChange = new EventEmitter<number | null>();

  initialValue = input<number | null>(null);
  selectedTime = signal<string>('');

  constructor() {
    // Set initial value when component loads
    effect(() => {
      const initial = this.initialValue();
      if (initial !== null) {
        this.selectedTime.set(initial.toString() + 'm');
        console.log(initial.toString() + 'm');
      }
    });
  }

  onTimeChange(value: string) {
    this.filterChange.emit(value ? parseInt(value.replace('m', '')) : null);
  }
}
