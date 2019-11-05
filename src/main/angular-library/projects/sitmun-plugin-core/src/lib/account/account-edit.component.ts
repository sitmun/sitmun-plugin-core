import { Component, OnInit } from '@angular/core';
import {AccountService } from './account.service';
import {User } from '../user/user.model';

/**
 * Account data edit component
 */
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  /** user data to edit*/
  item: User = new User();

  /** success status variable*/
  success: string;
  
  /** constructor*/
  constructor(
  	private accountService: AccountService) {
  }
  
  /** On component init load all required data dependencies*/
  ngOnInit() {
    
        this.accountService.get().subscribe((item: any) => {
          if (item) {
            this.item = item;
            
          } else {
            console.log(`no logged user`);
            //Todo go to login
          }
        });
  }

 
  /** save account data*/
  save() {
      this.accountService.save(this.item).subscribe(result => {      
        //Todo display message?
        this.success = "OK";
      }, error => console.error(error));
  }

  

}
