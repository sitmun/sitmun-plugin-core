import {CartographyGroup } from './cartography-group.model';
import {CartographyGroupService } from './cartography-group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-cartography-group-list',
  templateUrl: './cartography-group-list.component.html',
  styleUrls: ['./cartography-group-list.component.css']
})
export class CartographyGroupListComponent implements OnInit {

  items:CartographyGroup[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<CartographyGroup>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private cartographyGroupService:CartographyGroupService ) { }
  
  ngOnInit() {
    this.getAllCartographyGroups();
    
  }

  getAllCartographyGroups() {
    this.cartographyGroupService.getAll()
    .subscribe((items:CartographyGroup[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<CartographyGroup>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:CartographyGroup) {
    this.cartographyGroupService.delete(item).subscribe(result => {
      this.getAllCartographyGroups();
    }, error => console.error(error));
     
  }

}