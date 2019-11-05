import {TaskUI } from './task-ui.model';
import {TaskUIService } from './task-ui.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material'; 

/** Component for managing task UIs*/
@Component({
  selector: 'sitmun-task-ui-list',
  templateUrl: './task-ui-list.component.html',
  styleUrls: ['./task-ui-list.component.css']
})
export class TaskUIListComponent implements OnInit {
  
  /** Task UIs to manage */
  items:TaskUI[];
  
  /** Table displayed columns */
  displayedColumns = ['name','actions'];
  
  /** MatTableDataSource for table display */
  dataSource = new MatTableDataSource<TaskUI>(this.items);

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  /** Component constructor */
  constructor( private taskUIService:TaskUIService ) { }
  
  /** On component init, get all data dependencies */
  ngOnInit() {
    this.getAllTaskUIs();
    
  }
  
  /** load all task UIs*/
  getAllTaskUIs() {
    this.taskUIService.getAll()
    .subscribe((items:TaskUI[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<TaskUI>(this.items);
        this.dataSource.paginator = this.paginator;

    });
  }
  
  /** remove task UI*/
  remove(item:TaskUI) {
    this.taskUIService.delete(item).subscribe(result => {
      this.getAllTaskUIs();
    }, error => console.error(error));
     
  }

}