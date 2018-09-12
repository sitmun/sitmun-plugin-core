import { TaskGroup } from './task-group.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class TaskGroupService extends RestService<TaskGroup> {
  
  public API = '/api';
  public CONNECTION_API = this.API + '/task-groups';


  constructor(injector: Injector,private http: HttpClient) {
    super(TaskGroup, "task-groups", injector);
  }
  
 remove(item: TaskGroup) {
    return this.http.delete(item._links.self.href);
   
  }
  
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