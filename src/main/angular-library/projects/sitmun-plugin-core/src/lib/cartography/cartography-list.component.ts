import {Cartography } from './cartography.model';
import {Service } from '../service/service.model';
import {CartographyService } from './cartography.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-cartography-list',
  templateUrl: './cartography-list.component.html',
  styleUrls: ['./cartography-list.component.css']
})
export class CartographyListComponent implements OnInit {

  items:Cartography[];
  
  displayedColumns = ['name','service','actions'];
  dataSource = new MatTableDataSource<Cartography>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private cartographyService:CartographyService ) { }
  
  ngOnInit() {
    this.getAllCartographys();
    
  }

  getAllCartographys() {
    this.cartographyService.getAll()
    .subscribe((items:Cartography[]) => {
        this.items = items;
        this.items.forEach( (item) => {
                        item.getRelation(Service, 'service').subscribe(
                        (service: Service) => item.service = service,
                        error => item.service = new Service());
        });
                      
        this.dataSource = new MatTableDataSource<Cartography>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:Cartography) {
    this.cartographyService.delete(item).subscribe(result => {
      this.getAllCartographys();
    }, error => console.error(error));
     
  }

}