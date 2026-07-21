import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {

  visible = input<boolean>(false); // yeni kullanımdır   eski kullanım= @Input() visible = false;
  @Input() message = '';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  confirmClick(){
    this.confirmed.emit();
  }

  cancelClick(){
    this.cancelled.emit();
  }
}
