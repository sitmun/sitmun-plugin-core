import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { RouterModule } from '@angular/router';
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
import {TaskUIService} from './task/task-ui.service';
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
import { MapConfigurationManagerService } from './map/map-configuration-manager.service';
import { AuthService } from './auth/auth.service';
import { Principal } from './auth/principal.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthExpiredInterceptor } from './auth/auth-expired.interceptor';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { HasAnyAuthorityOnTerritoryDirective } from './auth/has-any-authority-on-territory.directive';
import { LoginService } from './auth/login.service';
import { AccountService } from './account/account.service';
import { UserPosition} from './user/user-position.model';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

/** load i18n assets*/
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


/** SITMUN frontend core module */
@NgModule({
  imports: [
    /*RouterModule,
    HttpClientModule,
    CommonModule,
    AngularHalModule,*/
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    HasAnyAuthorityDirective,
    HasAnyAuthorityOnTerritoryDirective
  ],
  exports: [
    HasAnyAuthorityDirective,
    HasAnyAuthorityOnTerritoryDirective,
    TranslateModule
  ]
})
export class SitmunFrontendCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SitmunFrontendCoreModule,
      providers: [
        TerritoryService,
        TerritoryTypeService,
        RoleService,
        AccountService,
        AuthService,
        UserService,
        ConnectionService,
        TaskService,
        TaskTypeService,
        TaskUIService,
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
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
        , {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthExpiredInterceptor,
          multi: true
        }
      ]
    };
  }
}

