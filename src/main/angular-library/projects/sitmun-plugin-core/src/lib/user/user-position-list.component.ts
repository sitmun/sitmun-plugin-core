import { Resource } from 'angular-hal';
import { UserPosition } from 'sitmun-frontend-core';
import { Territory } from 'sitmun-frontend-core';
import { UserPositionService } from 'sitmun-frontend-core';
import { TerritoryService } from 'sitmun-frontend-core';
import { UserService } from 'sitmun-frontend-core';
import { User } from 'sitmun-frontend-core';
import { Component, OnInit, ViewChild, Input , Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs-compat';
//import { ActivatedRoute, Router } from '@angular/router';

/** Component for managing user positions*/
@Component({
  selector: 'sitmun-user-position-list',
  templateUrl: './user-position-list.component.html',
  styleUrls: ['./user-position-list.component.css']
})
export class UserPositionListComponent implements OnInit {
  /** User positions to manage */
  items: UserPosition[];

  /** User to manage its positions*/
  _user: User;

  /** Table displayed columns */
  displayedColumns = ['name','email','organization','territory','actions'];

  /** MatTableDataSource for table display */
  dataSource = null;

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Component constructor */
  constructor(
          /**user position service*/ private userPositionService: UserPositionService,
          /**dialog*/public dialog: MatDialog) {

  }

  /** On component init, get all data dependencies */
  ngOnInit() {
    this.items = new Array<UserPosition>();

  }

  /** load all user positions*/
  loadUserPositions(){
    if (this._user!=null){
     this._user.getRelationArray(UserPosition, 'positions').subscribe(
                    (items: UserPosition[]) => {

                    this.items = items;

                    this.items.forEach( (item) => {
                      item.getRelation(Territory, 'territory').subscribe(
                    (territory: Territory) => item.territory = territory,
                    error => item.territory = new Territory());
                    }
                    );


                    this.dataSource  = new MatTableDataSource<UserPosition>(this.items);
                    this.dataSource.paginator = this.paginator;

                 },
                    error => this.items = new Array<UserPosition>());

    }
  }

  /** open dialog to edit user position data*/
  edit(userPosition: UserPosition): void {
    let dialogRef = this.dialog.open(UserPositionEditDialog, {
      width: '250px',
      data: userPosition
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUserPositions();

    });
  }

  /** add user position*/
  add(): void {
    let userPosition = new UserPosition();
    userPosition.user = this._user;
    let dialogRef = this.dialog.open(UserPositionEditDialog, {
      width: '250px',
      data: userPosition
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUserPositions();
    });
  }

  /** remove user position*/
  remove(item: UserPosition) {
    this.userPositionService.delete(item).subscribe(result => {
   //    this.gotoUser();
     this.loadUserPositions();
    }, error => console.error(error));

  }

  /** set user to manage*/
  @Input()
  set user(user: User) {
    this._user = user;
    this.loadUserPositions();
  }


  /*
  gotoUser() {
    this.router.navigate(['/user-edit',this._user._links.self.href.split('/')[5]]);
  }
  */

}

/** Component for edit user position data*/
@Component({
  selector: 'sitmun-user-position-dialog',
  templateUrl: './user-position-edit.dialog.html',
  styleUrls: ['./user-position-edit.dialog.css']
})
export class UserPositionEditDialog implements OnInit {

  /** territories to select*/
  territories: Territory[] = new Array<Territory>();

  /** subscription*/
  sub: Subscription;

  /** constructor*/
  constructor(
          /** user service*/private userService: UserService,
          /** user position service*/private userPositionService: UserPositionService,
          /** territory service*/private territoryService: TerritoryService,
          /** dialog reference*/public dialogRef: MatDialogRef<UserPositionEditDialog>,
          /** user position to edit*/@Inject(MAT_DIALOG_DATA) public userPosition: UserPosition ) {
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
    this.getAllTerritories();
      if (this.userPosition._links) {
        this.userPosition.getRelation(User, 'user').subscribe(
                    (user: User) => this.userPosition.user = user,
                    error => this.userPosition.user = new User());

        this.userPosition.getRelation(Territory, 'territory').subscribe(
                    (territory: Territory) => this.userPosition.territory = territory,
                    error => this.userPosition.territory = new Territory());
     }

  }

  /** load all territories*/
  getAllTerritories() {
    this.territoryService.getAll()
    .subscribe((territories: Territory[]) => {
        this.territories = territories;
    });
  }

  /** save user position*/
  save() {
      this.userPositionService.save(this.userPosition).subscribe(result => {
      this.dialogRef.close();
      }, error => console.error(error));
  }

  /** compare two resource*/
  compareResource(c1: Resource, c2: Resource): boolean {
    if (c2 && c1)
      return c2._links && c1._links ? c1._links.self.href === c2._links.self.href : c1 === c2;
    else
      return false;
  }

}
