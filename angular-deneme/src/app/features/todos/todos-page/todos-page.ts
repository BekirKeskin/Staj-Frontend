import { Component, signal, computed, inject } from '@angular/core';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { Todo, TodoFormData } from '../models/todo-model';
import { TodoService } from '../services/todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [TodoForm,TodoList],
  templateUrl: './todos-page.html',
  styleUrl: './todos-page.scss',
})

export class TodosPage {
  /* input = signal(''); signal('') inputta reaktif değişken oluşturuyormuş signal olunca angular bunu anlıyormuş
   onInput(event:Event){ // kullanıcı bir şey yazınca onu yakalar her inputta çalışır
    const value = (event.target as HTMLInputElement).value; // input kutusunun içis
    this.input.set(value); // TS State değiştirir neden input.set() -> değeri değiştirir
  }
  */
  todoService = inject(TodoService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(){
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      console.log(queryParams);

      const status = queryParams["status"];
      
      if (
        status === "all" ||
        status === "active" ||
        status === "completed"
      ) {
          this.todoService.changeFilter(status);
        }
    });
  }
 
  addTodo(data: TodoFormData){ 
    this.todoService.addTodo(data);
  }

  changeFilter(value: 'all' | 'active' | 'completed') {
    this.todoService.changeFilter(value);
  }

  toggleTodo(id:number){
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id:number){
    this.todoService.deleteTodo(id);
  }

  editTodo(todo:Todo){ 
    this.todoService.editTodo(todo);
  }

  updateTodo(updatedTodo: Todo){
    this.todoService.updateTodo(updatedTodo);
  }
}
