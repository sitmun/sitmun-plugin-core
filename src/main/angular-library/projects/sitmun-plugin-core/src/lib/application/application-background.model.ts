import {Resource} from 'angular-hal'; 
import {Background} from '../cartography/background.model';

export class ApplicationBackground extends Resource {
  public order: Number;
  public background: Background;

}
