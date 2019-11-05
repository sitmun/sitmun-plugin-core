import { Resource } from 'angular-hal';
import { ResourceHelper } from 'angular-hal';
import { TerritoryType } from './territory-type.model';
import { TerritoryTypeService } from './territory-type.service';
import { Territory } from './territory.model';
import {TerritoryService} from './territory.service';
import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription, Observable, forkJoin, merge, concat, pipe, from} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

/**
 * Territory edit component
 */
@Component({
    selector: 'app-territory-edit',
    templateUrl: './territory-edit.component.html',
    styleUrls: ['./territory-edit.component.css']
})
export class TerritoryEditComponent implements OnInit, OnDestroy {

    /** territory to edit*/
    territory: Territory = new Territory();
    
    /** territories to select*/
    territories: Territory[];

    /** territory types*/
    territoryTypes: TerritoryType[] = new Array<TerritoryType>();
    
    /** subscription*/
    sub: Subscription;

    /** child territories table displayed columns*/
    displayedColumns = ['select', 'name', 'scope', 'blocked'];
    
    /** territory scope values*/
    territoryScopes = ['Municipal', 'Supramunicipal'];
    
    /** selection model for child territories table*/
    selection = new SelectionModel<Territory>(true, []);

    /** MatTableDataSource for child territories */
    dataSource = new MatTableDataSource<Territory>([]);

    /** constructor*/
    constructor(private route: ActivatedRoute,
        private router: Router,
        private territoryService: TerritoryService,
        private changeDetectorRefs: ChangeDetectorRef,
        private territoryTypeService: TerritoryTypeService) {
    }
    
    /** On component init load all required data dependencies*/
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = params['id'];
            this.territory.type = new TerritoryType();
            this.getAllTerritoryTypes();



            if (id) {
                this.territoryService.get(id).subscribe((territory: any) => {
                    if (territory) {
                        this.territory = territory;
                        this.territory.createdDate = new Date();
                        this.territory.createdDate.setTime(Date.parse(territory.createdDate));
                        this.territory.getRelation(TerritoryType, 'type').subscribe(
                            (tpe: TerritoryType) => this.territory.type = tpe,
                            error => this.territory.type = new TerritoryType());
                        //
                        this.territoryService.getAll()
                            .subscribe((territories: Territory[]) => {
                                this.territories = territories;
                                this.dataSource = new MatTableDataSource<Territory>(this.territories);
                                this.territory.getRelationArray(Territory, 'members').subscribe(
                                    (members: Territory[]) => {

                                        this.territory.members = members;
                                        this.dataSource.data.forEach(row => {
                                            for (let member of this.territory.members) {
                                                if (row._links.self.href == member._links.self.href)
                                                    this.selection.select(row);
                                            }
                                        });
                                        this.changeDetectorRefs.detectChanges();

                                    },
                                    error => this.territory.members = new Array<Territory>());

                            });


                    } else {
                        console.log(`territory with id '${id}' not found, returning to list`);
                        this.gotoList();
                    }
                });
            } else {
                this.getAllTerritories();
            }
        });
    }
    
    /** On component destroy remove subscription */
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
    /** load all territories*/
    getAllTerritories() {
        this.territoryService.getAll()
            .subscribe((territories: Territory[]) => {
                this.territories = territories;
                this.dataSource = new MatTableDataSource<Territory>(this.territories);
            });
    }
    
    /** load all territory types*/
    getAllTerritoryTypes() {
        this.territoryTypeService.getAll()
            .subscribe((territoryTypes: TerritoryType[]) => {
                this.territoryTypes = territoryTypes;
            });
    }

    /** navigate to territory list page*/
    gotoList() {
        this.router.navigate(['/territory-list']);
    }
    
    /** save territory*/
    save() {
        if (this.territory.createdDate != null && (typeof this.territory.createdDate != 'string')) {
            this.territory.createdDate = this.territory.createdDate.toISOString();
        }
        const isNew = this.territory._links == null;

        if (isNew) {
            if (this.selection.selected != null) {
                this.territory.members = this.selection.selected;
            }

            this.territory.members = this.territory.members.map(function(member) {
                return member._links.self.href;
            });

            this.territoryService.create(this.territory).subscribe(result => {
                this.gotoList();

            }

                , error => console.error(error));

        } else {
            let membersUpdate = null;
            let territoryMembers = this.territory.members;
            if (territoryMembers)
                membersUpdate = concat(forkJoin(territoryMembers.map(member => this.territory.deleteRelation('members', member))));
            if (this.selection.selected) {
                if (membersUpdate != null)
                    membersUpdate = concat(membersUpdate, forkJoin(this.selection.selected.map(member => this.territory.addRelation('members', member))));
                else
                    membersUpdate = concat(forkJoin(this.selection.selected.map(member => this.territory.addRelation('members', member))));
            }


            membersUpdate.subscribe(result => {

            }
                , error => console.error(error));

            delete this.territory.members;
            let update = concat(
                this.territoryService.update(this.territory)
            );

            update = concat(update,
                this.territory.deleteAllRelation('type')
            );

            if (this.territory.type._links != null && this.territory.type._links.self.href != '') {
                update = concat(update, this.territory.addRelation('type', this.territory.type));
            }

            update.subscribe(result => {
                this.gotoList();
            }
                , error => console.error(error));

        }

    }
    
    /** remove territory*/
    remove(territory: Territory) {
        this.territoryService.delete(territory).subscribe(result => {
            this.gotoList();
        }, error => console.error(error));

    }
    
    /** compare two resources*/
    compareResource(c1: Resource, c2: Resource): boolean {
        return c1 && c2 ? c1._links.self.href === c2._links.self.href : c1 === c2;
    }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }
}