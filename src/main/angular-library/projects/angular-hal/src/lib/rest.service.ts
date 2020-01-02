import {of as observableOf, throwError as observableThrowError} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Resource} from './resource';
import {ResourceArray} from './resource-array';
import {Sort} from './sort';
import {ResourceService} from './resource.service';
import {SubTypeBuilder} from './subtype-builder';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/internal/Observable';
import {Injector} from "@angular/core";

/** HAL param data model */
export type HalParam = { key: string, value: string | number | boolean };
/** HAL option data model */
export type HalOptions = { notPaged?: boolean, size?: number, sort?: Sort[], params?: HalParam[] };

/** REST API access interface */
export class RestService<T extends Resource> {
    /** resource type */
    private type: any;
    /** resource path */
    private resource: string;
    /** resource array */
    public resourceArray: ResourceArray<T>;
    /** resource service */
    private resourceService: ResourceService;
    /** _embedded field name */
    private _embedded: string = '_embedded';

    /** constructor */
    constructor(type: { new(): T },
                resource: string,
                private injector: Injector,
                _embedded?: string) {
        this.type = type;
        this.resource = resource;
        this.resourceService = injector.get(ResourceService);
        if (!isNullOrUndefined(_embedded))
            this._embedded = _embedded;
    }

    /** error handler */
    protected handleError(error: any):Observable<never> {
        return RestService.handleError(error);
    }

    /** error handler */
    protected static handleError(error: any):Observable<never> {
        return observableThrowError(error);
    }

    /** get all resources with optional options an subType params */
    public getAll(options?: HalOptions, subType?: SubTypeBuilder): Observable<T[]> {
        return this.resourceService.getAll(this.type, this.resource, this._embedded, options, subType).pipe(
            mergeMap((resourceArray: ResourceArray<T>) => {
                if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                    options.notPaged = false;
                    options.size = resourceArray.totalElements;
                    return this.getAll(options);
                } else {
                    this.resourceArray = resourceArray;
                    return observableOf(resourceArray.result);
                }
            }));
    }

    /** get resource from a given id */
    public get(id: any): Observable<T> {
        return this.resourceService.get(this.type, this.resource, id);
    }

    /** get resource from self link */
    public getBySelfLink(selfLink: string): Observable<T> {
        return this.resourceService.getBySelfLink(this.type, selfLink);
    }

    /** search resources from a given query string and optional options params */
    public search(query: string, options?: HalOptions): Observable<T[]> {
        return this.resourceService.search(this.type, query, this.resource, this._embedded, options).pipe(
            mergeMap((resourceArray: ResourceArray<T>) => {
                if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                    options.notPaged = false;
                    options.size = resourceArray.totalElements;
                    return this.search(query, options);
                } else {
                    this.resourceArray = resourceArray;
                    return observableOf(resourceArray.result);
                }
            }));
    }

    /** search resource from a given query string and optional options params */
    public searchSingle(query: string, options?: HalOptions): Observable<T> {
        return this.resourceService.searchSingle(this.type, query, this.resource, options);
    }

    /** search resources from a given custom query string and optional options params */
    public customQuery(query: string, options?: HalOptions): Observable<T[]> {
        return this.resourceService.customQuery(this.type, query, this.resource, this._embedded, options).pipe(
            mergeMap((resourceArray: ResourceArray<T>) => {
                if (options && options.notPaged && !isNullOrUndefined(resourceArray.first_uri)) {
                    options.notPaged = false;
                    options.size = resourceArray.totalElements;
                    return this.customQuery(query, options);
                } else {
                    this.resourceArray = resourceArray;
                    return observableOf(resourceArray.result);
                }
            }));
    }


    /** get resource array given a relation link */
    public getByRelationArray(relation: string, builder?: SubTypeBuilder): Observable<T[]> {
        return this.resourceService.getByRelationArray(this.type, relation, this._embedded, builder).pipe(
            map((resourceArray: ResourceArray<T>) => {
                this.resourceArray = resourceArray;
                return resourceArray.result;
            }));
    }

    /** get resource given a relation link */
    public getByRelation(relation: string): Observable<T> {
        return this.resourceService.getByRelation(this.type, relation);
    }

    /** count resources given a path */
    public count(): Observable<number> {
        return this.resourceService.count(this.resource);
    }

    /** create resource from self link and entity data*/
    public create(entity: T) {
        return this.resourceService.create(this.resource, entity);
    }

    /** update resource from a given entity data*/
    public update(entity: T) {
        return this.resourceService.update(entity);
    }

    /** patch resource from a given entity data*/
    public patch(entity: T) {
        return this.resourceService.patch(entity);
    }

    /** delete resource from a given entity data*/
    public delete(entity: T): Observable<Object> {
        return this.resourceService.delete(entity);
    }

    /** get total number of elements of resource array */
    public totalElement(): number {
        if (this.resourceArray && this.resourceArray.totalElements)
            return this.resourceArray.totalElements;
        return 0;
    }

    /** whether a resource array has first page of results*/
    public hasFirst(): boolean {
        if (this.resourceArray)
            return this.resourceService.hasFirst(this.resourceArray);
        return false;
    }

    /** whether a resource array has next page of results*/
    public hasNext(): boolean {
        if (this.resourceArray)
            return this.resourceService.hasNext(this.resourceArray);
        return false;
    }

    /** whether a resource array has previous page of results*/
    public hasPrev(): boolean {
        if (this.resourceArray)
            return this.resourceService.hasPrev(this.resourceArray);
        return false;
    }

    /** whether a resource array has last page of results*/
    public hasLast(): boolean {
        if (this.resourceArray)
            return this.resourceService.hasLast(this.resourceArray);
        return false;
    }

    /** get resource array next page of results*/
    public next(): Observable<T[]> {
        if (this.resourceArray)
            return this.resourceService.next(this.resourceArray, this.type).pipe(
                map((resourceArray: ResourceArray<T>) => {
                    this.resourceArray = resourceArray;
                    return resourceArray.result;
                }));
        else
            observableThrowError('no resourceArray found');
    }

    /** get resource array previous page of results*/
    public prev(): Observable<T[]> {
        if (this.resourceArray)
            return this.resourceService.prev(this.resourceArray, this.type).pipe(
                map((resourceArray: ResourceArray<T>) => {
                    this.resourceArray = resourceArray;
                    return resourceArray.result;
                }));
        else
            observableThrowError('no resourceArray found');
    }

    /** get resource array first page of results*/
    public first(): Observable<T[]> {
        if (this.resourceArray)
            return this.resourceService.first(this.resourceArray, this.type)
                .pipe(
                    map((resourceArray: ResourceArray<T>) => {
                        this.resourceArray = resourceArray;
                        return resourceArray.result;
                    })
                );
        else
            observableThrowError('no resourceArray found');
    }

    /** get resource array last page of results*/
    public last(): Observable<T[]> {
        if (this.resourceArray)
            return this.resourceService.last(this.resourceArray, this.type)
                .pipe(
                    map((resourceArray: ResourceArray<T>) => {
                        this.resourceArray = resourceArray;
                        return resourceArray.result;
                    })
                );
        else
            observableThrowError('no resourceArray found');
    }

    /** get resource array page of results given a page number*/
    public page(pageNumber: number): Observable<T[]> {
        if (this.resourceArray)
            return this.resourceService.page(this.resourceArray, this.type, pageNumber).pipe(
                map((resourceArray: ResourceArray<T>) => {
                    this.resourceArray = resourceArray;
                    return resourceArray.result;
                }));
        else
            observableThrowError('no resourceArray found');
    }
}
