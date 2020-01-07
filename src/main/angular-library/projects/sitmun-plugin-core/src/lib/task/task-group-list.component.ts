import {TaskGroup } from 'sitmun-frontend-core';
import {TaskGroupService } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

/** Component for managing task groups*/
@Component({
  selector: 'sitmun-task-group-list',
  templateUrl: './task-group-list.component.html',
  styleUrls: ['./task-group-list.component.css']
})
export class TaskGroupListComponent implements OnInit {

  /** Task groups to manage */
  items:TaskGroup[];

  /** Table displayed columns */
  displayedColumns = ['name','actions'];

  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<TaskGroup>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor( private taskGroupService:TaskGroupService ) { }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllTaskGroups();

  }

  /** load all task groups*/
  getAllTaskGroups() {
    this.taskGroupService.getAll()
    .subscribe((items:TaskGroup[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TaskGroup>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }

  /** remove task group*/
  remove(item:TaskGroup) {
    this.taskGroupService.delete(item).subscribe(result => {
      this.getAllTaskGroups();
    }, error => console.error(error));

  }

}
