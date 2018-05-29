import {Resource} from 'angular-hal';  
import { TerritoryType } from './territory-type.model';

export class Territory extends Resource {
  public name: string;
  public address: string;
  public blocked: boolean;
  public comments: string;
  public createdDate: any;
  public email: string;
  public ext: string;
  public logo: string;
  public organizationName: string;
  public scope: string;
  public type: TerritoryType;
  public members: Territory[];

}