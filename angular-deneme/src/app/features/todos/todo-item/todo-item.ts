import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { Todo } from '../models/todo-model';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [Button],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  
  editInput!: ElementRef<HTMLInputElement>;

  @Input()
  todo!: Todo;

  @Output()
  todoDeleted = new EventEmitter<{id: number}>();

  @Output()
  todoChecked = new EventEmitter<{id: number}>();

  @Output()
  editRequested = new EventEmitter<Todo>();

  
  checkClick(id:number){
    this.todoChecked.emit({id});
  }

  editClick(){
    this.editRequested.emit(this.todo);
  }

  deleteClick(id:number){
    this.todoDeleted.emit({ id });
  }
}
