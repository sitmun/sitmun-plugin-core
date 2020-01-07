import {Resource} from 'angular-hal'; 
import {Application} from './application.model'; 

/**
 * Application parameter model 
 */
export class ApplicationParameter extends Resource {
  /** name*/
  public name: string;
  
  /** type*/
  public type: string;
  
  /** value*/    
  public value: string;
  
  /** application*/
  public application: Application;

}
