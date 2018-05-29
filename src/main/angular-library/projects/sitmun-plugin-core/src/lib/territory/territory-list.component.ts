import { Territory } from './territory.model'; 
import { TerritoryService } from './territory.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator,MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-territory-list',
  templateUrl: './territory-list.component.html',
  styleUrls: ['./territory-list.component.css']
})
export class TerritoryListComponent implements OnInit {

  territories: Territory[];
  
  displayedColumns = ['name', 'scope','blocked','actions'];
  dataSource = new MatTableDataSource<Territory>(this.territories);

  selection = new SelectionModel<Territory>(true, []);
  

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private territoryService: TerritoryService ) { }
  
  ngOnInit() {
    this.getAllTerritories();
    
  }

  getAllTerritories() {
    this.territoryService.getAll()
    .subscribe((territories: Territory[]) => {
        this.territories = territories;
        this.dataSource = new MatTableDataSource<Territory>(this.territories);
        this.dataSource.paginator = this.paginator;

    });
  }
  
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
