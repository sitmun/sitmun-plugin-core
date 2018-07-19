import { User } from './user.model';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sitmun-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  doNotMatch: string;
  
  success: string;
  form:FormGroup;
    
  userId: any;
    
  sub: Subscription;  

  constructor(private fb:FormBuilder, private route: ActivatedRoute,
    private router: Router,    
    private userService: UserService) {
      
       this.form = this.fb.group({
            password: ['',Validators.required],
            confirmPassword: ['',Validators.required]
        });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.userService.get(id).subscribe((user: any) => {
          if (user) {
            this.userId = id;
          } else {
            console.log(`user with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
 
  gotoList() {
    this.router.navigate(['/user-list']);
  }

  changePassword() {
        const val = this.form.value;

        if (val.confirmPassword && val.password && (val.confirmPassword === val.password)){
            this.userService.changePassword(this.userId,val)
                .subscribe(
                    () => {
                       this.success = "OK";
                        console.log("User password changed");
                        
                    }
                );
        } else {
          this.doNotMatch = "ERROR";
            console.log("password dont match");
        }
    }
 

}
