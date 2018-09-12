import { Resource } from 'angular-hal';  
import { ServiceParameter } from './service-parameter.model';
import { ServiceParameterService } from './service-parameter.service';
import { ServiceService } from './service.service';
import { Service } from './service.model';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'sitmun-service-parameter-list',
  templateUrl: './service-parameter-list.component.html',
  styleUrls: ['./service-parameter-list.component.css']
})
export class ServiceParameterListComponent implements OnInit {

  items: ServiceParameter[];
  _service: Service;

  displayedColumns = ['name','value','actions'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private serviceParameterService: ServiceParameterService,    
    
    public dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.items = new Array<ServiceParameter>();
    
  }

  @Input()
  set service(service: Service) {    
    this._service = service;
    this.loadServiceParameters();
  }


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

  remove(item: ServiceParameter) {
    this.serviceParameterService.delete(item).subscribe(result => {
      this.loadServiceParameters();
    }, error => console.error(error));
     
  }
  
  

}
@Component({
  selector: 'sitmun-service-parameter-dialog',
  templateUrl: './service-parameter-edit.dialog.html',
  styleUrls: ['./service-parameter-edit.dialog.css']
})
export class ServiceParameterEditDialog implements OnInit {

  
  constructor(
    private serviceService: ServiceService,
    private serviceParameterService: ServiceParameterService,
    public dialogRef: MatDialogRef<ServiceParameterEditDialog>,
    @Inject(MAT_DIALOG_DATA) public serviceParameter: ServiceParameter ) {
  }


  ngOnInit() {
     
    
      if (this.serviceParameter._links) {
        this.serviceParameter.getRelation(Service, 'service').subscribe(
                    (service: Service) => this.serviceParameter.service = service,
                    error => this.serviceParameter.service = new Service());

       
     }
    
  }
  
  save() {
      this.serviceParameterService.save(this.serviceParameter).subscribe(result => {      
      this.dialogRef.close();
      }, error => console.error(error));
  }

  
  compareResource(c1: Resource, c2: Resource): boolean {
    if (c2 && c1)
      return c2._links && c1._links ? c1._links.self.href === c2._links.self.href : c1 === c2;
    else 
      return false;
  }

}