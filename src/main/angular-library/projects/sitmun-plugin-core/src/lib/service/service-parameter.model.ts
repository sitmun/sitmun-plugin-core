import {Resource} from 'angular-hal'; 
import {Service} from './service.model'; 

export class ServiceParameter extends Resource {

  public name: string;
  
  public type: string;
    
  public value: string;
  
  public service: Service;

}
