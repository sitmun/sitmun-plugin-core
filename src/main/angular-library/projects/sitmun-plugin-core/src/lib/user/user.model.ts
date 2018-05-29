import {Resource} from 'angular-hal'; 
import { UserConfiguration } from './user-configuration.model';
import { UserPosition } from './user-position.model';

export class User extends Resource {
  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public blocked: boolean;
  public administrator: boolean;
  public positions: UserPosition[];
  public permissions: UserConfiguration[];
}