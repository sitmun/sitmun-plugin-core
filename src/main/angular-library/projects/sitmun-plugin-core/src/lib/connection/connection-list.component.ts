import {Connection } from 'sitmun-frontend-core';
import {ConnectionService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing connections*/
@Component({
  selector: 'sitmun-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css']
})
export class ConnectionListComponent implements OnInit {

  /** connections to manage */
  items:Connection[];

  /** Table displayed columns */
  displayedColumns = ['name','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Connection>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private connectionService:ConnectionService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllConnections();

  }

  /** load all connections*/
  getAllConnections() {
    this.connectionService.getAll()
    .subscribe((items:Connection[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Connection>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** remove connection*/
  remove(item:Connection) {
    this.connectionService.delete(item).subscribe(result => {
      this.getAllConnections();
    }, error => console.error(error));

  }

}
