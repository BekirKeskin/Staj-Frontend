import { Component } from '@angular/core';
import { Header } from '../header/header'
import { Sidebar } from '../sidebar/sidebar';
import { TodosPage } from '../../features/todos/todos-page/todos-page';


@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  imports: [Header, Sidebar, TodosPage]
})
export class Layout {}
