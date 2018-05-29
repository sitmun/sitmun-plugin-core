import {Resource} from 'angular-hal'; 
import { Role } from '../role/role.model';
import { Territory } from '../territory/territory.model';
import { User } from './user.model';

export class UserConfiguration extends Resource {
  public role: Role;
  public territory: Territory;
  public user: User;
}