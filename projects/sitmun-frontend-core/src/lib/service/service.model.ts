import {Resource} from 'angular-hal';  
import {Connection} from '../connection/connection.model';
import {ServiceParameter} from './service-parameter.model';
/**
 * Service model
 */
export class Service extends Resource {
  /** name*/
  public name: string;
    
  /** type*/
  public type: string;

  /** url*/  
  public url: string;

  /** projections*/  
  public projections: string;
  
  /** legend*/
  public legend: string;

  /** infoUrl*/  
  public infoUrl: string;
  
  /** system created date*/
  public createdDate: any;

  /** connection*/
  public connection: Connection;
  
  /** parameters*/  
  public parameters: ServiceParameter[];
}
