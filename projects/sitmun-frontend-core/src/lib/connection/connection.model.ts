import {Resource} from 'angular-hal';  
/**
 * Connection model
 */
export class Connection extends Resource {
  /** name*/
  public name: string;
  /** type*/
  public type: string;
  /** user*/
  public user: string;
  /** password*/
  public password: string;
  /** connection string*/
  public connectionString: string;

}
