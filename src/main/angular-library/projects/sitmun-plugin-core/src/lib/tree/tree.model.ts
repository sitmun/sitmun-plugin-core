import {Resource} from 'angular-hal';
import {TreeNode} from './tree-node.model';    
export class Tree extends Resource {

  public name: string;
  public nodes: TreeNode[];

}
