import { Territory } from './territory.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

/** Territory manager service */
@Injectable()
export class TerritoryService extends RestService<Territory> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public TERRITORY_API = this.API + '/territories';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(Territory, "territories", injector);
  }
  
  /** remove territory*/
  remove(item: Territory) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save territory*/
  save(item: Territory): Observable<any> {
    let result: Observable<Object>;
    if (item.type!=null)
      item.type = item.type._links.self.href;
    if (item._links!=null) {
      
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.TERRITORY_API , item);
    }
    return result;
  }
  
}