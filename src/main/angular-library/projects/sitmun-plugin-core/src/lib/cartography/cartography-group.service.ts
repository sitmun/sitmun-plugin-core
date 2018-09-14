import { CartographyGroup } from './cartography-group.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class CartographyGroupService extends RestService<CartographyGroup> {
  
  public API = '/api';
  public CARTOGRAPHY_GROUP_API = this.API + '/cartography-groups';


  constructor(injector: Injector,private http: HttpClient) {
    super(CartographyGroup, "cartography-groups", injector);
  }
  
  remove(item: CartographyGroup) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: CartographyGroup): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.CARTOGRAPHY_GROUP_API , item);
    }
    return result;
  }
  
}