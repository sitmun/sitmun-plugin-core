import {Resource} from 'angular-hal';
import {Cartography} from './cartography.model';
import {Role} from '../role/role.model';
/**
 * Cartography group
 */
export class CartographyGroup extends Resource {
  /** name*/
  public name: string;
  /** type*/
  public type: string;
  /** members*/
  public members: Cartography[];
  /** roles*/
  public roles: Role[];

}
