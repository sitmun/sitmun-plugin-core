import { ApplicationBackground } from './application-background.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

/** Application background manager service */
@Injectable() 
export class ApplicationBackgroundService extends RestService<ApplicationBackground> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public APPLICATION_BACKGROUND_API = this.API + '/application-backgrounds';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(ApplicationBackground, "application-backgrounds", injector);
  }
  
  /** remove application background*/
  remove(item: ApplicationBackground) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save application background*/
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