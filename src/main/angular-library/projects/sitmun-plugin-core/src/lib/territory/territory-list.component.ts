import { Territory } from 'sitmun-frontend-core';
import { TerritoryService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


/** Component for managing territories */
@Component({
  selector: 'app-territory-list',
  templateUrl: './territory-list.component.html',
  styleUrls: ['./territory-list.component.css']
})
export class TerritoryListComponent implements OnInit {

  /** Territories to manage */
  territories: Territory[];

  /** Table displayed columns */
  displayedColumns = ['name', 'scope','blocked','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Territory>(this.territories);

  /** SelectionModel for table display */
  selection = new SelectionModel<Territory>(true, []);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private territoryService: TerritoryService ) { }

  /** On component init, get all the territories from the system */
  ngOnInit() {
    this.getAllTerritories();

  }

  /** Get all the territories from the system */
  getAllTerritories() {
    this.territoryService.getAll()
    .subscribe((territories: Territory[]) => {
        this.territories = territories;
        this.dataSource = new MatTableDataSource<Territory>(this.territories);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** Remove the territory from the system */
  remove(territory: Territory) {
    this.territoryService.delete(territory).subscribe(result => {
      this.getAllTerritories();
    }, error => console.error(error));

  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
