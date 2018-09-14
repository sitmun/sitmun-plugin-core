import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal'; 
import { Connection } from '../connection/connection.model';
import { ConnectionService } from '../connection/connection.service';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';
import { Tree } from '../tree/tree.model';
import { TreeService } from '../tree/tree.service';
import { CartographyGroup } from '../cartography/cartography-group.model';
import { CartographyGroupService } from '../cartography/cartography-group.service';
import { ApplicationParameter } from './application-parameter.model';
import { ApplicationParameterService } from './application-parameter.service';
import { ApplicationBackground} from './application-background.model';
import { ApplicationBackgroundService } from './application-background.service';
import { Application } from './application.model';
import {ApplicationService} from './application.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'sitmun-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit, OnDestroy {
  application: Application = new Application();
  cartographyGroups: CartographyGroup[] = new Array<CartographyGroup>();
  connections: Connection[] = new Array<Connection>();
  roles: Role[] = new Array<Role>();
  trees: Tree[] = new Array<Tree>();

  
  sub: Subscription;
  
  displayedColumns = ['select', 'name'];

  roleSelection = new SelectionModel<Role>(true, []);
    
  roleDataSource = new MatTableDataSource<Role>([]);  
  
    treeSelection = new SelectionModel<Tree>(true, []);
  
  treeDataSource = new MatTableDataSource<Tree>([]);
  
    
    


  constructor(private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private treeService: TreeService,
    private applicationService: ApplicationService,
    private cartographyGroupService: CartographyGroupService,
    private applicationParameterService: ApplicationParameterService,
    private applicationBackgroundService: ApplicationBackgroundService) {
      this.getAllRoles();
      this.getAllTrees();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      //this.application.type._links.self.href = null;
      //this.application.members = new Array<Application>();
      this.getAllCartographyGroups();
      
    

      if (id) {
        this.applicationService.get(id).subscribe((application: any) => {
          if (application) {
            this.application = application;
            this.application.createdDate = new Date();
            this.application.createdDate.setTime(Date.parse(application.createdDate));
            
            //ResourceHelper.resolveRelations(this.application);
            //alert('llego');
            
            this.application.getRelation(CartographyGroup, 'situationMap').subscribe(
                    (situationMap: CartographyGroup) => this.application.situationMap = situationMap,
                    error => this.application.situationMap = new CartographyGroup());
            
            
            this.application.getRelationArray(Role, 'availableRoles').subscribe(
                    (roles: Role[]) => {
                      
                    this.application.availableRoles = roles;
                    this.roleDataSource.data.forEach(row => {
                        for (let member of this.application.availableRoles){
                          if (row._links.self.href == member._links.self.href)
                             this.roleSelection.select(row)
                        }
                      });

                 },
                    error => this.application.availableRoles= new Array<Role>());
            
            this.application.getRelationArray(Tree, 'trees').subscribe(
                    (trees: Tree[]) => {
                      
                    this.application.trees = trees;
                    this.treeDataSource.data.forEach(row => {
                        for (let member of this.application.trees){
                          if (row._links.self.href == member._links.self.href)
                             this.treeSelection.select(row)
                        }
                      });

                 },
                    error => this.application.availableRoles= new Array<Role>());            
          } else {
            console.log(`application with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  
  
  
  getAllCartographyGroups() {
    this.cartographyGroupService.getAll()
    .subscribe((cartographyGroups: CartographyGroup[]) => {
        this.cartographyGroups = cartographyGroups;
    });
  }

  
  
    
  getAllRoles() {
    this.roleService.getAll()
    .subscribe((roles: Role[]) => {
        this.roles = roles;
        this.roleDataSource = new MatTableDataSource<Role>(this.roles);
        
                
    });
  }
  getAllTrees() {
    this.treeService.getAll()
    .subscribe((trees: Tree[]) => {
        this.trees = trees;
        this.treeDataSource = new MatTableDataSource<Tree>(this.trees);
        
                
    });
  }    
    
  gotoList() {
    this.router.navigate(['/application-list']);
  }

  save() {
    if (this.application.createdDate != null && (typeof this.application.createdDate != 'string')) {
      this.application.createdDate = this.application.createdDate.toISOString();
    }
    const isNew  = this.application._links == null;
    
    if (isNew) {
       //const applicationType = this.application.type;
       //const cartographyGroup = this.application.group;
       //const applicationConnection = this.application.connection;
       //this.application.type = null;
       //this.application.group = null;
       //this.application.connnection = null;
       this.applicationService.save(this.application).subscribe(result => {
           
          if (this.roleSelection.selected!=null){
            for (var i=0; i< this.roleSelection.selected.length; i++){
                this.application.addRelation('availableRoles',this.roleSelection.selected[i]).subscribe(result => {      
                    }, error => console.error(error));
            }
          }
          if (this.treeSelection.selected!=null){
            for (var i=0; i< this.treeSelection.selected.length; i++){
                this.application.addRelation('trees',this.treeSelection.selected[i]).subscribe(result => {      
                    }, error => console.error(error));
            }
          } 
          this.gotoList(); 
         
       }     
      
       , error => console.error(error)); 
      
    }
    
    
    if (!isNew) {
           //borro todas las relaciones que hubiera y añado las seleccionadas
    if (this.application.availableRoles!=null){
      for (var i=0; i< this.application.availableRoles.length; i++){
        this.application.deleteRelation('availableRoles',this.application.availableRoles[i]).subscribe(result => {
            if (this.roleSelection.selected!=null){
                for (var i=0; i< this.roleSelection.selected.length; i++){
                    this.application.addRelation('availableRoles',this.roleSelection.selected[i]).subscribe(result => {      
                        }, error => console.error(error));
                }
            }       
                }, error => console.error(error));
        }
    }
    if (this.application.trees!=null){
      for (var i=0; i< this.application.trees.length; i++){
        this.application.deleteRelation('trees',this.application.trees[i]).subscribe(result => {
            if (this.treeSelection.selected!=null){
                for (var i=0; i< this.treeSelection.selected.length; i++){
                    this.application.addRelation('tree',this.treeSelection.selected[i]).subscribe(result => {      
                        }, error => console.error(error));
                }
            }       
                }, error => console.error(error));
        }
    }

    if (this.roleSelection.selected!=null){
      for (var i=0; i< this.roleSelection.selected.length; i++){
           this.application.addRelation('availableRoles',this.roleSelection.selected[i]).subscribe(result => {      
            }, error => console.error(error));
        }
     }
    if (this.treeSelection.selected!=null){
      for (var i=0; i< this.treeSelection.selected.length; i++){
           this.application.addRelation('trees',this.treeSelection.selected[i]).subscribe(result => {      
            }, error => console.error(error));
        }
     }
     
     delete this.application.availableRoles;
     delete this.application.trees;      
     this.applicationService.save(this.application).subscribe(result => {
        this.gotoList(); 
       }     
      
       , error => console.error(error)); 
   
    } 
      
    


  }

  remove(application: Application) {
    this.applicationService.delete(application).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }
  
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
 }
  
  isAllRoleSelected() {
    const numSelected = this.roleSelection.selected.length;
    const numRows = this.roleDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggleRole() {
    this.isAllRoleSelected() ?
        this.roleSelection.clear() :
        this.roleDataSource.data.forEach(row => this.roleSelection.select(row));
  }
  isAllTreeSelected() {
    const numSelected = this.treeSelection.selected.length;
    const numRows = this.treeDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggleTree() {
    this.isAllTreeSelected() ?
        this.treeSelection.clear() :
        this.treeDataSource.data.forEach(row => this.treeSelection.select(row));
  }
}