import {Application } from './application.model';
import {ApplicationService } from './application.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing applications*/
@Component({
  selector: 'sitmun-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  /** applications to manage */
  items:Application[];
  
  /** Table displayed columns */
  displayedColumns = ['name','actions'];
  
  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Application>(this.items);
  
  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  /** Component constructor */
  constructor( private applicationService:ApplicationService ) { }
  
  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllApplications();
    
  }
  
  /** load all applications*/
  getAllApplications() {
    this.applicationService.getAll()
    .subscribe((items:Application[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Application>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
 
  /** remove application*/
  remove(item:Application) {
    this.applicationService.delete(item).subscribe(result => {
      this.getAllApplications();
    }, error => console.error(error));
     
  }

}