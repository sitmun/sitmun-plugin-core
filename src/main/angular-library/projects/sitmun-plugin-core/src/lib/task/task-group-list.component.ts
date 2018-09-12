import {TaskGroup } from './task-group.model';
import {TaskGroupService } from './task-group.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-task-group-list',
  templateUrl: './task-group-list.component.html',
  styleUrls: ['./task-group-list.component.css']
})
export class TaskGroupListComponent implements OnInit {

  items:TaskGroup[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<TaskGroup>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private taskGroupService:TaskGroupService ) { }
  
  ngOnInit() {
    this.getAllTaskGroups();
    
  }

  getAllTaskGroups() {
    this.taskGroupService.getAll()
    .subscribe((items:TaskGroup[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TaskGroup>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:TaskGroup) {
    this.taskGroupService.delete(item).subscribe(result => {
      this.getAllTaskGroups();
    }, error => console.error(error));
     
  }

}