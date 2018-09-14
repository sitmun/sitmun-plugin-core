import {Resource} from 'angular-hal';  
import {Connection} from '../connection/connection.model';
import {ServiceParameter} from './service-parameter.model';
export class Service extends Resource {

  public name: string;
    
  public type: string;

  public url: string;

  public projections: string;

  public legend: string;

  public infoUrl: string;

  public createdDate: any;

  //public layers: Cartography[];

  public connection: Connection;
    
  public parameters: ServiceParameter[];
}
