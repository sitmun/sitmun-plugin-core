import {Resource} from 'angular-hal'; 
import { Territory } from '../territory/territory.model';
import { Task } from './task.model';

export class TaskAvailability extends Resource {
  public territory: Territory;
  public task: Task;
}