import { Service, signal, computed, inject, effect } from "@angular/core";
import { Todo, TodoFormData } from "../models/todo-model";
import { LocalStorageService } from "../services/local-storage";
import { ToastService } from "../../../core/services/toast";

@Service()
export class TodoStore {
    toastService = inject(ToastService)
    localStorageService = inject(LocalStorageService)

    private _loading = signal(false);
    readonly loading = this._loading.asReadonly();

    // STATELER 

    private _list = signal<Todo[]>([]); // VERİ BURADA, Todo[] = listenin içinde todo objeleri olacak, []=başlangıçta liste yok
    private _filter = signal<'all' | 'active' | 'completed'>('all'); // _filter STATE
    private _editingTodo = signal<Todo| null>(null); // edit STATE

    readonly list = this._list.asReadonly();
    readonly filter = this._filter.asReadonly();
    readonly editingTodo = this._editingTodo.asReadonly();


    constructor(){
        const todos = this.localStorageService.load<Todo[]>("todos");

        if(todos){
           this._list.set(todos); // type guard şimdilik kullanmadık
        }

        effect(()=> { // save kısmını tek tek yazmayıp buraya tek bir yere yazdım
            const todos = this._list();
            this.localStorageService.save("todos", todos);
        });
    }

    // COMPUTED
    
    readonly filteredList = computed(()=>{ // !!! STATE'ten türetilen değer STATE değil !!! Derived State diye geçiyor tam ne bilmiyorum!!!

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

    // ACTIONS
    
    // query actions
    getTodoById(id:number): Todo|undefined{
        return this._list().find((todo) => todo.id===id);
    }

    // state actions
    setTodos(todos: Todo[]){
        this._list.set(todos);
    }

    // CRUD actions
    addTodoFromApi(todo:Todo){
        this._list.set([...this._list(),todo]);
    }

    addTodo(data: TodoFormData){

        this._loading.set(true);

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
        this.toastService.show("Todo eklendi","success");
        this._loading.set(false);
    }

    updateTodo(updatedTodo: Todo){
        this._loading.set(true);

        this._list.set(
            this._list().map(todo => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            })
        );
        this._editingTodo.set(null);
        this.toastService.show("Todo güncellendi","success");
        this._loading.set(false);
    }

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
        this._loading.set(true);

        this._list.set(
            this._list().filter(todo => todo.id !== id)
        );
        this.toastService.show("Todo silindi","error");
        this._loading.set(false);
    }

    // UI actions
    changeFilter(value: 'all' | 'active' | 'completed') {
        this._filter.set(value);
    }

    editTodo(todo:Todo){ 
        this._editingTodo.set(todo);
    }

}