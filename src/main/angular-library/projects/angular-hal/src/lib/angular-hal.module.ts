import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HalParam, RestService} from './rest.service';
import {ExternalService} from './external.service';
import {ResourceService} from './resource.service';
import {ExternalConfigurationHandlerInterface} from './external-configuration.handler';

import 'rxjs';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {SubTypeBuilder} from './subtype-builder';

export {ExternalService} from './external.service';
export {RestService} from './rest.service';
export {Resource} from './resource';
export {ResourceArray} from './resource-array';
export {Sort} from './sort';
export {ResourceHelper} from './resource-helper';
export {ExternalConfiguration} from './ExternalConfiguration';
export {ExternalConfigurationHandlerInterface} from './external-configuration.handler';
export {HalOptions, HalParam} from './rest.service';
export {SubTypeBuilder} from './subtype-builder';


/** Angular HAL module */
@NgModule({
    imports: [HttpClientModule],
    declarations: [],
    exports: [HttpClientModule],
    providers: [
        ExternalService,
        HttpClient,
        {
            provide: ResourceService,
            useClass: ResourceService,
            deps: [ExternalService]
        }]
})
export class AngularHalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularHalModule,
            providers: [
                ExternalService,
                HttpClient,
                {
                    provide: ResourceService,
                    useClass: ResourceService,
                    deps: [ExternalService]
                }
            ]
        };
    }
}