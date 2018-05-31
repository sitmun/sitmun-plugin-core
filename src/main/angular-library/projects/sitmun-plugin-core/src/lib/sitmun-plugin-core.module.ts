import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HttpClient} from '@angular/common/http';
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
import * as ol from 'openlayers';
import {TranslateModule, TranslateLoader,TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { MapComponent } from './map/map.component';
import { LayerSelectionDialogComponent } from './map/layer-selection-dialog.component';

import {  MatPaginatorIntl} from '@angular/material';
import { MatPaginationIntlService } from './mat-pagination-intl.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';


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
        MapComponent],
  providers:[
        TerritoryService,
        TerritoryTypeService,
        RoleService,
        UserService,        
        UserPositionService,
        UserConfigurationService,
        {
          provide: MatPaginatorIntl,
          useFactory: (createMatPaginationService),
          deps: [TranslateService]
        }
  ],
  entryComponents: [
        UserPositionEditDialog,
        UserConfigurationEditDialog,
        LayerSelectionDialogComponent
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
        UserListComponent,
        UserEditComponent,        
        UserPositionListComponent,
        UserConfigurationListComponent,
        MapComponent, ReactiveFormsModule,
        MatFormFieldModule]
})
export class SitmunPluginCoreModule { }
