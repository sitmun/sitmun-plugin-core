import { Task } from './task.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class TaskService extends RestService<Task> {
  
  public API = '/api';
  public CONNECTION_API = this.API + '/tasks';


  constructor(injector: Injector,private http: HttpClient) {
    super(Task, "tasks", injector);
  }
  
 remove(item: Task) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: Task): Observable<any> {
    let result: Observable<Object>;
    const taskType = item.type;
    const taskGroup = item.group;
    let taskConnection = item.connection;

    if (item.type!=null)
      item.type = item.type._links.self.href;
    if (item.group!=null)
      item.group = item.group._links.self.href;
    if (item.connection!=null){
        if (typeof item.connection._links!= 'undefined') { 
            item.connection = item.connection._links.self.href;
        } else {
            taskConnection._links= {};
            taskConnection._links.self = {};
            taskConnection._links.self.href="";
        }        
     }

    if (item._links!=null) {
      //update relations
      delete item.type;
      delete item.group;
      delete item.connection;        
      
      if (taskConnection._links.self.href==''){
         item.deleteRelation('connection',taskConnection).subscribe(result => {     
         item.substituteRelation('type',taskType).subscribe(result => {
          item.substituteRelation('group',taskGroup).subscribe(result => {
      
            }, error => console.error(error));           
            }, error => console.error(error));
          
             }, error => console.error(error));
          
      } else {
          item.substituteRelation('connection',taskConnection).subscribe(result => {
          item.substituteRelation('type',taskType).subscribe(result => {
           item.substituteRelation('group',taskGroup).subscribe(result => {
      
            }, error => console.error(error));           
            }, error => console.error(error));
         

      
            }, error => console.error(error));           
       } 
       
         
      result = this.http.put(item._links.self.href, item);

           
    } else {
      result = this.http.post(this.CONNECTION_API , item);
    }
    return result;
  }
  
}
