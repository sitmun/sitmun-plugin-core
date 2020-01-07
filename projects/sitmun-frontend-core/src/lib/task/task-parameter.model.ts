import {Resource} from 'angular-hal';
import {Task} from './task.model';  
/**
 * Task parameter model
 */
export class TaskParameter extends Resource {
  /** name*/  
  public name: string;
  
  /** type*/
  public type: string;
    
  /** value*/
  public value: string;
  
  /** order*/  
  public order: Number;
  
  /** task*/  
  public task:Task;

}
