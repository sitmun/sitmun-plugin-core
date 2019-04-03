import {Resource} from 'angular-hal';  
import {Tree} from '../tree/tree.model';
import {Role} from '../role/role.model';
import {CartographyGroup} from '../cartography/cartography-group.model';
import {ApplicationParameter} from './application-parameter.model';
import {ApplicationBackground} from './application-background.model';

//FIXME ensure application creation in admin app upon initialization (as it is done with Roles and default Users)
export const TERRITORIAL_APP_NAME:string  = "Aplicación Territorial";

export class Application extends Resource {

  public name: string;

  public type: string;

  public title: string;

  public theme: string;

  public createdDate: any;

  public availableRoles : Role[];

  public trees : Tree[];
  
    //comma-separated values
  public scales: string;
  
  //comma-separated EPSG codes
  public projections: string;
  
  public treeAutoRefresh: Boolean;

  public backgrounds: ApplicationBackground[];

  public situationMap: CartographyGroup;    
  
  public parameters: ApplicationParameter[];
}
