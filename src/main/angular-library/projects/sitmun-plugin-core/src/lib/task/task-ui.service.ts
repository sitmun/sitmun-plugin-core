import { TaskUI } from './task-ui.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class TaskUIService extends RestService<TaskUI> {
  
  public API = '/api';
  public CONNECTION_API = this.API + '/task-uis';


  constructor(injector: Injector,private http: HttpClient) {
    super(TaskUI, "task-uis", injector);
  }
  
 remove(item: TaskUI) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: TaskUI): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {      
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.CONNECTION_API , item);
    }
    return result;
  }
  
}