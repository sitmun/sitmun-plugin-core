import { Resource } from 'angular-hal';
import { TaskAvailability } from 'sitmun-frontend-core';
import { Territory } from 'sitmun-frontend-core';
import { TerritoryService } from 'sitmun-frontend-core';
import { TaskAvailabilityService } from 'sitmun-frontend-core';
import { TaskService } from 'sitmun-frontend-core';
import { Task } from 'sitmun-frontend-core';
import {Principal} from 'sitmun-frontend-core';
import {LoginService} from 'sitmun-frontend-core';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/** Component for managing task availabilities*/
@Component({
  selector: 'sitmun-task-availability-list',
  templateUrl: './task-availability-list.component.html',
  styleUrls: ['./task-availability-list.component.css']
})
export class TaskAvailabilityListComponent implements OnInit {
  /** task availabilities to manage */
  items: TaskAvailability[];

  /** task to manage */
  _task: Task;

  /** Table displayed columns */
  displayedColumns = ['territory','actions'];

  /** MatTableDataSource for table display */
  dataSource = null;

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor(
          /**task availability service*/private taskAvailabilityService: TaskAvailabilityService,
          /**dialog*/public dialog: MatDialog) {

  }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.items = new Array<TaskAvailability>();

  }

  /** Set task to manage its availabilities*/
  @Input()
  set task(task: Task) {
    this._task = task;
    this.loadTaskAvailabilities();
  }

  /** load all task availabilities*/
  loadTaskAvailabilities(){
    if (this._task!=null){
     this._task.getRelationArray(TaskAvailability, 'availabilities').subscribe(
                    (items: TaskAvailability[]) => {

                    this.items = items;

                    this.items.forEach( (item) => {
                        item.getRelation(Territory, 'territory').subscribe(
                        (territory: Territory) => item.territory = territory,
                        error => item.territory = new Territory());


                    });
                    this.dataSource  = new MatTableDataSource<TaskAvailability>(this.items);
                    this.dataSource.paginator = this.paginator;

                 },
                    error => this.items = new Array<TaskAvailability>());

    }
  }

  /** open dialog to edit task availability data*/
  edit(taskAvailability: TaskAvailability): void {
    let dialogRef = this.dialog.open(TaskAvailabilityEditDialog, {
      width: '250px',
      data: taskAvailability
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadTaskAvailabilities();

    });
  }

  /** add task availability*/
  add(): void {
    let taskavailability = new TaskAvailability();
    taskavailability.task = this._task;
    let dialogRef = this.dialog.open(TaskAvailabilityEditDialog, {
      width: '250px',
      data: taskavailability
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadTaskAvailabilities();
    });
  }

  /** remove task availability*/
  remove(item: TaskAvailability) {
    this.taskAvailabilityService.delete(item).subscribe(result => {
      this.loadTaskAvailabilities();
    }, error => console.error(error));

  }

}

/** Component for edit task availability data*/
@Component({
  selector: 'sitmun-task-availability-dialog',
  templateUrl: './task-availability-edit.dialog.html',
  styleUrls: ['./task-availability-edit.dialog.css']
})
export class TaskAvailabilityEditDialog implements OnInit {

  /** territories to select*/
  territories: Territory[] = new Array<Territory>();

  /** current account*/
  currentAccount: any;

  /** constructor*/
  constructor(
    /** task service*/private taskService: TaskService,
    /** task availability service*/private taskAvailabilityService: TaskAvailabilityService,
    /** territory service*/private territoryService: TerritoryService,
    /** principal*/public principal:Principal, /** login service*/public loginService:LoginService,
    /** dialog reference*/public dialogRef: MatDialogRef<TaskAvailabilityEditDialog>,
    /** task availability to edit*/@Inject(MAT_DIALOG_DATA) public taskAvailability: TaskAvailability ) {
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
     this.principal.identity().then((account) => {
                 this.currentAccount = account;
      });
    this.getAllTerritories();

      if (this.taskAvailability._links) {
        this.taskAvailability.getRelation(Task, 'task').subscribe(
                    (task: Task) => this.taskAvailability.task = task,
                    error => this.taskAvailability.task = new Task());

        this.taskAvailability.getRelation(Territory, 'territory').subscribe(
                    (territory: Territory) => this.taskAvailability.territory = territory,
                    error => this.taskAvailability.territory = new Territory());

     }

  }



  /** load all territories*/
  getAllTerritories() {
    this.territoryService.getAll()
    .subscribe((territories: Territory[]) => {
      //TODO remove not admin territories
        if (this.principal.hasAnyAuthorityDirect(['ADMIN SITMUN'])){
            this.territories = territories;
        } else {

          this.territories = territories.filter(t =>
             this.principal.hasAnyAuthorityDirectOnTerritory(['ADMIN ORGANIZACION'],t.name));
        }


    });
  }



  /** save task availability*/
  save() {
      this.taskAvailabilityService.save(this.taskAvailability).subscribe(result => {
      this.dialogRef.close();
      }, error => console.error(error));
  }

  /** compare two resource*/
  compareResource(c1: Resource, c2: Resource): boolean {
    if (c2 && c1)
      return c2._links && c1._links ? c1._links.self.href === c2._links.self.href : c1 === c2;
    else
      return false;
  }

}
