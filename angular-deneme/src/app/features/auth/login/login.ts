import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';
import { LoginRequest } from '../models/login-request';
import { AuthStore } from '../store/auth-store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {
  authService = inject(AuthService);
  authStore = inject(AuthStore);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ])
  });

  onSubmit(){
    
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = this.loginForm.getRawValue() as LoginRequest; // getRawValue formdaki bütün alanları döndürür. tipleri düzgün gelir
    const success = this.authService.login(data);
    if(success){
      this.router.navigate(["/anasayfa"]);
    }
  }
}
