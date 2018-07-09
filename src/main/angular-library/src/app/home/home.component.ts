import { Component, OnInit } from '@angular/core';
import {AuthService} from 'sitmun-plugin-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor(public authService:AuthService) { }

  logout(){
    this.authService.logout().subscribe();
  }
    
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  
  
}
