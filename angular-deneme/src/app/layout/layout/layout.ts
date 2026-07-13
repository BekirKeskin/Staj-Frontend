import { Component } from '@angular/core';
import { Header } from '../header/header'
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  imports: [Header, Sidebar, RouterOutlet]
})
export class Layout {}
