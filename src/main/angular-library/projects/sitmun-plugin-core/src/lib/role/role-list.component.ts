import { Role } from './role.model';
import { RoleService } from './role.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

/** Component for managing roles*/
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  
  /** roles to manage */
  items: Role[];

  /** Table displayed columns */
  displayedColumns = ['name','actions'];
  
  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Role>(this.items);
  
  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  /** Component constructor */
  constructor( private roleService: RoleService ) { }
  
  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllRoles();
    
  }
  
  /** load all roles*/
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((items: Role[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Role>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  /** remove role*/
  remove(item: Role) {
    this.roleService.delete(item).subscribe(result => {
      this.getAllRoles();
    }, error => console.error(error));
     
  }

}