import { Resource } from 'angular-hal';  
import { CartographyAvailability } from './cartography-availability.model';
import { Territory } from '../territory/territory.model';
import { TerritoryService } from '../territory/territory.service';
import { CartographyAvailabilityService } from './cartography-availability.service';
import { CartographyService } from './cartography.service';
import { Cartography } from './cartography.model';
import {Principal} from '../auth/principal.service';
import {LoginService} from '../auth/login.service';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/** Component for managing cartography availabilitys*/
@Component({
  selector: 'sitmun-cartography-availability-list',
  templateUrl: './cartography-availability-list.component.html',
  styleUrls: ['./cartography-availability-list.component.css']
})
export class CartographyAvailabilityListComponent implements OnInit {
  
  /** cartography availabilitys to manage */
  items: CartographyAvailability[];

  /** cartography to manage */
  _cartography: Cartography;

  /** Table displayed columns */   
  displayedColumns = ['territory','actions'];
  
  /** MatTableDataSource for table display */
  dataSource = null;

  /** Paginator for table display */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  /** constructor*/
  constructor(
          /** cartography availability service*/private cartographyAvailabilityService: CartographyAvailabilityService,        
          /** dialog*/public dialog: MatDialog) { 
  
  }
  
  /** On component init, get all data dependencies */
  ngOnInit() {
    this.items = new Array<CartographyAvailability>();
    
  }
  
  /** Set cartography to manage */
  @Input()
  set cartography(cartography: Cartography) {    
    this._cartography = cartography;
    this.loadCartographyAvailabilities();
  }

  /** load all cartography availabilitys*/
  loadCartographyAvailabilities(){
    if (this._cartography!=null){
     this._cartography.getRelationArray(CartographyAvailability, 'availabilities').subscribe(
                    (items: CartographyAvailability[]) => {
                      
                    this.items = items;
                    
                    this.items.forEach( (item) => {
                        item.getRelation(Territory, 'territory').subscribe(
                        (territory: Territory) => item.territory = territory,
                        error => item.territory = new Territory());

                      
                    });
                    this.dataSource  = new MatTableDataSource<CartographyAvailability>(this.items);
                    this.dataSource.paginator = this.paginator;

                 },
                    error => this.items = new Array<CartographyAvailability>());
      
    }
  }
  
  /** open dialog to edit cartography availability*/
  edit(cartographyAvailability: CartographyAvailability): void {
    let dialogRef = this.dialog.open(CartographyAvailabilityEditDialog, {
      width: '250px',
      data: cartographyAvailability
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadCartographyAvailabilities();
       
    });
  }
  
  /** add cartography availability*/
  add(): void {
    let cartographyPermission = new CartographyAvailability();
    cartographyPermission.cartography = this._cartography;
    let dialogRef = this.dialog.open(CartographyAvailabilityEditDialog, {
      width: '250px',
      data: cartographyPermission
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadCartographyAvailabilities();
    });
  }
  
  /** remove cartography availability*/
  remove(item: CartographyAvailability) {
    this.cartographyAvailabilityService.delete(item).subscribe(result => {
      this.loadCartographyAvailabilities();
    }, error => console.error(error));
     
  }
  
  

}

/** Component for edit cartography availability data*/
@Component({
  selector: 'sitmun-cartography-availability-dialog',
  templateUrl: './cartography-availability-edit.dialog.html',
  styleUrls: ['./cartography-availability-edit.dialog.css']
})
export class CartographyAvailabilityEditDialog implements OnInit {

  /** all territories*/
  territories: Territory[] = new Array<Territory>();

  /** current account */  
  currentAccount: any;
  
  /** constructor*/
  constructor(
          /**cartography service*/private cartographyService: CartographyService,
          /**cartography availability service*/private cartographyAvailabilityService: CartographyAvailabilityService,
          /**territory service*/private territoryService: TerritoryService,
          /**principal*/ public principal:Principal, /**login service*/ public loginService:LoginService,
    /**dialog reference*/public dialogRef: MatDialogRef<CartographyAvailabilityEditDialog>,
    /**cartography availability to edit*/ @Inject(MAT_DIALOG_DATA) public cartographyAvailability: CartographyAvailability ) {
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
     this.principal.identity().then((account) => {
                 this.currentAccount = account;
      });
    this.getAllTerritories();
    
      if (this.cartographyAvailability._links) {
        this.cartographyAvailability.getRelation(Cartography, 'cartography').subscribe(
                    (cartography: Cartography) => this.cartographyAvailability.cartography = cartography,
                    error => this.cartographyAvailability.cartography = new Cartography());

        this.cartographyAvailability.getRelation(Territory, 'territory').subscribe(
                    (territory: Territory) => this.cartographyAvailability.territory = territory,
                    error => this.cartographyAvailability.territory = new Territory());
       
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
  
  
  /** save cartography availability*/
  save() {
      this.cartographyAvailabilityService.save(this.cartographyAvailability).subscribe(result => {      
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