import { Resource } from 'angular-hal';  
import { ApplicationParameter } from './application-parameter.model';
import { ApplicationParameterService } from './application-parameter.service';
import { ApplicationService } from './application.service';
import { Application } from './application.model';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'sitmun-application-parameter-list',
  templateUrl: './application-parameter-list.component.html',
  styleUrls: ['./application-parameter-list.component.css']
})
export class ApplicationParameterListComponent implements OnInit {

  items: ApplicationParameter[];
  _application: Application;

  displayedColumns = ['name','value','actions'];
  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private applicationParameterService: ApplicationParameterService,    
    
    public dialog: MatDialog) { 
  
  }

  ngOnInit() {
    this.items = new Array<ApplicationParameter>();
    
  }

  @Input()
  set application(application: Application) {    
    this._application = application;
    this.loadApplicationParameters();
  }


  loadApplicationParameters(){
    if (this._application!=null){
     this._application.getRelationArray(ApplicationParameter, 'parameters').subscribe(
                    (items: ApplicationParameter[]) => {
                      
                    this.items = items;
                    
                    this.dataSource  = new MatTableDataSource<ApplicationParameter>(this.items);
                    this.dataSource.paginator = this.paginator;

                 },
                    error => this.items = new Array<ApplicationParameter>());
      
    }
  }

  edit(applicationParameter: ApplicationParameter): void {
    let dialogRef = this.dialog.open(ApplicationParameterEditDialog, {
      width: '250px',
      data: applicationParameter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadApplicationParameters();
       
    });
  }

  add(): void {
    let applicationParameter = new ApplicationParameter();
    applicationParameter.application = this._application;
    let dialogRef = this.dialog.open(ApplicationParameterEditDialog, {
      width: '250px',
      data: applicationParameter
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadApplicationParameters();
    });
  }

  remove(item: ApplicationParameter) {
    this.applicationParameterService.delete(item).subscribe(result => {
      this.loadApplicationParameters();
    }, error => console.error(error));
     
  }
  
  

}
@Component({
  selector: 'sitmun-application-parameter-dialog',
  templateUrl: './application-parameter-edit.dialog.html',
  styleUrls: ['./application-parameter-edit.dialog.css']
})
export class ApplicationParameterEditDialog implements OnInit {

  
  constructor(
    private applicationService: ApplicationService,
    private applicationParameterService: ApplicationParameterService,
    public dialogRef: MatDialogRef<ApplicationParameterEditDialog>,
    @Inject(MAT_DIALOG_DATA) public applicationParameter: ApplicationParameter ) {
  }


  ngOnInit() {
     
    
      if (this.applicationParameter._links) {
        this.applicationParameter.getRelation(Application, 'application').subscribe(
                    (application: Application) => this.applicationParameter.application = application,
                    error => this.applicationParameter.application = new Application());

       
     }
    
  }
  
  save() {
      this.applicationParameterService.save(this.applicationParameter).subscribe(result => {      
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