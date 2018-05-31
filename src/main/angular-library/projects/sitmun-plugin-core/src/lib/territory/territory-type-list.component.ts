import { TerritoryType } from './territory-type.model';
import { TerritoryTypeService } from './territory-type.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-territory-type-list',
  templateUrl: './territory-type-list.component.html',
  styleUrls: ['./territory-type-list.component.css']
})
export class TerritoryTypeListComponent implements OnInit {

  items: TerritoryType[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<TerritoryType>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private territoryTypeService: TerritoryTypeService ) { }
  
  ngOnInit() {
    this.getAllTerritories();
    
  }

  getAllTerritories() {
    this.territoryTypeService.getAll()
    .subscribe((items: TerritoryType[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TerritoryType>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item: TerritoryType) {
    this.territoryTypeService.delete(item).subscribe(result => {
      this.getAllTerritories();
    }, error => console.error(error));
     
  }

}
