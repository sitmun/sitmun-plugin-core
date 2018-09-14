
import {Background } from './background.model';
import {CartographyGroup } from './cartography-group.model';
import {BackgroundService } from './background.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-background-list',
  templateUrl: './background-list.component.html',
  styleUrls: ['./background-list.component.css']
})
export class BackgroundListComponent implements OnInit {

  items:Background[];
  
  displayedColumns = ['name','cartographyGroup','actions'];
  dataSource = new MatTableDataSource<Background>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private backgroundService:BackgroundService ) { }
  
  ngOnInit() {
    this.getAllBackgrounds();
    
  }

  getAllBackgrounds() {
    this.backgroundService.getAll()
    .subscribe((items:Background[]) => {
        this.items = items;
        this.items.forEach( (item) => {
                        item.getRelation(CartographyGroup, 'cartographyGroup').subscribe(
                        (cartographyGroup: CartographyGroup) => item.cartographyGroup = cartographyGroup,
                        error => item.cartographyGroup = new CartographyGroup());
        });
                      
        this.dataSource = new MatTableDataSource<Background>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:Background) {
    this.backgroundService.delete(item).subscribe(result => {
      this.getAllBackgrounds();
    }, error => console.error(error));
     
  }
  
}