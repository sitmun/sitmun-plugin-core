import { Application } from './application.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService, ResourceHelper} from 'angular-hal';  

@Injectable()
export class ApplicationService extends RestService<Application> {
  
  public API = '/api';
  public APPLICATION_API = this.API + '/applications';


  constructor(injector: Injector,private http: HttpClient) {
    super(Application, "applications", injector);
  }
  /*
  getFullApplicationData(application: Application){
    application = ResourceHelper.resolveRelations(application); 
    delete application._links;
    return application;
  }    
  */
    
  remove(item: Application) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: Application): Observable<any> {
    let result: Observable<Object>;
    let applicationSituationMap = item.situationMap;

    if (item.situationMap!=null){
        if (typeof item.situationMap._links!= 'undefined') { 
            item.situationMap = item.situationMap._links.self.href;
        } else {
            applicationSituationMap._links= {};
            applicationSituationMap._links.self = {};
            applicationSituationMap._links.self.href="";
        }        
     }

    if (item._links!=null) {
      //update relations
      delete item.situationMap;        
      
      if (applicationSituationMap._links.self.href==''){
         item.deleteRelation('situationMap',applicationSituationMap).subscribe(result => {     
             
             }, error => console.error(error));
          
      } else {
          item.substituteRelation('situationMap',applicationSituationMap).subscribe(result => {
         
      
            }, error => console.error(error));           
       } 
       
         
      result = this.http.put(item._links.self.href, item);

           
    } else {
      result = this.http.post(this.APPLICATION_API , item);
    }
    return result;
  }
    
    
  
}
