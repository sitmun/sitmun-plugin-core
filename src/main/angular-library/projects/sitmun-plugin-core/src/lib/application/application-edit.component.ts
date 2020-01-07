import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal';
import { Connection } from 'sitmun-frontend-core';
import { ConnectionService } from 'sitmun-frontend-core';
import { Role } from 'sitmun-frontend-core';
import { RoleService } from 'sitmun-frontend-core';
import { Tree } from 'sitmun-frontend-core';
import { TreeService } from 'sitmun-frontend-core';
import { CartographyGroup } from 'sitmun-frontend-core';
import { CartographyGroupService } from 'sitmun-frontend-core';
import { ApplicationParameter } from 'sitmun-frontend-core';
import { ApplicationParameterService } from 'sitmun-frontend-core';
import { ApplicationBackground} from 'sitmun-frontend-core';
import { ApplicationBackgroundService } from 'sitmun-frontend-core';
import { Application } from 'sitmun-frontend-core';
import {ApplicationService} from 'sitmun-frontend-core';
import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, Observable, forkJoin, merge, concat, pipe, from} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

/**
 * Application edit component
 */
@Component({
    selector: 'sitmun-application-edit',
    templateUrl: './application-edit.component.html',
    styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit, OnDestroy {

    /** application to edit*/
    application: Application = new Application();

    /** all cartography groups*/
    cartographyGroups: CartographyGroup[] = new Array<CartographyGroup>();

    /** all connections*/
    connections: Connection[] = new Array<Connection>();

    /** all roles*/
    roles: Role[] = new Array<Role>();

    /** all trees*/
    trees: Tree[] = new Array<Tree>();

    /** subscription*/
    sub: Subscription;

    /** displayed columns in table*/
    displayedColumns = ['select', 'name'];

    /** selection model for role table*/
    roleSelection = new SelectionModel<Role>(true, []);

    /** MatTableDataSource for role table*/
    roleDataSource = new MatTableDataSource<Role>([]);

    /** selection model for tree table*/
    treeSelection = new SelectionModel<Tree>(true, []);

    /** MatTableDataSource for tree table*/
    treeDataSource = new MatTableDataSource<Tree>([]);

    /** constructor */
    constructor(private route: ActivatedRoute,
        private router: Router,
        private roleService: RoleService,
        private treeService: TreeService,
        private applicationService: ApplicationService,
        private cartographyGroupService: CartographyGroupService,
        private applicationParameterService: ApplicationParameterService,
        private changeDetectorRefs: ChangeDetectorRef,
        private applicationBackgroundService: ApplicationBackgroundService) {

        this.getAllCartographyGroups();

    }

    /** On component init load all required data dependencies*/
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.applicationService.get(id).subscribe((application: any) => {
                    if (application) {
                        this.application = application;
                        this.application.createdDate = new Date();
                        this.application.createdDate.setTime(Date.parse(application.createdDate));

                        this.application.getRelation(CartographyGroup, 'situationMap').subscribe(
                            (situationMap: CartographyGroup) => this.application.situationMap = situationMap,
                            error => this.application.situationMap = new CartographyGroup());

                        this.roleService.getAll()
                            .subscribe((roles: Role[]) => {
                                this.roles = roles;
                                this.roleDataSource = new MatTableDataSource<Role>(this.roles);
                                this.application.getRelationArray(Role, 'availableRoles').subscribe(
                                    (availableRoles: Role[]) => {

                                        this.application.availableRoles = availableRoles;
                                        this.roleDataSource.data.forEach(row => {
                                            for (let member of this.application.availableRoles) {
                                                if (row._links.self.href == member._links.self.href)
                                                    this.roleSelection.select(row);
                                            }
                                        });
                                        this.changeDetectorRefs.detectChanges();

                                    },
                                    error => this.application.availableRoles = new Array<Role>());
                            });

                        this.treeService.getAll()
                            .subscribe((trees: Tree[]) => {
                                this.trees = trees;
                                this.treeDataSource = new MatTableDataSource<Tree>(this.trees);
                                this.application.getRelationArray(Tree, 'trees').subscribe(
                                    (trees: Tree[]) => {

                                        this.application.trees = trees;
                                        this.treeDataSource.data.forEach(row => {
                                            for (let member of this.application.trees) {
                                                if (row._links.self.href == member._links.self.href) {
                                                    this.treeSelection.select(row);
                                                    this.changeDetectorRefs.detectChanges();
                                                }
                                            }
                                        });

                                    },
                                    error => this.application.trees = new Array<Tree>());
                            });
                    } else {
                        console.log(`application with id '${id}' not found, returning to list`);
                        this.gotoList();
                    }
                });
            } else {
                this.getAllRoles();
                this.getAllTrees();
            }
        });
    }

    /** On component destroy remove subscription */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /** load all cartography groups*/
    getAllCartographyGroups() {
        this.cartographyGroupService.getAll()
            .subscribe((cartographyGroups: CartographyGroup[]) => {
                this.cartographyGroups = cartographyGroups;
            });
    }



    /** load all roles*/
    getAllRoles() {
        this.roleService.getAll()
            .subscribe((roles: Role[]) => {
                this.roles = roles;
                this.roleDataSource = new MatTableDataSource<Role>(this.roles);


            });
    }

    /** load all trees*/
    getAllTrees() {
        this.treeService.getAll()
            .subscribe((trees: Tree[]) => {
                this.trees = trees;
                this.treeDataSource = new MatTableDataSource<Tree>(this.trees);


            });
    }

    /** navigate to application list page*/
    gotoList() {
        this.router.navigate(['/application-list']);
    }

    /** save application*/
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
            let rolesUpdate = null;
            let applicationRoles = this.application.availableRoles;
            if (applicationRoles)
                rolesUpdate = concat(forkJoin(applicationRoles.map(role => this.application.deleteRelation('availableRoles', role))));
            if (this.roleSelection.selected) {
                if (rolesUpdate != null)
                    rolesUpdate = concat(rolesUpdate, forkJoin(this.roleSelection.selected.map(role => this.application.addRelation('availableRoles', role))));
                else
                    rolesUpdate = concat(forkJoin(this.roleSelection.selected.map(role => this.application.addRelation('availableRoles', role))));
            }


            rolesUpdate.subscribe(result => {

            }
                , error => console.error(error));

            let applicationTrees = this.application.trees;

            let treesUpdate = null;


            if (applicationTrees) {
                applicationTrees.forEach(tree => {
                    if (treesUpdate != null)
                        treesUpdate = concat(treesUpdate, this.application.deleteRelation('trees', tree));
                    else
                        treesUpdate = concat(this.application.deleteRelation('trees', tree));
                });


            }


            if (this.treeSelection.selected) {
                this.treeSelection.selected.forEach(tree => {
                    if (treesUpdate != null)
                        treesUpdate = concat(treesUpdate, this.application.addRelation('trees', tree));
                    else
                        treesUpdate = concat(this.application.addRelation('trees', tree));
                });
            }
            treesUpdate.subscribe(result => {

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

    /** remove application*/
    remove(application: Application) {
        this.applicationService.delete(application).subscribe(result => {
            this.gotoList();
        }, error => console.error(error));

    }

    /** compare two resources*/
    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }

    /** Whether the number of selected roles matches the total number of roles. */
    isAllRoleSelected() {
        const numSelected = this.roleSelection.selected.length;
        const numRows = this.roleDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all roles if they are not all selected; otherwise clear selection. */
    masterToggleRole() {
        this.isAllRoleSelected() ?
            this.roleSelection.clear() :
            this.roleDataSource.data.forEach(row => this.roleSelection.select(row));
    }

    /** Whether the number of selected trees matches the total number of trees. */
    isAllTreeSelected() {
        const numSelected = this.treeSelection.selected.length;
        const numRows = this.treeDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all trees if they are not all selected; otherwise clear selection. */
    masterToggleTree() {
        this.isAllTreeSelected() ?
            this.treeSelection.clear() :
            this.treeDataSource.data.forEach(row => this.treeSelection.select(row));
    }
}
