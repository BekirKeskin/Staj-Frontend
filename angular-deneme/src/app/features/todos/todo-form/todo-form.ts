import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})

export class TodoForm implements OnInit{

  @Output()
  todoAdded = new EventEmitter<{ title: string; description: string }>();

  todoForm = new FormGroup({
    title: new FormControl('',[ // form control = tek bir input
      Validators.required, // validators kurallarmış boş olamaz 3 karakterden kısa olamaz.
      Validators.minLength(3)
    ]),
    description: new FormControl('',[
      Validators.required,
      Validators.minLength(1)
    ])
  });

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
