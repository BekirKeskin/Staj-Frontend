import { Component,inject } from '@angular/core';
import { AuthStore } from '../../features/auth/store/auth-store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {

  private readonly authStore = inject(AuthStore); 

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
