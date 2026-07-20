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
    
    this.authStore.setLoading(true);

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.authStore.setLoading(false);
      return;
    }

    const data = this.loginForm.getRawValue() as LoginRequest; // getRawValue formdaki bütün alanları döndürür. tipleri düzgün gelir

    const token = this.authService.login(data);

    if(!token){
      this.authStore.setError("Email veya şifre yanlış");
      this.authStore.setLoading(false);
      return;
    }

    const user = this.authService.getMe(token);

    if(!user){
      this.authStore.setError("Kullanıcı bulunamadı.");
      this.authStore.setLoading(false);
      return;
    }

    this.authStore.login(user,  token);
    this.router.navigate(["/anasayfa"]);
  
  }
}
