import { Connection } from './connection.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class ConnectionService extends RestService<Connection> {
  
  public API = '/api';
  public CONNECTION_API = this.API + '/connections';


  constructor(injector: Injector,private http: HttpClient) {
    super(Connection, "connections", injector);
  }
  
 remove(item: Connection) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: Connection): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.CONNECTION_API , item);
    }
    return result;
  }
  
}