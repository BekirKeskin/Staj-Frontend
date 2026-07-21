import { Component, inject } from '@angular/core';
import { TodoStore } from '../store/todo-store';

@Component({
  selector: 'app-todo-stats',
  standalone: true,
  imports: [],
  templateUrl: './todo-stats.html',
  styleUrl: './todo-stats.scss',
})
export class TodoStats {

  todoStore = inject(TodoStore)

}
