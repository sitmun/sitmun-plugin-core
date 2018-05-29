import { Role } from './role.model';
import { RoleService } from './role.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {

  item: Role = new Role();
  items: Role[] = new Array<Role>();
  
  sub: Subscription;
  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private roleService: RoleService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.roleService.get(id).subscribe((item: any) => {
          if (item) {
            this.item = item;
            
            
            
          } else {
            console.log(`territory type with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((items: Role[]) => {
        this.items = items;
    });
  }
  

  gotoList() {
    this.router.navigate(['/role-list']);
  }

  save() {
      this.roleService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(item: Role) {
    this.roleService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
