import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ExternalConfigurationService } from './ExternalConfigurationService';
import { AngularHalModule } from 'angular-hal';
import { HomeComponent } from './home/home.component';
import { SitmunPluginCoreModule, AuthInterceptor,AuthExpiredInterceptor, TerritoryListComponent, TerritoryEditComponent, TerritoryTypeListComponent, TerritoryTypeEditComponent, RoleListComponent, RoleEditComponent, UserListComponent, UserEditComponent, UserChangePasswordComponent,LoginComponent,LoginService,AccountEditComponent,AccountChangePasswordComponent} from 'sitmun-plugin-core';
import { registerLocaleData } from '@angular/common';
import localeCa from '@angular/common/locales/ca';
import localeEs from '@angular/common/locales/es';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

registerLocaleData(localeCa, 'ca');
registerLocaleData(localeEs, 'es');


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
    ,
    {
        path: 'login',
        component: LoginComponent
    }
    ,
    {
        path: 'account',
        component: AccountEditComponent
    }
    ,{
        path: 'change-password',
        component: AccountChangePasswordComponent
    }
    ,

    {
        path: 'territory-add',
        component: TerritoryEditComponent
    },
    {
        path: 'territory-list',
        component: TerritoryListComponent
    },
    {
        path: 'territory-edit/:id',
        component: TerritoryEditComponent
    },
    {
        path: 'territory-type-list',
        component: TerritoryTypeListComponent
    },
    {
        path: 'territory-type-add',
        component: TerritoryTypeEditComponent
    },
    {
        path: 'territory-type-edit/:id',
        component: TerritoryTypeEditComponent
    }
    ,
    {
        path: 'role-list',
        component: RoleListComponent
    },
    {
        path: 'role-add',
        component: RoleEditComponent
    },
    {
        path: 'role-edit/:id',
        component: RoleEditComponent
    },
    {
        path: 'user-list',
        component: UserListComponent
    },
    {
        path: 'user-add',
        component: UserEditComponent
    },
    {
        path: 'user-edit/:id',
        component: UserEditComponent
    },
    {
        path: 'user-change-password/:id',
        component: UserChangePasswordComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent/*,
    
    TerritoryListComponent,
    
    TerritoryEditComponent,
    TerritoryTypeListComponent,
    TerritoryTypeEditComponent,
    RoleListComponent,
    RoleEditComponent,
    RoleListComponent,
    RoleEditComponent,
    UserListComponent,
    UserEditComponent,
    UserPositionListComponent,
    UserPositionEditDialog,
    UserPositionEditComponent,
    UserConfigurationEditComponent,
    UserConfigurationEditDialog,
    UserConfigurationListComponent
    */
    ],
    imports: [
        BrowserModule,
        SitmunPluginCoreModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),

        /*,
    
        MatToolbarModule,  
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        
        MatCardModule,
        MatInputModule,
        MatListModule,
        
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTabsModule,
        MatTableModule,
        FormsModule,
        MatSelectModule,
        MatPaginatorModule,
        MatSortModule,
        
        NoopAnimationsModule,
        MatDialogModule,
        */
        AngularHalModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    entryComponents: [
        /*
          UserPositionEditDialog,
          UserConfigurationEditDialog
          */
    ],
    providers: [
        { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
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
        

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
