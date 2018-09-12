import {Resource} from 'angular-hal';  

import { Connection } from '../connection/connection.model';
import { Role } from '../role/role.model';
import { TaskType } from './task-type.model';
import { TaskGroup } from './task-group.model';
import { TaskAvailability } from './task-availability.model';
import { TaskParameter } from './task-parameter.model';
export class Task extends Resource {
  public name: string;
  public order: Number;
  public createdDate: any;
  public group: TaskGroup;
  public type: TaskType;
  public parameters: TaskParameter[];
  public connection: Connection;
  public roles: Role[];
  public availabilities: TaskAvailability[];
}
