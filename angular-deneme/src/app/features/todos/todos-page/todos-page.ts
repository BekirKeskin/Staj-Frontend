import { Component, signal, computed, inject } from '@angular/core';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { Todo, TodoFormData } from '../models/todo-model';
import { TodoService } from '../services/todo';
import { ActivatedRoute } from '@angular/router';
import { TodoStore } from '../store/todo-store';

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
  todoStore = inject(TodoStore);
  private todoService = inject(TodoService);
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
          this.todoStore.changeFilter(status);
        }
    });
    this.todoService.getTodos();
  }
 
  addTodo(data: TodoFormData){ 
    this.todoStore.addTodo(data);
  }

  changeFilter(value: 'all' | 'active' | 'completed') {
    this.todoStore.changeFilter(value);
  }

  toggleTodo(id:number){
    this.todoStore.toggleTodo(id);
  }

  deleteTodo(id:number){
    this.todoStore.deleteTodo(id);
  }

  editTodo(todo:Todo){ 
    this.todoStore.editTodo(todo);
  }

  updateTodo(updatedTodo: Todo){
    this.todoStore.updateTodo(updatedTodo);
  }
}
