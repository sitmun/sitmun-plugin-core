import {Resource} from 'angular-hal';
import {Cartography} from '../cartography/cartography.model';
import {Tree} from './tree.model';
/**
 * Tree node model
 */
export class TreeNode extends Resource {
  /** name */
  public name: string;
  /** tooltip*/
  public tooltip: string;
  /** order*/
  public orden : number;
  /** whether tree node is active*/
  public active: boolean;
  /** parent tree node */
  public parent: TreeNode;
  /** displayed cartography */  
  public cartography: Cartography;
  /** tree */  
  public tree: Tree;

}
