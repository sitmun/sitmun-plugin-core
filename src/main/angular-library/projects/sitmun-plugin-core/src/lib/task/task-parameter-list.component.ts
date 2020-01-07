import { Resource } from 'angular-hal';
import { TaskParameter } from 'sitmun-frontend-core';
import { TaskParameterService } from 'sitmun-frontend-core';
import { TaskService } from 'sitmun-frontend-core';
import { Task } from 'sitmun-frontend-core';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/** Component for managing task parameters*/
@Component({
  selector: 'sitmun-task-parameter-list',
  templateUrl: './task-parameter-list.component.html',
  styleUrls: ['./task-parameter-list.component.css']
})
export class TaskParameterListComponent implements OnInit {

  /** Task parameters to manage */
  items: TaskParameter[];

  /** Task to manage */
  _task: Task;

  /** Table displayed columns */
  displayedColumns = ['name','value','actions'];

  /** MatTableDataSource for table display */
  dataSource = null;

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** constructor*/
  constructor(
    /** task parameter service*/private taskParameterService: TaskParameterService,
    /** dialog*/public dialog: MatDialog) {

  }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.items = new Array<TaskParameter>();

  }

  /** Set task to manage */
  @Input()
  set task(task: Task) {
    this._task = task;
    this.loadTaskParameters();
  }

  /** load all task parameters*/
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

  /** open dialog to edit task parameter*/
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

  /** add task parameter*/
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

  /** remove task parameter*/
  remove(item: TaskParameter) {
    this.taskParameterService.delete(item).subscribe(result => {
      this.loadTaskParameters();
    }, error => console.error(error));

  }


}

/** Component for edit task parameter data*/
@Component({
  selector: 'sitmun-task-parameter-dialog',
  templateUrl: './task-parameter-edit.dialog.html',
  styleUrls: ['./task-parameter-edit.dialog.css']
})
export class TaskParameterEditDialog implements OnInit {

  /** constructor*/
  constructor(
          /**task service*/ private taskService: TaskService,
          /**task parameter service*/ private taskParameterService: TaskParameterService,
          /**dialog reference*/ public dialogRef: MatDialogRef<TaskParameterEditDialog>,
          /**task parameter to edit*/ @Inject(MAT_DIALOG_DATA) public taskParameter: TaskParameter ) {
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
      if (this.taskParameter._links) {
        this.taskParameter.getRelation(Task, 'task').subscribe(
                    (task: Task) => this.taskParameter.task = task,
                    error => this.taskParameter.task = new Task());
     }

  }

  /** save task parameter*/
  save() {
      this.taskParameterService.save(this.taskParameter).subscribe(result => {
      this.dialogRef.close();
      }, error => console.error(error));
  }

  /** compare two resources*/
  compareResource(c1: Resource, c2: Resource): boolean {
    if (c2 && c1)
      return c2._links && c1._links ? c1._links.self.href === c2._links.self.href : c1 === c2;
    else
      return false;
  }

}
