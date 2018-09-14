import { TreeNode } from './tree-node.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

@Injectable() 
export class TreeNodeService extends RestService<TreeNode> {
  
  public API = '/api';
  public TREE_NODE_API = this.API + '/tree-nodes';


  constructor(injector: Injector,private http: HttpClient) {
    super(TreeNode, "tree-nodes", injector);
  }
  
  remove(item: TreeNode) {
    return this.http.delete(item._links.self.href);
   
  }
  
  save(item: TreeNode): Observable<any> {
    let result: Observable<Object>;
    if (item._links!=null) {
      const itemTree = item.tree;
      const itemCartography = item.cartography;
        
      delete item.tree;
      delete item.cartography;
        
      result = this.http.put(item._links.self.href, item);
      if (item.tree !=null){
          item.substituteRelation('tree',itemTree).subscribe(result => {
      
      }, error => console.error(error));
      }
      if (item.cartography !=null){
          item.substituteRelation('cartography',itemCartography).subscribe(result => {
      
      }, error => console.error(error));
      }
      
    } else {
      item.tree = item.tree._links.self.href;
      item.cartography = item.cartography._links.self.href;
        
  
      result = this.http.post(this.TREE_NODE_API , item);
    }
    return result;
  }
  
}