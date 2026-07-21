import { Component, signal, computed, inject } from '@angular/core';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { Todo, TodoFormData } from '../models/todo-model';
import { TodoService } from '../services/todo';
import { ActivatedRoute } from '@angular/router';
import { TodoStore } from '../store/todo-store';
import { Modal } from '../../../shared/components/modal/modal';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [TodoForm,TodoList, Modal],
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
  todoService = inject(TodoService);
  private activatedRoute = inject(ActivatedRoute);

  private _deleteTodo = signal<Todo | null>(null);
  private _modalVisible = signal<boolean>(false);

  readonly deletedTodo = this._deleteTodo.asReadonly();
  readonly modalVisible = this._modalVisible.asReadonly();

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
    const todo = this.todoStore.getTodoById(id);
    if(todo){
      this._deleteTodo.set(todo);
      this._modalVisible.set(true);
    }
  }

  editTodo(todo:Todo){ 
    this.todoStore.editTodo(todo);
  }

  updateTodo(updatedTodo: Todo){
    this.todoStore.updateTodo(updatedTodo);
  }

  closeModal(){
    this._modalVisible.set(false);
    this._deleteTodo.set(null);
  }

  confirmDelete(){
    const todo = this._deleteTodo();

    if(todo){
      this.todoStore.deleteTodo(todo.id);
    }

    this.closeModal();
    }
}
