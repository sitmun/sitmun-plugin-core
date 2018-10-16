import { Resource } from 'angular-hal';
import { TreeNode } from './tree-node.model';
import { TreeNodeService } from './tree-node.service';
import { TreeService } from './tree.service';
import { Tree } from './tree.model';
import { CartographyService } from '../cartography/cartography.service';
import { Cartography } from '../cartography/cartography.model';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'sitmun-tree-node-list',
    templateUrl: './tree-node-list.component.html',
    styleUrls: ['./tree-node-list.component.css']
})
export class TreeNodeListComponent implements OnInit {

    items: TreeNode[];
    _tree: Tree;

    displayedColumns = ['name', 'ordee', 'actions'];
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


}
@Component({
    selector: 'sitmun-tree-node-dialog',
    templateUrl: './tree-node-edit.dialog.html',
    styleUrls: ['./tree-node-edit.dialog.css']
})
export class TreeNodeEditDialog implements OnInit {

    cartographies: Cartography[] = new Array<Cartography>();
    constructor(
        private treeService: TreeService,
        private treeNodeService: TreeNodeService,
        private cartographyService: CartographyService,
        public dialogRef: MatDialogRef<TreeNodeEditDialog>,
        @Inject(MAT_DIALOG_DATA) public treeNode: TreeNode) {
    }


    ngOnInit() {
        this.getAllCartographies();
        if (this.treeNode._links) {
            this.treeNode.getRelation(Tree, 'tree').subscribe(
                (tree: Tree) => this.treeNode.tree = tree,
                error => this.treeNode.tree = new Tree());

            this.treeNode.getRelation(Cartography, 'cartography').subscribe(
                (cartography: Cartography) => this.treeNode.cartography = cartography,
                error => this.treeNode.cartography = new Cartography());

        }

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

}