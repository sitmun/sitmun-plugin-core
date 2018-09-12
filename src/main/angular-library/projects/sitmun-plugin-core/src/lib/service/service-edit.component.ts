import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal'; 
import { Connection } from '../connection/connection.model';
import { ConnectionService } from '../connection/connection.service';
import { ServiceParameter } from './service-parameter.model';
import { ServiceParameterService } from './service-parameter.service';
import { Service } from './service.model';
import {ServiceService} from './service.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'sitmun-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit, OnDestroy {
  service: Service = new Service();
  connections: Connection[] = new Array<Connection>();

  
  sub: Subscription;
  
  displayedColumns = ['select', 'name'];



  constructor(private route: ActivatedRoute,
    private router: Router,
    private connectionService: ConnectionService,
    private serviceService: ServiceService,
    private serviceParameterService: ServiceParameterService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      //this.service.type._links.self.href = null;
      //this.service.members = new Array<Service>();
      this.getAllConnections();
    

      if (id) {
        this.serviceService.get(id).subscribe((service: any) => {
          if (service) {
            this.service = service;
            this.service.createdDate = new Date();
            this.service.createdDate.setTime(Date.parse(service.createdDate));
            
            this.service.getRelation(Connection, 'connection').subscribe(
                    (connection: Connection) => this.service.connection = connection,
                    error => this.service.connection = new Connection());
            
            
            
          } else {
            console.log(`service with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  getAllConnections() {
    this.connectionService.getAll()
    .subscribe((connections: Connection[]) => {
        this.connections = connections;
        
        const voidConnection = new Connection();
        voidConnection.name="";
        voidConnection._links= {};
        voidConnection._links.self = {};
        voidConnection._links.self.href="";
        this.connections.push(voidConnection);
                
    });
  }
    
 
    
  gotoList() {
    this.router.navigate(['/service-list']);
  }

  save() {
    if (this.service.createdDate != null && (typeof this.service.createdDate != 'string')) {
      this.service.createdDate = this.service.createdDate.toISOString();
    }
    const isNew  = this.service._links == null;
    
    if (isNew) {
       this.serviceService.save(this.service).subscribe(result => {
       this.gotoList(); 
       }     
      
       , error => console.error(error)); 
      
    }
    
    
    if (!isNew) {
       this.serviceService.save(this.service).subscribe(result => {
       this.gotoList(); 
       }     
      
       , error => console.error(error)); 
              
    } 
      
    


  }

  remove(service: Service) {
    this.serviceService.delete(service).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }
  
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
 }
  


}