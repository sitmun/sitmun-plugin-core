import { RestService } from 'angular-hal'; 
import { UserConfiguration } from './user-configuration.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

/** User configuration manager service */
@Injectable()
export class UserConfigurationService  extends RestService<UserConfiguration> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public USER_CONFIGURATION_API = this.API + '/user-configurations';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(UserConfiguration, "user-configurations", injector);
  }
  
  /** remove user configuration*/
  remove(item: UserConfiguration) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save user configuration*/
  save(item: any): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      result = this.http.put(item._links.self.href, item);
      if (item.user !=null){
          item.substituteRelation('user',item.user).subscribe(result => {
      
      }, error => console.error(error));
      }
      if (item.territory !=null){
          item.substituteRelation('territory',item.territory).subscribe(result => {
      
      }, error => console.error(error));
      }
      if (item.role !=null){
          item.substituteRelation('role',item.role).subscribe(result => {
      
      }, error => console.error(error));
      }
    } else {
      item.territory = item.territory._links.self.href;
      item.role = item.role._links.self.href;
      item.user = item.user._links.self.href;
  
      result = this.http.post(this.USER_CONFIGURATION_API , item);
    }
    return result;
  }
  
}