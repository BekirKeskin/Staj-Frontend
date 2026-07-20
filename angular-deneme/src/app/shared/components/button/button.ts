import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

  @Input() value = '';
  @Input() text = '';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() type = 'button';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();

  onClick(){
    this.clicked.emit();
  }
  
}
