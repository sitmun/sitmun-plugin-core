import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";

import { HttpClient } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

import * as ol from 'openlayers';

/** GetFeatureInfo request data model*/ 
export class FeatureInfoRequestData {
    /** title parameter*/ title?:string;
    /** request parameter*/ request:string;
    /** type parameter*/ type?:"text/xml";
}

/** FeatureInfo request array data model*/
export class FeatureInfoDialogData {
  /**requests*/requests: Array<FeatureInfoRequestData>;
}

/** FeatureInfo dialog component*/
@Component({
    selector: 'feature-info-dialog',
    templateUrl: './feature-info-dialog.component.html',
    styleUrls: ['./feature-info-dialog.component.css']
})
export class FeatureInfoDialogComponent implements OnInit {
    
    /** list of features */
    itemList: string[];
    
    /** load status of features */
    itemsLoaded: boolean[];

    /** content of features */
    itemsContent: string[];

    /** expanded status of features */
    itemsExpanded: boolean[];

    /** types of features */
    itemsType: string[];

    /** selected feature  id*/
    selected: number = 0;

    /** messages */    
    messages = {
        noFeatureInfoData: "No data available",
        featureInfoViewMore: "View more"
    };

    /** translate labels */
    translateLabels() {
      this.messages["noFeatureInfoData"] = this.translate.instant("FEATURE_INFO_NO_DATA");
      this.messages["featureInfoViewMore"] = this.translate.instant("FEATURE_INFO_VIEW_MORE");
    }

    /** translate service */
    translate: TranslateService;
    
    /** constructor*/
    constructor(
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FeatureInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data:FeatureInfoDialogData,
        private http: HttpClient,
        translate: TranslateService) {
        this.translate = translate;
        this.translate.onLangChange.subscribe(() => {
            this.translateLabels();
        });
        this.translateLabels();
    }

    /** response supported mime types */
    supportedTypes = [
        "text/plain",
        "text/html",
        "text/xml"
    ];
    
    /** get response supported mime type by its name */
    getSupportedResponseType(type:string) {
        var supportedType = "text/plain";
        if (type && this.supportedTypes.indexOf(type.toLowerCase())!=-1) {
            supportedType = type;
        }
        return supportedType;

    }
    
    getElementsByTagNameNS(node, uri, name) {
        var elements = [];
        if(node.getElementsByTagNameNS) {
            elements = node.getElementsByTagNameNS(uri, name);
        } else {
            // brute force method
            var allNodes = node.getElementsByTagName("*");
            var potentialNode, fullName;
            for(var i=0, len=allNodes.length; i<len; ++i) {
                potentialNode = allNodes[i];
                fullName = (potentialNode.prefix) ?
                           (potentialNode.prefix + ":" + name) : name;
                if((name == "*") || (fullName == potentialNode.nodeName)) {
                    if((uri == "*") || (uri == potentialNode.namespaceURI)) {
                        elements.push(potentialNode);
                    }
                }
            }
        }
        return elements;
    }
    
    /** parse feature info reponse of given data */        
    parseFeatureInfoResponse(data) {
        var response = [];
        var featureNodes = this.getElementsByTagNameNS(data, '*',
            'FIELDS');

        for(var i=0, len=featureNodes.length;i<len;i++) {
            var featureNode = featureNodes[i];
            var geom = null;

            // attributes can be actual attributes on the FIELDS tag, 
            // or FIELD children
            var attributes = {};
            var j;
            var jlen = featureNode.attributes.length;
            if (jlen > 0) {
                for(j=0; j<jlen; j++) {
                    var attribute = featureNode.attributes[j];
                    attributes[attribute.nodeName] = attribute.nodeValue;
                }
            } else {
                var nodes = featureNode.childNodes;
                for (j=0, jlen=nodes.length; j<jlen; ++j) {
                    var node = nodes[j];
                    if (node.nodeType != 3) {
                        attributes[node.getAttribute("name")] = 
                            node.getAttribute("value");
                    }
                }
            }

            response.push(
                //geom is always null
                new ol.Feature(attributes)
            );
        }
        return response;
    }
    
    /** show info dialog with given message */
    showObjectInfo(msg) {
        this.openInfoDialog(msg);
    }

    /** check event supported info */
    isEventSupported = (function(){
        var TAGNAMES = {
          'select':'input','change':'input',
          'submit':'form','reset':'form',
          'error':'img','load':'img','abort':'img'
        }
        function isEventSupported(eventName) {
          var el = document.createElement(TAGNAMES[eventName] || 'div');
          eventName = 'on' + eventName;
          var isSupported = (eventName in el);
          if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] == 'function';
          }
          el = null;
          return isSupported;
        }
        return isEventSupported;
      })();

     /** generate content for a given response depending on the given type */           
     generateContent(type, response) {
        var result = response;
        if (type == "text/xml") {
            try {
                var formatter = new ol.format.WMSGetFeatureInfo();
                if (formatter) {

                    var doc = new DOMParser().parseFromString(response, 'application/xml');
                    var features;
                    if (doc) {
                        var node = doc.firstChild;
                        if (node && node.localName == "FeatureInfoResponse") {
                            //parse FeatureInfoResponse nodes
                            features = this.parseFeatureInfoResponse(node);
                        } else {
                            features = formatter.readFeatures(doc);
                        }
                    }

                    if (features && features.length) {
                        var div = document.createElement("div");
                        var table = document.createElement("table");
                        table.setAttribute("cellspacing", "0");
                        div.appendChild(table);
                        var body = document.createElement("tablebody");
                        table.appendChild(body);
                        var feature:ol.Feature;
                        var namesRow = document.createElement("tr")
                        namesRow.className = "caption"
                        body.appendChild(namesRow);
                        var row;
                        var td;
                        var properties;
                        var parsedValidFeatures = 0;
                        var featureAttributes = {};

                        //captions 
                        for (var i = 0, iLen = features.length; i < iLen; i++) {
                            feature = features[i];
                            //values row
                            properties = feature.getProperties();
                            if (properties) {
                                for (var j in properties) {
                                    if (!featureAttributes[j]) {
                                        //Create name row
                                        td = document.createElement("td");
                                        td.innerHTML = j;
                                        namesRow.appendChild(td);
                                        featureAttributes[j] = true;
                                    }
                                }
                            }
                        }
                        var this_ = this;
                        var infoNode;
                        //values row
                        for (var i = 0, iLen = features.length; i < iLen; i++) {
                            feature = features[i];
                            properties = feature.getProperties();
                            if (properties) {
                                row = document.createElement("tr");
                                for (var j in featureAttributes) {
                                    td = document.createElement("td");
                                    if (properties[j]) {
                                        //Show object information in an 'alert type' dialog
                                        /*if ((properties[j] instanceof Object) && 
                                            (j.toLowerCase() == "geometry")) {
                                            //infoNode = document.createElement("span");
                                            //infoNode.className = "material-icons";
                                            //infoNode.innerHTML = "info";
                                            //infoNode.title = this.messages["featureInfoViewMore"];
                                            
                                            //if (this.isEventSupported('touchstart')) {
                                            //    infoNode.addEventListener('touchstart', function() {  
                                            //        this_.showObjectInfo(JSON.stringify(properties[j], null, 4));
                                            //      }, false);
                                            //} else {
                                            //    infoNode.addEventListener('click', function() {  
                                            //        this_.showObjectInfo(JSON.stringify(properties[j], null, 4));
                                            //      }, false);
                                            //}
                                            //td.appendChild(infoNode);
                                            //var value = JSON.stringify({type: properties[j].getType(), coordinates: properties[j].getCoordinates()}, null, 4);
                                            td.innerHTML = '<span class="material-icons object-info" title="' + value + 
                                                            '" >info</span>'
                                        } else {*/
                                            td.innerHTML = properties[j];
                                        //}
                                    } else {
                                        td.innerHTML = "";
                                    }
                                    row.appendChild(td);
                                }
                                body.appendChild(row);
                            }
                        }

                        result = div.innerHTML;
                    } else {
                        result = null;
                    }
                } else {
                    result = response;
                }
            } catch (e) {
                console.log(e);
                result = response;
            }           
        }
        return result;
    }

    /** generate error content message*/
    generateErrorContent():string {
        return this.messages["noFeatureInfoData"];
    }

    /** change load status of feature corresponding to given index to given value*/
    setItemLoaded(index, value) {
        if (index < this.itemsLoaded.length) {
            this.itemsLoaded[index] = value;
        }
    }

    /** get load status of feature corresponding to given index*/
    getItemLoaded(index):boolean {
        if (index < this.itemsLoaded.length) {
            return this.itemsLoaded[index];
        }
        return false;
    }

    /** get type of feature corresponding to given index*/
    getItemType(index):string {
        if (index < this.itemsType.length) {
            return this.itemsType[index];
        }
        return "text/plain";
    }
    
    /** set type of feature corresponding to given index to given value*/
    setItemType(index, type) {
        if (index < this.itemsType.length) {
            this.itemsType[index] = this.getSupportedResponseType(type);
        }
    }
    
    /** get html content of feature corresponding to given index*/
    getItemHTMLLoaded(index):boolean {
        return this.getItemLoaded(index) && 
                (this.getItemType(index) != "text/plain");
    }

    /** check whether feature corresponding to given index is loaded and its type is text*/
    getItemTextLoaded(index):boolean {
        return this.getItemLoaded(index) && 
                (this.getItemType(index) == "text/plain");
    }
    
    /** set content of feature corresponding to given index to given value*/
    setItemContent(index, value) {
        if (index < this.itemsContent.length) {
            if (value == null) {
                this.setItemType(index, "text/plain");
                this.itemsContent[index] = this.generateErrorContent();
            } else {
                this.itemsContent[index] = value;
            }
        }
    }

    /** get content of feature corresponding to given index*/
    getItemContent(index):string {
        if (index < this.itemsContent.length) {
            return this.itemsContent[index];
        }
        return "";
    }

    /** check whether feature corresponding to given index is expanded*/
    getItemExpanded(index):boolean {
        if (index < this.itemsLoaded.length) {
            return this.itemsLoaded[index] && this.itemsExpanded[index];
        }
        return false;
    }
    
    /** expand content of feature corresponding to given index*/
    expandContent(index) {
        if (index < this.itemsLoaded.length) {
            this.itemsExpanded[index] = true;
        }
    }
    
    /** check whether feature corresponding to given index is collapsed*/
    getItemCollapsed(index):boolean {
        if (index < this.itemsLoaded.length) {
            return this.itemsLoaded[index] && !this.itemsExpanded[index];
        }
        return false;
    }
    
    /** collapse content of feature corresponding to given index*/
    collapseContent(index) {
        if (index < this.itemsLoaded.length) {
            this.itemsExpanded[index] = false;
        }
    }
    
    /** get data with given index from given request */
    getRequestData(request:string, index:number) {
        var options = {};
        options["responseType"] = "text";
        this.http.get(request, options).subscribe(res => {
            //show content
            this.setItemContent(index, this.generateContent(this.getItemType(index), res));
        },
        error => {
            this.setItemContent(index, null);
        },
        () => {
            //hide loading
            this.setItemLoaded(index, true);
            this.expandContent(index);
        });
    }
    
    /** component init handler*/
    ngOnInit() {
        this.itemList = [];
        this.itemsLoaded = [];
        this.itemsContent = [];
        this.itemsExpanded = [];
        this.itemsType = [];
        var request;
        var elementNode;
        for (var i = 0, iLen = this.data.requests.length; i < iLen; i++) {
            this.itemList.push(this.data.requests[i].title?this.data.requests[i].title:i+"");
            this.itemsLoaded.push(false);
            this.itemsExpanded.push(false);
            this.itemsContent.push("");
            request = this.data.requests[i].request;
            if (request) {
                //Make the request
                this.itemsType.push(this.getSupportedResponseType(this.data.requests[i].type));
                this.getRequestData(request, i);
            }
        }
    }

    /** save action */
    save() {
        this.dialogRef.close();
    }

    /** close action */
    close() {
        this.dialogRef.close();
    }

    infoDialog:MatDialogRef<MessageDialogComponent>;
    
    /** open info dialog */
    openInfoDialog(title, message?) {
        if (title || message) {
            var data = {
                title: message?title:null,
                message: message?message:title
            };
            this.infoDialog = this.dialog.open(MessageDialogComponent,    {
                data: {
                    title: title,
                    message: message
                }
            });
        }
    }
}
/** Info dialog data interface*/ 
export interface InfoDialogData {
    /** title*/title: "";
   /** message*/message: "";
  }

/** Message dialog component */
@Component({
    selector: 'feature-info-message-dialog',
    templateUrl: 'feature-info-message-dialog.html',
})
export class MessageDialogComponent {
    /** constructor*/
    constructor(/** info dialog data*/ @Inject(MAT_DIALOG_DATA) public data: InfoDialogData) {}
}