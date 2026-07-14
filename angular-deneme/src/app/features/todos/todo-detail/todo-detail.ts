import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo';
import { Todo } from '../models/todo-model';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [],
  templateUrl: './todo-detail.html',
  styleUrl: './todo-detail.scss',
})
export class TodoDetail {
  
  private activatedRoute = inject(ActivatedRoute);
  private todoService = inject(TodoService);

  todo: Todo | undefined;

  ngOnInit(){

    this.activatedRoute.params.subscribe((params)=>{
      const id = Number(params["id"]);

      console.log("URL id:", id);
      console.log("Liste:", this.todoService.list());

      this.todo = this.todoService.getTodoById(id);
      console.log("Bulunan:", this.todo);
    });
  }
}
