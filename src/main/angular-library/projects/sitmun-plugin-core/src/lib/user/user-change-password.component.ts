import { User } from 'sitmun-frontend-core';
import { UserService } from 'sitmun-frontend-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/**
 * User change password component
 */
@Component({
  selector: 'sitmun-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  /** password do not match message variable*/
  doNotMatch: string;

  /** success message variable*/
  success: string;

  /** form object */
  form:FormGroup;

  /** user identifier */
  userId: any;

  /** subscription*/
  sub: Subscription;

  /** constructor*/
  constructor(private fb:FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

       this.form = this.fb.group({
            password: ['',Validators.required],
            confirmPassword: ['',Validators.required]
        });
  }

  /** On component init load all required data dependencies*/
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

  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /** On component init load all required data dependencies*/
  gotoList() {
    this.router.navigate(['/user-list']);
  }

  /** change password action*/
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
