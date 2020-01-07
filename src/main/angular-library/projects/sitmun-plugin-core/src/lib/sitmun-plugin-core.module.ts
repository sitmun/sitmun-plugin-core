import { NgModule, ModuleWithProviders } from '@angular/core';

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

import {TerritoryListComponent} from './territory/territory-list.component';
import {TerritoryEditComponent} from './territory/territory-edit.component';
import {TerritoryTypeListComponent} from './territory/territory-type-list.component';
import {TerritoryTypeEditComponent} from './territory/territory-type-edit.component';
import {RoleListComponent} from './role/role-list.component';
import {RoleEditComponent} from './role/role-edit.component';
import {UserListComponent} from './user/user-list.component';
import {UserEditComponent} from './user/user-edit.component';
import {UserPositionListComponent, UserPositionEditDialog} from './user/user-position-list.component';
import {UserConfigurationListComponent,UserConfigurationEditDialog} from './user/user-configuration-list.component';

import { MapComponent } from './map/map.component';
import { LayerSelectionDialogComponent } from './map/layer-selection-dialog.component';
import { FeatureInfoDialogComponent, MessageDialogComponent } from './map/feature-info-dialog.component';

import { MatPaginationIntlService } from './mat-pagination-intl.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { LoginComponent } from './auth/login.component';
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
import { TaskUIEditComponent } from './task/task-ui-edit.component';
import { TaskUIListComponent } from './task/task-ui-list.component';
import {SitmunFrontendCoreModule} from 'sitmun-frontend-core';
import {Principal} from 'sitmun-frontend-core';

/** load i18n assets*/
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** create Material Design pagination service*/
export function createMatPaginationService(translate: TranslateService){
                const service = new MatPaginationIntlService();
                service.injectTranslateService(translate);
            return service;
}

/** SITMUN plugin core module */
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
        }),
        SitmunFrontendCoreModule
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
        FeatureInfoDialogComponent,
        MessageDialogComponent,
        MapComponent,
        LoginComponent,
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
        ApplicationBackgroundListComponent,
        TaskUIEditComponent,
        TaskUIListComponent],
  entryComponents: [
        UserPositionEditDialog,
        UserConfigurationEditDialog,
        LayerSelectionDialogComponent,
        FeatureInfoDialogComponent,
        MessageDialogComponent,
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
        UserListComponent,
        UserEditComponent,
        UserChangePasswordComponent,
        UserPositionListComponent,
        UserConfigurationListComponent,
        AccountEditComponent,
        AccountChangePasswordComponent,
        MapComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        SitmunFrontendCoreModule]
})
export class SitmunPluginCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SitmunPluginCoreModule,
      providers: [Principal]
    };
  }
}
