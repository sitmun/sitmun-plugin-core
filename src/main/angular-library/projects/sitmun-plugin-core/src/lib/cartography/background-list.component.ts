
import {Background } from 'sitmun-frontend-core';
import {CartographyGroup } from 'sitmun-frontend-core';
import {BackgroundService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing backgrounds*/
@Component({
  selector: 'sitmun-background-list',
  templateUrl: './background-list.component.html',
  styleUrls: ['./background-list.component.css']
})
export class BackgroundListComponent implements OnInit {

  /** backgrounds to manage */
  items:Background[];

  /** Table displayed columns */
  displayedColumns = ['name','cartographyGroup','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Background>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private backgroundService:BackgroundService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllBackgrounds();

  }

  /** load all backgrounds*/
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

  /** remove background*/
  remove(item:Background) {
    this.backgroundService.delete(item).subscribe(result => {
      this.getAllBackgrounds();
    }, error => console.error(error));

  }

}
