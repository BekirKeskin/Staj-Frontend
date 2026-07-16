import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../models/todo-model';
import { TodoStore } from '../store/todo-store';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [],
  templateUrl: './todo-detail.html',
  styleUrl: './todo-detail.scss',
})
export class TodoDetail {
  
  private activatedRoute = inject(ActivatedRoute);
  private todoStore = inject(TodoStore);

  todo: Todo | undefined;

  ngOnInit(){

    this.activatedRoute.params.subscribe((params)=>{
      const id = Number(params["id"]);

      console.log("URL id:", id);
      console.log("Liste:", this.todoStore.list());

      this.todo = this.todoStore.getTodoById(id);
      console.log("Bulunan:", this.todo);
    });
  }
}
