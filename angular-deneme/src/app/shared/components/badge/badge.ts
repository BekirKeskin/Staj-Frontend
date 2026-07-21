import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {

  @Input() text = '';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary' ;
  
}
