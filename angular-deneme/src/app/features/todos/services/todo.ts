import { Service, signal, computed } from '@angular/core';
import { Todo, TodoFormData } from '../models/todo-model';

@Service() // yeni kullanım normalde @Injection({provideIn: 'root'})
export class TodoService {

    list = signal<Todo[]>([]); // VERİ BURADA, Todo[] = listenin içinde todo objeleri olacak, []=başlangıçta liste yok
    filter=signal<'all' | 'active' | 'completed'>('all'); // filter STATE
    editingTodo=signal<Todo| null>(null); // edit STATE

    test(){
        console.log("CONSOLE ÇALIŞTI");
        return;
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

    deleteTodo(id: number){
        this.list.set(
            this.list().filter(todo => todo.id !== id)
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
