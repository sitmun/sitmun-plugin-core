import {TaskUI } from './task-ui.model';
import {TaskUIService } from './task-ui.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-task-ui-list',
  templateUrl: './task-ui-list.component.html',
  styleUrls: ['./task-ui-list.component.css']
})
export class TaskUIListComponent implements OnInit {

  items:TaskUI[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<TaskUI>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private taskUIService:TaskUIService ) { }
  
  ngOnInit() {
    this.getAllTaskUIs();
    
  }

  getAllTaskUIs() {
    this.taskUIService.getAll()
    .subscribe((items:TaskUI[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TaskUI>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:TaskUI) {
    this.taskUIService.delete(item).subscribe(result => {
      this.getAllTaskUIs();
    }, error => console.error(error));
     
  }

}