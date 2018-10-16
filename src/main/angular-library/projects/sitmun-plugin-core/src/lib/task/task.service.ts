import { Task } from './task.model';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {RestService, ResourceHelper} from 'angular-hal';

@Injectable()
export class TaskService extends RestService<Task> {

    public API = '/api';
    public CONNECTION_API = this.API + '/tasks';


    constructor(injector: Injector, private http: HttpClient) {
        super(Task, "tasks", injector);
    }

    remove(item: Task) {
        return this.http.delete(item._links.self.href);

    }
    

    save(item: Task): Observable<any> {
        let result: Observable<Object>;
        const taskType = item.type;
        const taskGroup = item.group;
        let taskConnection = item.connection;
        let taskUI = item.ui;
/*
        if (item.type != null)
            item.type = item.type._links.self.href;
        if (item.group != null)
            item.group = item.group._links.self.href;
        if (item.connection != null) {
            if (typeof item.connection._links != 'undefined') {
                item.connection = item.connection._links.self.href;
            } else {
                taskConnection._links = {};
                taskConnection._links.self = {};
                taskConnection._links.self.href = "";
            }
        }
        if (item.ui != null) {
            if (typeof item.ui._links != 'undefined') {
                item.ui = item.ui._links.self.href;
            } else {
                taskUI._links = {};
                taskUI._links.self = {};
                taskUI._links.self.href = "";
            }
        }

        item.roles = item.roles.map(function(role) {
            return role._links.self.href;
        });
*/


        if (item._links != null) {
            /*
            this.http.put(item._links.roles.href, item.roles).subscribe(result => {
                this.http.put(item._links.type.href, item.type).subscribe(result => {
                    this.http.put(item._links.ui.href, item.ui).subscribe(result => {
                        this.http.put(item._links.connection.href, item.connection).subscribe(result => {
                            this.http.put(item._links.group.href, item.connection).subscribe(result => {

                            }, error => console.error(error));
                        }, error => console.error(error));

                    }, error => console.error(error));

                },
                    error => console.error(error));
            }, error => console.error(error));
            */
            result = this.http.put(item._links.self.href, item);
        } else {
            result = this.http.post(this.CONNECTION_API, item);
        }
        return result;
    }

}
