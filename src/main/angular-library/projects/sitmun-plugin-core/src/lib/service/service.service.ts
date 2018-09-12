import { Service } from './service.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class ServiceService extends RestService<Service> {
  
  public API = '/api';
  public SERVICE_API = this.API + '/services';


  constructor(injector: Injector,private http: HttpClient) {
    super(Service, "services", injector);
  }
  
 remove(item: Service) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: Service): Observable<any> {
    let result: Observable<Object>;
    let serviceConnection = item.connection;

    if (item.connection!=null){
        if (typeof item.connection._links!= 'undefined') { 
            item.connection = item.connection._links.self.href;
        } else {
            serviceConnection._links= {};
            serviceConnection._links.self = {};
            serviceConnection._links.self.href="";
        }        
     }

    if (item._links!=null) {
      //update relations
      delete item.connection;        
      
      if (serviceConnection._links.self.href==''){
         item.deleteRelation('connection',serviceConnection).subscribe(result => {     

          
             }, error => console.error(error));
          
      } else {
          item.substituteRelation('connection',serviceConnection).subscribe(result => {
         

      
            }, error => console.error(error));           
       } 
       
         
      result = this.http.put(item._links.self.href, item);

           
    } else {
      result = this.http.post(this.SERVICE_API , item);
    }
    return result;
  }
  
}
