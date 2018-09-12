import {Task } from './task.model';
import {TaskService } from './task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

@Component({
  selector: 'sitmun-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  items:Task[];
  
  displayedColumns = ['name','actions'];
  dataSource = new MatTableDataSource<Task>(this.items);

  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  constructor( private taskService:TaskService ) { }
  
  ngOnInit() {
    this.getAllTasks();
    
  }

  getAllTasks() {
    this.taskService.getAll()
    .subscribe((items:Task[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Task>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  remove(item:Task) {
    this.taskService.delete(item).subscribe(result => {
      this.getAllTasks();
    }, error => console.error(error));
     
  }

}