import {Tree } from './tree.model';
import {TreeService } from './tree.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

/** Component for managing trees*/
@Component({
  selector: 'sitmun-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {
  
  /** Trees to manage */
  items:Tree[];
  
  /** Table displayed columns */
  displayedColumns = ['name','actions'];
  
  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Tree>(this.items);

  /** Paginator for table display */  
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  /** Component constructor */
  constructor( private treeService:TreeService ) { }
  
  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllTrees();
    
  }
  
  /** load all trees*/
  getAllTrees() {
    this.treeService.getAll()
    .subscribe((items:Tree[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Tree>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  /** remove tree*/
  remove(item:Tree) {
    this.treeService.delete(item).subscribe(result => {
      this.getAllTrees();
    }, error => console.error(error));
     
  }

}