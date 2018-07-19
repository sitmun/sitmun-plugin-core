import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  badCredentials: string;

  form:FormGroup;

    constructor(private fb:FormBuilder, 
                 private authService: AuthService,
                 private loginService: LoginService,  
                 private router: Router) {

        this.form = this.fb.group({
            username: ['',Validators.required],
            password: ['',Validators.required]
        });
    }

    login() {
        const val = this.form.value;

        if (val.username && val.password) {
            this.loginService.login(val).then(() =>
                 {
                        console.log('User is logged in');
                        this.router.navigateByUrl('/');
                    }, (err) => {
                  this.badCredentials = 'ERROR';
               
            });
               
        }
    }
}
