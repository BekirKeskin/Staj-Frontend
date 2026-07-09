import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})

export class TodoForm implements OnInit{
  categories = ["Work", "Study", "Personal"]

  @Output()
  todoAdded = new EventEmitter<{ title: string; description: string }>();

  todoForm = new FormGroup({ // !!!!!!!!!! Reactive forms un başladığı yer !!!!!!!!!!
    title: new FormControl('',[ // form control = tek bir input
      Validators.required, // validators kurallarmış, boş olamaz 3 karakterden kısa olamaz.
      Validators.minLength(3)
    ]),
    description: new FormControl('',[
      Validators.required,
      Validators.minLength(1)
    ]),
    priority: new FormControl('',[
      Validators.required
    ]),
    dueDate: new FormControl('',[
      Validators.required,
      this.noPastDateValidator
    ]),
    category: new FormControl('',[
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
      return;
    }

    const data = this.todoForm.value; // formdan veriyi alma
    this.todoAdded.emit({ // app e gönderiyoz
      title: data.title!, // != TS boş olabilir uyarısını bastırmak için(title için)
      description: data.description ?? '' // ?? ''= description boş gelirse sorun çıkmasın
    });
    this.todoForm.reset();
  }
  
  ngOnInit() {
    this.todoForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

}
