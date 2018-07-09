import { Resource } from 'angular-hal'; 
import { Territory } from '../territory/territory.model';
import { TerritoryService } from '../territory/territory.service';
import { UserPosition } from './user-position.model';
import { UserPositionService } from './user-position.service';
import { UserService } from './user.service';
import { User } from './user.model';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'sitmun-user-position-edit',
  templateUrl: './user-position-edit.component.html',
  styleUrls: ['./user-position-edit.component.css']
})
export class UserPositionEditComponent implements OnInit {

  userPosition: UserPosition = new UserPosition();
  user: User = new User();
  territories: Territory[] = new Array<Territory>();
  
  sub: Subscription;
  
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private userService: UserService,
    private userPositionService: UserPositionService,
    private territoryService: TerritoryService,
     private location: Location) {
  }

  goBack() {
    this.location.back();
  }

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



  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllTerritories() {
    this.territoryService.getAll()
    .subscribe((territories: Territory[]) => {
        this.territories = territories;        
    });
  }

  gotoUser() {
    if (this.userPosition._links != null){
      this.router.navigate(['/user-edit',this.userPosition.user._links.self.href.split('/')[5]]);
    } else {
      this.router.navigate(['/user-edit',this.user._links.self.href.split('/')[5]]);
    }
  }

  save() {
      this.userPositionService.save(this.userPosition).subscribe(result => {      

        this.gotoUser();
      }, error => console.error(error));
  }

  remove(userPosition: UserPosition) {
    this.userPositionService.delete(userPosition).subscribe(result => {
      this.gotoUser();
    }, error => console.error(error));

  }
  
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
  }

}
