import { Component } from '@angular/core';
import { AccountService } from 'sitmun-frontend-core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';


/**
 * Account change password component
 */
@Component( {
    selector: 'app-account-change-password',
    templateUrl: './account-change-password.component.html',
    styleUrls: ['./account-change-password.component.css']
} )
export class AccountChangePasswordComponent {

    /** password do not match message variable*/
    doNotMatch: string;

    /** success message variable*/
    success: string;

    /** form object */
    form: FormGroup;

    /** constructor*/
    constructor( private fb: FormBuilder,
        private accountService: AccountService ) {

        this.form = this.fb.group( {
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        } );


    }

    /** change password action*/
    changePassword() {
        const val = this.form.value;

        if ( val.confirmPassword && val.password && ( val.confirmPassword === val.password ) ) {
            this.accountService.changePassword( val )
                .subscribe(
                () => {
                    this.success = "OK";

                }
                );
        } else {
            this.doNotMatch = "ERROR";

        }
    }
}
