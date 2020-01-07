import { Resource } from 'angular-hal';
import { Territory } from 'sitmun-frontend-core';
import { TerritoryService } from 'sitmun-frontend-core';
import { UserPosition } from 'sitmun-frontend-core';
import { UserPositionService } from 'sitmun-frontend-core';
import { UserService } from 'sitmun-frontend-core';
import { User } from 'sitmun-frontend-core';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

/**
 * User position edit component
 */
@Component({
  selector: 'sitmun-user-position-edit',
  templateUrl: './user-position-edit.component.html',
  styleUrls: ['./user-position-edit.component.css']
})
export class UserPositionEditComponent implements OnInit {

  /** user position to edit*/
  userPosition: UserPosition = new UserPosition();

  /** user*/
  user: User = new User();

  /** territories to select*/
  territories: Territory[] = new Array<Territory>();

  /** subscription*/
  sub: Subscription;

  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private userPositionService: UserPositionService,
    private territoryService: TerritoryService,
     private location: Location) {
  }

  /** navigate backwards*/
  goBack() {
    this.location.back();
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
    this.getAllTerritories();
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      const userId = params['userId'];

      if (id) {
        this.userPositionService.get(id).subscribe((userPosition: any) => {
          if (userPosition) {
            this.userPosition = userPosition;

            this.userPosition.getRelation(User, 'user').subscribe(
                    (user: User) => this.userPosition.user = user,
                    error => this.userPosition.user = new User());

            this.userPosition.getRelation(Territory, 'territory').subscribe(
                    (territory: Territory) => this.userPosition.territory = territory,
                    error => this.userPosition.territory = new Territory());
          } else {
            console.log(`user position with id '${id}' not found, returning to list`);
            this.gotoUser();
          }
        });
      } else if (userId) {
        this.userService.get(userId).subscribe((user: any) => {
          if (user) {
            this.userPosition.user = user;
            this.user = user;
          } else {
            console.log(`user with id '${userId}' not found, returning to list`);
            this.gotoUser();
          }
        });
      }
    }
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

  /** navigate to user edit page*/
  gotoUser() {
    if (this.userPosition._links != null){
      this.router.navigate(['/user-edit',this.userPosition.user._links.self.href.split('/')[5]]);
    } else {
      this.router.navigate(['/user-edit',this.user._links.self.href.split('/')[5]]);
    }
  }

  /** save user position*/
  save() {
      this.userPositionService.save(this.userPosition).subscribe(result => {

        this.gotoUser();
      }, error => console.error(error));
  }

  /** remove user position*/
  remove(userPosition: UserPosition) {
    this.userPositionService.delete(userPosition).subscribe(result => {
      this.gotoUser();
    }, error => console.error(error));

  }

  /** compare two resources*/
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
  }

}
