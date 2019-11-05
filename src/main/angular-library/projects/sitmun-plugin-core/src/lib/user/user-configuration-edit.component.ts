import { Resource } from 'angular-hal'; 
import { Territory } from '../territory/territory.model';
import { TerritoryService } from '../territory/territory.service';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';
import { UserConfiguration } from './user-configuration.model';
import { UserConfigurationService } from './user-configuration.service';
import { UserService } from './user.service';
import { User } from './user.model';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';


/**
 * User permission edit component
 */
@Component({
  selector: 'app-user-configuration-edit',
  templateUrl: './user-configuration-edit.component.html',
  styleUrls: ['./user-configuration-edit.component.css']
})
export class UserConfigurationEditComponent implements OnInit {
  
  /** user permission data to edit*/
  userConfiguration: UserConfiguration = new UserConfiguration();
  
  /** user*/
  user: User = new User();
  
  /** territories to select*/
  territories: Territory[] = new Array<Territory>();

  /** roles to select*/
  roles: Role[] = new Array<Role>();
  
  /** subscription*/
  sub: Subscription;
  
  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private userService: UserService,
    private userConfigurationService: UserConfigurationService,
    private territoryService: TerritoryService,
    private roleService: RoleService,
    private location: Location) {
  }
  
  /** navigate backwards*/
  goBack() {
    this.location.back();
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
    this.getAllTerritories();
    this.getAllRoles();
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      const userId = params['userId'];
      
      if (id) {
        this.userConfigurationService.get(id).subscribe((userConfiguration: any) => {
          if (userConfiguration) {
            this.userConfiguration = userConfiguration;

            this.userConfiguration.getRelation(User, 'user').subscribe(
                    (user: User) => this.userConfiguration.user =  user,
                    error => this.userConfiguration.user = new User());

            this.userConfiguration.getRelation(Territory, 'territory').subscribe(
                    (territory: Territory) => this.userConfiguration.territory = territory,
                    error => this.userConfiguration.territory = new Territory());

            this.userConfiguration.getRelation(Role, 'role').subscribe(
                    (role: Role) => this.userConfiguration.role = role,
                    error => this.userConfiguration.role= new Role());
            //
            //


          } else {
            console.log(`user Configuration with id '${id}' not found, returning to list`);
            this.gotoUser();
          }
        });
      } else if (userId) {
        this.userService.get(userId).subscribe((user: any) => {
          if (user) {
            this.userConfiguration.user = user;
            this.user = user;
          } else {
            console.log(`user with id '${userId}' not found, returning to list`);
            this.gotoUser();
          }
        });
      }
    });
  }
  
  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  /** load all territories*/
  getAllTerritories() {
    this.territoryService.getAll()
    .subscribe((territories: Territory[]) => {
        this.territories = territories;        
    });
  }

  /** load all roles*/
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((roles: Role[]) => {
        this.roles = roles;        
    });
  }

  /** navigate to user edit page*/
  gotoUser() {
    if (this.userConfiguration._links != null){
      this.router.navigate(['/user-edit',this.userConfiguration.user._links.self.href.split('/')[5]]);
    } else {
      this.router.navigate(['/user-edit',this.user._links.self.href.split('/')[5]]);
    }
  }
  
  /** save user permission*/
  save() {
      this.userConfigurationService.save(this.userConfiguration).subscribe(result => {      
        this.gotoUser();
      }, error => console.error(error));
  }
  
  /** remove user permission*/
  remove(userConfiguration: UserConfiguration) {
    this.userConfigurationService.delete(userConfiguration).subscribe(result => {
      this.gotoUser();
    }, error => console.error(error));

  }
  
  /** compare two resources*/
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
  }

}
