import { TerritoryType } from 'sitmun-frontend-core';
import { TerritoryTypeService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

/** Component for managing territory types*/
@Component({
  selector: 'app-territory-type-list',
  templateUrl: './territory-type-list.component.html',
  styleUrls: ['./territory-type-list.component.css']
})
export class TerritoryTypeListComponent implements OnInit {

  /** Territory types to manage */
  items: TerritoryType[];

  /** Table displayed columns */
  displayedColumns = ['name','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<TerritoryType>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private territoryTypeService: TerritoryTypeService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllTerritories();

  }

  /** load all territory types*/
  getAllTerritories() {
    this.territoryTypeService.getAll()
    .subscribe((items: TerritoryType[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TerritoryType>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** remove territory type*/
  remove(item: TerritoryType) {
    this.territoryTypeService.delete(item).subscribe(result => {
      this.getAllTerritories();
    }, error => console.error(error));

  }

}
