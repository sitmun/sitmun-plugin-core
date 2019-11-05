import { RestService } from 'angular-hal'; 
import { UserPosition } from './user-position.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

/** User position manager service */
@Injectable()
export class UserPositionService  extends RestService<UserPosition> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public USER_POSITION_API = this.API + '/user-positions';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(UserPosition, "user-positions", injector);
  }
  
  /** remove user position*/
  remove(item: UserPosition) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save user position*/
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
    } else {
      item.territory = item.territory._links.self.href;
      item.user = item.user._links.self.href;
  
      result = this.http.post(this.USER_POSITION_API , item);
    }
    return result;
  }
  
}