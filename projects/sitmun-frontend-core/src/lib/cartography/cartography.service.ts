import { Cartography } from './cartography.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService} from 'angular-hal';  

/** Cartography manager service */
@Injectable()
export class CartographyService extends RestService<Cartography> {
  
  /** API base path */
  public API = '/api';
  /** API resource path */
  public CARTOGRAPHY_API = this.API + '/cartographies';

  /** constructor */
  constructor(injector: Injector,private http: HttpClient) {
    super(Cartography, "cartographies", injector);
  }
  
  /** remove cartography*/
  remove(item: Cartography) {
    return this.http.delete(item._links.self.href);
   
  }
  
  /** save cartography*/
  save(item: Cartography): Observable<any> {
    let result: Observable<Object>;
    let cartographyConnection = item.connection;

    const cartographyService = item.service;
    const cartographySelectionService = item.selectionService;
    
      
    if (item.service!=null)
      item.service = item.service._links.self.href;
    if (item.selectionService!=null)
      item.selectionService = item.selectionService._links.self.href;  
    if (item.connection!=null){
        if (typeof item.connection._links!= 'undefined') { 
            item.connection = item.connection._links.self.href;
        } else {
            cartographyConnection._links= {};
            cartographyConnection._links.self = {};
            cartographyConnection._links.self.href="";
        }        
     }

    if (item._links!=null) {
        
      //update relations
      delete item.connection;
      delete item.service;            
      delete item.selectionService;
      
     if (cartographyConnection._links.self.href==''){
         item.deleteRelation('connection',cartographyConnection).subscribe(result => {     
         item.substituteRelation('service',cartographyService).subscribe(result => {
          item.substituteRelation('selectionService',cartographySelectionService).subscribe(result => {
      
            }, error => console.error(error));           
            }, error => console.error(error));
          
             }, error => console.error(error));
          
      } else {
          item.substituteRelation('connection',cartographyConnection).subscribe(result => {
          item.substituteRelation('service',cartographyService).subscribe(result => {
           item.substituteRelation('selectionService',cartographySelectionService).subscribe(result => {
      
            }, error => console.error(error));           
            }, error => console.error(error));
         

      
            }, error => console.error(error));           
       } 
         
      result = this.http.put(item._links.self.href, item);

           
    } else {
      result = this.http.post(this.CARTOGRAPHY_API , item);
    }
    return result;
  }
  
}
