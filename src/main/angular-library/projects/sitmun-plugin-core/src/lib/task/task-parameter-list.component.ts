import { Resource } from 'angular-hal';  
import { TaskParameter } from './task-parameter.model';
import { TaskParameterService } from './task-parameter.service';
import { TaskService } from './task.service';
import { Task } from './task.model';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'sitmun-task-parameter-list',
  templateUrl: './task-parameter-list.component.html',
  styleUrls: ['./task-parameter-list.component.css']
})
export class TaskParameterListComponent implements OnInit {

  items: TaskParameter[];
  _task: Task;

  displayedColumns = ['name','value','actions'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private taskParameterService: TaskParameterService,    
    
    public dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.items = new Array<TaskParameter>();
    
  }

  @Input()
  set task(task: Task) {    
    this._task = task;
    this.loadTaskParameters();
  }


  loadTaskParameters(){
    if (this._task!=null){
     this._task.getRelationArray(TaskParameter, 'parameters').subscribe(
                    (items: TaskParameter[]) => {
                      
                    this.items = items;
                    
                    this.dataSource  = new MatTableDataSource<TaskParameter>(this.items);
                    this.dataSource.paginator = this.paginator;

                 },
                    error => this.items = new Array<TaskParameter>());
      
    }
  }

  edit(taskParameter: TaskParameter): void {
    let dialogRef = this.dialog.open(TaskParameterEditDialog, {
      width: '250px',
      data: taskParameter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadTaskParameters();
       
    });
  }

  add(): void {
    let taskParameter = new TaskParameter();
    taskParameter.task = this._task;
    let dialogRef = this.dialog.open(TaskParameterEditDialog, {
      width: '250px',
      data: taskParameter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadTaskParameters();
    });
  }

  remove(item: TaskParameter) {
    this.taskParameterService.delete(item).subscribe(result => {
      this.loadTaskParameters();
    }, error => console.error(error));
     
  }
  
  

}
@Component({
  selector: 'sitmun-task-parameter-dialog',
  templateUrl: './task-parameter-edit.dialog.html',
  styleUrls: ['./task-parameter-edit.dialog.css']
})
export class TaskParameterEditDialog implements OnInit {

  
  constructor(
    private taskService: TaskService,
    private taskParameterService: TaskParameterService,
    public dialogRef: MatDialogRef<TaskParameterEditDialog>,
    @Inject(MAT_DIALOG_DATA) public taskParameter: TaskParameter ) {
  }


  ngOnInit() {
     
    
      if (this.taskParameter._links) {
        this.taskParameter.getRelation(Task, 'task').subscribe(
                    (task: Task) => this.taskParameter.task = task,
                    error => this.taskParameter.task = new Task());

       
     }
    
  }
  
  save() {
      this.taskParameterService.save(this.taskParameter).subscribe(result => {      
      this.dialogRef.close();
      }, error => console.error(error));
  }

  
  compareResource(c1: Resource, c2: Resource): boolean {
    if (c2 && c1)
      return c2._links && c1._links ? c1._links.self.href === c2._links.self.href : c1 === c2;
    else 
      return false;
  }

}