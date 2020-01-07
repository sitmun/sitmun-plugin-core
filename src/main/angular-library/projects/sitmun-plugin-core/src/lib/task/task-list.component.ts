import {Task } from 'sitmun-frontend-core';
import {TaskService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing tasks*/
@Component({
  selector: 'sitmun-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  /** Tasks to manage */
  items:Task[];

  /** Table displayed columns */
  displayedColumns = ['name','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<Task>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private taskService:TaskService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllTasks();

  }

  /** load all tasks*/
  getAllTasks() {
    this.taskService.getAll()
    .subscribe((items:Task[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Task>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** remove task*/
  remove(item:Task) {
    this.taskService.delete(item).subscribe(result => {
      this.getAllTasks();
    }, error => console.error(error));

  }

}
