import { Component, OnInit } from '@angular/core';
import {AccountService } from './account.service';
import {User } from '../user/user.model';
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  item: User = new User();
  
  
  constructor(
  	private accountService: AccountService) {
  }

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

 
 
  save() {
      this.accountService.save(this.item).subscribe(result => {      
        //Todo display message?
      }, error => console.error(error));
  }

  

}
