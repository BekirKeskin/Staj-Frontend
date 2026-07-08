import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {

  isDark = false;
  
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
