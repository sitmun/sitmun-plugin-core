import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal';
import { Connection } from '../connection/connection.model';
import { ConnectionService } from '../connection/connection.service';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';
import { Tree } from '../tree/tree.model';
import { TreeService } from '../tree/tree.service';
import { CartographyGroup } from '../cartography/cartography-group.model';
import { CartographyGroupService } from '../cartography/cartography-group.service';
import { ApplicationParameter } from './application-parameter.model';
import { ApplicationParameterService } from './application-parameter.service';
import { ApplicationBackground} from './application-background.model';
import { ApplicationBackgroundService } from './application-background.service';
import { Application } from './application.model';
import {ApplicationService} from './application.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, Observable, forkJoin, merge, concat, pipe, from} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
    selector: 'sitmun-application-edit',
    templateUrl: './application-edit.component.html',
    styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit, OnDestroy {
    application: Application = new Application();
    cartographyGroups: CartographyGroup[] = new Array<CartographyGroup>();
    connections: Connection[] = new Array<Connection>();
    roles: Role[] = new Array<Role>();
    trees: Tree[] = new Array<Tree>();


    sub: Subscription;

    displayedColumns = ['select', 'name'];

    roleSelection = new SelectionModel<Role>(true, []);

    roleDataSource = new MatTableDataSource<Role>([]);

    treeSelection = new SelectionModel<Tree>(true, []);

    treeDataSource = new MatTableDataSource<Tree>([]);

    constructor(private route: ActivatedRoute,
        private router: Router,
        private roleService: RoleService,
        private treeService: TreeService,
        private applicationService: ApplicationService,
        private cartographyGroupService: CartographyGroupService,
        private applicationParameterService: ApplicationParameterService,
        private applicationBackgroundService: ApplicationBackgroundService) {
        this.getAllRoles();
        this.getAllTrees();
        this.getAllCartographyGroups();

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            //this.application.type._links.self.href = null;
            //this.application.members = new Array<Application>();



            if (id) {
                this.applicationService.get(id).subscribe((application: any) => {
                    if (application) {
                        this.application = application;
                        this.application.createdDate = new Date();
                        this.application.createdDate.setTime(Date.parse(application.createdDate));

                        //ResourceHelper.resolveRelations(this.application);

                        this.application.getRelation(CartographyGroup, 'situationMap').subscribe(
                            (situationMap: CartographyGroup) => this.application.situationMap = situationMap,
                            error => this.application.situationMap = new CartographyGroup());


                        this.application.getRelationArray(Role, 'availableRoles').subscribe(
                            (availableRoles: Role[]) => {

                                this.application.availableRoles = availableRoles;
                                this.roleDataSource.data.forEach(row => {
                                    for (let member of this.application.availableRoles) {
                                        if (row._links.self.href == member._links.self.href)
                                            this.roleSelection.select(row)
                                    }
                                });

                            },
                            error => this.application.availableRoles = new Array<Role>());

                        this.application.getRelationArray(Tree, 'trees').subscribe(
                            (trees: Tree[]) => {

                                this.application.trees = trees;
                                this.treeDataSource.data.forEach(row => {
                                    for (let member of this.application.trees) {
                                        if (row._links.self.href == member._links.self.href)
                                            this.treeSelection.select(row)
                                    }
                                });

                            },
                            error => this.application.availableRoles = new Array<Role>());
                    } else {
                        console.log(`application with id '${id}' not found, returning to list`);
                        this.gotoList();
                    }
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    getAllCartographyGroups() {
        this.cartographyGroupService.getAll()
            .subscribe((cartographyGroups: CartographyGroup[]) => {
                this.cartographyGroups = cartographyGroups;
            });
    }




    getAllRoles() {
        this.roleService.getAll()
            .subscribe((roles: Role[]) => {
                this.roles = roles;
                this.roleDataSource = new MatTableDataSource<Role>(this.roles);


            });
    }
    getAllTrees() {
        this.treeService.getAll()
            .subscribe((trees: Tree[]) => {
                this.trees = trees;
                this.treeDataSource = new MatTableDataSource<Tree>(this.trees);


            });
    }

    gotoList() {
        this.router.navigate(['/application-list']);
    }

    save() {
        if (this.application.createdDate != null && (typeof this.application.createdDate != 'string')) {
            this.application.createdDate = this.application.createdDate.toISOString();
        }
        const isNew = this.application._links == null;

        if (isNew) {
            if (this.roleSelection.selected != null) {
                this.application.availableRoles = this.roleSelection.selected;
            }

            this.application.availableRoles = this.application.availableRoles.map(function(role) {
                return role._links.self.href;
            });
            if (this.treeSelection.selected != null) {
                this.application.trees = this.treeSelection.selected;
            }

            this.application.trees = this.application.trees.map(function(role) {
                return role._links.self.href;
            });

            this.applicationService.create(this.application).subscribe(result => {
                this.gotoList();

            }

                , error => console.error(error));

        } else {

            let applicationRoles = this.application.availableRoles;
            if (applicationRoles)
                forkJoin(applicationRoles.map(role => this.application.deleteRelation('availableRoles', role))).subscribe(result => {
                }
                    , error => console.error(error));
            if (this.roleSelection.selected)
                forkJoin(this.roleSelection.selected.map(role => this.application.addRelation('availableRoles', role))).subscribe(result => {

                }
                    , error => console.error(error));

            let applicationTrees = this.application.trees;

            if (applicationTrees)

                forkJoin(applicationTrees.map(tree => this.application.deleteRelation('trees', tree))).subscribe(result => {
                }
                    , error => console.error(error));
            if (this.treeSelection.selected)
                forkJoin(this.treeSelection.selected.map(tree => this.application.addRelation('trees', tree))).subscribe(result => {

                }
                    , error => console.error(error));



            let update = concat(
                this.application.deleteAllRelation('situationMap')


            );

            if (this.application.situationMap._links != null && this.application.situationMap._links.self.href != '') {
                update = concat(update, this.application.addRelation('situationMap', this.application.situationMap));
            }


            update.subscribe(result => {
                delete this.application.availableRoles;
                delete this.application.trees;
                delete this.application.situationMap;

                this.applicationService.update(this.application).subscribe(result => {

                    this.gotoList();
                }
                    , error => console.error(error));
            }
                , error => console.error(error));


        }




    }

    remove(application: Application) {
        this.applicationService.delete(application).subscribe(result => {
            this.gotoList();
        }, error => console.error(error));

    }

    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }

    isAllRoleSelected() {
        const numSelected = this.roleSelection.selected.length;
        const numRows = this.roleDataSource.data.length;
        return numSelected === numRows;
    }

    masterToggleRole() {
        this.isAllRoleSelected() ?
            this.roleSelection.clear() :
            this.roleDataSource.data.forEach(row => this.roleSelection.select(row));
    }
    isAllTreeSelected() {
        const numSelected = this.treeSelection.selected.length;
        const numRows = this.treeDataSource.data.length;
        return numSelected === numRows;
    }

    masterToggleTree() {
        this.isAllTreeSelected() ?
            this.treeSelection.clear() :
            this.treeDataSource.data.forEach(row => this.treeSelection.select(row));
    }
}