import { Resource } from 'angular-hal';  
import { ServiceParameter } from './service-parameter.model';
import { ServiceParameterService } from './service-parameter.service';
import { ServiceService } from './service.service';
import { Service } from './service.model';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


/** Component for managing service parameters*/
@Component({
  selector: 'sitmun-service-parameter-list',
  templateUrl: './service-parameter-list.component.html',
  styleUrls: ['./service-parameter-list.component.css']
})
export class ServiceParameterListComponent implements OnInit {
  
  /** service parameters to manage */
  items: ServiceParameter[];

  /** service to manage its parameters*/
  _service: Service;
  
  /** Table displayed columns */
  displayedColumns = ['name','value','actions'];
  
  /** MatTableDataSource for table display */
  dataSource = null;
  
  /** Paginator for table display */  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  /** Component constructor */
  constructor(
          /**service parameters service*/private serviceParameterService: ServiceParameterService,        
          /**dialog*/public dialog: MatDialog) { 
  
  }
  
  /** On component init, get all data dependencies */
  ngOnInit() {
    this.items = new Array<ServiceParameter>();
    
  }
  
  /** Set service to manage its parameters*/
  @Input()
  set service(service: Service) {    
    this._service = service;
    this.loadServiceParameters();
  }

  /** load all service parameters*/
  loadServiceParameters(){
    if (this._service!=null){
     this._service.getRelationArray(ServiceParameter, 'parameters').subscribe(
                    (items: ServiceParameter[]) => {
                      
                    this.items = items;
                    
                    this.dataSource  = new MatTableDataSource<ServiceParameter>(this.items);
                    this.dataSource.paginator = this.paginator;

                 },
                    error => this.items = new Array<ServiceParameter>());
      
    }
  }
  
  /** open dialog to edit service parameter data*/
  edit(serviceParameter: ServiceParameter): void {
    let dialogRef = this.dialog.open(ServiceParameterEditDialog, {
      width: '250px',
      data: serviceParameter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadServiceParameters();
       
    });
  }
  
  /** add service parameter*/
  add(): void {
    let serviceParameter = new ServiceParameter();
    serviceParameter.service = this._service;
    let dialogRef = this.dialog.open(ServiceParameterEditDialog, {
      width: '250px',
      data: serviceParameter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadServiceParameters();
    });
  }
  
  /** remove service parameter*/
  remove(item: ServiceParameter) {
    this.serviceParameterService.delete(item).subscribe(result => {
      this.loadServiceParameters();
    }, error => console.error(error));
     
  }

}

/** Component for edit service parameter data*/
@Component({
  selector: 'sitmun-service-parameter-dialog',
  templateUrl: './service-parameter-edit.dialog.html',
  styleUrls: ['./service-parameter-edit.dialog.css']
})
export class ServiceParameterEditDialog implements OnInit {

  /** constructor*/
  constructor(
          /** service service*/private serviceService: ServiceService,
          /** service parameter service*/private serviceParameterService: ServiceParameterService,
          /** dialog reference*/public dialogRef: MatDialogRef<ServiceParameterEditDialog>,
          /** service parameter to edit*/@Inject(MAT_DIALOG_DATA) public serviceParameter: ServiceParameter ) {
  }

  /** On component init load all required data dependencies*/
  ngOnInit() {
     
    
      if (this.serviceParameter._links) {
        this.serviceParameter.getRelation(Service, 'service').subscribe(
                    (service: Service) => this.serviceParameter.service = service,
                    error => this.serviceParameter.service = new Service());

       
     }
    
  }
  
  /** save service parameter*/
  save() {
      this.serviceParameterService.save(this.serviceParameter).subscribe(result => {      
      this.dialogRef.close();
      }, error => console.error(error));
  }

  /** compare two resources*/
  compareResource(c1: Resource, c2: Resource): boolean {
    if (c2 && c1)
      return c2._links && c1._links ? c1._links.self.href === c2._links.self.href : c1 === c2;
    else 
      return false;
  }

}