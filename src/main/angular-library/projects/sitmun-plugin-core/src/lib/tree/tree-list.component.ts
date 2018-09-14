import {Tree } from './tree.model';
import {TreeService } from './tree.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {

  items:Tree[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<Tree>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private treeService:TreeService ) { }
  
  ngOnInit() {
    this.getAllTrees();
    
  }

  getAllTrees() {
    this.treeService.getAll()
    .subscribe((items:Tree[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Tree>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:Tree) {
    this.treeService.delete(item).subscribe(result => {
      this.getAllTrees();
    }, error => console.error(error));
     
  }

}