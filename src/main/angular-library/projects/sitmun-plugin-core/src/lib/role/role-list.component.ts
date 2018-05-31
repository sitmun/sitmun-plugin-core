import { Role } from './role.model';
import { RoleService } from './role.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  items: Role[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<Role>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private roleService: RoleService ) { }
  
  ngOnInit() {
    this.getAllTerritories();
    
  }

  getAllTerritories() {
    this.roleService.getAll()
    .subscribe((items: Role[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Role>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item: Role) {
    this.roleService.delete(item).subscribe(result => {
      this.getAllTerritories();
    }, error => console.error(error));
     
  }

}