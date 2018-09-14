import {Resource} from 'angular-hal'; 
import {Background} from '../cartography/background.model';
import {Application} from './application.model'; 

export class ApplicationBackground extends Resource {
  
  public order: Number;
  
  public background: Background;
  
  public application: Application;

}
