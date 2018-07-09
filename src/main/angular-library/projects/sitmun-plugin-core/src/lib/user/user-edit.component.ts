import { User } from './user.model';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'sitmun-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User();
  users: User[] = new Array<User>();  
  sub: Subscription;  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private userService: UserService) {
  }

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllUsers() {
    this.userService.getAll()
    .subscribe((users: User[]) => {
        this.users = users;
    });
  }
  

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  save() {
      this.userService.save(this.user).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(user: User) {
    this.userService.delete(user).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }

}
