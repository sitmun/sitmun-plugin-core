import { Tree } from './tree.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable()
export class TreeService extends RestService<Tree> {
  
  public API = '/api';
  public TREE_API = this.API + '/trees';


  constructor(injector: Injector,private http: HttpClient) {
    super(Tree, "trees", injector);
  }
  
 remove(item: Tree) {
    return this.http.delete(item._links.self.href);
   
  }
  
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