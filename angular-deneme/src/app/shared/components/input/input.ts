import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';

  @Output() valueChanged = new EventEmitter<void>();
}
