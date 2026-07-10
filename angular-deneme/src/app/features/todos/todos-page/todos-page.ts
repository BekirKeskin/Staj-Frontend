import { Component, signal, computed } from '@angular/core';
import { TodoForm } from '../todo-form/todo-form';
import { TodoList } from '../todo-list/todo-list';
import { Todo, TodoFormData } from '../models/todo-model';

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

  list = signal<Todo[]>([]); // VERİ BURADA, Todo[] = listenin içinde todo objeleri olacak, []=başlangıçta liste yok
  filter=signal<'all' | 'active' | 'completed'>('all'); // filter STATE
  editingTodo=signal<Todo| null>(null); // edit STATE
 
  addTodo(data: TodoFormData){ 
    const newTodo: Todo ={
      id: Date.now(), 
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      category: data.category,
      done: false
    };
    this.list.set([...this.list(), newTodo]);
  }

  changeFilter(value: 'all' | 'active' | 'completed') {
    this.filter.set(value);
  }
  
  filteredList = computed(()=>{

    if(this.filter() === 'all'){
      return this.list(); // this.list() = gerçek liste    this.list = signal
    }

    if(this.filter() === 'active'){
      return this.list().filter(todo => todo.done === false);
    }

    if(this.filter() === 'completed'){
      return this.list().filter(todo => todo.done === true);
    }
    return this.list();
  });

  deleteTodo(id:number){
    this.list.set(
      this.list().filter(todo => todo.id !== id)
    );
  }

  toggleTodo(id:number){
    this.list.set(
      this.list().map(todo =>{
        if(todo.id === id){
          return {...todo, done: !todo.done};
        }
        return todo;
      })
    );
  }

  editTodo(todo:Todo){
    this.editingTodo.set(todo);
  }

  updateTodo(updatedTodo: Todo){
    this.list.set(
    this.list().map(todo => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    })
  );
  this.editingTodo.set(null);
  }
}
