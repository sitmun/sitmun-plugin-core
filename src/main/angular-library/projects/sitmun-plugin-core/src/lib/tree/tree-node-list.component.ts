import { Resource } from 'angular-hal';
import { TreeNode } from 'sitmun-frontend-core';
import { TreeNodeService } from 'sitmun-frontend-core';
import { TreeService } from 'sitmun-frontend-core';
import { Tree } from 'sitmun-frontend-core';
import { CartographyService } from 'sitmun-frontend-core';
import { Cartography } from 'sitmun-frontend-core';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';

/** Component for managing tree nodes*/
@Component({
    selector: 'sitmun-tree-node-list',
    templateUrl: './tree-node-list.component.html',
    styleUrls: ['./tree-node-list.component.css']
})
export class TreeNodeListComponent implements OnInit {

    /** Tree nodes to manage */
    items: TreeNode[];

    /** Tree to manage its tree nodes*/
    _tree: Tree;

    /** Table displayed columns */
    displayedColumns = ['name', 'orden', 'parent', 'actions'];

    /** MatTableDataSource for table display */
    dataSource = null;

    /** Paginator for table display */
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /** Component constructor */
    constructor(
        /*tree node service*/private treeNodeService: TreeNodeService,
        /** dialog*/public dialog: MatDialog) {

    }

    /** On component init, get all data dependencies */
    ngOnInit() {
        this.items = new Array<TreeNode>();

    }

    /** Set Tree to manage its tree nodes*/
    @Input()
    set tree(tree: Tree) {
        this._tree = tree;
        this.loadTreeNodes();
    }

    /** load all tree nodes*/
    loadTreeNodes() {
        if (this._tree != null) {
            this._tree.getRelationArray(TreeNode, 'nodes').subscribe(
                (items: TreeNode[]) => {

                    this.items = items;
                    if (this.items != null) {
                        var this_ = this;
                        this.items.forEach(function(item, index, items){
                            item.getRelation(TreeNode, "parent").subscribe(
                                (node:TreeNode) => {
                                    if (node != null) {
                                        item.parent = node;
                                    }
                                },
                                (error:any) => {
                                    item.parent = null;
                                }
                            );
                        });
                    }

                    this.dataSource = new MatTableDataSource<TreeNode>(this.items);
                    this.dataSource.paginator = this.paginator;

                },
                error => this.items = new Array<TreeNode>());

        }
    }

    /** open dialog to edit tree node data*/
    edit(treeNode: TreeNode): void {
        let dialogRef = this.dialog.open(TreeNodeEditDialog, {
            width: '250px',
            data: treeNode
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadTreeNodes();

        });
    }

    /** add tree node*/
    add(): void {
        let treeNode = new TreeNode();
        treeNode.tree = this._tree;
        let dialogRef = this.dialog.open(TreeNodeEditDialog, {
            width: '250px',
            data: treeNode
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadTreeNodes();
        });
    }

    /** remove tree node*/
    remove(item: TreeNode) {
        this.treeNodeService.delete(item).subscribe(result => {
            this.loadTreeNodes();
        }, error => console.error(error));

    }

    /** get tree node parent name*/
    getNodeParentName(item: TreeNode) {
        return (item.parent != null)?item.parent.name:"";
    }
}

/** Component for edit tree node data*/
@Component({
    selector: 'sitmun-tree-node-dialog',
    templateUrl: './tree-node-edit.dialog.html',
    styleUrls: ['./tree-node-edit.dialog.css']
})
export class TreeNodeEditDialog implements OnInit {

    /** whether tree node is a group*/
    isGroup:boolean = false;

    /** cartographies to select*/
    cartographies: Cartography[] = new Array<Cartography>();

    /** parent tree nodes*/
    parentNodes: TreeNode[];

    /** constructor*/
    constructor(
        /**tree service*/ private treeService: TreeService,
        /**tree node service*/ private treeNodeService: TreeNodeService,
        /**cartography service*/ private cartographyService: CartographyService,
        /**dialog reference*/ public dialogRef: MatDialogRef<TreeNodeEditDialog>,
        /**tree node to edit*/ @Inject(MAT_DIALOG_DATA) public treeNode: TreeNode) {
    }

    /** On component init load all required data dependencies*/
    ngOnInit() {
        this.getAllCartographies();
        this.getAllParentNodes();
        if (this.treeNode._links) {
            this.treeNode.getRelation(Tree, 'tree').subscribe(
                (tree: Tree) => this.treeNode.tree = tree,
                error => this.treeNode.tree = new Tree());
            var this_ = this;
            this.treeNode.getRelation(Cartography, 'cartography').finally(function(){
                this_.isGroup = isNullOrUndefined(this_.treeNode.cartography);
            }).subscribe(
                (cartography: Cartography) => this.treeNode.cartography = cartography,
                error => this.treeNode.cartography = null);
            this.treeNode.getRelation(TreeNode, 'parent').subscribe(
                (parent: TreeNode) => this.treeNode.parent = parent,
                error => this.treeNode.parent = null);
        }

    }

    /** save tree node*/
    save() {
        this.treeNodeService.save(this.treeNode).subscribe(result => {
            this.dialogRef.close();
        }, error => console.error(error));
    }

    /** compare two resources*/
    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }

    /** get id part of the URI of given resource*/
    getResourceId(c1: Resource) {
        if (c1 && c1._links && c1._links.self && c1._links.self.href) {
            return c1._links.self.href.substring(c1._links.self.href.lastIndexOf("/")+1);
        }
        return null;
    }

    /** load all cartographies*/
    getAllCartographies() {
        this.cartographyService.getAll()
            .subscribe((cartographies: Cartography[]) => {
                this.cartographies = cartographies;

            });
    }

    /** load parent tree nodes*/
    getAllParentNodes() {
        this.parentNodes = new Array<TreeNode>();
        this.treeNodeService.getAll()
            .subscribe((treeNodes: TreeNode[]) => {
                if (treeNodes && treeNodes.length) {
                    var treeNode;
                    //Get the parent nodes only
                    var this_ = this;
                    var treeNode = this.getResourceId(this.treeNode);
                    treeNodes.forEach(function(node, index, nodes){
                        var nodeId = this_.getResourceId(node);
                        node.getRelation(Cartography, 'cartography').finally(function(){
                            if ((node.cartography == null) && nodeId && (nodeId != treeNode)) {
                                this_.parentNodes.push(node);
                            }
                        }).subscribe(
                            (cartography: Cartography) => node.cartography = cartography,
                            error => node.cartography = null);
                    });
                }
            });
    }

    /** check whether group field has changed*/
    isGroupChanged($event){
        if ($event.checked) {
            //Is group reset information
            this.treeNode.active = false;
            this.treeNode.cartography = null;
        }

    }

}
