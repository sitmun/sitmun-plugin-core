import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal'; 
import { Connection } from '../connection/connection.model';
import { ConnectionService } from '../connection/connection.service';
import { Service } from '../service/service.model';
import { ServiceService } from '../service/service.service';
import { Cartography } from './cartography.model';
import {CartographyService} from './cartography.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'sitmun-cartography-edit',
  templateUrl: './cartography-edit.component.html',
  styleUrls: ['./cartography-edit.component.css']
})
export class CartographyEditComponent implements OnInit, OnDestroy {
  cartography: Cartography = new Cartography();
  connections: Connection[] = new Array<Connection>();
  services: Service[] = new Array<Service>();

  sub: Subscription;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private connectionService: ConnectionService,
    private serviceService: ServiceService,
    private cartographyService: CartographyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.getAllServices();
      this.getAllConnections();
    

      if (id) {
        this.cartographyService.get(id).subscribe((cartography: any) => {
          if (cartography) {
            this.cartography = cartography;
            this.cartography.createdDate = new Date();
            this.cartography.createdDate.setTime(Date.parse(cartography.createdDate));
            
            //ResourceHelper.resolveRelations(this.cartography);
            //alert('llego');
            
            this.cartography.getRelation(Service, 'service').subscribe(
                    (service: Service) => this.cartography.service = service,
                    error => this.cartography.service = new Service());
            this.cartography.getRelation(Service, 'selectionService').subscribe(
                    (service: Service) => this.cartography.selectionService = service,
                    error => this.cartography.selectionService = new Service());
            this.cartography.getRelation(Connection, 'connection').subscribe(
                    (connection: Connection) => this.cartography.connection = connection,
                    error => this.cartography.connection = new Connection());
            
           
            
            
          } else {
            console.log(`cartography with id '${id}' not found, returning to list`);
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
    
  getAllServices() {
    this.serviceService.getAll()
    .subscribe((services: Service[]) => {
        this.services = services;
        const voidService = new Service();
        voidService.name="";
        voidService._links= {};
        voidService._links.self = {};
        voidService._links.self.href="";
        this.services.push(voidService);
                
    });
  }
    
    
  gotoList() {
    this.router.navigate(['/cartography-list']);
  }

  save() {
    if (this.cartography.createdDate != null && (typeof this.cartography.createdDate != 'string')) {
      this.cartography.createdDate = this.cartography.createdDate.toISOString();
    }
    const isNew  = this.cartography._links == null;
    
    if (isNew) {
       this.cartographyService.save(this.cartography).subscribe(result => {
           
         this.gotoList(); 
       }     
      
       , error => console.error(error)); 
      
    }
    
    
    if (!isNew) {
         this.cartographyService.save(this.cartography).subscribe(result => {
         this.gotoList(); 
       }     
      
       , error => console.error(error)); 
    } 
      
    


  }

  remove(cartography: Cartography) {
    this.cartographyService.delete(cartography).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));

  }
  
  compareResource(c1: Resource, c2: Resource): boolean {
    return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
 }
  


}