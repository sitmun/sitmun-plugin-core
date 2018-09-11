import {Resource} from 'angular-hal';
import {Treenode} from './tree-node.mode';    
export class Tree extends Resource {

  public name: string;
  public nodes: TreeNode[];

}
