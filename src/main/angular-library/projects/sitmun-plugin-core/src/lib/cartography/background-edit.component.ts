import {Resource} from 'angular-hal';
import { Background } from 'sitmun-frontend-core';
import { BackgroundService } from 'sitmun-frontend-core';
import { CartographyGroup } from 'sitmun-frontend-core';
import { CartographyGroupService } from 'sitmun-frontend-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';
/**
 * Background edit component
 */
@Component({
  selector: 'sitmun-background-edit',
  templateUrl: './background-edit.component.html',
  styleUrls: ['./background-edit.component.css']
})
export class BackgroundEditComponent implements OnInit {

  /** background to edit*/
  background: Background = new Background();

  /** cartography groups to select*/
  cartographyGroups: CartographyGroup[] = new Array<CartographyGroup>();

  /** subscription*/
  sub: Subscription;

  /** constructor*/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private cartographyGroupService: CartographyGroupService,
    private backgroundService: BackgroundService) {
  }

  /** On component init load all required data dependencies*/
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

  /** On component destroy remove subscription */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /** load all cartography groups*/
  getAllCartographyGroups() {
    this.cartographyGroupService.getAll()
    .subscribe((cartographyGroups: CartographyGroup[]) => {
        this.cartographyGroups = cartographyGroups;
    });
  }

  /** navigate to background list page*/
  gotoList() {
    this.router.navigate(['/background-list']);
  }

  /** save background*/
  save() {
      this.backgroundService.save(this.background).subscribe(result => {
        this.gotoList();
      }, error => console.error(error));
  }

  /** remove background*/
  remove(background: Background) {
    this.backgroundService.delete(background).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }

  /** compare two resources*/
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
 }

}
