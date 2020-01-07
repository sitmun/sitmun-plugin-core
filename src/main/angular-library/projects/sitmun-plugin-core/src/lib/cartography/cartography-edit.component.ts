import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal';
import { Connection } from 'sitmun-frontend-core';
import { ConnectionService } from 'sitmun-frontend-core';
import { Service } from 'sitmun-frontend-core';
import { ServiceService } from 'sitmun-frontend-core';
import { Cartography } from 'sitmun-frontend-core';
import {CartographyService} from 'sitmun-frontend-core';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, Observable, forkJoin, merge, concat, pipe, from} from 'rxjs';

import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

/**
 * Cartography edit component
 */
@Component({
    selector: 'sitmun-cartography-edit',
    templateUrl: './cartography-edit.component.html',
    styleUrls: ['./cartography-edit.component.css']
})
export class CartographyEditComponent implements OnInit, OnDestroy {

    /** cartography to edit*/
    cartography: Cartography = new Cartography();

    /** connections to select*/
    connections: Connection[] = new Array<Connection>();

    /** services to select*/
    services: Service[] = new Array<Service>();

    /** subscription*/
    sub: Subscription;

    /** constructor*/
    constructor(private route: ActivatedRoute,
        private router: Router,
        private connectionService: ConnectionService,
        private serviceService: ServiceService,
        private cartographyService: CartographyService) {
    }

    /** On component init load all required data dependencies*/
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            this.getAllServices();
            this.getAllConnections();


            if (id) {
                this.cartographyService.get(id).subscribe((cartography: any) => {
                    if (cartography) {
                        this.cartography = cartography;
                        this.cartography.createdDate = new Date();
                        this.cartography.createdDate.setTime(Date.parse(cartography.createdDate));

                        this.cartography.getRelation(Service, 'service').subscribe(
                            (service: Service) => this.cartography.service = service,
                            error => this.cartography.service = new Service());
                        this.cartography.getRelation(Service, 'selectionService').subscribe(
                            (service: Service) => this.cartography.selectionService = service,
                            error => this.cartography.selectionService = new Service());
                        this.cartography.getRelation(Connection, 'connection').subscribe(
                            (connection: Connection) => this.cartography.connection = connection,
                            error => this.cartography.connection = new Connection());




                    } else {
                        console.log(`cartography with id '${id}' not found, returning to list`);
                        this.gotoList();
                    }
                });
            }
        });
    }

    /** On component destroy remove subscription */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    /** load all connections*/
    getAllConnections() {
        this.connectionService.getAll()
            .subscribe((connections: Connection[]) => {
                this.connections = connections;

                const voidConnection = new Connection();
                voidConnection.name = "";
                voidConnection._links = {};
                voidConnection._links.self = {};
                voidConnection._links.self.href = "";
                this.connections.push(voidConnection);

            });
    }

    /** load all services*/
    getAllServices() {
        this.serviceService.getAll()
            .subscribe((services: Service[]) => {
                this.services = services;
                const voidService = new Service();
                voidService.name = "";
                voidService._links = {};
                voidService._links.self = {};
                voidService._links.self.href = "";
                this.services.push(voidService);

            });
    }

    /** navigate to cartography list page*/
    gotoList() {
        this.router.navigate(['/cartography-list']);
    }

    /** save cartography*/
    save() {
        if (this.cartography.createdDate != null && (typeof this.cartography.createdDate != 'string')) {
            this.cartography.createdDate = this.cartography.createdDate.toISOString();
        }
        const isNew = this.cartography._links == null;

        if (isNew) {
            this.cartographyService.create(this.cartography).subscribe(result => {

                this.gotoList();
            }

                , error => console.error(error));

        } else {
            let update = concat(
                this.cartographyService.update(this.cartography)


            );

            update = concat(update,
                this.cartography.deleteAllRelation('connection'),
                this.cartography.deleteAllRelation('service'),
                this.cartography.deleteAllRelation('selectionService')


            );

            if (this.cartography.connection._links != null && this.cartography.connection._links.self.href != '') {
                update = concat(update, this.cartography.addRelation('connection', this.cartography.connection));
            }
            if (this.cartography.service._links != null && this.cartography.service._links.self.href != '') {
                update = concat(update, this.cartography.addRelation('service', this.cartography.service));
            }
            if (this.cartography.selectionService._links != null && this.cartography.selectionService._links.self.href != '') {
                update = concat(update, this.cartography.addRelation('selectionService', this.cartography.selectionService));
            }

            update.subscribe(result => {
                this.gotoList();
            }
                , error => console.error(error));
        }

    }

    /** remove cartography*/
    remove(cartography: Cartography) {
        this.cartographyService.delete(cartography).subscribe(result => {
            this.gotoList();
        }, error => console.error(error));

    }

    /** compare two resources*/
    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }



}
