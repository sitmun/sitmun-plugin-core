import { ApplicationBackground } from './application-background.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable() 
export class ApplicationBackgroundService extends RestService<ApplicationBackground> {
  
  public API = '/api';
  public APPLICATION_BACKGROUND_API = this.API + '/application-backgrounds';


  constructor(injector: Injector,private http: HttpClient) {
    super(ApplicationBackground, "application-backgrounds", injector);
  }
  
  remove(item: ApplicationBackground) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: ApplicationBackground): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
      if (item.application !=null){
          item.substituteRelation('application',item.application).subscribe(result => {
      
      }, error => console.error(error));
      }
      if (item.background !=null){
          item.substituteRelation('background',item.background).subscribe(result => {
      
      }, error => console.error(error));
      }
      
    } else {
      item.application = item.application._links.self.href;
      item.background = item.background._links.self.href;
  
      result = this.http.post(this.APPLICATION_BACKGROUND_API , item);
    }
    return result;
  }
  
}