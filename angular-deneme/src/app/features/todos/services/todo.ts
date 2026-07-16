import { Service, signal, computed, inject, effect } from '@angular/core';
import { Todo, TodoFormData } from '../models/todo-model';
import { LocalStorageService } from './local-storage';
import { __values } from 'tslib';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, of, throwError } from 'rxjs';

@Service() // yeni kullanım normalde @Injection({provideIn: 'root'}}
export class TodoService {

    localStorageService = inject(LocalStorageService)
    private httpClient = inject(HttpClient)

    private _list = signal<Todo[]>([]); // VERİ BURADA, Todo[] = listenin içinde todo objeleri olacak, []=başlangıçta liste yok
    private _filter = signal<'all' | 'active' | 'completed'>('all'); // _filter STATE
    private _editingTodo = signal<Todo| null>(null); // edit STATE
    private _loading = signal(false);
    private _error = signal(false);

    readonly list = this._list.asReadonly();
    readonly filter = this._filter.asReadonly();
    readonly editingTodo = this._editingTodo.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    constructor(){
        const todos = this.localStorageService.load("todos");

        if(todos){
           this._list.set(todos as Todo[]); // type guard şimdilik kullanmadık
        }

        effect(()=> { // save kısmını tek tek yazmayıp buraya tek bir yere yazdım
            const todos = this._list();
            this.localStorageService.save("todos", todos);
        });
    }

    saveTodos():void{
        this.localStorageService.save("todos",this._list());
    }

    getTodos(){
        this._loading.set(true);
        this.httpClient.get<Todo[]>("http://localhost:3000/todos")

        .pipe( // THROW ERROR sadece öğrenme amaçlı eklendi kalkacak
            map((todos)=>{return todos;}), // kısa hali map((todos)=> todos) bir de verilerimiz zaten dönüştürülerek geliyor o nedenle map in projede yeri olmayacak
            catchError((error)=>{
                const todos = this.localStorageService.load("todos") as Todo[] ?? []; // as Todo[] yu storage.service de ki load metodundaki unknown dan dolayı ekliyoruz ki beklediği değeri döndürsün, Observable döndürmemiz gerektiği için ?? [] ekliyoruz eğer null dönerse boş dizi kullan demek 
                return of(todos); // buradaki todos localStorage dan gelen, API den gelen değil
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )

        .subscribe((todos)=>{
            this._list.set(todos);
            this._error.set(false);
        });
    }

    postTodos(data: TodoFormData){
        this._loading.set(true);
        this.httpClient.post<Todo>("http://localhost:3000/todos",data)

        .pipe(
            map((todo)=>{return todo;}),
            catchError((error)=>{
                this._error.set(true);
                console.log(error);
                return throwError(()=>error);
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )

        .subscribe((todo)=>{
            this._list.set([
                ...this._list(),
                todo
            ]);
            this.localStorageService.save("todos",this._list());
            this._error.set(false);
        });
    }

    patchTodos(todo: Todo){
        this._loading.set(true);
        this.httpClient.patch<Todo>("http://localhost:3000/todos/id",todo)

        .pipe(
            map((todo)=>{return todo;}),
            catchError((error)=>{
                this._error.set(true);
                console.log(error)
                return throwError(()=>error);
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )
        .subscribe((todo)=>{
            this._list.set(
                this._list().map((item)=>{
                    return item.id === todo.id ? todo:item; //? eşitse değilse olayı yani uzun kodun kısaltması
                })
            );
            this.localStorageService.save("todos",this._list());
            this._error.set(false);
        })
    }

    deleteTodos(id: number){
        this._loading.set(true);
        this.httpClient.delete(`http://localhost:3000/todos/${id}`) //template literal olan backtick ``, <> ihtiyaç yok

        .pipe(
            catchError((error)=>{
                this._error.set(true);
                console.log(error);
                return throwError(()=>error);
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )
        .subscribe(()=>{
            this._list.set(
                this._list().filter(todo => todo.id !==id)
            )
            this.localStorageService.save("todos",this._list());
            this._error.set(false);
        })
    }

    getTodoById(id:number): Todo|undefined{
        return this._list().find((todo) => todo.id===id);
        
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
    }

    deleteTodo(id: number){
        this._list.set(
            this._list().filter(todo => todo.id !== id)
        );
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
        this._editingTodo.set(null);
    }
}
