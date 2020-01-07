import {Resource} from 'angular-hal'; 

/**
 * Role model
 */
export class Role extends Resource {
  /** name*/
  public name: string;
  /** comments*/
  public comments: string;

}