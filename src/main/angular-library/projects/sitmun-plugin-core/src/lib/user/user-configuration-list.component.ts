import { Resource } from 'angular-hal';  
import { UserConfiguration } from './user-configuration.model';
import { Territory } from '../territory/territory.model';
import { TerritoryService } from '../territory/territory.service';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';
import { UserConfigurationService } from './user-configuration.service';
import { UserService } from './user.service';
import { User } from './user.model';
import {Principal} from '../auth/principal.service';
import {LoginService} from '../auth/login.service';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sitmun-user-configuration-list',
  templateUrl: './user-configuration-list.component.html',
  styleUrls: ['./user-configuration-list.component.css']
})
export class UserConfigurationListComponent implements OnInit {
  items: UserConfiguration[];
  _user: User;

  displayedColumns = ['territory','role','actions'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private userConfigurationService: UserConfigurationService,    
    
    public dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.items = new Array<UserConfiguration>();
    
  }

  @Input()
  set user(user: User) {    
    this._user = user;
    this.loadUserPermissions();
  }


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

  remove(item: UserConfiguration) {
    this.userConfigurationService.delete(item).subscribe(result => {
      this.loadUserPermissions();
    }, error => console.error(error));
     
  }
  
  

}
@Component({
  selector: 'app-user-configuration-dialog',
  templateUrl: './user-configuration-edit.dialog.html',
  styleUrls: ['./user-configuration-edit.dialog.css']
})
export class UserConfigurationEditDialog implements OnInit {

  territories: Territory[] = new Array<Territory>();
  roles: Role[] = new Array<Role>();
  currentAccount: any;
  
  constructor(
    private userService: UserService,
    private userconfigurationService: UserConfigurationService,
    private territoryService: TerritoryService,
    private roleService: RoleService,
    public principal:Principal, public loginService:LoginService,
    public dialogRef: MatDialogRef<UserConfigurationEditDialog>,
    @Inject(MAT_DIALOG_DATA) public userConfiguration: UserConfiguration ) {
  }


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
  
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((roles: Role[]) => {
        this.roles = roles;        
    });
  }

  save() {
      this.userconfigurationService.save(this.userConfiguration).subscribe(result => {      
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