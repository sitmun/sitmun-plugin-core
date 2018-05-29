import { Territory } from './territory.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  
import { TerritoryType } from './territory-type.model';

@Injectable()
export class TerritoryTypeService extends RestService<TerritoryType> {
  
  public API = '//localhost:8080/api';
  public TERRITORYTYPE_API = this.API + '/territory-types';


  constructor(injector: Injector,private http: HttpClient) {
    super(TerritoryType, "territory-types", injector);
  }
  
  remove(item: TerritoryType) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: any): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.TERRITORYTYPE_API , item);
    }
    return result;
  }
  
}