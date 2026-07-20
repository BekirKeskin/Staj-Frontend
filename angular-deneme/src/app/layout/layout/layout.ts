import { Component, effect, inject } from '@angular/core';
import { Header } from '../header/header'
import { Sidebar } from '../sidebar/sidebar';
import { RouterOutlet, Router } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth-store';



@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  imports: [Header, Sidebar, RouterOutlet]
})
export class Layout {

  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  constructor(){
    effect(()=>{
      const isAuthenticated = this.authStore.isAuthenticated();

      if(!this.authStore.isAuthenticated() && this.router.url !== "/login"){ // layout başka yerde kullanılırsa,
        this.router.navigate(["/login"]); //ya da ilk yüklemede gereksiz yönlendirme olmasın diye böyle bir şey yazdım 
      }
    });
  }

}
