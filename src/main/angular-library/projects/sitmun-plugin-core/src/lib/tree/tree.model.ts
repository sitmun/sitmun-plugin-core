import {Resource} from 'angular-hal';
import {TreeNode} from './tree-node.model';
import {Role} from '../role/role.model';    
export class Tree extends Resource {

  public name: string;
  public nodes: TreeNode[];
  public availableRoles : Role[];

}
