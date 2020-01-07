import {Resource} from 'angular-hal';  
import {CartographyGroup} from './cartography-group.model';
/**
 * Background model
 */
export class Background extends Resource {
  /** name*/
  public name: string;
    
  /** description*/
  public description: string;
  
  /** whether background is active*/
  public active: Boolean;
  
  /** system created date*/
  public createdDate: any;

  /** cartography group*/
  public cartographyGroup: CartographyGroup;
}
