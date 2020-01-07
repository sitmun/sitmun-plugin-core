import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal';
import { Cartography } from 'sitmun-frontend-core';
import { CartographyService } from 'sitmun-frontend-core';
import { Role } from 'sitmun-frontend-core';
import { RoleService } from 'sitmun-frontend-core';

import { CartographyGroup } from 'sitmun-frontend-core';
import {CartographyGroupService} from 'sitmun-frontend-core';
import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, Observable, forkJoin, merge, concat, pipe, from} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

/**
 * Cartography group edit component
 */
@Component({
    selector: 'sitmun-cartography-group-edit',
    templateUrl: './cartography-group-edit.component.html',
    styleUrls: ['./cartography-group-edit.component.css']
})
export class CartographyGroupEditComponent implements OnInit, OnDestroy {

    /** cartography group to edit*/
    cartographyGroup: CartographyGroup = new CartographyGroup();

    /** cartographies to select*/
    cartographies: Cartography[] = new Array<Cartography>();

    /** roles to select*/
    roles: Role[] = new Array<Role>();

    /** subscription*/
    sub: Subscription;

    /** cartographies table displayed columns*/
    cartographyDisplayedColumns = ['select', 'name', 'service'];

    /** selection model for cartographies table*/
    cartographySelection = new SelectionModel<Cartography>(true, []);

    /** MatTableDataSource for cartographies*/
    cartographyDataSource = new MatTableDataSource<Cartography>([]);

    /** roles table displayed columns*/
    roleDisplayedColumns = ['select', 'name'];

    /** selection model for roles table*/
    roleSelection = new SelectionModel<Role>(true, []);

    /** MatTableDataSource for roles*/
    roleDataSource = new MatTableDataSource<Role>([]);

    /** constructor*/
    constructor(private route: ActivatedRoute,
        private router: Router,
        private roleService: RoleService,
        private cartographyGroupService: CartographyGroupService,
        private changeDetectorRefs: ChangeDetectorRef,
        private cartographyService: CartographyService) {

    }

    /** On component init load all required data dependencies*/
    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];


            if (id) {
                this.cartographyGroupService.get(id).subscribe((cartographyGroup: any) => {
                    if (cartographyGroup) {
                        this.cartographyGroup = cartographyGroup;
                        this.cartographyService.getAll()
                            .subscribe((cartographies: Cartography[]) => {
                                this.cartographies = cartographies;
                                this.cartographyDataSource = new MatTableDataSource<Cartography>(this.cartographies);
                                this.cartographyGroup.getRelationArray(Cartography, 'members').subscribe(
                                    (members: Cartography[]) => {
                                        this.cartographyGroup.members = members;
                                        this.cartographyDataSource.data.forEach(row => {
                                            for (let member of this.cartographyGroup.members) {
                                                if (row._links.self.href == member._links.self.href)
                                                    this.cartographySelection.select(row);
                                            }
                                        });
                                        this.changeDetectorRefs.detectChanges();
                                    },
                                    error => this.cartographyGroup.members = new Array<Cartography>());
                            });
                        this.roleService.getAll()
                            .subscribe((roles: Role[]) => {
                                this.roles = roles;
                                this.roleDataSource = new MatTableDataSource<Role>(this.roles);
                                this.cartographyGroup.getRelationArray(Role, 'roles').subscribe(
                                    (roles: Role[]) => {
                                        this.cartographyGroup.roles = roles;
                                        this.roleDataSource.data.forEach(row => {
                                            for (let member of this.cartographyGroup.roles) {
                                                if (row._links.self.href == member._links.self.href)
                                                    this.roleSelection.select(row);
                                            }
                                        });
                                        this.changeDetectorRefs.detectChanges();

                                    },
                                    error => this.cartographyGroup.roles = new Array<Role>());
                            });


                    } else {
                        console.log(`cartographyGroup with id '${id}' not found, returning to list`);
                        this.gotoList();
                    }
                });
            } else {
                this.getAllCartographies();
                this.getAllRoles();

            }
        });
    }

    /** On component destroy remove subscription */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /** load all roles*/
    getAllRoles() {
        this.roleService.getAll()
            .subscribe((roles: Role[]) => {
                this.roles = roles;
                this.roleDataSource = new MatTableDataSource<Role>(this.roles);


            });
    }

    /** load all cartographies*/
    getAllCartographies() {
        this.cartographyService.getAll()
            .subscribe((cartographies: Cartography[]) => {
                this.cartographies = cartographies;
                this.cartographyDataSource = new MatTableDataSource<Cartography>(this.cartographies);

            });
    }

    /** navigate to cartography group list page*/
    gotoList() {
        this.router.navigate(['/cartography-group-list']);
    }

    /** save cartography group*/
    save() {
        const isNew = this.cartographyGroup._links == null;

        if (isNew) {
            if (this.roleSelection.selected != null) {
                this.cartographyGroup.roles = this.roleSelection.selected;
            }

            this.cartographyGroup.roles = this.cartographyGroup.roles.map(function(role) {
                return role._links.self.href;
            });

            if (this.cartographySelection.selected != null) {
                this.cartographyGroup.members = this.cartographySelection.selected;
            }

            this.cartographyGroup.members = this.cartographyGroup.members.map(function(member) {
                return member._links.self.href;
            });

            this.cartographyGroupService.create(this.cartographyGroup).subscribe(result => {
                this.gotoList();

            }

                , error => console.error(error));

        } else {


            let rolesUpdate = null;
            let cartographyGroupRoles = this.cartographyGroup.roles;
            if (cartographyGroupRoles)
                rolesUpdate = concat(forkJoin(cartographyGroupRoles.map(role => this.cartographyGroup.deleteRelation('roles', role))));
            if (this.roleSelection.selected) {
                if (rolesUpdate != null)
                    rolesUpdate = concat(rolesUpdate, forkJoin(this.roleSelection.selected.map(role => this.cartographyGroup.addRelation('roles', role))));
                else
                    rolesUpdate = concat(forkJoin(this.roleSelection.selected.map(role => this.cartographyGroup.addRelation('roles', role))));
            }


            rolesUpdate.subscribe(result => {

            }
                , error => console.error(error));

            let membersUpdate = null;
            let cartographyGroupMembers = this.cartographyGroup.members;
            if (cartographyGroupMembers)
                membersUpdate = concat(forkJoin(cartographyGroupMembers.map(member => this.cartographyGroup.deleteRelation('members', member))));
            if (this.cartographySelection.selected) {
                if (membersUpdate != null)
                    membersUpdate = concat(membersUpdate, forkJoin(this.cartographySelection.selected.map(member => this.cartographyGroup.addRelation('members', member))));
                else
                    membersUpdate = concat(forkJoin(this.cartographySelection.selected.map(member => this.cartographyGroup.addRelation('members', member))));
            }


            membersUpdate.subscribe(result => {

            }
                , error => console.error(error));
            delete this.cartographyGroup.roles;
            delete this.cartographyGroup.members;

            this.cartographyGroupService.update(this.cartographyGroup).subscribe(result => {
                this.gotoList();
            }
                , error => console.error(error));


        }




    }

    /** remove cartography group*/
    remove(cartographyGroup: CartographyGroup) {
        this.cartographyGroupService.delete(cartographyGroup).subscribe(result => {
            this.gotoList();
        }, error => console.error(error));

    }

    /** compare two resources*/
    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }


    /** Whether the number of selected cartographies matches the total number of rows. */
    isAllCartographySelected() {
        const numSelected = this.cartographySelection.selected.length;
        const numRows = this.cartographyDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all cartographies if they are not all selected; otherwise clear cartographySelection. */
    masterToggleCartography() {
        this.isAllCartographySelected() ?
            this.cartographySelection.clear() :
            this.cartographyDataSource.data.forEach(row => this.cartographySelection.select(row));
    }

    /** Whether the number of selected roles matches the total number of rows. */
    isAllRoleSelected() {
        const numSelected = this.roleSelection.selected.length;
        const numRows = this.roleDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear rolesSelection. */
    masterToggleRole() {
        this.isAllRoleSelected() ?
            this.roleSelection.clear() :
            this.roleDataSource.data.forEach(row => this.roleSelection.select(row));
    }
}
