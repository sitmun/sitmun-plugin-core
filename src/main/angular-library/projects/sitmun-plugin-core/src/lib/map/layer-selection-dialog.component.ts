import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export class LayerSelectionDialogData {
  selected: number;
  title: string;
  itemList: string[];
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
    itemList: string[];
    cancel: string = messages["cancel"];
    confirm: string = messages["confirm"];

    selected: number = 0;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LayerSelectionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data:LayerSelectionDialogData) {

        this.title = data.title;
        this.itemList = data.itemList;

        this.selected = data.selected;

        var groups = {};
        for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
            groups[this.itemList[i]] = [data.selected == i];
        }

        this.form = fb.group(groups);
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
        for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
            this.form.get(this.itemList[i]).setValue(i == option);
        }
        this.selected = option;
    }
}