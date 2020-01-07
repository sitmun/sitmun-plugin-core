import { Resource } from 'angular-hal'; 
import { Territory } from '../territory/territory.model';
import { User } from './user.model';
/**
 * User position model
 */
export class UserPosition extends Resource {
  /** name */
  public name: string;
  /** email */
  public email: string;
  /** organization name*/
  public organization: string;
  /** system created date*/
  public createdDate: any;
  /** system dated date*/
  public datedDate: any;
  /** position territory*/
  public territory: Territory;
  /** user*/
  public user: User;
}