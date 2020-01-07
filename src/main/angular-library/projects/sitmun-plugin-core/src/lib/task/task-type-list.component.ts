import {TaskType } from 'sitmun-frontend-core';
import {TaskTypeService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing task types*/
@Component({
  selector: 'sitmun-task-type-list',
  templateUrl: './task-type-list.component.html',
  styleUrls: ['./task-type-list.component.css']
})
export class TaskTypeListComponent implements OnInit {

  /** Task types to manage */
  items:TaskType[];

  /** Table displayed columns */
  displayedColumns = ['name','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<TaskType>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private taskTypeService:TaskTypeService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllTaskTypes();
  }

  /** load all task types*/
  getAllTaskTypes() {
    this.taskTypeService.getAll()
    .subscribe((items:TaskType[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TaskType>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** remove task type*/
  remove(item:TaskType) {
    this.taskTypeService.delete(item).subscribe(result => {
      this.getAllTaskTypes();
    }, error => console.error(error));

  }

}
