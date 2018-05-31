import { Resource } from 'angular-hal'; 
import { Territory } from '../territory/territory.model';
import { User } from './user.model';

export class UserPosition extends Resource {
  public name: string;
  public email: string;
  public organization: string;
  public createdDate: any;
  public datedDate: any;
  public territory: Territory;
  public user: User;
}