import { ServiceParameter } from './service-parameter.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable() 
export class ServiceParameterService extends RestService<ServiceParameter> {
  
  public API = '/api';
  public SERVICE_PARAMETER_API = this.API + '/service-parameters';


  constructor(injector: Injector,private http: HttpClient) {
    super(ServiceParameter, "service-parameters", injector);
  }
  
  remove(item: ServiceParameter) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: ServiceParameter): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      
      
      if (item.service !=null){
          let service =  item.service;
          delete item.service;
          item.substituteRelation('service',service).subscribe(result => {            
          
      }, error => console.error(error));
      }
      result = this.http.put(item._links.self.href, item);
      
      
    } else {
      item.service = item.service._links.self.href;
  
      result = this.http.post(this.SERVICE_PARAMETER_API , item);
    }
    return result;
  }
  
}