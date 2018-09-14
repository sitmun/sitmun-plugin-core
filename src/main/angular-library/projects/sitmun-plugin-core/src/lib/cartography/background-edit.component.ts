import {Resource} from 'angular-hal';  
import { Background } from './background.model';
import { BackgroundService } from './background.service';
import { CartographyGroup } from './cartography-group.model';
import { CartographyGroupService } from './cartography-group.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat'; 

@Component({
  selector: 'sitmun-background-edit',
  templateUrl: './background-edit.component.html',
  styleUrls: ['./background-edit.component.css']
})
export class BackgroundEditComponent implements OnInit {
 
  background: Background = new Background();
  cartographyGroups: CartographyGroup[] = new Array<CartographyGroup>();
  
  sub: Subscription;
  

  constructor(private route: ActivatedRoute,
    private router: Router,    
    private cartographyGroupService: CartographyGroupService,
    private backgroundService: BackgroundService) {
  }

  ngOnInit() {
    this.getAllCartographyGroups();
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      
      if (id) {
        this.backgroundService.get(id).subscribe((background: any) => {
          if (background) {
            this.background = background;
            this.background.createdDate = new Date();
            this.background.createdDate.setTime(Date.parse(background.createdDate));
            
            //ResourceHelper.resolveRelations(this.task);
            //alert('llego');
            
            this.background.getRelation(CartographyGroup, 'cartographyGroup').subscribe(
                    (group: CartographyGroup) => this.background.cartographyGroup = group,
                    error => this.background.cartographyGroup = new CartographyGroup());
            
            
          } else {
            console.log(`background with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllCartographyGroups() {
    this.cartographyGroupService.getAll()
    .subscribe((cartographyGroups: CartographyGroup[]) => {
        this.cartographyGroups = cartographyGroups;
    });
  }
  

  gotoList() {
    this.router.navigate(['/background-list']);
  }

  save() {
      this.backgroundService.save(this.background).subscribe(result => {      
        this.gotoList();
      }, error => console.error(error));
  }

  remove(background: Background) {
    this.backgroundService.delete(background).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }

  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
 }
}
