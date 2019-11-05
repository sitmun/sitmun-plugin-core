import { Tree } from './tree.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

/** Tree manager service */
@Injectable()
export class TreeService extends RestService<Tree> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public TREE_API = this.API + '/trees';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(Tree, "trees", injector);
  }
  
  /** remove tree*/
  remove(item: Tree) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save tree*/
  save(item: Tree): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      
      result = this.http.put(item._links.self.href, item);
    } else {
      result = this.http.post(this.TREE_API , item);
    }
    return result;
  }
  
}