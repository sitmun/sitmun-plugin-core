import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';

export const messages = {
  map: "Mapa",
  mapSelectorTooltip: "Select map",
  aerial: "Aerial",
  aerialSelectorTooltip: "Select aerial",
  hybrid: "Hybrid",
  hybridSelectorTooltip: "Select hybrid",
  zoomInTooltip: "Zoom in",
  zoomOutTooltip: "Zoom out",
  geolocationTooltip: "Locate user",
  scaleLineTooltip: "Map scale",
  attributionsTooltip: "Attributions",
  layerSelectionTooltip: "Select base layer",
  overviewTooltip: "Overview map",
  lenghtTooltip: "Length measurement",
  areaTooltip: "Area measurement",
  continueLineMsg: "Click to continue drawing the line",
  continuePolygonMsg: "Click to continue drawing the polygon"
};

//Openlayers imports
import * as ol from 'openlayers';
import * as proj4x from 'proj4';
const proj4 = (proj4x as any).default;

import {LayerSelectionDialogComponent} from './layer-selection-dialog.component';

//Material imports
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

import {LayerSelectionDialogData} from './layer-selection-dialog.component';

import { ElementRef } from '@angular/core'

const locationImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAnCAYAAABnlOo2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAUVrAAFFawEaKylfAAAAB3RJTUUH4gUeDgsQG6NbUAAABbhJREFUWMOtmEuMFEUYx/9V3VXd8zLrsko0wZiYmBjwRpR4UExMwEQJF4KJiUbCBRMvxEQg6kEwcEBM5KBeFA+ACeADX6tLENcnykPQQEAPxA0cdmcHhpmeflR3lYep2S16u+ex0Ellemaqqn/9ff/6vq+KoP+LpO4JAGrcE6OPSjVp3MPoM+eyBoQheowFwNZAAoDEggWA7xMALgCu/7cyoLNesPuPOX2o0cKjhcJmB1jiKLWaRFGRAJCcBw3gyyYh558eGdmNiQkbQKKhBYBYf5e6zbEU6QOGACAFSi1//Xrx4/792wqt1hYkSfeBlOKy6767Kgh2UCmJBAIAoQEns1xJ+rHMEKX2awsX3vVotTpOhFg0gO4gGJvcxvmzo543kQAeAN8AS3SbsRTpBVOm1HpuZOT2ddPTl5AkLuZxKdsWGxh76pTvX5FAA22wwHDjjPtID1dZAMQJxqYgxII+NZd5xbbdXMbYcvi+AFDHrLUibSXVEWo3EVs/FYtvQYiRm4EBADuOy/uUeh3AbQAqAArGapzhoDnj26tp0SK74Psbuz3IAmBzDouxnjFkcRStGuZ8oYYqAnAMIJoXhygAwgE2FscvOUI8kfeAKmOTr7ru3s1BcOB9Kb89XyqdWwrcW5SynNVfKoV7CAnGpLyYEQqSLFGb2pHHOT9jRdHirMkbtl1/XMqdkBIwl7Rlhd8DOypJcmfWOM9xph4Lw3UArgGY0p+eHp/QLoJWVhw/kOfPPY4zqmE8Pek0gCpJksanrvthnuDKUXSH1k9BR3WmDUAAEJoTJKn+IVNjFiH4yPPO6rdqmkAKqL7jeYdt20aXXOXoxtIaojnJjnTLc0QpoFAgGsjXUNf1cr6G4eFA5kRy/UCuYVgq33Vf9iov+gLYqtQjWoiRbgEAnwDhviBYm6js0YkRUgzLkCyXzbGupHQ6M/ICWCnEkw86zlC6FFlZqQzfH0Uv500a2Xack/3b8aoLkOMxdrQSx2sy3ZYkZI+U2/5w3c+O2faRkmU1VoThsvuazQ1KqdxJz1N6Vj/XTK4zkrFzDAACkP8YG1vi+2vypldKYWkQrH4IWI3U7Hn6OanURaNomwNFc58FyOeF+JqQ3hnDLG66pg9CsFvK0zlBMTeXzdL7fjLJ2EHcouuUbZ9FHHdgIiOxzrxTHpDqUP88NLSX3AIYG8DHnP+qYQLdIqNYU1kuUykrxVsnJ3/3Ob94s0BTtl0b9bx/dOwygWLDZfka6gBRgI4XCttvxkoUwB7GviHtOX3dTCDZTUM3AEkg2lKvH/EZ+3e+QDXOa3t9/0/VBmnp1jeQuZdKAEQEoN8Vi1vpPGAsAO8x9oWer6WTccsoYZNuGkqDJQBiBYRv1Ovjdc5PDgo0wfnlg553zoAxS1eRDl+0jxATayvJnZXKpkGsxAFssaxD+sEeZgv8zs4j6RcovQ0WCgi/mp6+dLlYPNQv0HHOz/zt+1c0RNNwl7kNuiF19HrhGbd1AtkzrvumolT13O4SghcJ+VxrJcs6cVaQ76UhE0oA8L1arXGmWNzea4d5wHVHRRh6Ket0gEwxo9+da3pLZOuyswzA/YXzH3gU3Z01qMnY9eVCbNcgVQCTun6+qn8LDEFjEFGnI7cAEFBAHuD8FZqTInZZ1kHS7tvUrmqmdqtztNMv0JxACSCSgP92s3m86jjH0hNe4PzC4SA4p9oQJlBmIMwpcfu2UkdLIQCxolTaSI36hBGCFwj5QOukoevsphEI427WGdRCZhUQAfBVreb9VSrt6nQac5xPWmF4VRf715F9sKAyTtMGOrBK9+2cnrkAyuDc/k2pE0Qp/rCUayFlSQPUtYivGS6L08cvg9TUWVYiRo5rCzyKyuOFwqaYkCHSaoVqtrxoplZUkndqNl8LZYUBrkNBUX86nc2FkdX9lJi7AtkDAnWsZAq8813ojR+MEjXstczT1/9sLctpXytdQgAAAABJRU5ErkJggg==";


const measurementStrokeFinishedColorStyle:string = "rgba(158,17,57,1)";
const measurementStrokeMeasuringColorStyle:string = "rgba(0, 0, 0, 0.5)";
const measurementStrokeImageMeasuringColorStyle:string = "rgba(0, 0, 0, 0.7)";
const measurementBackgroundColorStyle:string = "rgba(255, 255, 255, 0.2)";

export class MapOptions {
  lon: number;
  lat: number;
  projection: string;
  zoom: number;
  extent: ol.Extent;
};

export enum VIEWER_MODE_TYPES {
  MAP, AERIAL, HYBRID
};

export class ViewerMode {
  type:VIEWER_MODE_TYPES;
  layers: Array<string>;
  constructor(type: VIEWER_MODE_TYPES, layers: Array<string>) {
    this.type = type;
    this.layers = layers;
  }
};

export class MapConfiguration {
  initialZoom: number;
  initialLon: number;
  initialLat: number;
  initialProjection: string;
  viewerModes: Array<ViewerMode>;
  initialViewerMode: VIEWER_MODE_TYPES;
  tileHeight: number;
  tileWidth: number;
  mapUnits: string;
  mapProjection: string;
  mapMaxScale: number;
  mapMinScale: number;
  mapMaxExtent: ol.Extent;
  mapResolutions: Array<number>;
};

@Component({
  selector: 'sitmun-map-viewer-map',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  // Default values
  tileHeight: number = 500;
  tileWidth: number = 500;
  units = "m";
  projection = "EPSG:4258";

  viewerModes: Array<ViewerMode>;
  defaultViewerMode: VIEWER_MODE_TYPES = VIEWER_MODE_TYPES.MAP;

  maxScale: Number;
  minScale: Number;

  maxExtent: ol.Extent;

  resolutions: Array<number>;

  @Input() initialLon;
  @Input() initialLat;
  @Input() initialProjection;
  @Input() initialZoom;

  @ViewChild('mapContainer') mapContainer:ElementRef;
  
  _extent: ol.Extent;
  @Input()
  set extent(extent: ol.Extent) {    
    this._extent = extent;
    if ((this.getMap() != null) && (this.getMap() != undefined)) {
      this.setExtent(extent);
    }
  }

  mapOptions: MapOptions;

  constructor(private dialog: MatDialog) {
  }

  map: ol.Map;

  //geolocation: ol.Geolocation;
  //geolocationLayer: ol.layer.Vector;

  setExtent(extent: ol.Extent) {
    if ((extent != null) && (extent != undefined)) {
      this.getMap().getView().fit(extent);
      this.getMap().getView().setZoom(
        this.getMap().getView().getZoomForResolution(
          this.getMap().getView().getResolutionForExtent(extent)));
    }
  }

  getMap(){
    return this.map;
  }

  ngOnInit() {
    // Add custom projection
    proj4.defs(this.projection,"+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

    if ((this.initialLat != null) && (this.initialLat != undefined) ||
        (this.initialLon != null) && (this.initialLon != undefined) ||
        (this.initialProjection != null) && (this.initialProjection != undefined) ||
        (this.initialZoom != null) && (this.initialZoom != undefined)) {
        this.mapOptions = new MapOptions();
        if ((this.initialLat != null) && (this.initialLat != undefined)) {
          try {
            this.mapOptions.lat = parseFloat(this.initialLat);
          } catch (e) {
            this.mapOptions.lat = null;
          }
        }
        if ((this.initialLon != null) && (this.initialLon != undefined)) {
          try {
            this.mapOptions.lon = parseFloat(this.initialLon);
          } catch (e) {
            this.mapOptions.lon = null;
          }
        }
        if ((this.initialProjection != null) && (this.initialProjection != undefined)) {
          this.mapOptions.projection = this.initialProjection;
        }
        if ((this.initialZoom != null) && (this.initialZoom != undefined)) {
          try {
            this.mapOptions.zoom = parseInt(this.initialZoom);
          } catch (e) {
            this.mapOptions.zoom = null;
          }
        }
    }

    var mapConfig = this.getMapConfig();

    var initialZoom: number = 0;
    var initialCenter: ol.Coordinate;

    if (mapConfig) {
      //Initialize map configuration

      if ((mapConfig.initialZoom != null) && (mapConfig.initialZoom != undefined)) {
        initialZoom = mapConfig.initialZoom;
      }

      if (mapConfig.mapProjection) {
        this.projection = mapConfig.mapProjection;
      }

      if ((mapConfig.initialLat != null) && (mapConfig.initialLat != undefined) && 
          (mapConfig.initialLon != null) && (mapConfig.initialLon != undefined)) {
        initialCenter = [mapConfig.initialLon, mapConfig.initialLat];

        if ((mapConfig.initialProjection != null) && (mapConfig.initialProjection != undefined) && 
            (mapConfig.initialProjection != this.projection)) {
            var projectionTo = new ol.proj.Projection({
              code: this.projection
            });
            var projectionFrom = new ol.proj.Projection({
              code: mapConfig.initialProjection
            });
            ol.proj.transform(initialCenter, projectionFrom, projectionTo);
        }
      }

      if (mapConfig.mapMaxExtent) {
        this.maxExtent = mapConfig.mapMaxExtent;
      }

      if (mapConfig.mapResolutions) {
        this.resolutions = mapConfig.mapResolutions;
      }

      if (mapConfig.mapMaxScale) {
        this.maxScale = mapConfig.mapMaxScale;
      }

      if (mapConfig.mapMinScale) {
        this.maxScale = mapConfig.mapMinScale;
      }

      if (mapConfig.initialViewerMode) {
        this.defaultViewerMode = mapConfig.initialViewerMode;
      }

      if (mapConfig.viewerModes) {
        this.viewerModes = mapConfig.viewerModes;
      }

      if (mapConfig.mapUnits) {
        this.units = mapConfig.mapUnits;
      }

      if (mapConfig.tileHeight) {
        this.tileHeight = mapConfig.tileHeight;
      }

      if (mapConfig.tileWidth) {
        this.tileWidth = mapConfig.tileWidth;
      }

    }

    if ((this.mapOptions != undefined) && (this.mapOptions != null)) {
      if ((this.mapOptions.zoom != undefined) && (this.mapOptions.zoom != null)) {
        initialZoom = this.mapOptions.zoom;
      }

      if ((this.mapOptions.lon != undefined) && (this.mapOptions.lat != undefined) && 
          (this.mapOptions.lon != null) && (this.mapOptions.lat != null)) {
        initialCenter = [this.mapOptions.lon, this.mapOptions.lat];

        if ((this.mapOptions.projection != undefined) && (this.mapOptions.projection != undefined) && 
        (this.mapOptions.projection != this.projection)) {
          var projectionTo = new ol.proj.Projection({
              code: this.projection
            });
          var projectionFrom = new ol.proj.Projection({
            code: this.mapOptions.projection
          });
          ol.proj.transform(initialCenter, projectionFrom, projectionTo);
        }
      }
    }
    
    // Retrieve layer and base layer information 

    var layerDataConfig = this.getLayers();

    var layers = [];
    var mapViewLayers: Array<number>;
    var mapViewLayerNames: Array<string>;
    var aerialViewLayers: Array<number>;
    var aerialViewLayerNames: Array<string>;
    var hybridViewLayers: Array<number>;
    var hybridViewLayerNames: Array<string>;

    if ((this.viewerModes != null) && (this.viewerModes != undefined)) {
      for (var j = 0, jLen = this.viewerModes.length; j < jLen; j++) {
        if (this.viewerModes[j].type == VIEWER_MODE_TYPES.MAP) {
          mapViewLayers = new Array<number>();
          mapViewLayerNames = this.viewerModes[j].layers;
        } else if (this.viewerModes[j].type == VIEWER_MODE_TYPES.AERIAL) {
          aerialViewLayers = new Array<number>();
          aerialViewLayerNames = this.viewerModes[j].layers;
        } else if (this.viewerModes[j].type == VIEWER_MODE_TYPES.HYBRID) {
          hybridViewLayers = new Array<number>();
          hybridViewLayerNames = this.viewerModes[j].layers;
        }
      }
    }

    for (var i = 0, iLen = layerDataConfig.length; i < iLen; i++) {
      if (layerDataConfig[i].tiled) {
        layers.push( 
            new ol.layer.Tile({
              extent: layerDataConfig[i].extent?
                        [layerDataConfig[i].extent[0], layerDataConfig[i].extent[1], layerDataConfig[i].extent[2], layerDataConfig[i].extent[3]]:
                          undefined,
              source: new ol.source.TileWMS({
                url: layerDataConfig[i].url,
                params: {
                  "LAYERS":layerDataConfig[i].name,
                  "TRANSPARENT": layerDataConfig[i].url_transparent?layerDataConfig[i].url_transparent.toUpperCase():"FALSE",
                  "BGCOLOR": layerDataConfig[i].url_bgcolor,
                  "VERSION": layerDataConfig[i].version,
                  "FORMAT": layerDataConfig[i].format,
                  "EXCEPTION": layerDataConfig[i].url_exception
                },
                projection: this.projection,
                attributions: layerDataConfig[i].attributions,
                // Countries have transparency, so do not fade tiles:
                transition: 0,
                tileGrid: new ol.tilegrid.TileGrid({
                  extent: layerDataConfig[i].extent?
                          [layerDataConfig[i].extent[0], layerDataConfig[i].extent[1], layerDataConfig[i].extent[2], layerDataConfig[i].extent[3]]:
                            undefined,
                  resolutions: this.resolutions,
                  tileSize: [this.tileWidth, this.tileHeight]
                })
            })
          }));
      } else {
        layers.push(
          new ol.layer.Image({
            extent: layerDataConfig[i].extent?
              [layerDataConfig[i].extent[0], layerDataConfig[i].extent[1], layerDataConfig[i].extent[2], layerDataConfig[i].extent[3]]:
                undefined,
            source: new ol.source.ImageWMS({
              url: layerDataConfig[i].url,
              params: {
                "LAYERS":layerDataConfig[i].name,
                "TRANSPARENT": layerDataConfig[i].url_transparent?layerDataConfig[i].url_transparent.toUpperCase():"FALSE",
                "BGCOLOR": layerDataConfig[i].url_bgcolor,
                "VERSION": layerDataConfig[i].version,
                "FORMAT": layerDataConfig[i].format,
                "EXCEPTION": layerDataConfig[i].url_exception
              },
              projection: this.projection,
              //ratio: 1,
              attributions: layerDataConfig[i].attributions
            }),
            visible:false,
            opacity: layerDataConfig[i].transparency?
                      (100-layerDataConfig[i].transparency)/100:undefined
          })
        );
      }
      layers[layers.length-1].baselayer = layerDataConfig[i].isBaseLayer;

      if ((this.viewerModes != null) && (this.viewerModes != undefined)) {
        if ((mapViewLayerNames != null) && (mapViewLayerNames != undefined) && 
            (mapViewLayerNames.indexOf(layerDataConfig[i].id) != -1)) {
          mapViewLayers.push(i);
        }
        if ((aerialViewLayerNames != null) && (aerialViewLayerNames != undefined) && 
          (aerialViewLayerNames.indexOf(layerDataConfig[i].id) != -1)) {
          aerialViewLayers.push(i);          
        }
        if ((hybridViewLayerNames != null) && (hybridViewLayerNames != undefined) && 
          (hybridViewLayerNames.indexOf(layerDataConfig[i].id) != -1)) {
          hybridViewLayers.push(i);          
        }
      }
    };

    ////////////////////////////////
    // Custom control declaration //
    ////////////////////////////////
    
    //Custom base layer selector control
    class SelectBaseLayerControl extends ol.control.Control{

      mapViewLayers: Array<number>;
      aerialViewLayers: Array<number>;
      hybridViewLayers: Array<number>;
      layers;
      btnMap: HTMLElement;
      btnAerial: HTMLElement;
      btnHybrid: HTMLElement;

      selectedLayer: number;

      dialog: MatDialog;
      selectionDialogRef: MatDialogRef<LayerSelectionDialogComponent>;

      setDialog(dialog: MatDialog) {
        this.dialog = dialog;
      }

      onDataChanged(data) {
        
      }

      showSelectionDialog() {
        if ((this.dialog != null) && (this.dialog != undefined)) {
          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.hasBackdrop = true;

          var data = new LayerSelectionDialogData();

          /*
          data.title = messages["layerSelectionTooltip"];
          data.mapLayerTitle = messages["map"];
          data.aerialLayerTitle = messages["aerial"];
          data.hybridLayerTitle = messages["hybrid"];
          */
          data.selected = this.selectedLayer;

          dialogConfig.data = data;

          var this_ = this;

          this.selectionDialogRef = this.dialog.open(LayerSelectionDialogComponent, dialogConfig);
          this.selectionDialogRef.afterClosed().subscribe(
            data => {
                try {
                  if (data["mapOption"]) {
                    this_.selectMap();
                  } else if (data["aerialOption"]) {
                    this_.selectAerial();
                  } else if ("hybridOption") {
                    this_.selectHybrid();
                  }
                } catch (e) {
                  //
                }
              //this_.selectedLayer = data.selected;
            }
          );
          /*this.selectionDialogRef
            .afterClosed()
            .pipe(filter(name => name))
            .subscribe(name => this.files.push({ name, content: '' }));*/
        }
      }

      constructor(opt_options) {  
        var options = opt_options || {};

        var element = document.createElement("DIV");
        element.className = "ol-change-baselayer ol-unselectable ol-control"

        super({
          element: element,
          target: options.target
        });

        this.selectedLayer = 0;

        var this_ = this;

        if ((options.layers != null) && (options.layers != undefined)) {
          this.layers = options.layers;
        }

        var controlBtn = document.createElement("BUTTON"); 
        if ((options.layerSelectorTooltip != null) && (options.layerSelectorTooltip != null)) {
          controlBtn.title = options.layerSelectorTooltip;
        }
        //controlBtn.setAttribute("i18n", "@@layerSelectorTooltip");
        //controlBtn.setAttribute("i18n-title", "");
        controlBtn.setAttribute("type", "button");
        controlBtn.id="map-layer-selector-btn";
        controlBtn.className = "mat-raised-button";
        var icon = document.createElement('i');
        icon.className="material-icons";
        icon.innerHTML="layers";
        controlBtn.appendChild(icon);
        element.appendChild(controlBtn);
        controlBtn.addEventListener('click', function() {  
              this_.showSelectionDialog();
            }, false);
        controlBtn.addEventListener('touchstart', function() {  
              this_.showSelectionDialog();
            }, false);

        if ((options.mapViewLayers != null) && (options.mapViewLayers != undefined)) {
          this.mapViewLayers = options.mapViewLayers;
          /*this.btnMap = document.createElement("BUTTON");
          if (options.mapSelectorTooltip) {
            this.btnMap.title = options.mapSelectorTooltip;
          }
          //this.btnMap.setAttribute("i18n", "@@mapSelectorTooltip");
          //this.btnMap.setAttribute("i18n-title", "");
          this.btnMap.setAttribute("type", "button");
          this.btnMap.id="map-layer-selector-btn";
          this.btnMap.innerHTML = messages["map"];
          this.btnMap.className = "ol-baselayer-selector mat-raised-button";
          element.appendChild(this.btnMap);
          this.btnMap.addEventListener('click', function() {  
              this_.selectMap();
            }, false);
          this.btnMap.addEventListener('touchstart', function() {  
              this_.selectMap();
            }, false);*/
        }
        if ((options.aerialViewLayers != null) && (options.aerialViewLayers != undefined)) {
          this.aerialViewLayers = options.aerialViewLayers;
          /*this.btnAerial = document.createElement("BUTTON");
          if (options.aerialSelectorTooltip) {
            this.btnAerial.title = options.aerialSelectorTooltip;
          }
          //this.btnAerial.setAttribute("i18n", "@@aerialSelectorTooltip");
          //this.btnAerial.setAttribute("i18n-title", "");
          this.btnAerial.setAttribute("type", "button");
          this.btnAerial.id="aerial-layer-selector-btn";
          this.btnAerial.innerHTML = messages["aerial"];
          this.btnAerial.className = "ol-baselayer-selector mat-raised-button";
          this.btnHybrid = document.createElement("BUTTON");
          element.appendChild(this.btnAerial);
          this.btnAerial.addEventListener('click', function() {  
              this_.selectAerial();
            }, false);
          this.btnAerial.addEventListener('touchstart', function() {  
              this_.selectAerial();
            }, false);*/
        }
        if ((options.hybridViewLayers != null) && (options.hybridViewLayers != undefined)) {
          this.hybridViewLayers = options.hybridViewLayers;
          /*if (options.hybridSelectorTooltip) {
            this.btnHybrid.title = options.hybridSelectorTooltip;
          }
          //this.btnHybrid.setAttribute("i18n", "@@hybridSelectorTooltip");
          //this.btnHybrid.setAttribute("i18n-title", "");
          this.btnHybrid.setAttribute("type", "button");
          this.btnHybrid.id="hybrid-layer-selector-btn";
          this.btnHybrid.innerHTML = messages["hybrid"];
          this.btnHybrid.className = "ol-baselayer-selector mat-raised-button";
          element.appendChild(this.btnHybrid);
          this.btnHybrid.addEventListener('click', function() {  
              this_.selectHybrid();
            }, false);
          this.btnHybrid.addEventListener('touchstart', function() {  
              this_.selectHybrid();
            }, false);*/
        }
      }

      selectMap() {
        /*if (this.btnMap.getAttribute("active") != "true") {
          this.btnMap.className += " ol-baselayer-active";
          this.btnMap.setAttribute("active", "true");
          if ((this.btnAerial != null) && (this.btnAerial != undefined)) {
            this.btnAerial.className = this.btnAerial.className.replace(" ol-baselayer-active", "");
            this.btnAerial.setAttribute("active", "false");
          }
          if ((this.btnHybrid != null) && (this.btnHybrid != undefined)) {
            this.btnHybrid.className = this.btnHybrid.className.replace(" ol-baselayer-active", "");
            this.btnHybrid.setAttribute("active", "false")
          }
          this.selectBaseLayer(VIEWER_MODE_TYPES.MAP);
        }*/
        this.selectBaseLayer(VIEWER_MODE_TYPES.MAP);
      }

      selectAerial() {
        /*if (this.btnAerial.getAttribute("active") != "true") {
          this.btnAerial.className += " ol-baselayer-active";
          this.btnAerial.setAttribute("active", "true");
          if ((this.btnMap != null) && (this.btnMap != undefined)) {
            this.btnMap.className = this.btnMap.className.replace(" ol-baselayer-active", "");
            this.btnMap.setAttribute("active", "false");
          }
          if ((this.btnHybrid != null) && (this.btnHybrid != undefined)) {
            this.btnHybrid.className = this.btnHybrid.className.replace(" ol-baselayer-active", "");
            this.btnHybrid.setAttribute("active", "false");
          }
          this.selectBaseLayer(VIEWER_MODE_TYPES.AERIAL);
        }*/
        this.selectBaseLayer(VIEWER_MODE_TYPES.AERIAL);
      }

      selectHybrid() {
        /*if (this.btnHybrid.getAttribute("active") != "true") {
          this.btnHybrid.className += " ol-baselayer-active";
          this.btnHybrid.setAttribute("active", "true");
          if ((this.btnAerial != null) && (this.btnAerial != undefined)) {
            this.btnAerial.className = this.btnAerial.className.replace(" ol-baselayer-active", "");
            this.btnAerial.setAttribute("active", "false");
          }
          if ((this.btnMap != null) && (this.btnMap != undefined)) {
            this.btnMap.className = this.btnMap.className.replace(" ol-baselayer-active", "");
            this.btnMap.setAttribute("active", "false");
          }
          this.selectBaseLayer(VIEWER_MODE_TYPES.HYBRID);
        }*/
        this.selectBaseLayer(VIEWER_MODE_TYPES.HYBRID);
      }

      selectBaseLayer(value) {
        var visibility;
        var layerList;
        switch(value) {
          case VIEWER_MODE_TYPES.AERIAL:
            layerList = this.aerialViewLayers;
            break;
          case VIEWER_MODE_TYPES.HYBRID:
            layerList = this.hybridViewLayers;
            break;
          default: 
            layerList = this.mapViewLayers;
        }
        if ((layerList == null) || (layerList == undefined) || (this.layers == null) || 
            (this.layers == undefined)) {
          //No information for the requested type return
          //TODO raise error?
          return;
        }
        this.selectedLayer = value;
        for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
          this.layers[i].setVisible(layerList.indexOf(i) != -1);
        }
      }
    }

    //Custom geolocation control
    class GeolocationControl extends ol.control.Control{
      geolocation: ol.Geolocation;

      geolocationLayer: ol.layer.Vector;

      constructor(opt_options) {  
        var options = opt_options || {};

        var icon = document.createElement('i');
        icon.className="material-icons";
        icon.innerHTML="my_location";

        var button = document.createElement('button');
        button.setAttribute("type", "button");
        if (options.geolocationTooltip) {
          button.title = options.geolocationTooltip;
        }
        //button.setAttribute("i18n", "@@geolocationTooltip");
        //button.setAttribute("i18n-title", "");
        button.className="mat-raised-button";
        button.appendChild(icon);

        var element = document.createElement('div');
        element.className = 'geolocation-btn ol-unselectable ol-control';
        element.appendChild(button);

        super({
          element: element,
          target: options.target
        });

        var this_ = this;

        function setGeolocationActive(active) {
          if (active) {
            this_.geolocation.setTracking(true);   
            button.setAttribute("active", "true");
            button.className += " geolocation-active"
            icon.innerHTML = "my_location";
          } else {
            this_.geolocation.setTracking(false);          
            button.setAttribute("active", "false");
            button.className = button.className.replace(" geolocation-active", "");
            icon.innerHTML = "my_location";
          }
    
          if (this_.geolocationLayer != null) {
            this_.geolocationLayer.setVisible(active);
            try {
              this_.geolocationLayer.getSource().getFeatures()[0].setStyle(active?getPositionStyle():null);
            } catch (ex) {
              //
            }
          }
        }

        function getPositionStyle() {
          return new ol.style.Style({
            image: new ol.style.Icon({
              src:locationImg
            })
          });
        }

        var requestLocation = function() {
          if (this_.geolocation == null) {
            // Geolocation feature
            this_.geolocation = new ol.Geolocation({
              projection: this_.getMap().getView().getProjection()
            });
    
            this_.geolocation.on('change', function(evt) {
              //Update information
            });
            this_.geolocation.on('error', function(evt) {
              setGeolocationActive(false);
            });
    
            // GeoLocation accuracy
            /*var accuracyFeature = new ol.Feature();
            this_.geolocation.on('change:accuracyGeometry', function() {
              accuracyFeature.setGeometry(this_.geolocation.getAccuracyGeometry());
            });*/
    
            // User position
            var positionFeature = new ol.Feature();
            positionFeature.setStyle(getPositionStyle());
            this_.geolocation.on('change:position', function(evt) {
              var coordinates = this_.geolocation.getPosition();
              positionFeature.setGeometry(coordinates ?
                new ol.geom.Point(coordinates) : null);
            });
    
            //Add vector layer
            this_.geolocationLayer = new ol.layer.Vector({
              map: this_.getMap(),
              source: new ol.source.Vector({
                features: [/*accuracyFeature, */positionFeature]
              })
            });
          }
          if (button.getAttribute("active") == "true") {
            setGeolocationActive(false);
          } else {
            setGeolocationActive(true);
          }
        };
        button.addEventListener('click', requestLocation, false);
        button.addEventListener('touchstart', requestLocation, false);
      }
    };

    ///////////////////////
    // Map configuration //
    ///////////////////////

    var attributionsLabel = document.createElement("I");
    attributionsLabel.className = "material-icons";
    attributionsLabel.innerHTML = "info";
    var attributionsCollapseLabel = document.createElement("I");
    attributionsCollapseLabel.className = "material-icons";
    attributionsCollapseLabel.innerHTML = "keyboard_arrow_right";

    var attribution = new ol.control.Attribution({
      collapsible: true,
      tipLabel: messages["attributionsTooltip"],
      collapseLabel: attributionsCollapseLabel,
      label:attributionsLabel
    });

    /*
    var zoomInNode = document.createElement('I');
    zoomInNode.className = "material-icons";
    zoomInNode.innerHTML = "zoom_in";

    var zoomOutNode = document.createElement('I');
    zoomOutNode.className = "material-icons";
    zoomOutNode.innerHTML = "zoom_out";
    */

    var zoom = new ol.control.Zoom({
      //zoomInLabel: zoomInNode,
      //zoomOutLabel: zoomOutNode,
      zoomInTipLabel: messages["zoomInTooltip"],
      zoomOutTipLabel: messages["zoomOutTooltip"]
    });

    this.map = new ol.Map({
      target: this.mapContainer.nativeElement,
      layers: layers,
      // Configure default controls
      controls: ol.control.defaults({attribution: false, zoom:false, rotate:false}).extend([attribution, zoom]),
      view: new ol.View({
        projection: new ol.proj.Projection({
          code: this.projection,
          units: this.units
        }),
        resolutions: this.resolutions,
        center: initialCenter,
        zoom: initialZoom,
        extent: this.maxExtent
      })
    });

    //Update attribution button to apply a material style
    var attributionNodeList = document.getElementsByClassName("ol-attribution");
    if ((attributionNodeList != null) && (attributionNodeList != undefined) && (attributionNodeList.length > 0)) {
      var buttonList = attributionNodeList[0].getElementsByTagName("BUTTON");
      if ((buttonList != null) && (buttonList != undefined)) {
        for (var i = 0, iLen = buttonList.length; i < iLen; i++) {
          buttonList[i].className += " mat-raised-button";
        }
      }
    }


    if ((this._extent != null) && (this._extent != undefined)) {
      this.setExtent(this._extent);
    }

    var zoomInBtnList = document.getElementsByClassName("ol-zoom-in");
    if ((zoomInBtnList != null) && (zoomInBtnList.length > 0)) {
      //zoomInBtn.setAttribute("i18n", "@@zoomInTooltip");
      //zoomInBtn.setAttribute("i18n-title", "");
      zoomInBtnList[0].className += " mat-raised-button";
    }
    var zoomOutBtnList = document.getElementsByClassName("ol-zoom-out");
    if ((zoomOutBtnList != null) && (zoomOutBtnList.length > 0)) {
      //zoomOutBtn.setAttribute("i18n", "@@zoomOutTooltip");
      //zoomOutBtn.setAttribute("i18n-title", "");
      zoomOutBtnList[0].className += " mat-raised-button";
    }

    //////////////////////////////////
    // Custom control instantiation //
    //////////////////////////////////

    // Scale line control
    var scaleLineControl = new ol.control.ScaleLine();
    this.map.addControl(scaleLineControl);
    var scaleLineElementContainerList = document.getElementsByClassName("ol-scale-line");
    if (messages["scaleLineTooltip"]) {
      if ((scaleLineElementContainerList != null) && (scaleLineElementContainerList.length > 0)) {
        //Set tool tip
        scaleLineElementContainerList[0].setAttribute("title", messages["scaleLineTooltip"]);
      }
    }

    // Geolocation control
    this.map.addControl(new GeolocationControl({
      geolocationTooltip: messages["geolocationTooltip"]
    }));

    if ((this.defaultViewerMode != null) && (this.defaultViewerMode != undefined) && 
        (this.viewerModes != null) && (this.viewerModes != undefined)) {

      // Base layer selection control
      var selectBaseLayerControl = new SelectBaseLayerControl({
        mapSelectorTooltip: messages["mapSelectorTooltip"],
        aerialSelectorTooltip: messages["aerialSelectorTooltip"],
        hybridSelectorTooltip: messages["hybridSelectorTooltip"],
        layerSelectionTooltip: messages["layerSelectionTooltip"],
        mapViewLayers: mapViewLayers,
        aerialViewLayers: aerialViewLayers,
        hybridViewLayers: hybridViewLayers,
        layers: layers
      });
      selectBaseLayerControl.setDialog(this.dialog);
      this.map.addControl(selectBaseLayerControl);

      // Initialize the map base layer
      switch(this.defaultViewerMode) {
        case VIEWER_MODE_TYPES.AERIAL: selectBaseLayerControl.selectAerial();
                    break;
        case VIEWER_MODE_TYPES.HYBRID: selectBaseLayerControl.selectHybrid();
                    break;
        default: selectBaseLayerControl.selectMap();
                    break;
      }
    }

    //OverView Map Code
    var overViewNode = document.createElement('I');
    overViewNode.className = "material-icons";
    overViewNode.innerHTML = "map";
    var overViewNodeCollapsed = document.createElement('I');
    overViewNodeCollapsed.className = "material-icons";
    overViewNodeCollapsed.innerHTML = "keyboard_arrow_left";

    //Update attribution button to apply a material style
    var overviewNodeList = document.getElementsByClassName("ol-overview");
    if ((overviewNodeList != null) && (overviewNodeList != undefined) && (overviewNodeList.length > 0)) {
      var buttonList = overviewNodeList[0].getElementsByTagName("BUTTON");
      if ((buttonList != null) && (buttonList != undefined)) {
        for (var i = 0, iLen = buttonList.length; i < iLen; i++) {
          buttonList[i].className += " mat-raised-button";
        }
      }
    }

    this.map.addControl(new ol.control.OverviewMap({
      label: overViewNode,
      collapseLabel: overViewNodeCollapsed,
      tipLabel: messages["overviewTooltip"]
    }));

    //Custom measurement control
    class MeasurementControl extends ol.control.Control{

      /**
       * Layer to draw features.
       */
      vector:ol.layer.Vector;

      /**
       * Layer to draw features.
       */
      source:ol.source.Vector;

      /**
       * Currently drawn feature.
       */
      sketch:ol.Feature;
      /**
       * The help tooltip element.
       */
      helpTooltipElement:Element;
      /**
       * Overlay to show the help messages.
       */
      helpTooltip:ol.Overlay;
      /**
       * The measure tooltip element.
       */
      measureTooltipElement:Element;
      /**
       * Overlay to show the measurement.
       */
      measureTooltip:ol.Overlay;

      /**
       * Message to show when the user is drawing a polygon.
       */
      continuePolygonMsg:string;

      /**
       * Message to show when the user is drawing a line.
       */
      continueLineMsg:string;

      /**
       * Interaction to draw measurement
       */
      draw:ol.interaction.Draw;

      /**
       * Feature style colors
       */
      strokeFinishedColorStyle:string;
      strokeMeasuringColorStyle:string;
      strokeImageMeasuringColorStyle:string;
      backgroundColorStyle:string;

      /**
       * Overlay tooltip counter
       */
      overlayCount:number;

      /**
       * Control buttons
       */
      buttonLength:HTMLElement;
      buttonArea:HTMLElement;

      /**
       * Map
       */
      map:ol.Map;

      /**
       * Handle pointer move.
       */
      pointerMoveHandler;
      /**
       * Handle mouse out.
       */
      mouseOutHandler;

      constructor(opt_options) {
        var options = opt_options || {};

        var element = document.createElement("DIV");
        element.className = "ol-measurement ol-unselectable ol-control"

        super({
          element: element,
          target: options.target
        });

        this.overlayCount = 0;

        this.source = new ol.source.Vector();

        if (options.backgroundColorStyle) {
          this.backgroundColorStyle = options.backgroundColorStyle;
        } else {
          this.backgroundColorStyle = "rgba(255, 255, 255, 0.2)";
        }

        if (options.strokeFinishedColorStyle) {
          this.strokeFinishedColorStyle = options.strokeFinishedColorStyle;
        } else {
          this.strokeFinishedColorStyle = "rgba(163,38,56,1)";
        }

        if (options.strokeMeasuringColorStyle) {
          this.strokeMeasuringColorStyle = options.strokeMeasuringColorStyle;
        } else {
          this.strokeMeasuringColorStyle = "rgba(0, 0, 0, 0.5)";
        }

        if (options.strokeImageMeasuringColorStyle) {
          this.strokeImageMeasuringColorStyle = options.strokeImageMeasuringColorStyle;
        } else {
          this.strokeImageMeasuringColorStyle = "rgba(0, 0, 0, 0.7)";
        }

        this.vector = new ol.layer.Vector({
          source: this.source,
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: this.backgroundColorStyle
            }),
            stroke: new ol.style.Stroke({
              color: this.strokeFinishedColorStyle,
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: this.strokeFinishedColorStyle
              })
            })
          }),
          visible:false
        });

        var this_ = this;

        //Create control buttons
        function activate() {
          //get tool status
          let active:boolean = this.getAttribute("tool-active") == "true";

          //get tool type
          let toolType:string = this.getAttribute("tool-type");

          if (!active) {
            this_.onActivate(toolType);
          } else {
            this_.onDeactivate(toolType);
          }
        }

        //Length measurement
        var icon = document.createElement('i');
        icon.className="material-icons";
        icon.innerHTML="straighten";

        var isEventSupported = (function(){
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

        this.buttonLength = document.createElement('button');
        this.buttonLength.setAttribute("type", "button");
        this.buttonLength.setAttribute("tool-type", "length");
        this.buttonLength.setAttribute("tool-active", "false");
        if (options.lenghtTooltip) {
          this.buttonLength.title = options.lenghtTooltip;
        }
        this.buttonLength.className="mat-raised-button measurement-length";
        this.buttonLength.appendChild(icon);
        element.appendChild(this.buttonLength);
        if (isEventSupported('touchstart')) {
          this.buttonLength.addEventListener('touchstart', activate, false);
        } else {
          this.buttonLength.addEventListener('click', activate, false);
        }

        //Area measurement
        icon = document.createElement('i');
        icon.className="material-icons";
        icon.innerHTML="border_outer";

        this.buttonArea = document.createElement('button');
        this.buttonArea.setAttribute("type", "button");
        this.buttonArea.setAttribute("tool-type", "area");
        this.buttonArea.setAttribute("tool-active", "false");
        if (options.areaTooltip) {
          this.buttonArea.title = options.areaTooltip;
        }
        this.buttonArea.className="mat-raised-button measurement-area";
        this.buttonArea.appendChild(icon);
        element.appendChild(this.buttonArea);
        if (isEventSupported('touchstart')) {
          this.buttonArea.addEventListener('touchstart', activate, false);
        } else {
          this.buttonArea.addEventListener('click', activate, false);
        }

        if (options.continuePolygonMsg) {
          this.continuePolygonMsg = options.continuePolygonMsg;
        }

        if (options.continueLineMsg) {
          this.continueLineMsg = options.continueLineMsg;
        }

        if (options.drawHelpTooltip) {
          this.pointerMoveHandler = function (evt) {
            if (evt.dragging) {
              return;
            }

            var helpMsg = 'Click to start drawing';

            if (this_.sketch) {
              var geom = (this_.sketch.getGeometry());
              if (geom instanceof ol.geom.Polygon) {
                if (this_.continuePolygonMsg != null) {
                  helpMsg = this_.continuePolygonMsg;
                }
              } else if (geom instanceof ol.geom.LineString) {
                if (this_.continueLineMsg != null) {
                  helpMsg = this_.continueLineMsg;
                }
              }
            }

            if (this_.helpTooltipElement) {
              this_.helpTooltipElement.innerHTML = helpMsg;
              this_.helpTooltip.setPosition(evt.coordinate);
              this_.helpTooltipElement.classList.remove('hidden');
            }
          };
          
          this.mouseOutHandler = function (evt) {
            if (this_.helpTooltipElement) {
              this_.helpTooltipElement.classList.add('hidden');
            }
          };
        }

      }

      setMap(map: ol.Map) {
        super.setMap(map);
        this.map = this.getMap();
        this.map.addLayer(this.vector);
      }

      clearTooltips() {
        if (this.overlayCount > 0) {
          if (this.map.getOverlays().getLength() > 0) {
            let overlays = this.map.getOverlays();
            let overlay:ol.Overlay;
            for (var i = 0, iLen = this.overlayCount; i < iLen; i++) {
              overlay = this.map.getOverlayById("measurement-tooltip-" + i);
              if (overlay != null) {
                this.map.removeOverlay(overlay);  
              }
            }
          }
        }
        this.overlayCount = 0;
      }

      onActivate(typeSelected:string) {
        //Add event handling
        this.source.clear();
        this.clearTooltips();
        this.vector.setVisible(true);
        if (this.pointerMoveHandler != null) {
          this.map.on('pointermove', this.pointerMoveHandler);
        }
        if (this.mouseOutHandler != null) {
          this.map.getViewport().addEventListener('mouseout', this.mouseOutHandler);
        }
        this.selectMeasurementType(typeSelected);
        if (typeSelected == "area") {
          this.buttonArea.className += " tool-active";
          this.buttonArea.setAttribute("tool-active", "true");
          this.buttonLength.className = 
            this.buttonLength.className.replace(" tool-active", "");
          this.buttonLength.setAttribute("tool-active", "false");
        } else {
          this.buttonLength.className += " tool-active";
          this.buttonLength.setAttribute("tool-active", "true");
          this.buttonArea.className  = 
            this.buttonArea.className.replace(" tool-active", "");
          this.buttonArea.setAttribute("tool-active", "false");
        }
      }

      onDeactivate(typeSelected:string) {
        //Remove event handling
        this.source.clear();
        this.clearTooltips();
        this.vector.setVisible(false);
        if (this.pointerMoveHandler != null) {
          this.map.un('pointermove',  this.pointerMoveHandler);
        }
        if (this.mouseOutHandler) {
          this.map.getViewport().removeEventListener('mouseout', this.mouseOutHandler);
        }
        this.removeDrawInteraction();
        if (typeSelected == "area") {
          this.buttonArea.className = 
            this.buttonArea.className.replace(" tool-active", "");
          this.buttonArea.setAttribute("tool-active", "false");
        } else {
          this.buttonLength.className = 
            this.buttonLength.className.replace(" tool-active", "");
          this.buttonLength.setAttribute("tool-active", "false");
        }
      }

      /**
       * Format length output.
       */
      formatLength(line) {
        var length = ol.Sphere.getLength(line);
        var output;
        if (length > 100) {
          output = (Math.round(length / 1000 * 100) / 100) +
              ' ' + 'km';
        } else {
          output = (Math.round(length * 100) / 100) +
              ' ' + 'm';
        }
        return output;
      };

      /**
       * Format area output.
       */
      formatArea(polygon) {
        var area = ol.Sphere.getArea(polygon);
        var output;
        if (area > 10000) {
          output = (Math.round(area / 1000000 * 100) / 100) +
              ' ' + 'km<sup>2</sup>';
        } else {
          output = (Math.round(area * 100) / 100) +
              ' ' + 'm<sup>2</sup>';
        }
        return output;
      };

      removeDrawInteraction() {
        if (this.draw != null) {
          this.map.removeInteraction(this.draw);
          this.draw = null;
        }
      }

      selectMeasurementType(typeSelected:string) {
        this.removeDrawInteraction();
        this.addInteraction(typeSelected);
      };

      addInteraction(typeSelected:string) {
        let type:ol.geom.GeometryType = (typeSelected == 'area' ? "Polygon" : "LineString");
        this.draw = new ol.interaction.Draw({
          source: this.source,
          type: type,
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: this.backgroundColorStyle
            }),
            stroke: new ol.style.Stroke({
              color: this.strokeMeasuringColorStyle,
              lineDash: [10, 10],
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 5,
              stroke: new ol.style.Stroke({
                color: this.strokeImageMeasuringColorStyle
              }),
              fill: new ol.style.Fill({
                color: this.backgroundColorStyle
              })
            })
          })
        });
        this.map.addInteraction(this.draw);

        this.createMeasureTooltip();
        this.createHelpTooltip();

        var _self = this;

        var listener;
        this.draw.on('drawstart',
          function(evt:any) {
            // set sketch
            _self.sketch = evt.feature;
            let tooltipCoord:ol.Coordinate;
            if (evt.coordinate) {
              tooltipCoord = evt.coordinate;
            }

            listener = _self.sketch.getGeometry().on('change', function(evt) {
              var geom = evt.target;
              var output;
              if (geom instanceof ol.geom.Polygon) {
                output = _self.formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
              } else if (geom instanceof ol.geom.LineString) {
                output = _self.formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
              }
              _self.measureTooltipElement.innerHTML = output;
              _self.measureTooltip.setPosition(tooltipCoord);
            });
          }, this);

        this.draw.on('drawend',
          function() {
            _self.measureTooltipElement.className = 'tooltip tooltip-static';
            _self.measureTooltip.setOffset([0, -7]);
            // unset sketch
            _self.sketch = null;
            // unset tooltip so that a new one can be created
            _self.measureTooltipElement = null;
            _self.createMeasureTooltip();
            ol.Observable.unByKey(listener);
          }, this);
      }


      /**
       * Creates a new help tooltip
       */
      createHelpTooltip() {
        if (this.helpTooltipElement) {
          this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = new ol.Overlay({
          id: "measurement-tooltip-" + (this.overlayCount++),
          element: this.helpTooltipElement,
          offset: [15, 0],
          positioning: 'center-left'
        });
        this.map.addOverlay(this.helpTooltip);
      }


      /**
       * Creates a new measure tooltip
       */
      createMeasureTooltip() {
        if (this.measureTooltipElement) {
          this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = new ol.Overlay({
          id: "measurement-tooltip-" + (this.overlayCount++),
          element: this.measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center'
        });
        this.map.addOverlay(this.measureTooltip);
      }
    }

    //Measurement control
    var measurementControl = new MeasurementControl({
      lenghtTooltip: messages["lenghtTooltip"],
      areaTooltip: messages["areaTooltip"],
      continueLineMsg: messages["continueLineMsg"],
      continuePolygonMsg:  messages["continuePolygonMsg"],
      strokeFinishedColorStyle: measurementStrokeFinishedColorStyle,
      strokeMeasuringColorStyle: measurementStrokeMeasuringColorStyle,
      strokeImageMeasuringColorStyle: measurementStrokeImageMeasuringColorStyle,
      backgroundColorStyle: measurementBackgroundColorStyle,
      drawHelpTooltip: false
    });
    this.map.addControl(measurementControl);

  }

  getMapConfig() {
    var configuration = new MapConfiguration();
    configuration.initialZoom = 0;
    configuration.initialLon = 405808.5;
    configuration.initialLat = 4623846.5;
    configuration.initialProjection = "EPSG:25831";
    configuration.viewerModes = [
      new ViewerMode(VIEWER_MODE_TYPES.MAP, ["imgmapa_et", "imgmapa", "imgeix"]),
      new ViewerMode(VIEWER_MODE_TYPES.AERIAL, ["ICC1", "imgaeria_fons", "imgeix"]),
      new ViewerMode(VIEWER_MODE_TYPES.HYBRID, ["imghibrid_fons", "imghibrid_ctra", "imghibrid_et", "ICC2", "imgeix"])
    ];
    configuration.initialViewerMode = VIEWER_MODE_TYPES.MAP;
    configuration.tileHeight = 500;
    configuration.tileWidth = 500;
    configuration.mapUnits = "m";
    configuration.mapProjection = "EPSG:25831";
    configuration.mapMaxScale = 3000000;
    configuration.mapMinScale = 3000;
    configuration.mapMaxExtent = [
      320000, //xMin
      4561229,//yMin
      491617, //xMax
      4686464 //yMax
    ];
    configuration.mapResolutions = [
      264.5831904584105,
      ​185.20823332088733,
      ​132.29159522920526,
      ​105.83327618336418,
      ​79.37495713752315,
      ​52.91663809168209,
      ​26.458319045841044,
      ​13.229159522920522,
      ​6.614579761460261,
      ​5.2916638091682096,
      ​2.6458319045841048,
      ​1.3231805354825108,
      ​0.6614579761460262,
      ​0.2645831904584105,
      ​0.1322915952292052
    ];
    return configuration;   
  }

  getLayers() {
    return [
      {
        id:"imgmapa",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        transparency:0,
        tiled:false,
        url_transparent:"true",
        url_bgcolor:"0x000000",
        isBaseLayer:true,
        name:"M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_BTE50_412A,M_EDIF_1M_611A,M_XHE50_111L,M_BTE50_313L_FFCC,M_EIX,M_EIX_sobre_EDIF,M_XCE50_AUTO,M_XCE50_BASICA,M_XCE50_LOCAL,M_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f,M_MUNIS_f,M_MUNIS",
        format: "image/png",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254000.000000, 4479000.000000, 538000.000000, 4755000.000000]
      },
      {
        id:"ICC1",
        desc:"Cartografia ICC 1",
        url:"http://mapcache.icc.cat/map/bases/service?",
        transparency:0,
        tiled:true,
        url_transparent:"true",
        url_bgcolor:"0x000000",
        url_exception:"INIMAGE",
        isBaseLayer:true,
        name:"orto",
        format: "image/png",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254904.96, 4484796.89, 530907.30, 4749795.10]
  
        
      },
      {
        id:"ICC2",
        desc:"Cartografia ICC 2",
        url:"http://mapcache.icc.cat/map/bases/service?",
        transparency:0,
        tiled:true,
        url_transparent:"true",
        url_bgcolor:"0x000000",
        url_exception:"INIMAGE",
        isBaseLayer:true,
        name:"orto",
        format: "image/png",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254904.96, 4484796.89, 530907.30, 4749795.10]
      },
      {
        id:"imgmapa_et",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        transparency:0,
        tiled:false,
        url_transparent:"true",
        url_bgcolor:"0x000000",
        isBaseLayer:false,
        name:"M_MUNIS",
        format: "image/png",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254000.000000, 4479000.000000, 538000.000000, 4755000.000000]
      },
      {
        id:"imgaeria_fons",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        transparency:30,
        tiled:false,
        url_transparent:"true",
        url_bgcolor:"0xFEFEFE",
        isBaseLayer:false,
        name:"M_PROV_FONS,M_MUNIS",
        format: "image/png",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254000.000000, 4479000.000000, 538000.000000, 4755000.000000]
      },
      {
        id:"imghibrid_fons",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        transparency:30,
        tiled:false,
        url_transparent:"true",
        url_bgcolor:"0xFEFEFE",
        isBaseLayer:false,
        name:"M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_EDIF_1M_611A,M_EIX,M_EIX_sobre_EDIF",
        format: "image/png",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254000.000000, 4479000.000000, 538000.000000, 4755000.000000]
      },
      {
        id:"imghibrid_ctra",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        transparency:15,
        tiled:false,
        url_transparent:"true",
        url_bgcolor:"0x000000",
        isBaseLayer:false,
        name:"IH_XCE50_AUTO,IH_XCE50_BASICA,IH_XCE50_LOCAL,IH_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f",
        format:"image/jpg",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254000.000000, 4479000.000000, 538000.000000, 4755000.000000]
      },
      {
        id:"imghibrid_et",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        transparency:0,
        tiled:false,
        url_transparent:"true",
        url_bgcolor:"0x000000",
        isBaseLayer:false,
        name:"M_MUNIS",
        format: "image/png",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254000.000000, 4479000.000000, 538000.000000, 4755000.000000]
      },
      {
        id:"imgeix",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        transparency:0,
        tiled:false,
        url_transparent:"true",
        isBaseLayer:false,
        name:"M_EIX_ET,M_EDI_ET,M_MUNIS_ET",
        format: "image/gif",
        version:"1.1.1",
        attributions: "\u00A9 Institut Cartogràfic i Geològic de Catalunya",
        extent: [254000.000000, 4479000.000000, 538000.000000, 4755000.000000]
      }
    ];
  }
}