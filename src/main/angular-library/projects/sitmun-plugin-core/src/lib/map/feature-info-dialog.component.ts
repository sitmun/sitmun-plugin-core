import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";

import { HttpClient } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

import * as ol from 'openlayers';

export class FeatureInfoRequestData {
    title?:string;
    request:string;
    type?:"text/xml";
}

export class FeatureInfoDialogData {
  requests: Array<FeatureInfoRequestData>;
}

@Component({
    selector: 'feature-info-dialog',
    templateUrl: './feature-info-dialog.component.html',
    styleUrls: ['./feature-info-dialog.component.css']
})

export class FeatureInfoDialogComponent implements OnInit {

    itemList: string[];
    itemsLoaded: boolean[];
    itemsContent: string[];
    itemsExpanded: boolean[];
    itemsType: string[];

    selected: number = 0;

    messages = {
        noFeatureInfoData: "No data available",
        featureInfoViewMore: "View more"
    };

    translateLabels() {
      this.messages["noFeatureInfoData"] = this.translate.instant("FEATURE_INFO_NO_DATA");
      this.messages["featureInfoViewMore"] = this.translate.instant("FEATURE_INFO_VIEW_MORE");
    }

    translate: TranslateService;
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

    supportedTypes = [
        "text/plain",
        "text/html",
        "text/xml"
    ];
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

    showObjectInfo(msg) {
        this.openInfoDialog(msg);
    }

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

    generateErrorContent():string {
        return this.messages["noFeatureInfoData"];
    }

    setItemLoaded(index, value) {
        if (index < this.itemsLoaded.length) {
            this.itemsLoaded[index] = value;
        }
    }

    getItemLoaded(index):boolean {
        if (index < this.itemsLoaded.length) {
            return this.itemsLoaded[index];
        }
        return false;
    }

    getItemType(index):string {
        if (index < this.itemsType.length) {
            return this.itemsType[index];
        }
        return "text/plain";
    }

    setItemType(index, type) {
        if (index < this.itemsType.length) {
            this.itemsType[index] = this.getSupportedResponseType(type);
        }
    }

    getItemHTMLLoaded(index):boolean {
        return this.getItemLoaded(index) && 
                (this.getItemType(index) != "text/plain");
    }

    getItemTextLoaded(index):boolean {
        return this.getItemLoaded(index) && 
                (this.getItemType(index) == "text/plain");
    }

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

    getItemContent(index):string {
        if (index < this.itemsContent.length) {
            return this.itemsContent[index];
        }
        return "";
    }

    getItemExpanded(index):boolean {
        if (index < this.itemsLoaded.length) {
            return this.itemsLoaded[index] && this.itemsExpanded[index];
        }
        return false;
    }

    expandContent(index) {
        if (index < this.itemsLoaded.length) {
            this.itemsExpanded[index] = true;
        }
    }

    getItemCollapsed(index):boolean {
        if (index < this.itemsLoaded.length) {
            return this.itemsLoaded[index] && !this.itemsExpanded[index];
        }
        return false;
    }

    collapseContent(index) {
        if (index < this.itemsLoaded.length) {
            this.itemsExpanded[index] = false;
        }
    }

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

    save() {
        this.dialogRef.close();
    }

    close() {
        this.dialogRef.close();
    }

    infoDialog:MatDialogRef<MessageDialogComponent>;
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

export interface InfoDialogData {
    title: "";
    message: "";
  }

@Component({
    selector: 'feature-info-message-dialog',
    templateUrl: 'feature-info-message-dialog.html',
})
export class MessageDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogData) {}
}