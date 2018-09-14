import {Application } from './application.model';
import {ApplicationService } from './application.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {

  items:Application[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<Application>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private applicationService:ApplicationService ) { }
  
  ngOnInit() {
    this.getAllApplications();
    
  }

  getAllApplications() {
    this.applicationService.getAll()
    .subscribe((items:Application[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Application>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
   /* 
  show(item:Application) {
      alert(JSON.stringify(this.applicationService.getFullApplicationData(item)));
  } 
    */
       
  remove(item:Application) {
    this.applicationService.delete(item).subscribe(result => {
      this.getAllApplications();
    }, error => console.error(error));
     
  }

}