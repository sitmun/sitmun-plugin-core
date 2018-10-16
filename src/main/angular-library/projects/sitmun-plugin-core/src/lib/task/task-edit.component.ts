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
import { TaskUI } from './task-ui.model';
import { TaskUIService } from './task-ui.service';
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
import { map, concatAll } from 'rxjs/operators';
import {Subscription, Observable, forkJoin, merge, concat, pipe, from} from 'rxjs';
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
    taskUIs: TaskUI[] = new Array<TaskUI>();
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
        private taskUIService: TaskUIService,
        private taskGroupService: TaskGroupService,
        private taskParameterService: TaskParameterService,
        private taskAvailabilityService: TaskAvailabilityService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            this.task.type = new TaskType();
            this.getAllTaskTypes();
            this.getAllTaskUIs();
            this.getAllTaskGroups();
            this.getAllRoles();
            this.getAllConnections();


            if (id) {
                this.taskService.get(id).subscribe((task: any) => {
                    if (task) {
                        this.task = task;
                        this.task.createdDate = new Date();
                        this.task.createdDate.setTime(Date.parse(task.createdDate));
                        this.task.getRelation(TaskType, 'type').subscribe(
                            (tpe: TaskType) => this.task.type = tpe,
                            error => this.task.type = new TaskType());
                        this.task.getRelation(TaskUI, 'ui').subscribe(
                            (ui: TaskUI) => this.task.ui = ui,
                            error => this.task.ui = new TaskUI());
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
                                    for (let member of this.task.roles) {
                                        if (row._links.self.href == member._links.self.href)
                                            this.selection.select(row)
                                    }
                                });

                            },
                            error => this.task.roles = new Array<Role>());
                        /*

                        forkJoin(
                            this.task.getRelation(TaskType, 'type').catch(error => this.task.type = new TaskType()),
                            this.task.getRelation(TaskUI, 'ui').catch(error => this.task.ui = new TaskUI()),
                            this.task.getRelation(TaskGroup, 'group').catch(error => this.task.group = new TaskGroup()),
                            this.task.getRelation(Connection, 'connection').catch(error => this.task.connection = new Connection()),
                            this.task.getRelationArray(Role, 'roles')).subscribe(
                            ([tpe, ui, group, connection, roles]) => {
                                this.task.type = tpe;
                                this.task.connection = connection;
                                this.task.ui = ui;
                                this.task.group = group;
                                //this.selection = new SelectionModel<Territory>(true, this.territory.members);
                                this.task.roles = roles;
                                this.dataSource.data.forEach(row => {
                                    for (let member of this.task.roles) {
                                        if (row._links.self.href == member._links.self.href)
                                            this.selection.select(row)
                                    }
                                });

                            }, error => this.task.roles = new Array<Role>());
*/

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
                const voidItem = new TaskType();
                voidItem.name = "";
                voidItem._links = {};
                voidItem._links.self = {};
                voidItem._links.self.href = "";
                this.taskTypes.push(voidItem);
            });
    }

    getAllTaskUIs() {
        this.taskUIService.getAll()
            .subscribe((taskUIs: TaskUI[]) => {
                this.taskUIs = taskUIs;
                const voidItem = new TaskUI();
                voidItem.name = "";
                voidItem._links = {};
                voidItem._links.self = {};
                voidItem._links.self.href = "";
                this.taskUIs.push(voidItem);
            });
    }

    getAllTaskGroups() {
        this.taskGroupService.getAll()
            .subscribe((taskGroups: TaskGroup[]) => {
                this.taskGroups = taskGroups;
                const voidItem = new TaskGroup();
                voidItem.name = "";
                voidItem._links = {};
                voidItem._links.self = {};
                voidItem._links.self.href = "";
                this.taskGroups.push(voidItem);

            });
    }


    getAllConnections() {
        this.connectionService.getAll()
            .subscribe((connections: Connection[]) => {
                this.connections = connections;

                const voidConnection = new Connection();
                voidConnection.name = "";
                voidConnection._links = {};
                voidConnection._links.self = {};
                voidConnection._links.self.href = "";
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
        const isNew = this.task._links == null;

        if (isNew) {
            if (this.selection.selected != null) {
              this.task.roles = this.selection.selected;
            }

            this.task.roles = this.task.roles.map(function(role) {
                return role._links.self.href;
            });

            this.taskService.create(this.task).subscribe(result => {
                this.gotoList();

            }

                , error => console.error(error));

        } else {
            
            let taskRoles = this.task.roles;
            
            forkJoin(taskRoles.map(role => this.task.deleteRelation('roles', role))).subscribe(result => {
                 forkJoin(this.selection.selected.map(role => this.task.addRelation('roles', role))).subscribe(result => {
                
                }
                , error => console.error(error));
            }
                , error => console.error(error));
                
            delete this.task.roles;
            let update = concat(
                this.taskService.update(this.task)
                

            );
            
            update = concat(update,
                this.task.deleteAllRelation('type'),
                this.task.deleteAllRelation('ui'),
                this.task.deleteAllRelation('connection'),
                this.task.deleteAllRelation('group')
                

            );
            
            if (this.task.type._links!=null && this.task.type._links.self.href!=''){            
                update = concat(update,this.task.addRelation('type', this.task.type));
            } 
            if (this.task.ui._links!=null && this.task.ui._links.self.href!=''){            
                update = concat(update,this.task.addRelation('ui', this.task.ui));
            } 
            if (this.task.connection._links!=null && this.task.connection._links.self.href!=''){            
                update = concat(update, this.task.addRelation('connection', this.task.connection));
            }     
            if (this.task.group._links!=null && this.task.group._links.self.href!=''){            
                update = concat(update,this.task.addRelation('group', this.task.group));
            }

            update.subscribe(result => {
                this.gotoList();
            }
                , error => console.error(error));


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