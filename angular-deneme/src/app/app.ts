import { Component } from '@angular/core';
import { Layout } from './layout/layout/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Layout]
})

export class App {}
