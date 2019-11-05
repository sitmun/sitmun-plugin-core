import { TerritoryType } from './territory-type.model';
import { TerritoryTypeService } from './territory-type.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

/**
 * Territory type edit component
 */
@Component({
  selector: 'app-territory-type-edit',
  templateUrl: './territory-type-edit.component.html',
  styleUrls: ['./territory-type-edit.component.css']
})
export class TerritoryTypeEditComponent implements OnInit {
  /** territory type to edit*/
  item: TerritoryType = new TerritoryType();
  
  /** all territory types*/
  items: TerritoryType[] = new Array<TerritoryType>();
  
  /** subscription*/
  sub: Subscription;
  
  /** constructor */  
  constructor(private route: ActivatedRoute,
    private router: Router,    
    private territoryTypeService: TerritoryTypeService) {
  }
  
  /** On component init load all required data dependencies*/
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.territoryTypeService.get(id).subscribe((item: any) => {
          if (item) {
            this.item = item;
            
            
            
          } else {
            console.log(`territory type with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }
  
  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  /** load all territory types*/
  getAllTerritoryTypes() {
    this.territoryTypeService.getAll()
    .subscribe((items: TerritoryType[]) => {
        this.items = items;
    });
  }
  
  /** navigate to territory type list page*/
  gotoList() {
    this.router.navigate(['/territory-type-list']);
  }
  
  /** save territory type*/
  save() {
      this.territoryTypeService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }
  
  /** remove territory type*/
  remove(item: TerritoryType) {
    this.territoryTypeService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
