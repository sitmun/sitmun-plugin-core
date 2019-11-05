import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

/** Layer selection dialog data*/ 
export class LayerSelectionDialogData {
  /**selected*/ selected: number;
  /**title*/ title: string;
  /**iem list*/itemList: string[];
}
/** messages*/
const messages = {
  cancel: "CANCEL",
  confirm: "OK"
}

/** Layer selection dialog component*/
@Component({
    selector: 'layer-selection-dialog',
    templateUrl: './layer-selection-dialog.component.html',
    styleUrls: ['./layer-selection-dialog.component.css']
})
export class LayerSelectionDialogComponent implements OnInit {
    /** form */
    form: FormGroup;
    
    /** title */
    title:string;
    
    /** layer list */    
    itemList: string[];
    
    /** cancel message*/
    cancel: string = messages["cancel"];
    
    /** confirm message*/
    confirm: string = messages["confirm"];

    /** selected layer index*/    
    selected: number = 0;

    /** constructor */
    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LayerSelectionDialogComponent>,
        /**layer selection data*/@Inject(MAT_DIALOG_DATA) data:LayerSelectionDialogData) {

        this.title = data.title;
        this.itemList = data.itemList;

        this.selected = data.selected;

        var groups = {};
        for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
            groups[this.itemList[i]] = [data.selected == i];
        }

        this.form = fb.group(groups);
    }
    
    /** component init handler*/
    ngOnInit() {
    }
    
    /** save action */
    save() {
        this.dialogRef.close(this.form.value);
    }
    
    /** close action */
    close() {
        this.dialogRef.close();
    }

    /** change layer selected to given index */
    change(option:number) {
        //Check it again
        for (var i = 0, iLen = this.itemList.length; i < iLen; i++) {
            this.form.get(this.itemList[i]).setValue(i == option);
        }
        this.selected = option;
    }
}