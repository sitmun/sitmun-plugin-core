import {CartographyGroup } from './cartography-group.model';
import {CartographyGroupService } from './cartography-group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

/** Component for managing cartography groups*/
@Component({
  selector: 'sitmun-cartography-group-list',
  templateUrl: './cartography-group-list.component.html',
  styleUrls: ['./cartography-group-list.component.css']
})
export class CartographyGroupListComponent implements OnInit {
  
  /** cartography groups to manage */
  items:CartographyGroup[];
  
  /** Table displayed columns */
  displayedColumns = ['name','actions'];
  
  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<CartographyGroup>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  /** Component constructor */
  constructor( private cartographyGroupService:CartographyGroupService ) { }
  
  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllCartographyGroups();
    
  }
  
  /** load all cartography groups*/
  getAllCartographyGroups() {
    this.cartographyGroupService.getAll()
    .subscribe((items:CartographyGroup[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<CartographyGroup>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  /** remove cartography group*/
  remove(item:CartographyGroup) {
    this.cartographyGroupService.delete(item).subscribe(result => {
      this.getAllCartographyGroups();
    }, error => console.error(error));
     
  }

}