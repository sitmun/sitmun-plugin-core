import {Sort} from './sort';
import {ResourceArray} from './resource-array';
import {Resource} from './resource';
import {Observable} from 'rxjs/internal/Observable';

/** Interface for array of REST resources */
export interface ArrayInterface<T extends Resource> {

    /** total number of elements in this array */
    totalElements: number;
    /** total number of pages in the response */
    totalPages: number;
    /** page number in the response */
    pageNumber: number;
    /** page size */
    pageSize: number;
    /** sorting info */
    sortInfo: Sort[];
    /** self url */
    self_uri: string;
    /** next resource url */
    next_uri: string;
    /** previous resource url */
    prev_uri: string;
    /** first resource url */
    first_uri: string;
    /** last resource url */
    last_uri: string;

    /** push a new resource to the array */
    push(el: T);

    /** length of the array */
    length(): number;

    /** Load next page */
    next(type: { new(): T }): Observable<ResourceArray<T>>;

    /** Load previous page */
    prev(type: { new(): T }): Observable<ResourceArray<T>>;

    /** Load first page */
    first(type: { new(): T }): Observable<ResourceArray<T>>;

    /** Load last page */
    last(type: { new(): T }): Observable<ResourceArray<T>>;

    /** Load page with given pageNumber*/
    page(type: { new(): T }, id: number): Observable<ResourceArray<T>>;

    /** Sort collection based on given sort attribute */
    sortElements(type: { new(): T }, ...sort: Sort[]): Observable<ResourceArray<T>>;

    /** Load page with given size */
    size(type: { new(): T }, size: number): Observable<ResourceArray<T>>;
}