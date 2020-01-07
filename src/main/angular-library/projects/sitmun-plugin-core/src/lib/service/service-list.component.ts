import {Service } from 'sitmun-frontend-core';
import {ServiceService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing services*/
@Component({
  selector: 'sitmun-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  /** services to manage */
  items:Service[];

  /** Table displayed columns */
  displayedColumns = ['name','type','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Service>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private serviceService:ServiceService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllServices();

  }

  /** load all services*/
  getAllServices() {
    this.serviceService.getAll()
    .subscribe((items:Service[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Service>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** remove service*/
  remove(item:Service) {
    this.serviceService.delete(item).subscribe(result => {
      this.getAllServices();
    }, error => console.error(error));

  }

}
