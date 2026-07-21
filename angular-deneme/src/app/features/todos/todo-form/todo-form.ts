import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Todo, TodoFormData, Priority, Category } from '../models/todo-model';
import { Button } from '../../../shared/components/button/button';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, Button],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})

export class TodoForm implements OnInit, OnChanges{
  categories = ["Work", "Study", "Personal"]

  @Input()
  editingTodo: Todo | null = null;

  @Input() loading = false;

  @Output()
  todoAdded = new EventEmitter<TodoFormData>();

  @Output()
  todoEdited = new EventEmitter<Todo>();

  @Output()
  todoUpdated = new EventEmitter<Todo>();

  todoForm = new FormGroup({ // !!!!!!!!!! Reactive forms un başladığı yer !!!!!!!!!!
    title: new FormControl('',[ // form control = tek bir input
      Validators.required, // validators kurallarmış, boş olamaz 3 karakterden kısa olamaz.
      Validators.minLength(3)
    ]),
    description: new FormControl('',[
      Validators.required,
      Validators.minLength(1)
    ]),
    priority: new FormControl<Priority | null>(null,[
      Validators.required
    ]),
    dueDate: new FormControl('',[
      Validators.required,
      this.noPastDateValidator
    ]),
    category: new FormControl<Category | null>(null,[
      Validators.required,
    ])
  });

  noPastDateValidator(control: AbstractControl):ValidationErrors | null{
    const date = control.value;
    
    if(!date){
      return null;
    }
    const selectedDate = new Date(date);
    const today = new Date();
    selectedDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    if(selectedDate < today){
      return{ pastDate:true};
    }
    return null;
  }

  onSubmit(){
    
    if(this.todoForm.invalid){
      this.todoForm.markAllAsTouched();
      return;
    }

    const data = this.todoForm.value; // formdan veriyi alma

    if(this.editingTodo){
      this.todoUpdated.emit({
        ...this.editingTodo,
        title: data.title!,
        description: data.description ?? '',
        priority: data.priority!,
        dueDate: data.dueDate!,
        category: data.category!
      });
      this.todoForm.reset();
      return;
    }

    this.todoAdded.emit({ // app e gönderiyoz
      title: data.title!, // != TS boş olabilir uyarısını bastırmak içinmiş
      description: data.description ?? '', // ?? ''= description boş gelirse sorun çıkmasın
      priority: data.priority!,
      dueDate: data.dueDate!,
      category: data.category!,
    });
    this.todoForm.reset();
  }
  
  ngOnInit() {
    this.todoForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  ngOnChanges() {
    if(!this.editingTodo){
      return;
    }

    this.todoForm.patchValue({
      title: this.editingTodo.title,
      description: this.editingTodo.description,
      priority: this.editingTodo.priority,
      dueDate: this.editingTodo.dueDate,
      category: this.editingTodo.category
    });
  }

}
