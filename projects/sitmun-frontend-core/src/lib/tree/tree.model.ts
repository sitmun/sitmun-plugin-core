import {Resource} from 'angular-hal';
import {TreeNode} from './tree-node.model';
import {Role} from '../role/role.model';    
/**
 * Tree model
 */
export class Tree extends Resource {

  /** name */
  public name: string;
  /** nodes */
  public nodes: TreeNode[];
  /** available roles */
  public availableRoles : Role[];

}
