import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal'; 
import { Connection } from '../connection/connection.model';
import { ConnectionService } from '../connection/connection.service';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';
//import { TerritoryService } from '../territory/territory.service';
//import { Territory } from '../territory/territory.model';
import { TaskType } from './task-type.model';
import { TaskTypeService } from './task-type.service';
import { TaskGroup } from './task-group.model';
import { TaskGroupService } from './task-group.service';
import { TaskParameter } from './task-parameter.model';
import { TaskParameterService } from './task-parameter.service';
import { TaskAvailability} from './task-availability.model';
import { TaskAvailabilityService } from './task-availability.service';
import { Task } from './task.model';
import {TaskService} from './task.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'sitmun-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  task: Task = new Task();
  taskTypes: TaskType[] = new Array<TaskType>();
  taskGroups: TaskGroup[] = new Array<TaskGroup>();
  connections: Connection[] = new Array<Connection>();
  roles: Role[] = new Array<Role>();

  
  sub: Subscription;
  
  displayedColumns = ['select', 'name'];

  selection = new SelectionModel<Role>(true, []);
  
  dataSource = new MatTableDataSource<Role>([]);


  constructor(private route: ActivatedRoute,
    private router: Router,
    private connectionService: ConnectionService,
    private roleService: RoleService,
    private taskService: TaskService,
    private taskTypeService: TaskTypeService,
    private taskGroupService: TaskGroupService,
    private taskParameterService: TaskParameterService,
    private taskAvailabilityService: TaskAvailabilityService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.task.type = new TaskType();
      //this.task.type._links.self.href = null;
      //this.task.members = new Array<Task>();
      this.getAllTaskTypes();
      this.getAllTaskGroups();
      this.getAllRoles();
      this.getAllConnections();
    

      if (id) {
        this.taskService.get(id).subscribe((task: any) => {
          if (task) {
            this.task = task;
            this.task.createdDate = new Date();
            this.task.createdDate.setTime(Date.parse(task.createdDate));
            
            //ResourceHelper.resolveRelations(this.task);
            //alert('llego');
            
            this.task.getRelation(TaskType, 'type').subscribe(
                    (tpe: TaskType) => this.task.type = tpe,
                    error => this.task.type = new TaskType());
            this.task.getRelation(TaskGroup, 'group').subscribe(
                    (group: TaskGroup) => this.task.group = group,
                    error => this.task.group = new TaskGroup());
            this.task.getRelation(Connection, 'connection').subscribe(
                    (connection: Connection) => this.task.connection = connection,
                    error => this.task.connection = new Connection());
            
            this.task.getRelationArray(Role, 'roles').subscribe(
                    (roles: Role[]) => {
                      
                    this.task.roles = roles;
                    //this.selection = new SelectionModel<Territory>(true, this.territory.members);
                    this.dataSource.data.forEach(row => {
                        for (let member of this.task.roles){
                          if (row._links.self.href == member._links.self.href)
                             this.selection.select(row)
                        }
                      });

                 },
                    error => this.task.roles = new Array<Role>());
            
            
          } else {
            console.log(`task with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  
  
  getAllTaskTypes() {
    this.taskTypeService.getAll()
    .subscribe((taskTypes: TaskType[]) => {
        this.taskTypes = taskTypes;
    });
  }
  
  getAllTaskGroups() {
    this.taskGroupService.getAll()
    .subscribe((taskGroups: TaskGroup[]) => {
        this.taskGroups = taskGroups;
    });
  }

  
  getAllConnections() {
    this.connectionService.getAll()
    .subscribe((connections: Connection[]) => {
        this.connections = connections;
        
        const voidConnection = new Connection();
        voidConnection.name="";
        voidConnection._links= {};
        voidConnection._links.self = {};
        voidConnection._links.self.href="";
        this.connections.push(voidConnection);
                
    });
  }
    
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((roles: Role[]) => {
        this.roles = roles;
        this.dataSource = new MatTableDataSource<Role>(this.roles);
        
                
    });
  }
    
    
  gotoList() {
    this.router.navigate(['/task-list']);
  }

  save() {
    if (this.task.createdDate != null && (typeof this.task.createdDate != 'string')) {
      this.task.createdDate = this.task.createdDate.toISOString();
    }
    const isNew  = this.task._links == null;
    
    if (isNew) {
       //const taskType = this.task.type;
       //const taskGroup = this.task.group;
       //const taskConnection = this.task.connection;
       //this.task.type = null;
       //this.task.group = null;
       //this.task.connnection = null;
       this.taskService.save(this.task).subscribe(result => {
           
          if (this.selection.selected!=null){
        for (var i=0; i< this.selection.selected.length; i++){
          this.task.addRelation('roles',this.selection.selected[i]).subscribe(result => {      
          }, error => console.error(error));
        }
      } 
         this.gotoList(); 
         //this.task['_links'] = result['_links'];
           /*
         if (taskType !=null){
          this.task.substituteRelation('type',taskType).subscribe(result => {
      
            }, error => console.error(error));
         }
         if (taskGroup !=null){
           this.task.substituteRelation('group',taskType).subscribe(result => {
      
            }, error => console.error(error));           
         }
         if (taskConnection !=null){
          this.task.substituteRelation('connection',taskConnection).subscribe(result => {
      
            }, error => console.error(error));           
         }   
           */
       }     
      
       , error => console.error(error)); 
      
    }
    
    
    if (!isNew) {
           //borro todas las relaciones que hubiera y añado las seleccionadas
    if (this.task.roles!=null){
      for (var i=0; i< this.task.roles.length; i++){
        this.task.deleteRelation('roles',this.task.roles[i]).subscribe(result => {
            if (this.selection.selected!=null){
      for (var i=0; i< this.selection.selected.length; i++){
        this.task.addRelation('roles',this.selection.selected[i]).subscribe(result => {      
        }, error => console.error(error));
      }
    }      
        }, error => console.error(error));
      }
    } else

    if (this.selection.selected!=null){
      for (var i=0; i< this.selection.selected.length; i++){
        this.task.addRelation('roles',this.selection.selected[i]).subscribe(result => {      
        }, error => console.error(error));
      }
    }
         delete this.task.roles;   
         this.taskService.save(this.task).subscribe(result => {
         this.gotoList(); 
       }     
      
       , error => console.error(error)); 
    //borro todas las relaciones que hubiera y añado las seleccionadas
        /*
    if (typeof this.task.type._links != 'undefined'){
        
        this.task.substituteRelation('type',this.task.type).subscribe(result => {
        delete this.task.type;        
        if (typeof this.task.group._links != 'undefined'){
          this.task.substituteRelation('group',this.task.group).subscribe(result => {
          delete this.task.group;
          if (typeof this.task.connection._links != 'undefined'){
             this.task.substituteRelation('connection',this.task.connection).subscribe(result => {
             delete this.task.connection; 
             this.taskService.save(this.task).subscribe(result => {      
                this.gotoList();
                }, error => console.error(error));
      
                   }, error => console.error(error));
             }  else {
              this.taskService.save(this.task).subscribe(result => {      
                this.gotoList();
                }, error => console.error(error));
            }

      
         }, error => console.error(error));
       } else {
          this.taskService.save(this.task).subscribe(result => {      
            this.gotoList();
            }, error => console.error(error));
       }

      }, error => console.error(error));
    } else {

       
      this.taskService.save(this.task).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
        }
        */
    } 
      
    


  }

  remove(task: Task) {
    this.taskService.delete(task).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }
  
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
 }
  
 /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}