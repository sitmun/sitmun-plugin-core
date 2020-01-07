import { CartographyAvailability } from './cartography-availability.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

/** CartographyAvailability manager service */
@Injectable() 
export class CartographyAvailabilityService extends RestService<CartographyAvailability> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public CARTOGRAPHY_AVAILABILITY_API = this.API + '/cartography-availabilities';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(CartographyAvailability, "cartography-availabilities", injector);
  }
  
  /** remove cartography availability*/
  remove(item: CartographyAvailability) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save cartography availability*/
  save(item: CartographyAvailability): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
      if (item.cartography !=null){
          item.substituteRelation('cartography',item.cartography).subscribe(result => {
      
      }, error => console.error(error));
      }
      if (item.territory !=null){
          item.substituteRelation('territory',item.territory).subscribe(result => {
      
      }, error => console.error(error));
      }
    } else {
      item.territory = item.territory._links.self.href;
      item.cartography = item.cartography._links.self.href;
  
      result = this.http.post(this.CARTOGRAPHY_AVAILABILITY_API , item);
    }
    return result;
  }
  
}