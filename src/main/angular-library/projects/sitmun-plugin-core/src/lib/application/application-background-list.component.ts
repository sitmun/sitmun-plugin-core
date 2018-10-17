import { Resource } from 'angular-hal';
import { ApplicationBackground } from './application-background.model';
import { ApplicationBackgroundService } from './application-background.service';
import { ApplicationService } from './application.service';
import { Application } from './application.model';
import { Background } from '../cartography/background.model';
import { BackgroundService } from '../cartography/background.service';

import { Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
    selector: 'sitmun-application-background-list',
    templateUrl: './application-background-list.component.html',
    styleUrls: ['./application-background-list.component.css']
})
export class ApplicationBackgroundListComponent implements OnInit {

    items: ApplicationBackground[];
    _application: Application;

    displayedColumns = ['name', 'value', 'actions'];
    dataSource = null;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private applicationBackgroundService: ApplicationBackgroundService,

        public dialog: MatDialog) {

    }

    ngOnInit() {
        this.items = new Array<ApplicationBackground>();

    }

    @Input()
    set application(application: Application) {
        this._application = application;
        this.loadApplicationBackgrounds();
    }


    loadApplicationBackgrounds() {
        if (this._application != null) {
            this._application.getRelationArray(ApplicationBackground, 'backgrounds').subscribe(
                (items: ApplicationBackground[]) => {

                    this.items = items;
                    this.items.forEach((item) => {
                        item.getRelation(Background, 'background').subscribe(
                            (background: Background) => item.background = background,
                            error => item.background = new Background());
                    });

                    this.dataSource = new MatTableDataSource<ApplicationBackground>(this.items);
                    this.dataSource.paginator = this.paginator;

                },
                error => this.items = new Array<ApplicationBackground>());

        }
    }

    edit(applicationBackground: ApplicationBackground): void {
        let dialogRef = this.dialog.open(ApplicationBackgroundEditDialog, {
            width: '250px',
            data: applicationBackground
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.loadApplicationBackgrounds();

        });
    }

    add(): void {
        let applicationBackground = new ApplicationBackground();
        applicationBackground.application = this._application;
        let dialogRef = this.dialog.open(ApplicationBackgroundEditDialog, {
            width: '250px',
            data: applicationBackground
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.loadApplicationBackgrounds();
        });
    }

    remove(item: ApplicationBackground) {
        this.applicationBackgroundService.delete(item).subscribe(result => {
            this.loadApplicationBackgrounds();
        }, error => console.error(error));

    }



}
@Component({
    selector: 'sitmun-application-background-dialog',
    templateUrl: './application-background-edit.dialog.html',
    styleUrls: ['./application-background-edit.dialog.css']
})
export class ApplicationBackgroundEditDialog implements OnInit {

    backgrounds: Background[];

    constructor(
        private applicationService: ApplicationService,
        private backgroundService: BackgroundService,
        private applicationBackgroundService: ApplicationBackgroundService,
        public dialogRef: MatDialogRef<ApplicationBackgroundEditDialog>,
        @Inject(MAT_DIALOG_DATA) public applicationBackground: ApplicationBackground) {
    }


    ngOnInit() {
        this.getAllBackgrounds();


        if (this.applicationBackground._links) {
            this.applicationBackground.getRelation(Application, 'application').subscribe(
                (application: Application) => this.applicationBackground.application = application,
                error => this.applicationBackground.application = new Application());
            this.applicationBackground.getRelation(Background, 'background').subscribe(
                (background: Background) => this.applicationBackground.background = background,
                error => this.applicationBackground.background = new Background());


        }

    }

    save() {
        this.applicationBackgroundService.save(this.applicationBackground).subscribe(result => {
            this.dialogRef.close();
        }, error => console.error(error));
    }


    compareResource(c1: Resource, c2: Resource): boolean {
        if (c2 && c1)
            return c2._links && c1._links ? c1._links.self.href === c2._links.self.href : c1 === c2;
        else
            return false;
    }

    getAllBackgrounds() {
        this.backgroundService.getAll()
            .subscribe((items: Background[]) => {
                this.backgrounds = items;

            });
    }

}