import { Service, signal, inject} from '@angular/core';
import { Todo, TodoFormData } from '../models/todo-model';
import { LocalStorageService } from './local-storage';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, of, throwError, retry } from 'rxjs';
import { TodoStore } from '../store/todo-store';

@Service() // yeni kullanım normalde @Injection({provideIn: 'root'}}
export class TodoService {
    
    localStorageService = inject(LocalStorageService)
    private todoStore = inject(TodoStore);
    private httpClient = inject(HttpClient);

    // STATELER

    private _loading = signal(false);
    private _error = signal<string | null>(null); // değiştirildi çünkü ileride hata mesajı da kullanılabilir diye sadece true false döndürüyordu içi false olunca

    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();

    // ACTIONS

    getTodos(){
        this._loading.set(true);
        this.httpClient.get<Todo[]>("http://localhost:3000/todos")

        .pipe( // THROW ERROR sadece öğrenme amaçlı eklendi kalkacak
            map((todos)=>{return todos;}), // kısa hali map((todos)=> todos) bir de verilerimiz zaten dönüştürülerek geliyor o nedenle map in projede yeri olmayacak
            retry(1),
            catchError((error)=>{
                const todos = this.localStorageService.load<Todo[]>("todos") ?? []; // as Todo[] yu storage.service de ki load metodundaki unknown dan dolayı ekliyoruz ki beklediği değeri döndürsün, Observable döndürmemiz gerektiği için ?? [] ekliyoruz eğer null dönerse boş dizi kullan demek 
                return of(todos); // buradaki todos localStorage dan gelen, API den gelen değil
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )

        .subscribe((todos)=>{
            this.todoStore.setTodos(todos);
            this._error.set(null);
        });
    }

    postTodos(data: TodoFormData){
        this._loading.set(true);
        this.httpClient.post<Todo>("http://localhost:3000/todos",data)

        .pipe(
            map((todo)=>{return todo;}),
            catchError((error)=>{
                this._error.set("hata mesajı");
                console.log(error);
                return throwError(()=>error);
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )
        .subscribe((todo)=>{
            this.todoStore.addTodoFromApi(todo);
            this._error.set(null);
        });
    }

    patchTodos(todo: Todo){
        this._loading.set(true);
        this.httpClient.patch<Todo>(`http://localhost:3000/todos/${todo.id}`,todo)

        .pipe(
            map((todo)=>{return todo;}),
            catchError((error)=>{
                this._error.set("hata mesajı");
                console.log(error)
                return throwError(()=>error);
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )
        .subscribe((todo)=>{
            this.todoStore.updateTodo(todo);
            this._error.set(null);
        })
    }

    putTodos(todo: Todo){
        this._loading.set(true);
        this.httpClient.put<Todo>(`http://localhost:3000/todos/${todo.id}`,todo)
        
        .pipe(
            catchError((error)=>{
                this._error.set("hata mesajı");
                console.log(error);
                return throwError(()=>error);
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )
        .subscribe((todo)=>{
            this.todoStore.updateTodo(todo);
            this._error.set(null);
        });
    }

    deleteTodos(id: number){
        this._loading.set(true);
        this.httpClient.delete(`http://localhost:3000/todos/${id}`) //template literal olan backtick ``, <> ihtiyaç yok

        .pipe(
            catchError((error)=>{
                this._error.set("hata mesajı");
                console.log(error);
                return throwError(()=>error);
            }),
            finalize(()=>{
                this._loading.set(false);
            })
        )
        .subscribe(()=>{
            this.todoStore.deleteTodo(id);
            this._error.set(null);
        })
    }

}
