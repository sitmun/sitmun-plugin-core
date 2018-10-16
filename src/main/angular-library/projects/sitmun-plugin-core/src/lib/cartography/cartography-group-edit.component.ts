import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal';
import { Cartography } from './cartography.model';
import { CartographyService } from './cartography.service';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';

import { CartographyGroup } from './cartography-group.model';
import {CartographyGroupService} from './cartography-group.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, Observable, forkJoin, merge, concat, pipe, from} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
    selector: 'sitmun-cartography-group-edit',
    templateUrl: './cartography-group-edit.component.html',
    styleUrls: ['./cartography-group-edit.component.css']
})
export class CartographyGroupEditComponent implements OnInit, OnDestroy {
    cartographyGroup: CartographyGroup = new CartographyGroup();
    cartographies: Cartography[] = new Array<Cartography>();
    roles: Role[] = new Array<Role>();

    sub: Subscription;

    cartographyDisplayedColumns = ['select', 'name', 'service'];

    cartographySelection = new SelectionModel<Cartography>(true, []);

    cartographyDataSource = new MatTableDataSource<Cartography>([]);

    roleDisplayedColumns = ['select', 'name'];

    roleSelection = new SelectionModel<Role>(true, []);

    roleDataSource = new MatTableDataSource<Role>([]);

    constructor(private route: ActivatedRoute,
        private router: Router,
        private roleService: RoleService,
        private cartographyGroupService: CartographyGroupService,
        private cartographyService: CartographyService) {
        this.getAllCartographies();
        this.getAllRoles();

    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];


            if (id) {
                this.cartographyGroupService.get(id).subscribe((cartographyGroup: any) => {
                    if (cartographyGroup) {
                        this.cartographyGroup = cartographyGroup;
                        this.cartographyGroup.getRelationArray(Cartography, 'members').subscribe(
                            (members: Cartography[]) => {
                                this.cartographyGroup.members = members;
                                this.cartographyDataSource.data.forEach(row => {
                                    for (let member of this.cartographyGroup.members) {
                                        if (row._links.self.href == member._links.self.href)
                                            this.cartographySelection.select(row);
                                    }
                                });
                            },
                            error => this.cartographyGroup.members = new Array<Cartography>());

                        this.cartographyGroup.getRelationArray(Role, 'roles').subscribe(
                            (roles: Role[]) => {
                                this.cartographyGroup.roles = roles;
                                this.roleDataSource.data.forEach(row => {
                                    for (let member of this.cartographyGroup.roles) {
                                        if (row._links.self.href == member._links.self.href)
                                            this.roleSelection.select(row);
                                    }
                                });

                            },
                            error => this.cartographyGroup.roles = new Array<Role>());



                    } else {
                        console.log(`cartographyGroup with id '${id}' not found, returning to list`);
                        this.gotoList();
                    }
                });
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getAllRoles() {
        this.roleService.getAll()
            .subscribe((roles: Role[]) => {
                this.roles = roles;
                this.roleDataSource = new MatTableDataSource<Role>(this.roles);


            });
    }

    getAllCartographies() {
        this.cartographyService.getAll()
            .subscribe((cartographies: Cartography[]) => {
                this.cartographies = cartographies;
                this.cartographyDataSource = new MatTableDataSource<Cartography>(this.cartographies);

            });
    }


    gotoList() {
        this.router.navigate(['/cartography-group-list']);
    }

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

            let cartographyGroupRoles = this.cartographyGroup.roles;
            
            let cartographyGroupMembers = this.cartographyGroup.members;

            forkJoin(cartographyGroupRoles.map(role => this.cartographyGroup.deleteRelation('roles', role))).subscribe(result => {
                            }
                , error => console.error(error));
            forkJoin(this.roleSelection.selected.map(role => this.cartographyGroup.addRelation('roles', role))).subscribe(result => {

                }
                    , error => console.error(error));

            forkJoin(cartographyGroupMembers.map(member => this.cartographyGroup.deleteRelation('members', member))).subscribe(result => {
                            }
                , error => console.error(error));
            forkJoin(this.cartographySelection.selected.map(member => this.cartographyGroup.addRelation('members', member))).subscribe(result => {

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

    remove(cartographyGroup: CartographyGroup) {
        this.cartographyGroupService.delete(cartographyGroup).subscribe(result => {
            this.gotoList();
        }, error => console.error(error));

    }

    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllCartographySelected() {
        const numSelected = this.cartographySelection.selected.length;
        const numRows = this.cartographyDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear cartographySelection. */
    masterToggleCartography() {
        this.isAllCartographySelected() ?
            this.cartographySelection.clear() :
            this.cartographyDataSource.data.forEach(row => this.cartographySelection.select(row));
    }

    isAllRoleSelected() {
        const numSelected = this.roleSelection.selected.length;
        const numRows = this.roleDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear cartographySelection. */
    masterToggleRole() {
        this.isAllRoleSelected() ?
            this.roleSelection.clear() :
            this.roleDataSource.data.forEach(row => this.roleSelection.select(row));
    }
}