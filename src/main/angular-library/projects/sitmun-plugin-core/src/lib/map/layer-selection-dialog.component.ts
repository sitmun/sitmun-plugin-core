import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export class LayerSelectionDialogData {
  selected: number;
  title: string;
  mapLayerTitle: string;
  aerialLayerTitle: string;
  hybridLayerTitle: string;
}

const messages = {
  cancel: "CANCEL",
  confirm: "OK"
}

@Component({
    selector: 'layer-selection-dialog',
    templateUrl: './layer-selection-dialog.component.html',
    styleUrls: ['./layer-selection-dialog.component.css']
})

export class LayerSelectionDialogComponent implements OnInit {

    form: FormGroup;
    title:string;
    mapLayerTitle: string;
    aerialLayerTitle: string;
    hybridLayerTitle: string;
    cancel: string = messages["cancel"];
    confirm: string = messages["confirm"];

    selected: number = 0;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LayerSelectionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data:LayerSelectionDialogData) {

        this.title = data.title;
        this.mapLayerTitle = data.mapLayerTitle;
        this.aerialLayerTitle = data.aerialLayerTitle;
        this.hybridLayerTitle = data.hybridLayerTitle;

        this.selected = data.selected;


        this.form = fb.group({
            mapOption: [data.selected == 0],
            aerialOption: [data.selected == 1],
            hybridOption: [data.selected == 2]
        });
    }

    ngOnInit() {
    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }

    change(option:number) {
        //Check it again
        var elementId;
        switch(option) {
            case 1:
                this.form.get("aerialOption").setValue(true);
                this.form.get("mapOption").setValue(false);
                this.form.get("hybridOption").setValue(false);
                break;
            case 2:
                this.form.get("hybridOption").setValue(true);
                this.form.get("mapOption").setValue(false);
                this.form.get("aerialOption").setValue(false);
                break;
            default:
                this.form.get("mapOption").setValue(true);
                this.form.get("aerialOption").setValue(false);
                this.form.get("hybridOption").setValue(false);
                break;
        }
        this.selected = option;
    }
}