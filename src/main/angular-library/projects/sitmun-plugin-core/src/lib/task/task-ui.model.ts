import {Resource} from 'angular-hal';
/**
 * Task UI model
 */
export class TaskUI extends Resource {
  /** name*/
  public name: string;
  
  /** tooltip*/  
  public tooltip: string;
    
  /** order*/ 
  public order: number;

}
