import { Component, OnInit } from '@angular/core';
import {Principal,LoginService} from 'sitmun-plugin-core';

/** Demo app Home component*/
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  /** Component constructor */
  constructor(
          /** Login service */public loginService:LoginService,
          /** Identity service */ public principal:Principal) { }

  /** Logout user */
  logout(){
    this.loginService.logout();
  }
    
  /** Whether the user is logged in*/
  isLoggedIn(){
   return this.principal.isAuthenticated();
  }

  
  
}
