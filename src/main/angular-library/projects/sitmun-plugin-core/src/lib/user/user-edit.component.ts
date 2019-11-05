import { User } from './user.model';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

/**
 * User edit component
 */
@Component({
  selector: 'sitmun-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  
  /** user to edit*/
  user: User = new User();

  /** all users*/
  users: User[] = new Array<User>(); 

  /** subscription*/
  sub: Subscription;  
  
  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private userService: UserService) {
  }
  
  /** On component init load all required data dependencies*/
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.userService.get(id).subscribe((user: any) => {
          if (user) {
            this.user = user;
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
  
  /** load all users*/
  getAllUsers() {
    this.userService.getAll()
    .subscribe((users: User[]) => {
        this.users = users;
    });
  }
  
  /** navigate to user list page*/
  gotoList() {
    this.router.navigate(['/user-list']);
  }
  
  /** save user*/
  save() {
      if (this.user)
        this.userService.save(this.user).subscribe(result => {      

        this.gotoList();
      }, error => console.error(error));
  }
  
  /** remove user*/
  remove(user: User) {
    this.userService.delete(user).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }

}
