import {Service } from './service.model';
import {ServiceService } from './service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  items:Service[];
  
  displayedColumns = ['name','type','actions'];
  dataSource = new MatTableDataSource<Service>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private serviceService:ServiceService ) { }
  
  ngOnInit() {
    this.getAllServices();
    
  }

  getAllServices() {
    this.serviceService.getAll()
    .subscribe((items:Service[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Service>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:Service) {
    this.serviceService.delete(item).subscribe(result => {
      this.getAllServices();
    }, error => console.error(error));
     
  }

}