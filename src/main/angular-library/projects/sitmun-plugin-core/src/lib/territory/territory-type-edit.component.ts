import { TerritoryType } from './territory-type.model';
import { TerritoryTypeService } from './territory-type.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-territory-type-edit',
  templateUrl: './territory-type-edit.component.html',
  styleUrls: ['./territory-type-edit.component.css']
})
export class TerritoryTypeEditComponent implements OnInit {

  item: TerritoryType = new TerritoryType();
  items: TerritoryType[] = new Array<TerritoryType>();
  
  sub: Subscription;
  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private territoryTypeService: TerritoryTypeService) {
  }

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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllTerritoryTypes() {
    this.territoryTypeService.getAll()
    .subscribe((items: TerritoryType[]) => {
        this.items = items;
    });
  }
  

  gotoList() {
    this.router.navigate(['/territory-type-list']);
  }

  save() {
      this.territoryTypeService.save(this.item).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(item: TerritoryType) {
    this.territoryTypeService.delete(item).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }


}
