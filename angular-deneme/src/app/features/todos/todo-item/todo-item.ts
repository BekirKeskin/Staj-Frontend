import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { Todo } from '../models/todo-model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  @ViewChild('editInput') //HTML de vereceğimiz referans adı
  editInput!: ElementRef<HTMLInputElement>;

  @Input()
  todo!: Todo;

  @Output()
  todoDeleted = new EventEmitter<{id: number}>();

  @Output()
  todoChecked = new EventEmitter<{id: number}>();

  @Output()
  todoEdited = new EventEmitter<Todo>();

  isEditing = false;
  editText = '';
  
  checkClick(id:number){
    this.todoChecked.emit({id});
  }

  editClick(){
    this.isEditing = true;
    this.editText = this.todo.text;

    setTimeout(()=>{
      this.editInput.nativeElement.focus();
    });
  }
  saveEdit(){
    this.todoEdited.emit({...this.todo, text:this.editText});
    this.isEditing = false;
  }
  cancelEdit(){
    this.isEditing = false;
    this.editText = '';
  }

  changeEditText(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.editText = value;
  }

  deleteClick(id:number){
    this.todoDeleted.emit({ id });
  }
}
