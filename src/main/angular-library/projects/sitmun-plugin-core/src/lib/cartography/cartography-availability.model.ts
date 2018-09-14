import {Resource} from 'angular-hal'; 
import { Territory } from '../territory/territory.model';
import { Cartography } from './cartography.model';

export class CartographyAvailability extends Resource {
  public territory: Territory;
  public createdDate: any;
  public cartography: Cartography;
}