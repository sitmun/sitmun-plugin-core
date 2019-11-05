import {Resource} from 'angular-hal'; 
import {Service} from './service.model'; 
/**
 * Service parameter model
 */
export class ServiceParameter extends Resource {
  /** name*/
  public name: string;
  
  /** type*/
  public type: string;
    
  /** value*/  
  public value: string;
  
  /** service*/
  public service: Service;

}
