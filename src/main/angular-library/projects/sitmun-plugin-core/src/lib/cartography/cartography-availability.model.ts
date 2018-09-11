import {Resource} from 'angular-hal'; 
import { Territory } from '../territory/territory.model';

export class CartographyAvailability extends Resource {
  public territory: Territory;
  public createdDate: Date;
}