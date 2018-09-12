import {Resource} from 'angular-hal';
import {Task} from './task.model';  

export class TaskParameter extends Resource {

  public name: string;
  
  public type: string;
    
  public value: string;
    
  public order: Number;
  
  public task:Task;

}
