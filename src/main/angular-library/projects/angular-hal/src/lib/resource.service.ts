
import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Resource} from './resource';
import {ResourceHelper} from './resource-helper';
import {Injectable} from '@angular/core';
import {HttpParams, HttpResponse} from '@angular/common/http';
import {Sort} from './sort';
import {ResourceArray} from './resource-array';
import {ExternalService} from './external.service';
import {HalOptions} from './rest.service';
import {SubTypeBuilder} from './subtype-builder';
import {Observable} from 'rxjs/internal/Observable';

/** ResourceService */
@Injectable()
export class ResourceService {


    /** constructor */
    constructor(private externalService: ExternalService) {}


    /** get URL */
    private static getURL(): string {
        return ResourceHelper.getURL();
    }

    /** get all resources from a base URI of a given type */
    public getAll<T extends Resource>(type: { new(): T }, resource: string, _embedded: string, options?: HalOptions, subType?: SubTypeBuilder): Observable<ResourceArray<T>> {
        const uri = this.getResourceUrl(resource);
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(_embedded);

        this.setUrls(result);
        result.sortInfo = options ? options.sort : undefined;
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result, subType)),
            catchError(error => observableThrowError(error)),);
    }

    /** get resource from a base URI and a given id */
    public get<T extends Resource>(type: { new(): T }, resource: string, id: any): Observable<T> {
        const uri = this.getResourceUrl(resource).concat('/', id);
        const result: T = new type();

        this.setUrlsResource(result);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers});
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)),
            catchError(error => observableThrowError(error)),);
    }

    /** get resource from its selflink */
    public getBySelfLink<T extends Resource>(type: { new(): T }, resourceLink: string): Observable<T> {
        const result: T = new type();

        this.setUrlsResource(result);
        let observable = ResourceHelper.getHttp().get(ResourceHelper.getProxy(resourceLink), {headers: ResourceHelper.headers});
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)),
            catchError(error => observableThrowError(error)),);
    }

    /** search resources from a given base path, query and options */
    public search<T extends Resource>(type: { new(): T }, query: string, resource: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>> {
        const uri = this.getResourceUrl(resource).concat('/search/', query);
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(_embedded);

        this.setUrls(result);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result)),
            catchError(error => observableThrowError(error)),);
    }

    /** search a single resource from a given base path, query and options */
    public searchSingle<T extends Resource>(type: { new(): T }, query: string, resource: string, options?: HalOptions): Observable<T> {
        const uri = this.getResourceUrl(resource).concat('/search/', query);
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const result: T = new type();

        this.setUrlsResource(result);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => ResourceHelper.instantiateResource(result, response)),
            catchError(error => observableThrowError(error)),);
    }

    /** search resources from a given base path, custom query and options */
    public customQuery<T extends Resource>(type: { new(): T }, query: string, resource: string, _embedded: string, options?: HalOptions): Observable<ResourceArray<T>> {
        const uri = this.getResourceUrl(resource + query);
        const params = ResourceHelper.optionParams(new HttpParams(), options);
        const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(_embedded);

        this.setUrls(result);
        let observable = ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, params: params});
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result)),
            catchError(error => observableThrowError(error)),);
    }

    /** get resource given a relation link */
    public getByRelation<T extends Resource>(type: { new(): T }, resourceLink: string): Observable<T> {
        let result: T = new type();

        this.setUrlsResource(result);
        let observable = ResourceHelper.getHttp().get(resourceLink, {headers: ResourceHelper.headers});
        return observable.pipe(map(data => ResourceHelper.instantiateResource(result, data)),
            catchError(error => observableThrowError(error)),);
    }

    /** get resource array given a relation link */
    public getByRelationArray<T extends Resource>(type: { new(): T }, resourceLink: string, _embedded: string, builder?: SubTypeBuilder): Observable<ResourceArray<T>> {
        const result: ResourceArray<T> = ResourceHelper.createEmptyResult<T>(_embedded);

        this.setUrls(result);
        let observable = ResourceHelper.getHttp().get(resourceLink, {headers: ResourceHelper.headers});
        return observable.pipe(map(response => ResourceHelper.instantiateResourceCollection(type, response, result, builder)),
            catchError(error => observableThrowError(error)),);
    }

    /** count resources given a path */
    public count(resource: string): Observable<number> {
        const uri = this.getResourceUrl(resource).concat('/search/countAll');

        return ResourceHelper.getHttp().get(uri, {headers: ResourceHelper.headers, observe: 'body'}).pipe(
            map((response: Response) => Number(response.body)),
            catchError(error => observableThrowError(error)),);
    }

    /** create resource from self link and entity data*/
    public create<T extends Resource>(selfResource: string, entity: T) {
        const uri = ResourceHelper.getURL() + selfResource;
        const payload = ResourceHelper.resolveRelations(entity);

        this.setUrlsResource(entity);
        let observable = ResourceHelper.getHttp().post(uri, payload, {headers: ResourceHelper.headers, observe: 'response'});
        return observable.pipe(map((response: HttpResponse<string>) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                let body: any = response.body;
                return observableThrowError(body.error);
            }
        }),catchError(error => observableThrowError(error)),);
    }

    /** update resource from a given entity data*/
    public update<T extends Resource>(entity: T) {
        const uri = ResourceHelper.getProxy(entity._links.self.href);
        const payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
        let observable = ResourceHelper.getHttp().put(uri, payload, {headers: ResourceHelper.headers, observe: 'response'});
        return observable.pipe(map((response: HttpResponse<string>) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                let body: any = response.body;
                return observableThrowError(body.error);
            }
        }),catchError(error => observableThrowError(error)),);
    }

    /** patch resource from a given entity data*/
    public patch<T extends Resource>(entity: T) {
        const uri = ResourceHelper.getProxy(entity._links.self.href);
        const payload = ResourceHelper.resolveRelations(entity);
        this.setUrlsResource(entity);
        let observable = ResourceHelper.getHttp().patch(uri, payload, {headers: ResourceHelper.headers, observe: 'response'});
        return observable.pipe(map((response: HttpResponse<string>) => {
            if (response.status >= 200 && response.status <= 207)
                return ResourceHelper.instantiateResource(entity, response.body);
            else if (response.status == 500) {
                let body: any = response.body;
                return observableThrowError(body.error);
            }
        }),catchError(error => observableThrowError(error)),);
    }

    /** delete resource from a given entity data*/
    public delete<T extends Resource>(entity: T): Observable<Object> {
        const uri = ResourceHelper.getProxy(entity._links.self.href);
        return ResourceHelper.getHttp().delete(uri, {headers: ResourceHelper.headers}).pipe(catchError(error => observableThrowError(error)));
    }

    /** whether a resource array has next page of results*/
    public hasNext<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.next_uri != undefined;
    }

    /** whether a resource array has previous page of results*/
    public hasPrev<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.prev_uri != undefined;
    }

    /** whether a resource array has first page of results*/
    public hasFirst<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.first_uri != undefined;
    }

    /** whether a resource array has last page of results*/
    public hasLast<T extends Resource>(resourceArray: ResourceArray<T>): boolean {
        return resourceArray.last_uri != undefined;
    }

    /** get resource array next page of results*/
    public next<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.next(type);
    }

    /** get resource array previous page of results*/
    public prev<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.prev(type);
    }

    /** get resource array first page of results*/
    public first<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.first(type);
    }

    /** get resource array last page of results*/
    public last<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }): Observable<ResourceArray<T>> {
        return resourceArray.last(type);
    }

    /** get resource array page of results given a page number*/
    public page<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }, id: number): Observable<ResourceArray<T>> {
        return resourceArray.page(type, id);
    }

    /** sort resource array with a given sorting params */
    public sortElements<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }, ...sort: Sort[]): Observable<ResourceArray<T>> {
        return resourceArray.sortElements(type, ...sort);
    }

    /** get resource array size*/
    public size<T extends Resource>(resourceArray: ResourceArray<T>, type: { new(): T }, size: number): Observable<ResourceArray<T>> {
        return resourceArray.size(type, size);
    }

    /** get resource URL from a given path*/
    private getResourceUrl(resource?: string): string {
        let url = ResourceService.getURL();
        if (!url.endsWith('/')) {
            url = url.concat('/');
        }
        if (resource) {
            return url.concat(resource);
        }
        return url;
    }

    /** set proxy and root urls of given resource array */
    private setUrls<T extends Resource>(result: ResourceArray<T>) {
        result.proxyUrl = this.externalService.getProxyUri();
        result.rootUrl = this.externalService.getRootUri();
    }

    /** set proxy and root urls of given resource */
    private setUrlsResource<T extends Resource>(result: T) {
        result.proxyUrl = this.externalService.getProxyUri();
        result.rootUrl = this.externalService.getRootUri();
    }
}
