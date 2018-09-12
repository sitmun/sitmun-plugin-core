import { TaskType } from './task-type.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class TaskTypeService extends RestService<TaskType> {
  
  public API = '/api';
  public CONNECTION_API = this.API + '/task-types';


  constructor(injector: Injector,private http: HttpClient) {
    super(TaskType, "task-types", injector);
  }
  
 remove(item: TaskType) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: TaskType): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.CONNECTION_API , item);
    }
    return result;
  }
  
}