import {Resource} from 'angular-hal';  

import { Connection } from '../connection/connection.model';
import { Role } from '../role/role.model';
import { TaskType } from './task-type.model';
import { TaskGroup } from './task-group.model';
import { TaskAvailability } from './task-availability.model';
import { TaskParameter } from './task-parameter.model';

//FIXME move to plugin-demo
export const GEOADMIN_TREE_TASK_ID:string  = "geoadmin";

import { TaskUI } from './task-ui.model';
export class Task extends Resource {
  public name: string;
  public order: Number;
  public createdDate: any;
  public group: TaskGroup;
  public type: TaskType;
  public ui: TaskUI;
  public parameters: TaskParameter[];
  public connection: Connection;
  public roles: Role[];
  public availabilities: TaskAvailability[];
}
