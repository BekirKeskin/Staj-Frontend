import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo-model';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {

  @Input()
  todolar!: Todo[];

  @Output()
  deleteRequested = new EventEmitter<{id:number}>();

  @Output()
  checkRequested = new EventEmitter<{id:number}>();

  @Output()
  editRequested = new EventEmitter<Todo>();

  checkClick(data:{id:number}){
    this.checkRequested.emit(data)
  }

  editClick(todo:Todo){
    this.editRequested.emit(todo)
  }

  deleteClick(data:{id:number}){
    this.deleteRequested.emit(data)
  }

}
