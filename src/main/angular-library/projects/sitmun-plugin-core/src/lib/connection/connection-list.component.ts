import {Connection } from './connection.model';
import {ConnectionService } from './connection.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css']
})
export class ConnectionListComponent implements OnInit {

  items:Connection[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<Connection>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private connectionService:ConnectionService ) { }
  
  ngOnInit() {
    this.getAllConnections();
    
  }

  getAllConnections() {
    this.connectionService.getAll()
    .subscribe((items:Connection[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Connection>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:Connection) {
    this.connectionService.delete(item).subscribe(result => {
      this.getAllConnections();
    }, error => console.error(error));
     
  }

}