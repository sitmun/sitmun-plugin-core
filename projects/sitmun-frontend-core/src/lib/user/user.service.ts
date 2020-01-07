import { RestService } from 'angular-hal';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

/** User manager service */
@Injectable()
export class UserService extends RestService<User> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public USER_API = this.API + '/users';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(User, "users", injector);
  }
  
  /** remove user*/
  remove(item: User) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save user*/
  save(item: any): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.USER_API , item);
    }
    return result;
  }
    
  /** change password o given user id */
  changePassword(id,item: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.USER_API+"/"+id+"/change-password" , item);
    return result;
  }
}
