import {Resource} from 'angular-hal'; 
import { Territory } from '../territory/territory.model';
import { Cartography } from './cartography.model';
/**
 * Cartography availability model
 */
export class CartographyAvailability extends Resource {
  /** territory*/
  public territory: Territory;
  
  /** system created date*/
  public createdDate: any;
  
  /** cartography*/
  public cartography: Cartography;
}