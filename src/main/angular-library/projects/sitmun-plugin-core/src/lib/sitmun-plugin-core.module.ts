import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule,MatCardModule,MatInputModule,MatListModule, MatToolbarModule, MatNativeDateModule,MatCheckboxModule,MatDialogModule,MatTabsModule,MatTableModule,MatDatepickerModule,MatSelectModule,MatPaginatorModule,MatSortModule,MatIconModule} from '@angular/material';
import { AngularHalModule } from 'angular-hal'; 
import {TerritoryService} from './territory/territory.service';
import {TerritoryTypeService} from './territory/territory-type.service';
import {UserPositionService} from './user/user-position.service';    
import {UserConfigurationService} from './user/user-configuration.service';
import {RoleService} from './role/role.service';
import {UserService} from './user/user.service';
import {TerritoryListComponent} from './territory/territory-list.component';
import {TerritoryEditComponent} from './territory/territory-edit.component';
import {TerritoryTypeListComponent} from './territory/territory-type-list.component';
import {TerritoryTypeEditComponent} from './territory/territory-type-edit.component';
import {RoleListComponent} from './role/role-list.component';
import {RoleEditComponent} from './role/role-edit.component';
import {UserListComponent} from './user/user-list.component';
import {UserEditComponent} from './user/user-edit.component';
import {UserPositionListComponent,UserPositionEditDialog} from './user/user-position-list.component';
import {UserConfigurationListComponent,UserConfigurationEditDialog} from './user/user-configuration-list.component';



@NgModule({
  imports: [
  RouterModule,
        HttpClientModule,
        CommonModule,
        FormsModule,        
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTabsModule,
        MatTableModule,
        MatSelectModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        NoopAnimationsModule,
        MatDialogModule,        
        AngularHalModule 
  ],
  declarations: [
  		TerritoryListComponent,
        TerritoryEditComponent,
        TerritoryTypeListComponent,
        TerritoryTypeEditComponent,
        RoleListComponent,
        RoleEditComponent,
        UserListComponent,
        UserEditComponent,        
        UserPositionListComponent,
        UserConfigurationListComponent,
        UserPositionEditDialog,
        UserConfigurationEditDialog],
  providers:[
        TerritoryService,
        TerritoryTypeService,
        RoleService,
        UserService,        
        UserPositionService,
        UserConfigurationService
  ],
  entryComponents: [
        UserPositionEditDialog,
        UserConfigurationEditDialog
    ],
  exports: [
  HttpClientModule,
        CommonModule,
        FormsModule,        
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTabsModule,
        MatTableModule,
        MatSelectModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        NoopAnimationsModule,
        MatDialogModule,        
        AngularHalModule,
  		TerritoryListComponent,
        TerritoryEditComponent,
        TerritoryTypeListComponent,
        TerritoryTypeEditComponent,
        RoleListComponent,
        RoleEditComponent,
        UserListComponent,
        UserEditComponent,        
        UserPositionListComponent,
        UserConfigurationListComponent]
})
export class SitmunPluginCoreModule { }
