import { Connection } from './connection.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

/** Connection manager service */
@Injectable()
export class ConnectionService extends RestService<Connection> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public CONNECTION_API = this.API + '/connections';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(Connection, "connections", injector);
  }
  
  /** remove connection*/
  remove(item: Connection) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save connection*/
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