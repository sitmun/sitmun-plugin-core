import {Cartography } from 'sitmun-frontend-core';
import {Service } from 'sitmun-frontend-core';
import {CartographyService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing cartographys*/
@Component({
  selector: 'sitmun-cartography-list',
  templateUrl: './cartography-list.component.html',
  styleUrls: ['./cartography-list.component.css']
})
export class CartographyListComponent implements OnInit {

  /** cartographys to manage */
  items:Cartography[];

  /** Table displayed columns */
  displayedColumns = ['name','service','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Cartography>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private cartographyService:CartographyService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllCartographys();

  }

  /** load all cartographys*/
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

  /** remove cartography*/
  remove(item:Cartography) {
    this.cartographyService.delete(item).subscribe(result => {
      this.getAllCartographys();
    }, error => console.error(error));

  }

}
