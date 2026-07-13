import { Service, signal, computed, inject } from '@angular/core';
import { Todo, TodoFormData } from '../models/todo-model';
import { LocalStorageService } from './local-storage';
import { __values } from 'tslib';

@Service() // yeni kullanım normalde @Injection({provideIn: 'root'})
export class TodoService {

    localStorageService = inject(LocalStorageService)

    private _list = signal<Todo[]>([]); // VERİ BURADA, Todo[] = listenin içinde todo objeleri olacak, []=başlangıçta liste yok
    private _filter = signal<'all' | 'active' | 'completed'>('all'); // _filter STATE
    private _editingTodo = signal<Todo| null>(null); // edit STATE

    readonly list = this._list.asReadonly();
    readonly filter = this._filter.asReadonly();
    readonly editingTodo = this._editingTodo.asReadonly();

    constructor(){
        const todos = this.localStorageService.load("todos");
        if(!todos){
           return;
        }
        this._list.set(todos as Todo[]); // type guard şimdilik kullanmadık
    }

    saveTodos():void{
        this.localStorageService.save("todos",this._list());
    }

    addTodo(data: TodoFormData){
        const newTodo: Todo={
            id: Date.now(),
            title: data.title!,
            description: data.description ?? '',
            priority: data.priority!,
            category: data.category!,
            dueDate: data.dueDate!,
            done: false
        };
        this._list.set([...this._list(), newTodo]);
        this.saveTodos();
    }

    changeFilter(value: 'all' | 'active' | 'completed') {
        this._filter.set(value);
    }

    filteredList = computed(()=>{

        if(this._filter() === 'all'){
            return this._list(); // this._list() = gerçek liste    this._list = signal
        }

        if(this._filter() === 'active'){
            return this._list().filter(todo => todo.done === false);
        }

        if(this._filter() === 'completed'){
            return this._list().filter(todo => todo.done === true);
        }
        return this._list();
    });
    
    toggleTodo(id:number){
        this._list.set(
            this._list().map(todo =>{
                if(todo.id === id){
                    return {...todo, done: !todo.done};
                }
                return todo;
            })
        );
        this.saveTodos();
    }

    deleteTodo(id: number){
        this._list.set(
            this._list().filter(todo => todo.id !== id)
        );
        this.saveTodos();
    }

    editTodo(todo:Todo){ 
        this._editingTodo.set(todo);
    }

    updateTodo(updatedTodo: Todo){
        this._list.set(
            this._list().map(todo => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            })
        );
        this.saveTodos();
        this._editingTodo.set(null);
    }
}
