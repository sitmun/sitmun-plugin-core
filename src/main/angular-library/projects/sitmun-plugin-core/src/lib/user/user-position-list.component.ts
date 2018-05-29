import { Resource } from 'angular-hal'; 
import { UserPosition } from './user-position.model';
import { Territory } from '../territory/territory.model';
import { UserPositionService } from './user-position.service';
import { TerritoryService } from '../territory/territory.service';
import { UserService } from './user.service';
import { User } from './user.model';
import { Component, OnInit, ViewChild, Input , Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs-compat';
//import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sitmun-user-position-list',
  templateUrl: './user-position-list.component.html',
  styleUrls: ['./user-position-list.component.css']
})
export class UserPositionListComponent implements OnInit {
  items: UserPosition[];
  _user: User;

  displayedColumns = ['name','email','organization','territory','actions'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private userPositionService: UserPositionService,    
    public dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.items = new Array<UserPosition>();
    
  }

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

  remove(item: UserPosition) {
    this.userPositionService.delete(item).subscribe(result => {
   //    this.gotoUser();
     this.loadUserPositions();
    }, error => console.error(error));
     
  }

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

@Component({
  selector: 'sitmun-user-position-dialog',
  templateUrl: './user-position-edit.dialog.html',
  styleUrls: ['./user-position-edit.dialog.css']
})
export class UserPositionEditDialog implements OnInit {

  territories: Territory[] = new Array<Territory>();
  
  sub: Subscription;
  
  constructor(
    private userService: UserService,
    private userPositionService: UserPositionService,
    private territoryService: TerritoryService,
    public dialogRef: MatDialogRef<UserPositionEditDialog>,
    @Inject(MAT_DIALOG_DATA) public userPosition: UserPosition ) {
  }


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



  
  getAllTerritories() {
    this.territoryService.getAll()
    .subscribe((territories: Territory[]) => {
        this.territories = territories;        
    });
  }

  save() {
      this.userPositionService.save(this.userPosition).subscribe(result => {      
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
