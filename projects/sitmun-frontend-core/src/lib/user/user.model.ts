import {Resource} from 'angular-hal'; 
import { UserConfiguration } from './user-configuration.model';
import { UserPosition } from './user-position.model';

/**
 * User model
 */
export class User extends Resource {
  /** username */
  public username: string;
  /** password */
  public password: string;
  /** first name */
  public firstName: string;
  /** last name */
  public lastName: string;
  /** whether user is blocked */
  public blocked: boolean;
  /** whether user is administrator */
  public administrator: boolean;
  /** user positions */
  public positions: UserPosition[];
  /** user permissions */
  public permissions: UserConfiguration[];
}