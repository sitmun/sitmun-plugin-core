import { RestService } from 'angular-hal';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends RestService<User> {
  
  public API = '/api';
  public USER_API = this.API + '/users';


  constructor(injector: Injector,private http: HttpClient) {
    super(User, "users", injector);
  }
  
  remove(item: User) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: any): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.USER_API , item);
    }
    return result;
  }
}
