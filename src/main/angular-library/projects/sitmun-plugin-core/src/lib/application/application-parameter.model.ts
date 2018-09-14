import {Resource} from 'angular-hal'; 
import {Application} from './application.model'; 

export class ApplicationParameter extends Resource {

  public name: string;
  
  public type: string;
    
  public value: string;
  
  public application: Application;

}
