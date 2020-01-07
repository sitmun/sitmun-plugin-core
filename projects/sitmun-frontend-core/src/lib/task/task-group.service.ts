import { TaskGroup } from './task-group.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

/** Task group manager service */
@Injectable()
export class TaskGroupService extends RestService<TaskGroup> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public CONNECTION_API = this.API + '/task-groups';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(TaskGroup, "task-groups", injector);
  }
  
  /** remove task group*/
  remove(item: TaskGroup) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save task group*/
  save(item: TaskGroup): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.CONNECTION_API , item);
    }
    return result;
  }
  
}