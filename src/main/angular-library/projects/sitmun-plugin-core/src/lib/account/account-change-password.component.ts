import { Component} from '@angular/core';
import { AccountService } from './account.service';
import { FormGroup, FormControl, FormBuilder, Validators ,ValidationErrors} from '@angular/forms';



@Component({
  selector: 'app-account-change-password',
  templateUrl: './account-change-password.component.html',
  styleUrls: ['./account-change-password.component.css']
})
export class AccountChangePasswordComponent {
 
  doNotMatch: string;

  form:FormGroup;

    constructor(private fb:FormBuilder, 
                 private accountService:AccountService) {

        this.form = this.fb.group({
            password: ['',Validators.required],
            confirmPassword: ['',Validators.required]
        });


    }

    changePassword() {
        const val = this.form.value;

        if (val.confirmPassword && val.password && (val.confirmPassword === val.password)){
            this.accountService.changePassword(val)
                .subscribe(
                    () => {
                        console.log('User is logged in');
                        
                    }
                );
        } else {
          this.doNotMatch = "ERROR";
        	
        }
    }
}
