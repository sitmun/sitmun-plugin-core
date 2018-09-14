import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule,MatCardModule,MatInputModule,MatListModule, MatToolbarModule, MatNativeDateModule,MatCheckboxModule,MatDialogModule,MatTabsModule,MatTableModule,MatDatepickerModule,MatSelectModule,MatPaginatorModule,MatSortModule,MatIconModule} from '@angular/material';
import {  MatPaginatorIntl} from '@angular/material';

//import * as ol from 'openlayers';
import {TranslateModule, TranslateLoader,TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AngularHalModule } from 'angular-hal';

import {TerritoryService} from './territory/territory.service';
import {TerritoryTypeService} from './territory/territory-type.service';
import {UserPositionService} from './user/user-position.service';    
import {UserConfigurationService} from './user/user-configuration.service';
import {RoleService} from './role/role.service';
import {UserService} from './user/user.service';
import {ConnectionService} from './connection/connection.service';
import {TaskService} from './task/task.service';
import {TaskTypeService} from './task/task-type.service';
import {TaskGroupService} from './task/task-group.service';
import {TaskParameterService} from './task/task-parameter.service';
import {TaskAvailabilityService} from './task/task-availability.service';
import {ServiceService} from './service/service.service';
import {ServiceParameterService} from './service/service-parameter.service';
import {CartographyService} from './cartography/cartography.service';
import {CartographyAvailabilityService} from './cartography/cartography-availability.service';
import {CartographyGroupService} from './cartography/cartography-group.service';
import {BackgroundService} from './cartography/background.service';
import {TreeService} from './tree/tree.service';
import {TreeNodeService} from './tree/tree-node.service';
import {ApplicationService} from './application/application.service';
import {ApplicationParameterService} from './application/application-parameter.service';
import {ApplicationBackgroundService} from './application/application-background.service';

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

import { MapComponent } from './map/map.component';
import { MapConfigurationManagerService } from './map/map-configuration-manager.service';
import { LayerSelectionDialogComponent } from './map/layer-selection-dialog.component';

import { MatPaginationIntlService } from './mat-pagination-intl.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { AuthService } from './auth/auth.service';
import { Principal } from './auth/principal.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthExpiredInterceptor } from './auth/auth-expired.interceptor';
import { LoginComponent } from './auth/login.component';
import {HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import {HasAnyAuthorityOnTerritoryDirective } from './auth/has-any-authority-on-territory.directive';
import { LoginService } from './auth/login.service';
import { AccountService } from './account/account.service';
import { AccountEditComponent } from './account/account-edit.component';
import { AccountChangePasswordComponent } from './account/account-change-password.component';
import { UserChangePasswordComponent } from './user/user-change-password.component';
import { ConnectionListComponent } from './connection/connection-list.component';
import { ConnectionEditComponent } from './connection/connection-edit.component';
import { TaskTypeListComponent } from './task/task-type-list.component';
import { TaskGroupListComponent } from './task/task-group-list.component';
import { TaskListComponent } from './task/task-list.component';
import { TaskTypeEditComponent } from './task/task-type-edit.component';
import { TaskGroupEditComponent } from './task/task-group-edit.component';
import { TaskEditComponent } from './task/task-edit.component';
import { TaskAvailabilityListComponent,TaskAvailabilityEditDialog } from './task/task-availability-list.component';
import { TaskParameterListComponent,TaskParameterEditDialog } from './task/task-parameter-list.component';
import { ServiceEditComponent } from './service/service-edit.component';
import { ServiceListComponent } from './service/service-list.component';
import { ServiceParameterListComponent,ServiceParameterEditDialog } from './service/service-parameter-list.component';
import { CartographyEditComponent } from './cartography/cartography-edit.component';
import { CartographyGroupEditComponent } from './cartography/cartography-group-edit.component';
import { CartographyGroupListComponent } from './cartography/cartography-group-list.component';
import { CartographyListComponent } from './cartography/cartography-list.component';
import { CartographyAvailabilityListComponent,CartographyAvailabilityEditDialog } from './cartography/cartography-availability-list.component';
import { BackgroundEditComponent } from './cartography/background-edit.component';
import { BackgroundListComponent } from './cartography/background-list.component';
import { TreeListComponent } from './tree/tree-list.component';
import { TreeEditComponent } from './tree/tree-edit.component';
import { TreeNodeListComponent,TreeNodeEditDialog  } from './tree/tree-node-list.component';
import { ApplicationEditComponent } from './application/application-edit.component';
import { ApplicationListComponent } from './application/application-list.component';
import { ApplicationParameterListComponent,ApplicationParameterEditDialog } from './application/application-parameter-list.component';
import { ApplicationBackgroundListComponent,ApplicationBackgroundEditDialog } from './application/application-background-list.component';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export function createMatPaginationService(translate: TranslateService){
                const service = new MatPaginationIntlService();
                service.injectTranslateService(translate);
            return service;
}

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
        AngularHalModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }) 
  
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
        UserConfigurationEditDialog,
        LayerSelectionDialogComponent,
        MapComponent,
        LoginComponent,
        HasAnyAuthorityDirective,
        HasAnyAuthorityOnTerritoryDirective,
        AccountEditComponent,
        AccountChangePasswordComponent,
        UserChangePasswordComponent,
        ConnectionListComponent,
        ConnectionEditComponent,
        TaskTypeListComponent,
        TaskGroupListComponent,
        TaskListComponent,
        TaskTypeEditComponent,
        TaskGroupEditComponent,
        TaskEditComponent,
        TaskAvailabilityListComponent,
        TaskAvailabilityEditDialog, 
        TaskParameterEditDialog,
        ServiceParameterEditDialog,
        TaskParameterListComponent,
        ServiceEditComponent,
        ServiceListComponent,
        ServiceParameterListComponent,
        CartographyEditComponent,
        CartographyGroupEditComponent,
        CartographyGroupListComponent,
        CartographyListComponent,
        CartographyAvailabilityListComponent,
        CartographyAvailabilityEditDialog,
        BackgroundEditComponent,
        BackgroundListComponent,
        TreeListComponent,
        TreeEditComponent,
        TreeNodeListComponent,
        TreeNodeEditDialog,
        ApplicationEditComponent,
        ApplicationListComponent,
        ApplicationParameterListComponent,
        ApplicationParameterEditDialog,
        ApplicationBackgroundEditDialog,
        ApplicationBackgroundListComponent],
  providers:[
        TerritoryService,
        TerritoryTypeService,
        RoleService,
        AccountService,
        AuthService,        
        UserService,  
        ConnectionService,
        TaskService,
        TaskTypeService,
        TaskGroupService,
        TaskParameterService,
        TaskAvailabilityService,
        ServiceService,
        ServiceParameterService,
        CartographyService,
        CartographyGroupService,
        CartographyAvailabilityService, 
        BackgroundService,
        TreeService,
        TreeNodeService,
        ApplicationService,
        ApplicationParameterService,
        ApplicationBackgroundService,
        AuthInterceptor,      
        AuthExpiredInterceptor,
        Principal,
        UserPositionService,
        UserConfigurationService,
        LoginService,
        MapConfigurationManagerService,
        {
          provide: MatPaginatorIntl,
          useFactory: (createMatPaginationService),
          deps: [TranslateService]
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
        , {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        }
  
  ],
  entryComponents: [
        UserPositionEditDialog,
        UserConfigurationEditDialog,
        LayerSelectionDialogComponent,
        TaskAvailabilityEditDialog,
        TaskParameterEditDialog,
        ServiceParameterEditDialog,
        CartographyAvailabilityEditDialog,
        TreeNodeEditDialog,
        ApplicationParameterEditDialog,
        ApplicationBackgroundEditDialog
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
        TranslateModule,
      
  		TerritoryListComponent,
        TerritoryEditComponent,
        TerritoryTypeListComponent,
        TerritoryTypeEditComponent,
        RoleListComponent,
        RoleEditComponent,
        LoginComponent,
        HasAnyAuthorityDirective,
        HasAnyAuthorityOnTerritoryDirective,
        UserListComponent,
        UserEditComponent,
        UserChangePasswordComponent,           
        UserPositionListComponent,
        UserConfigurationListComponent,
        AccountEditComponent,
        AccountChangePasswordComponent,
        MapComponent,        
        ReactiveFormsModule,
        MatFormFieldModule]
})
export class SitmunPluginCoreModule { }
