import { Role } from './role.model';
import { RoleService } from './role.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

/**
 * Role edit component
 */
@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  
  /** role to edit*/
  item: Role = new Role();
  
  /** all roles*/
  items: Role[] = new Array<Role>();

  /** subscription*/
  sub: Subscription;
  
  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private roleService: RoleService) {
  }
  
  /** On component init load all required data dependencies*/
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
  
  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  /** load all roles*/
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((items: Role[]) => {
        this.items = items;
    });
  }
  
  /** navigate to role list page*/
  gotoList() {
    this.router.navigate(['/role-list']);
  }
  
  /** save role*/
  save() {
      this.roleService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }
  
  /** remove role*/
  remove(item: Role) {
    this.roleService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
