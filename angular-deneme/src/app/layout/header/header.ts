import { Component, inject } from '@angular/core';
import { AuthStore } from '../../features/auth/store/auth-store';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {

  readonly authStore = inject(AuthStore); 

  isDark = false;

  logout(){
    this.authStore.logout();
  }
  
  themeToggle(){
    this.isDark = !this.isDark;
    const body = document.querySelector('body');

    if(this.isDark){
      body?.classList.add("dark");
    }else{
      body?.classList.remove("dark");
    }
  }

}
