import { Component, OnInit } from '@angular/core';
import {Principal,LoginService} from 'sitmun-plugin-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor(public loginService:LoginService,public principal:Principal) { }

  logout(){
    this.loginService.logout();
  }
    
  isLoggedIn(){
   // return this.authService.isLoggedIn();
   return this.principal.isAuthenticated();
  }

  
  
}
