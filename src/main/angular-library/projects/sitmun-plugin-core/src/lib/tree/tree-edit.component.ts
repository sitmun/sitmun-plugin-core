import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal'; 
import { Tree } from './tree.model';
import {TreeService} from './tree.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'sitmun-tree-edit',
  templateUrl: './tree-edit.component.html',
  styleUrls: ['./tree-edit.component.css']
})
export class TreeEditComponent implements OnInit, OnDestroy {
  tree: Tree= new Tree();
  
  sub: Subscription;
  
  displayedColumns = ['select', 'name'];



  constructor(private route: ActivatedRoute,
    private router: Router,
    private treeService: TreeService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      //this.tree.type._links.self.href = null;
      //this.tree.members = new Array<Service>();
    

      if (id) {
        this.treeService.get(id).subscribe((tree: any) => {
          if (tree) {
            this.tree = tree;
            
            
            
          } else {
            console.log(`tree with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
 
    
 
    
  gotoList() {
    this.router.navigate(['/tree-list']);
  }

  save() {
    const isNew  = this.tree._links == null;
    
    if (isNew) {
       this.treeService.save(this.tree).subscribe(result => {
       this.gotoList(); 
       }     
      
       , error => console.error(error)); 
      
    }
    
    
    if (!isNew) {
       this.treeService.save(this.tree).subscribe(result => {
       this.gotoList(); 
       }     
      
       , error => console.error(error)); 
              
    } 
      
    


  }

  remove(tree: Tree) {
    this.treeService.delete(tree).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }
  
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
 }
  


}