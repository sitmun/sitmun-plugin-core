import { Resource } from 'angular-hal';
import { TreeNode } from './tree-node.model';
import { TreeNodeService } from './tree-node.service';
import { TreeService } from './tree.service';
import { Tree } from './tree.model';
import { CartographyService } from '../cartography/cartography.service';
import { Cartography } from '../cartography/cartography.model';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { isNullOrUndefined } from 'util';


@Component({
    selector: 'sitmun-tree-node-list',
    templateUrl: './tree-node-list.component.html',
    styleUrls: ['./tree-node-list.component.css']
})
export class TreeNodeListComponent implements OnInit {

    items: TreeNode[];
    _tree: Tree;

    displayedColumns = ['name', 'ordee', 'parent', 'actions'];
    dataSource = null;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private treeNodeService: TreeNodeService,

        public dialog: MatDialog) {

    }

    ngOnInit() {
        this.items = new Array<TreeNode>();

    }

    @Input()
    set tree(tree: Tree) {
        this._tree = tree;
        this.loadTreeNodes();
    }
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

    edit(treeNode: TreeNode): void {
        let dialogRef = this.dialog.open(TreeNodeEditDialog, {
            width: '250px',
            data: treeNode
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.loadTreeNodes();

        });
    }

    add(): void {
        let treeNode = new TreeNode();
        treeNode.tree = this._tree;
        let dialogRef = this.dialog.open(TreeNodeEditDialog, {
            width: '250px',
            data: treeNode
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.loadTreeNodes();
        });
    }

    remove(item: TreeNode) {
        this.treeNodeService.delete(item).subscribe(result => {
            this.loadTreeNodes();
        }, error => console.error(error));

    }

    getNodeParentName(item: TreeNode) {
        return (item.parent != null)?item.parent.name:"";
    }
}
@Component({
    selector: 'sitmun-tree-node-dialog',
    templateUrl: './tree-node-edit.dialog.html',
    styleUrls: ['./tree-node-edit.dialog.css']
})
export class TreeNodeEditDialog implements OnInit {
    
    isGroup:boolean = false;

    cartographies: Cartography[] = new Array<Cartography>();
    parentNodes: TreeNode[] = new Array<TreeNode>();
    constructor(
        private treeService: TreeService,
        private treeNodeService: TreeNodeService,
        private cartographyService: CartographyService,
        public dialogRef: MatDialogRef<TreeNodeEditDialog>,
        @Inject(MAT_DIALOG_DATA) public treeNode: TreeNode) {
    }

    //TODO let cartography be null

    ngOnInit() {
        this.getAllCartographies();
        this.getAllParentNodes();
        if (this.treeNode._links) {
            console.log(">> Resolve node relations");
            this.treeNode.getRelation(Tree, 'tree').subscribe(
                (tree: Tree) => this.treeNode.tree = tree,
                error => this.treeNode.tree = new Tree());
            var this_ = this;
            this.resolveCartography(this.treeNode, function() {
                this_.isGroup = isNullOrUndefined(this_.treeNode.cartography);
            });
        }

    }

    resolveCartography(node: TreeNode, callback) {
        callback = isNullOrUndefined(callback)?function(){}:callback;
        node.getRelation(Cartography, 'cartography').finally(callback).subscribe(
            (cartography: Cartography) => node.cartography = cartography,
            //error => this.treeNode.cartography = new Cartography());
            error => node.cartography = null);
    }

    save() {
        this.treeNodeService.save(this.treeNode).subscribe(result => {
            this.dialogRef.close();
        }, error => console.error(error));
    }


    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }

    getAllCartographies() {
        this.cartographyService.getAll()
            .subscribe((cartographies: Cartography[]) => {
                this.cartographies = cartographies;

            });
    }

    getAllParentNodes() {
        this.treeNodeService.getAll()
            .subscribe((treeNodes: TreeNode[]) => {
                if (treeNodes && treeNodes.length) {
                    var treeNode;
                    //Get the parent nodes only
                    var this_ = this;
                    for (var i = 0, iLen = treeNodes.length; i < iLen; i++) {
                        treeNode = treeNodes[i];
                        this.resolveCartography(treeNode, function() {
                            console.log("Parent node found: " + treeNode.name);
                            this_.parentNodes.push(treeNode);
                        });
                    }
                }
            });
    }

    isGroupChanged($event){ 
        console.log($event);

        if ($event.checked) {
            //Is group reset information
            this.treeNode.active = false;
            this.treeNode.cartography = null;
        }

        //$event.source.toggle();
        //MatCheckboxChange {checked,MatCheckbox}
    }

}