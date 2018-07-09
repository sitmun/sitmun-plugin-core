import { User } from '../user/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {RestService} from 'angular-hal'; 

@Injectable()
export class AccountService extends RestService<User> {
  
  public API = '/api';
  public ACCOUNT_API = this.API + '/account';


  constructor(injector: Injector,private http: HttpClient) {
    super(User, "account", injector);
  }


  get(): Observable<any> {
    let result: Observable<Object>;
    result = this.http.get(this.ACCOUNT_API);
    return result;
  }
  
  save(item: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.ACCOUNT_API , item);

    return result;
  }

  changePassword(item: any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(this.ACCOUNT_API+"/change-password" , item);
    return result;
  }
  
}