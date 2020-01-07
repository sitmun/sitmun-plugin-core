import { Resource } from 'angular-hal';
import { UserConfiguration } from 'sitmun-frontend-core';
import { Territory } from 'sitmun-frontend-core';
import { TerritoryService } from 'sitmun-frontend-core';
import { Role } from 'sitmun-frontend-core';
import { RoleService } from 'sitmun-frontend-core';
import { UserConfigurationService } from 'sitmun-frontend-core';
import { UserService } from 'sitmun-frontend-core';
import { User } from 'sitmun-frontend-core';
import {Principal} from 'sitmun-frontend-core';
import {LoginService} from 'sitmun-frontend-core';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/** Component for managing user permissions*/
@Component({
  selector: 'sitmun-user-configuration-list',
  templateUrl: './user-configuration-list.component.html',
  styleUrls: ['./user-configuration-list.component.css']
})
export class UserConfigurationListComponent implements OnInit {
  /** User permissions to manage */
  items: UserConfiguration[];

  /** User to manage its permissions*/
  _user: User;

  /** Table displayed columns */
  displayedColumns = ['territory','role','actions'];

  /** MatTableDataSource for table display */
  dataSource = null;

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor(
          /**user permissions service*/private userConfigurationService: UserConfigurationService,
          /**dialog*/public dialog: MatDialog) {

  }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.items = new Array<UserConfiguration>();

  }

  /** Set User to manage its permissions*/
  @Input()
  set user(user: User) {
    this._user = user;
    this.loadUserPermissions();
  }

  /** load all user permissions*/
  loadUserPermissions(){
    if (this._user!=null){
     this._user.getRelationArray(UserConfiguration, 'permissions').subscribe(
                    (items: UserConfiguration[]) => {

                    this.items = items;

                    this.items.forEach( (item) => {
                        item.getRelation(Territory, 'territory').subscribe(
                        (territory: Territory) => item.territory = territory,
                        error => item.territory = new Territory());

                      item.getRelation(Role, 'role').subscribe(
                        (role: Role) => item.role = role,
                        error => item.role = new Role());
                    });
                    this.dataSource  = new MatTableDataSource<UserConfiguration>(this.items);
                    this.dataSource.paginator = this.paginator;

                 },
                    error => this.items = new Array<UserConfiguration>());

    }
  }

  /** open dialog to edit user permission data*/
  edit(userConfiguration: UserConfiguration): void {
    let dialogRef = this.dialog.open(UserConfigurationEditDialog, {
      width: '250px',
      data: userConfiguration
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUserPermissions();

    });
  }

  /** add user permission*/
  add(): void {
    let userPermission = new UserConfiguration();
    userPermission.user = this._user;
    let dialogRef = this.dialog.open(UserConfigurationEditDialog, {
      width: '250px',
      data: userPermission
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUserPermissions();
    });
  }

  /** remove user permission*/
  remove(item: UserConfiguration) {
    this.userConfigurationService.delete(item).subscribe(result => {
      this.loadUserPermissions();
    }, error => console.error(error));

  }

}

/** Component for edit user permission data*/
@Component({
  selector: 'app-user-configuration-dialog',
  templateUrl: './user-configuration-edit.dialog.html',
  styleUrls: ['./user-configuration-edit.dialog.css']
})
export class UserConfigurationEditDialog implements OnInit {

  /** territories to select*/
  territories: Territory[] = new Array<Territory>();

  /** roles to select*/
  roles: Role[] = new Array<Role>();

  /** current account*/
  currentAccount: any;

 /** constructor*/
  constructor(
    /** user service*/private userService: UserService,
    /** user permission service*/private userconfigurationService: UserConfigurationService,
    /** territory service*/private territoryService: TerritoryService,
    /** role service*/private roleService: RoleService,
    /** principal*/public principal:Principal, /** login service*/public loginService:LoginService,
    /** dialog reference*/public dialogRef: MatDialogRef<UserConfigurationEditDialog>,
    /** user permission to edit*/@Inject(MAT_DIALOG_DATA) public userConfiguration: UserConfiguration ) {
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
     this.principal.identity().then((account) => {
                 this.currentAccount = account;
      });
    this.getAllTerritories();
    this.getAllRoles();
      if (this.userConfiguration._links) {
        this.userConfiguration.getRelation(User, 'user').subscribe(
                    (user: User) => this.userConfiguration.user = user,
                    error => this.userConfiguration.user = new User());

        this.userConfiguration.getRelation(Territory, 'territory').subscribe(
                    (territory: Territory) => this.userConfiguration.territory = territory,
                    error => this.userConfiguration.territory = new Territory());
        this.userConfiguration.getRelation(Role, 'role').subscribe(
                    (role: Role) => this.userConfiguration.role = role,
                    error => this.userConfiguration.role= new Role());
            //
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

  /** load all roles*/
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((roles: Role[]) => {
        this.roles = roles;
    });
  }

  /** save user permission*/
  save() {
      this.userconfigurationService.save(this.userConfiguration).subscribe(result => {
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
