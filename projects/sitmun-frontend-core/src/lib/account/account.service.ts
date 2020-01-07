import { User } from '../user/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {RestService} from 'angular-hal'; 

/** Account manager service */
@Injectable()
export class AccountService extends RestService<User> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public ACCOUNT_API = this.API + '/account';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(User, "account", injector);
  }

  /** get logged in user account*/
  get(): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(this.ACCOUNT_API);
    return result;
  }
  
  /** save account*/
  save(item: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.ACCOUNT_API , item);

    return result;
  }

  /** change logged in user account*/  
  changePassword(item: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.ACCOUNT_API+"/change-password" , item);
    return result;
  }
  
}
