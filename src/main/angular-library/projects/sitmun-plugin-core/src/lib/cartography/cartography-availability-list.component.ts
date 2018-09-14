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




@Component({
  selector: 'sitmun-cartography-availability-list',
  templateUrl: './cartography-availability-list.component.html',
  styleUrls: ['./cartography-availability-list.component.css']
})
export class CartographyAvailabilityListComponent implements OnInit {

  items: CartographyAvailability[];
  _cartography: Cartography;

  displayedColumns = ['territory','actions'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private cartographyAvailabilityService: CartographyAvailabilityService,    
    
    public dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.items = new Array<CartographyAvailability>();
    
  }

  @Input()
  set cartography(cartography: Cartography) {    
    this._cartography = cartography;
    this.loadCartographyAvailabilities();
  }


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

  remove(item: CartographyAvailability) {
    this.cartographyAvailabilityService.delete(item).subscribe(result => {
      this.loadCartographyAvailabilities();
    }, error => console.error(error));
     
  }
  
  

}
@Component({
  selector: 'sitmun-cartography-availability-dialog',
  templateUrl: './cartography-availability-edit.dialog.html',
  styleUrls: ['./cartography-availability-edit.dialog.css']
})
export class CartographyAvailabilityEditDialog implements OnInit {

  territories: Territory[] = new Array<Territory>();
  currentAccount: any;
  
  constructor(
    private cartographyService: CartographyService,
    private cartographyAvailabilityService: CartographyAvailabilityService,
    private territoryService: TerritoryService,
    public principal:Principal, public loginService:LoginService,
    public dialogRef: MatDialogRef<CartographyAvailabilityEditDialog>,
    @Inject(MAT_DIALOG_DATA) public cartographyAvailability: CartographyAvailability ) {
  }


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
  
  

  save() {
      this.cartographyAvailabilityService.save(this.cartographyAvailability).subscribe(result => {      
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