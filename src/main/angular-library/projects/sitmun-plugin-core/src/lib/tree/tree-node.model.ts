import {Resource} from 'angular-hal';
import {Cartography} from '../cartography/cartography.model';
export class TreeNode extends Resource {

  public name: string;
  public tooltip: string; 
  public ordee : number;
  public active: boolean;
  public parent: TreeNode ;

  public cartography: Cartography;

}
