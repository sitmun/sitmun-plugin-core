import {Resource} from 'angular-hal';  
import { TerritoryType } from './territory-type.model';

/**
 * Territory model
 */
export class Territory extends Resource {
  /** name */
  public name: string;
  /** address*/
  public address: string;
  /** whether territory is blocked*/
  public blocked: boolean;
  /** comments*/
  public comments: string;
  /** system created date*/
  public createdDate: any;
  /** contact email */  
  public email: string;
  /** extension */
  public ext: string;
  /** logo image URL */
  public logo: string;
  /** contact organization name */
  public organizationName: string;
  /** scope*/
  public scope: string;
  /** type */  
  public type: TerritoryType;
  /** territory members*/
  public members: Territory[];

}