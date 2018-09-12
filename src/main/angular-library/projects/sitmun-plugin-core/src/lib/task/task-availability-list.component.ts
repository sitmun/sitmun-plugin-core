import { Resource } from 'angular-hal';  
import { TaskAvailability } from './task-availability.model';
import { Territory } from '../territory/territory.model';
import { TerritoryService } from '../territory/territory.service';
import { TaskAvailabilityService } from './task-availability.service';
import { TaskService } from './task.service';
import { Task } from './task.model';
import {Principal} from '../auth/principal.service';
import {LoginService} from '../auth/login.service';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'sitmun-task-availability-list',
  templateUrl: './task-availability-list.component.html',
  styleUrls: ['./task-availability-list.component.css']
})
export class TaskAvailabilityListComponent implements OnInit {

  items: TaskAvailability[];
  _task: Task;

  displayedColumns = ['territory','actions'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private taskAvailabilityService: TaskAvailabilityService,    
    
    public dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.items = new Array<TaskAvailability>();
    
  }

  @Input()
  set task(task: Task) {    
    this._task = task;
    this.loadTaskAvailabilities();
  }


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

  add(): void {
    let taskPermission = new TaskAvailability();
    taskPermission.task = this._task;
    let dialogRef = this.dialog.open(TaskAvailabilityEditDialog, {
      width: '250px',
      data: taskPermission
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadTaskAvailabilities();
    });
  }

  remove(item: TaskAvailability) {
    this.taskAvailabilityService.delete(item).subscribe(result => {
      this.loadTaskAvailabilities();
    }, error => console.error(error));
     
  }
  
  

}
@Component({
  selector: 'sitmun-task-availability-dialog',
  templateUrl: './task-availability-edit.dialog.html',
  styleUrls: ['./task-availability-edit.dialog.css']
})
export class TaskAvailabilityEditDialog implements OnInit {

  territories: Territory[] = new Array<Territory>();
  currentAccount: any;
  
  constructor(
    private taskService: TaskService,
    private taskAvailabilityService: TaskAvailabilityService,
    private territoryService: TerritoryService,
    public principal:Principal, public loginService:LoginService,
    public dialogRef: MatDialogRef<TaskAvailabilityEditDialog>,
    @Inject(MAT_DIALOG_DATA) public taskAvailability: TaskAvailability ) {
  }


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
  
  

  save() {
      this.taskAvailabilityService.save(this.taskAvailability).subscribe(result => {      
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