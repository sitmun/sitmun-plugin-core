import {TaskType } from './task-type.model';
import {TaskTypeService } from './task-type.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-task-type-list',
  templateUrl: './task-type-list.component.html',
  styleUrls: ['./task-type-list.component.css']
})
export class TaskTypeListComponent implements OnInit {

  items:TaskType[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<TaskType>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private taskTypeService:TaskTypeService ) { }
  
  ngOnInit() {
    this.getAllTaskTypes();
    
  }

  getAllTaskTypes() {
    this.taskTypeService.getAll()
    .subscribe((items:TaskType[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TaskType>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:TaskType) {
    this.taskTypeService.delete(item).subscribe(result => {
      this.getAllTaskTypes();
    }, error => console.error(error));
     
  }

}