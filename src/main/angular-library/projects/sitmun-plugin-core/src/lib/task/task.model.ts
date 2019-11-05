import {Resource} from 'angular-hal';  

import { Connection } from '../connection/connection.model';
import { Role } from '../role/role.model';
import { TaskType } from './task-type.model';
import { TaskGroup } from './task-group.model';
import { TaskAvailability } from './task-availability.model';
import { TaskParameter } from './task-parameter.model';

//FIXME ensure task creation in admin app upon initialization (as it is done with Roles and default Users)
/** GEOADMIN_task id */
export const GEOADMIN_TREE_TASK_ID:string  = "geoadmin";

import { TaskUI } from './task-ui.model';
/** Task model */
export class Task extends Resource {
  /** name */  
  public name: string;
  /** order*/
  public order: Number;
  /** system created date*/
  public createdDate: any;
  /** task group*/
  public group: TaskGroup;
  /** task type*/
  public type: TaskType;
  /** task UI*/
  public ui: TaskUI;
  /** parameters*/
  public parameters: TaskParameter[];
  /** connection*/
  public connection: Connection;
  /** roles*/
  public roles: Role[];
  /** availabilities*/
  public availabilities: TaskAvailability[];
}
