import { Role } from './role.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {RestService} from 'angular-hal'; 

@Injectable()
export class RoleService extends RestService<Role> {
  
  public API = '//localhost:8080/api';
  public ROLE_API = this.API + '/roles';


  constructor(injector: Injector,private http: HttpClient) {
    super(Role, "roles", injector);
  }
  
  remove(item: Role) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: any): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.ROLE_API , item);
    }
    return result;
  }
  
}