import {Resource} from 'angular-hal'; 
import { Role } from '../role/role.model';
import { Territory } from '../territory/territory.model';
import { User } from './user.model';

/**
 * User permission model
 */
export class UserConfiguration extends Resource {
  /** role */  
  public role: Role;
  /** territory */ 
  public territory: Territory;
  /** user */
  public user: User;
}