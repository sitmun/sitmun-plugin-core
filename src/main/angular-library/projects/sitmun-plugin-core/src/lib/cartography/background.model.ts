import {Resource} from 'angular-hal';  
import {CartographyGroup} from './cartography-group.model';
export class Background extends Resource {
  
  public name: string;
    
  public description: string;
  
  public active: Boolean;

  public createdDate: Date;

  public cartographyGroup: CartographyGroup;
}
