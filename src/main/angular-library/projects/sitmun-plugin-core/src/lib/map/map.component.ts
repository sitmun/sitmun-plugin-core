import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Inject } from '@angular/core';

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

import { ElementRef } from '@angular/core';

import {MapConfigurationManagerService, Layer, LayerConfiguration, LayerGroup} from './map-configuration-manager.service';

import { Observable, of} from 'rxjs';

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

export const MAP_ID_TYPE:string = "map";
export const AERIAL_ID_TYPE:string = "aerial";
export const HYBRID_ID_TYPE:string = "hybrid";

export class ViewerMode {
  type:VIEWER_MODE_TYPES;
  layers: Array<string>;
  constructor(type: VIEWER_MODE_TYPES, layers: Array<string>) {
    this.type = type;
    this.layers = layers;
  }
  static getViewerModeId(id):string {
    switch(id) {
      case VIEWER_MODE_TYPES.AERIAL:
        return AERIAL_ID_TYPE;
      case VIEWER_MODE_TYPES.HYBRID:
        return HYBRID_ID_TYPE;
      case VIEWER_MODE_TYPES.MAP:
      default:
        return MAP_ID_TYPE;
    }
  }
};

export class MapConfiguration {
  initialZoom: number;
  initialLon: number;
  initialLat: number;
  initialProjection: string;
  //viewerModes: Array<ViewerMode>;
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

  //viewerModes: Array<ViewerMode>;
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
  };

  @Input() loaddefaults:boolean = false;

  mapOptions: MapOptions;

  constructor(private dialog: MatDialog, 
    private mapConfigurationManagerService: MapConfigurationManagerService) {
  }

  map: ol.Map = null;

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

  layerSubscription;
  baseLayersSubscription;
  layerConfigurationSubscription;
  addLayersSubscription;
  removeLayersSubscription;

  showMessage(msg:string) {
    if (console && (typeof console.log == "function")) {
      console.log(msg);
    }
  }

  initializeMapConfigurationManager(): void {
    this.layerSubscription = this.mapConfigurationManagerService.getLayers().subscribe(
      layers => {
                  this.configureLayers(layers);
                },
      error => this.showMessage("error configuration"),
      () => this.showMessage("on complete configuration")
    );
    this.addLayersSubscription = this.mapConfigurationManagerService.getLayersAdded().subscribe(
      layers => {
                  this.addLayers(layers);
                },
      error => this.showMessage("error configuration"),
      () => this.showMessage("on complete configuration")
    );
    this.removeLayersSubscription = this.mapConfigurationManagerService.getLayersRemoved().subscribe(
      layers => {
                  this.removeLayers(layers);
                },
      error => this.showMessage("error configuration"),
      () => this.showMessage("on complete configuration")
    );
    this.layerConfigurationSubscription = this.mapConfigurationManagerService.getLayerConfigurationListener().subscribe(
      configurations => {
                  for (var i = 0, iLen = configurations.length; i < iLen; i++) {
                    this.applyLayerConfiguration(configurations[i]);
                  }
                },
      error => this.showMessage("error displayed"),
      () => this.showMessage("on complete displayed")
    );
    this.baseLayersSubscription = this.mapConfigurationManagerService.getBaseLayerGroups().subscribe(
      baseLayerGroups => {
                  this.configureBaseLayers(baseLayerGroups);
                },
      error => this.showMessage("error displayed"),
      () => this.showMessage("on complete displayed")
    );
  }

  parseLayers(layers, layerDataConfig:Array<Layer>) {
    if (!layerDataConfig || !layerDataConfig.length) {
      return;
    }
    if (!layers) {
      layers = [];
    }
    var layer;
    var properties;
    for (var i = 0, iLen:number = layerDataConfig.length; i < iLen; i++) {
      if (layerDataConfig[i].tiled) {
         layer = new ol.layer.Tile({
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
                  "FORMAT": this.parseFormat(layerDataConfig[i].format),
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
              }),
              visible:layerDataConfig[i].visibility/*,
              //WMTS do not take into account any opacity defined
              opacity:
                      layerDataConfig[i].opacity? 
                        layerDataConfig[i].opacity:undefined*/
          });         
        properties = null;
        if ((layerDataConfig[i].id != undefined) && (layerDataConfig[i].id != null)) {
          properties = {
            id: layerDataConfig[i].id
          }
        }
        if ((layerDataConfig[i].serverName != undefined) && (layerDataConfig[i].serverName != null)) {
          if (properties == null) {
            properties = {
              serverName: layerDataConfig[i].serverName
            };
          } else {
            properties["serverName"] = layerDataConfig[i].serverName;
          }
        }
        layer.setProperties(properties);
        layers.push(layer);
      } else {  
        layer = new ol.layer.Image({
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
                "FORMAT": this.parseFormat(layerDataConfig[i].format),
                "EXCEPTION": layerDataConfig[i].url_exception
              },
              projection: this.projection,
              //ratio: 1,
              attributions: layerDataConfig[i].attributions
            }),
            visible:layerDataConfig[i].visibility,
            opacity:
                    layerDataConfig[i].opacity? 
                      layerDataConfig[i].opacity:undefined
          }); 
        properties = null;
        if ((layerDataConfig[i].id != undefined) && (layerDataConfig[i].id != null)) {
          properties = {
            id: layerDataConfig[i].id
          }
        }
        if ((layerDataConfig[i].serverName != undefined) && (layerDataConfig[i].serverName != null)) {
          if (properties == null) {
            properties = {
              serverName: layerDataConfig[i].serverName
            };
          } else {
            properties["serverName"] = layerDataConfig[i].serverName;
          }
        }
        layer.setProperties(properties);
        layers.push(layer);
      }
      layers[layers.length-1].baselayer = layerDataConfig[i].isBaseLayer;
    }
  }

  getMapLayerById(id:string):ol.layer.Base {
    var layer = null;
    if (this.map) {
      var layer;
      var layerArray = this.map.getLayers();
      for (var i = 0, iLen = layerArray.getLength(); i < iLen; i++) {
        if (layerArray.item(i).getProperties()["id"] == id) {
          layer = layerArray.item(i);
          break;
        }
      }
    }
    return layer;
  }

  getMapLayerIndexById(id:string):number {
    var index = -1;
    if (this.map) {
      var layer;
      var layerArray = this.map.getLayers();
      for (var i = 0, iLen = layerArray.getLength(); i < iLen; i++) {
        if (layerArray.item(i).getProperties()["id"] == id) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  layers;
  configureLayers(layerDataConfig:Array<Layer>) {
    if (layerDataConfig) {
      if (this.layers && (this.layers.length)) {
        //Clear non base layers
        if (this.map) {
          for (var i = 0, iLen:number = this.layers.length; i < iLen; i++) {
            this.map.removeLayer(this.layers[i]);
          }
          while(this.layers.length) {
            this.layers.pop();
          }
        }
      } else {
        this.layers = [];
      }
      this.addLayers(layerDataConfig);
    }
  }

  loadingControl;
  addLayers(layerDataConfig:Array<Layer>) {
    if (layerDataConfig) {
      var newLayers = [];
      this.parseLayers(newLayers, layerDataConfig);
  
      if (newLayers && this.map) {
        var layer;
        var source;
        var layerIndex;
        var loadingControl_ = this.loadingControl;
        //Add the layers at the end of the map layers array
        for (var i = 0, iLen:number = newLayers.length; i < iLen; i++) {
          layer = newLayers[i];
          layerIndex = this.getMapLayerIndexById(layer.getProperties()["id"]);
          if (layerIndex == -1){
            //Avoid duplicates
            this.map.addLayer(layer);
            if (loadingControl_ && !(layer.getSource() instanceof ol.source.TileWMS)) {
              source = layer.getSource();  
              source.on('imageloadstart', function() {
                loadingControl_.addLoading();
              });  
              source.on('imageloadend', function() {
                loadingControl_.addLoaded();
              });
              source.on('imageloaderror', function() {
                loadingControl_.addLoaded();
              });
            }
          } else {
            //Update visibility
            this.map.getLayers().item(layerIndex).setVisible(layer.getVisible());
          }
        }
      }
  
      if (this.layers == null) {
        this.layers = [];
      }
      this.layers = this.layers.concat(newLayers);
  
      this.updateVectorDataLayers();
    }
  }

  removeLayers(layerDataConfig:Array<Layer>) {

    if (layerDataConfig && this.map) {
      //Add the layers at the end of the map layers array
      var layerToRemove;
      var layer;
      var indexToRemove;

      if (!layerDataConfig.length || !layerDataConfig[0]) {
        return;
      }

      for (var i = 0, iLen = layerDataConfig.length; i < iLen; i++) {
        layer = layerDataConfig[i];
        layerToRemove = this.getMapLayerById(layer.id);
        if (layerToRemove != null) {
          this.map.removeLayer(layerToRemove);
        }
        //Update layers
        if (this.layers != null) {
          indexToRemove = -1;
          for (var j = 0, jLen = this.layers.length; j < jLen; j++) {
            if (this.layers[j].getProperties("id") == layer.id) {
              indexToRemove = j;
              break;
            }
            if (indexToRemove != -1) {
              this.layers.splice(indexToRemove,1);
            }
          }

        }
      }
    }
  }

  applyLayerConfiguration(configuration: LayerConfiguration) {
    if (configuration && this.map) {
      var layer = this.getMapLayerById(configuration.id);
      var pos = this.getMapLayerIndexById(configuration.id);
      if (layer) {
        if ((configuration.opacity != undefined) && (configuration.opacity != null)) {
          layer.setOpacity(configuration.opacity);
        }
        if ((configuration.visibility != undefined) && (configuration.visibility != null)) {
          layer.setVisible(configuration.visibility);
        }
        if ((configuration.position != undefined) && (configuration.position != null) &&
            (configuration.position >= 0)) {
          this.map.removeLayer(layer);
          var baseIndex = this.baseLayers?this.baseLayers.length:0;
          this.map.getLayers().insertAt(configuration.position+baseIndex, layer);
        }
      }
    }
  }

  updateVectorDataLayers() {
    if (this.map != null) {
      this.map.dispatchEvent("layersadded");  
    }
  }

  mapViewLayers: Array<number>;
  mapViewLayerNames: Array<string>;
  aerialViewLayers: Array<number>;
  aerialViewLayerNames: Array<string>;
  hybridViewLayers: Array<number>;
  hybridViewLayerNames: Array<string>;

  baseLayers;
  selectBaseLayerControl;
  configureBaseLayers(groups:Array<LayerGroup>) {
    if ((groups != null) && (groups != undefined)) {
      var mapType = ViewerMode.getViewerModeId(VIEWER_MODE_TYPES.MAP);
      var aerialType = ViewerMode.getViewerModeId(VIEWER_MODE_TYPES.AERIAL);
      var hybridType = ViewerMode.getViewerModeId(VIEWER_MODE_TYPES.HYBRID);

      var baseLayersArray = [];
      var layersArray = [];

      var layersNamesArray = [];
      var layer;
      var group;

      var layerIndex = 0;
      var isBaseLayerIndex = 0;
      for (var i = 0, iLen = groups.length; i < iLen; i++) {
        group = groups[i];
        if (group.id == mapType) {
          this.mapViewLayers = new Array<number>();
          this.mapViewLayerNames = [];
          for (var j = 0, jLen = group.layers.length; j < jLen; j++) {
            layer = group.layers[j];
            layerIndex = layersNamesArray.indexOf(layer.serverName);
            if (layerIndex == -1) {
              if (layer.isBaseLayer) {
                baseLayersArray.push(layer);
              } else {
                layersArray.push(layer);
              }
              layersNamesArray.push(layer.serverName);
            }
            this.mapViewLayerNames.push(layer.serverName);
          }
        } else if (group.id == aerialType) {
          this.aerialViewLayers = new Array<number>();
          this.aerialViewLayerNames = [];
          for (var j = 0, jLen = group.layers.length; j < jLen; j++) {
            layer = group.layers[j];
            layerIndex = layersNamesArray.indexOf(layer.serverName);
            if (layerIndex == -1) {
              if (layer.isBaseLayer) {
                baseLayersArray.push(layer);
              } else {
                layersArray.push(layer);
              }
              layersNamesArray.push(layer.serverName);
            }
            this.aerialViewLayerNames.push(layer.serverName);
          }
        } else if (group.id == hybridType) {
          this.hybridViewLayers = new Array<number>();
          this.hybridViewLayerNames = [];
          for (var j = 0, jLen = group.layers.length; j < jLen; j++) {
            layer = group.layers[j];
            layerIndex = layersNamesArray.indexOf(layer.serverName);
            if (layerIndex == -1) {
              if (layer.isBaseLayer) {
                baseLayersArray.push(layer);
              } else {
                layersArray.push(layer);
              }
              layersNamesArray.push(layer.serverName);
            }
            this.hybridViewLayerNames.push(layer.serverName);
          }
        }
      }
    }
    if (this.baseLayers && (this.baseLayers.length)) {
      //Clear non base layers
      if (this.map) {
        //var mapLayers = [];
        //mapLayers.concat(this.map.getLayers());
        //for (var i = 0, iLen = mapLayers.length; i < iLen; i++) {
        //  if (!mapLayers[i].isBaseLayer) {
        //    this.map.removeLayer(mapLayers[i]);
        //  }
        //}
        for (var i = 0, iLen:number = this.baseLayers.length; i < iLen; i++) {
          this.map.removeLayer(this.baseLayers[i]);
        }
        while(this.baseLayers.length) {
          this.baseLayers.pop();
        }
      }
    } else {
      this.baseLayers = [];
    }

    //Concatenate the base layers with the other non base layers
    layersArray = baseLayersArray.concat(layersArray);
    var layer;
    //Update layer insertion index to make it visible upon selecting the corresponding base layer group
    for (var i = 0, iLen = layersArray.length; i < iLen; i++) {
      layer = layersArray[i];
      if (this.mapViewLayerNames && this.mapViewLayerNames.length &&
         (this.mapViewLayerNames.indexOf(layer.serverName) != -1)) {
          this.mapViewLayers.push(i);
      }
      if (this.aerialViewLayerNames && this.aerialViewLayerNames.length &&
         (this.aerialViewLayerNames.indexOf(layer.serverName) != -1)) {
          this.aerialViewLayers.push(i);
      }
      if (this.hybridViewLayerNames && this.hybridViewLayerNames.length &&
         (this.hybridViewLayerNames.indexOf(layer.serverName) != -1)) {
          this.hybridViewLayers.push(i);
      }
    }

    //Calculate the insertion indexes for each group
    this.parseLayers(this.baseLayers, layersArray);
    if (this.baseLayers && this.map) {
      var index = 0;
      //Add the layers at the beginning of the map layers array
      for (var i = 0, iLen:number = this.baseLayers.length; i < iLen; i++) {
        this.map.getLayers().insertAt(index++, this.baseLayers[i]);
      }
      if (this.selectBaseLayerControl) {
        this.selectBaseLayerControl.onDataChanged({
          layers: this.baseLayers,
          mapViewLayers: this.mapViewLayers,
          aerialViewLayers: this.aerialViewLayers,
          hybridViewLayers: this.hybridViewLayers
        });
      }

      this.updateOverViewMap();
    }
  }

  updateOverViewMap() {
    if (this.layers && this.overViewMapControl) {
      for (var i = 0, iLen:number = 
        this.overViewMapControl.getOverviewMap().getLayers().getLength(); i < iLen; i++) {
        this.overViewMapControl.getOverviewMap().removeLayer(
          this.overViewMapControl.getOverviewMap().getLayers().item(0)
        );
      }
      for (var i = 0, iLen:number = 
        this.baseLayers.length; i < iLen; i++) {
        //Remove all layers but the base ones
        this.overViewMapControl.getOverviewMap().addLayer(this.baseLayers[i]);
      }
    }
  }

  unsubscribeMapConfigurationManager() {
    this.layerSubscription.unsubscribe();
    this.layerConfigurationSubscription.unsubscribe();
    this.baseLayersSubscription.unsubscribe();
    this.addLayersSubscription.unsubscribe();
    this.removeLayersSubscription.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeMapConfigurationManager();
  }

  overViewMapControl:ol.control.OverviewMap;
  ngOnInit() {

    if (this.getMap() != null) {
      //The map is already created do nothing
      return;
    }

    this.initializeMapConfigurationManager();

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

      /*if (mapConfig.viewerModes) {
        this.viewerModes = mapConfig.viewerModes;
      }*/

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

    ////////////////////////////////
    // Custom control declaration //
    ////////////////////////////////

    //Custom Loading control
    class LoadingControl extends ol.control.Control{
      element;
      loading;
      loaded;
      progress;
      
      /**
       * Renders a progress bar.
       */
      constructor(opt_options) {  
            var options = opt_options || {};
            
            var element = document.createElement("DIV");
            element.className = (options.progress?"ol-progress":"ol-loading") + 
            " ol-unselectable ol-control";

            super({
              element: element,
              target: options.target
            });

            this.progress = this.progress || options.progress;
            
            this.loading = 0;
            this.loaded = 0;

            this.hide();
      }


      /**
       * Increment the count of loading tiles.
       */
      addLoading() {
        if (this.loading === 0) {
          this.show();
        }
        ++this.loading;
        this.update();
      };


      /**
       * Increment the count of loaded tiles.
       */
      addLoaded() {
        if (this.progress) {
          var this_ = this;
          setTimeout(function() {
            ++this_.loaded;
            this_.update();
          }, 100);
        } else {
          ++this.loaded;
            this.update();
        }
      };


      /**
       * Update the progress bar.
       * constructor
       */
      update() {
        if (this.progress) {
          var width = (this.loaded / this.loading * 100).toFixed(1) + '%';
          this.element.style.width = width;
          if (this.loading === this.loaded) {
            this.loading = 0;
            this.loaded = 0;
            var this_ = this;
            setTimeout(function() {
            this_.hide();
            }, 500);
          }
        } else {
          if (this.loading === this.loaded) {
            this.loading = 0;
            this.loaded = 0;
            this.hide();
          }
        }
      };


      /**
       * Show the progress bar.
       */
      show() {
        this.element.style.visibility = 'visible';
      };


      /**
       * Hide the progress bar.
       */
      hide() {
        if (this.loading === this.loaded) {
          this.element.style.visibility = 'hidden';
          if (this.progress) {
            this.element.style.width = 0;
          }
        }
      };
    }
    
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
        if (data.layers) {
          this.layers = data.layers;
        }
        if (data.mapViewLayers) {
          this.mapViewLayers = data.mapViewLayers;
        }
        if (data.aerialViewLayers) {
          this.aerialViewLayers = data.aerialViewLayers;
        }
        if (data.hybridViewLayers) {
          this.hybridViewLayers = data.hybridViewLayers;
        }
        //Reload
        this.selectBaseLayer(this.selectedLayer);
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
        var control = this;
        this.map.on("layersadded", function(){
          //Update index
          control.map.removeLayer(control.vector);
          control.map.addLayer(control.vector);
        });
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
            _self.measureTooltipElement.className = 'measurement-tooltip measurement-tooltip-static';
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
        this.helpTooltipElement.className = 'measurement-tooltip hidden';
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
        this.measureTooltipElement.className = 'measurement-tooltip measurement-tooltip-measure';
        this.measureTooltip = new ol.Overlay({
          id: "measurement-tooltip-" + (this.overlayCount++),
          element: this.measureTooltipElement,
          offset: [0, -15],
          positioning: 'bottom-center'
        });
        this.map.addOverlay(this.measureTooltip);
      }
    }

    const SCALE_BAR_UNITS = {
      DEGREES: 'degrees',
      IMPERIAL: 'imperial',
      NAUTICAL: 'nautical',
      METRIC: 'metric',
      US: 'us'
    };

    const SCALE_BAR_LEADING_DIGITS = [1, 2, 5];

    const OL_PROJ_UNITS = {
      DEGREES: 'degrees',
      FEET: 'ft',
      METERS: 'm',
      PIXELS: 'pixels',
      TILE_PIXELS: 'tile-pixels',
      USFEET: 'us-ft'
    };

    //Custom scalebar control
    class ScaleBarControl extends ol.control.Control{
      
      innerElement_;
      element_;
      viewState_ ;
      minWidth_;
      renderedVisible_;
      renderedWidth_ ;
      renderedHTML_;
      units_;
      tooltipMessage;

      /**
       * constructor
       */
      constructor(opt_options?) {

        var options = opt_options || {};

        var className = options.className !== undefined ? options.className : 'ol-scale-line';      
        var minWidth = options.minWidth !== undefined ? options.minWidth : 64;

        var innerElement = document.createElement('DIV');
        innerElement.className = className + '-inner';      
        var element = document.createElement('DIV');
        element.className = className + ' ' + 'ol-unselectable';
        element.appendChild(innerElement);

        function render(mapEvent) {
          /*
          var frameState = mapEvent.frameState;
          if (!frameState) {
            this.viewState_ = null;
          } else {
            this.viewState_ = frameState.viewState;
          }
          */
          this.draw();
          if (!this.rendered) {
            this.rendered = true;
            this.updateElement();
          }
        }
        
        super({
          element: element,
          render: options.render?options.render:render,
          target: options.target
        });

        this.displayClass = options.displayClass?options.displayClass:'ol-scale-line-info-';
        this.showTopBar = options.showTopBar?options.showTopBar:true;
        this.showBottomBar = options.showTopBar?options.showBottomBar:true;
        this.maxWidth = options.maxWidth?options.maxWidth:100;

        this.tooltipMessage = options.tooltipMessage?
          options.tooltipMessage:"scale 1:";

        this.renderedVisible_ = false;
        this.renderedWidth_ = undefined;
        this.renderedHTML_ = '';

        this.minWidth_ = minWidth;
        this.element_ = element;
        this.innerElement_ = innerElement;
        this.viewState_ = null;

        this.topOutUnits = "km";
        this.topInUnits = "m";
        this.bottomOutUnits = "mi";
        this.bottomInUnits = "ft";
      
        this.setUnits((options.units) ||
                        SCALE_BAR_UNITS.METRIC);
      }

      setMap(map:ol.Map) {
        super.setMap(map);
        this.geodesic = map.getView().getProjection().getCode() == "EPSG:900913";
        var this_ = this;                        
        this.getMap().getView().on('change:resolution', function(evt){
          this_.updateElement();
        });
      }

      getValidUnits(units) {
        if (units && (typeof units == "string")) {
          switch (units.toLowerCase()) {
            case SCALE_BAR_UNITS.DEGREES:
              return SCALE_BAR_UNITS.DEGREES;
            case SCALE_BAR_UNITS.IMPERIAL:
              return SCALE_BAR_UNITS.IMPERIAL;
            case SCALE_BAR_UNITS.NAUTICAL:
              return SCALE_BAR_UNITS.NAUTICAL;
              case SCALE_BAR_UNITS.US:
                return SCALE_BAR_UNITS.US;
            case SCALE_BAR_UNITS.METRIC:
            default:
              return SCALE_BAR_UNITS.METRIC;
          }
        }
        return SCALE_BAR_UNITS.METRIC;
      }

      setUnits(newUnits:string) {
        var newValidUnits = this.getValidUnits(newUnits);
        if (newValidUnits != this.units_) {
          this.units_ = newValidUnits;
          this.updateElement();
        }
      }

      getUnits() {
        return this.units_;
      }

      updateElement() {
        this.update();
      }

      getScaleForResolution(resolution, units) {
        var dpi = 25.4 / 0.28;
        var mpu = ol.proj.METERS_PER_UNIT[units];
        var inchesPerMeter = 39.37;
        return (resolution * (mpu * inchesPerMeter * dpi));
      }

      formatNumber(num, dec?, tsep?, dsep?):string {
        dec = (dec != undefined) ? dec : 0;
        tsep = (tsep != undefined) ? tsep : ",";
        dsep = (dsep != undefined) ? dsep : ".";

        var str;
        var integer = Math.round(num).toString();
        var thousands = /(-?[0-9]+)([0-9]{3})/;

        if(dec > 0) {
            var rem = Math.floor(Math.pow(10, dec) * (num - Math.round(num)));
            if(rem == 0) {
                str = integer;
            } else {
                str = integer + dsep + rem;
            }
        } else {
            str = integer;
        }
        return str;
      }

      /**
       * APIProperty: geodesic
       * {Boolean} Use geodesic measurement. Default is false. The recommended
       * setting for maps in EPSG:4326 is false, and true EPSG:900913. If set to
       * true, the scale will be calculated based on the horizontal size of the
       * pixel in the center of the map viewport.
       */
      geodesic:boolean;

      /**
       * Property: maxWidth
       * {Integer} Maximum width of the scale line in pixels.  Default is 100.
       */
      maxWidth;
      
      /**
      * Property: topOutUnits
      * {String} Units for zoomed out on top bar.  Default is km.
      */
      topOutUnits;
      
      /**
        * Property: topInUnits
        * {String} Units for zoomed in on top bar.  Default is m.
        */
      topInUnits;
  
      /**
        * Property: bottomOutUnits
        * {String} Units for zoomed out on bottom bar.  Default is mi.
        */
      bottomOutUnits;
  
      /**
        * Property: bottomInUnits
        * {String} Units for zoomed in on bottom bar.  Default is ft.
        */
      bottomInUnits;

      getBarLen(maxLen):number {
        // nearest power of 10 lower than maxLen
        var digits = parseInt((Math.log(maxLen) / Math.log(10)) + "");
        var pow10 = Math.pow(10, digits);
        
        // ok, find first character
        var firstChar = parseInt((maxLen / pow10) + "");

        // right, put it into the correct bracket
        var barLen;
        if(firstChar > 5) {
            barLen = 5;
        } else if(firstChar > 2) {
            barLen = 2;
        } else {
            barLen = 1;
        }

        // scale it up the correct power of 10
        return barLen * pow10;
      }

      /**
       * Method: update
       * Update the size of the bars, and the labels they contain.
       */
      update() {
        var map = this.getMap();
        if (!map) {
          return;
        }
        var res = map.getView().getResolution();
        if (!res) {
            return;
        }

        var curMapUnits = map.getView().getProjection().getUnits();
        var inches = PROJECTION_INCHES_PER_UNIT;

        // convert maxWidth to map units
        var maxSizeData = this.maxWidth * res * inches[curMapUnits];
        var geodesicRatio = 1;
        if(this.geodesic === true) {
            var maxSizeGeodesic = (this.getGeodesicPixelSize()[0]/*w*/ ||
                0.000001) * this.maxWidth;
            var maxSizeKilometers = maxSizeData / inches["km"];
            geodesicRatio = maxSizeGeodesic / maxSizeKilometers;
            maxSizeData *= geodesicRatio;
        }

        // decide whether to use large or small scale units     
        var topUnits;
        var bottomUnits;
        if(maxSizeData > 100000) {
            topUnits = this.topOutUnits;
            bottomUnits = this.bottomOutUnits;
        } else {
            topUnits = this.topInUnits;
            bottomUnits = this.bottomInUnits;
        }

        // and to map units units
        var topMax = maxSizeData / inches[topUnits];
        var bottomMax = maxSizeData / inches[bottomUnits];

        // now trim this down to useful block length
        var topRounded = this.getBarLen(topMax);
        var bottomRounded = this.getBarLen(bottomMax);

        // and back to display units
        topMax = topRounded / inches[curMapUnits] * inches[topUnits];
        bottomMax = bottomRounded / inches[curMapUnits] * inches[bottomUnits];

        // and to pixel units
        var topPx = topMax / res / geodesicRatio;
        var bottomPx = bottomMax / res / geodesicRatio;
        
        // now set the pixel widths
        // and the values inside them

        if (this.innerElement_) {
          this.innerElement_.style.width = Math.round(bottomPx) + "px"; 
        }
        
        if (this.eBottom.style.visibility == "visible"){
            //this.eBottom.style.width = Math.round(bottomPx) + "px"; 
            this.eBottom.innerHTML = bottomRounded + " " + bottomUnits ;
        }
            
        if (this.eTop.style.visibility == "visible"){
            //this.eTop.style.width = Math.round(topPx) + "px";
            this.eTop.innerHTML = topRounded + " " + topUnits;
        }

        if (this.element_) {
          var scale = this.getScaleForResolution(this.getMap().getView().getResolution(), 
                                                this.getMap().getView().getProjection().getUnits());
          // update the element title and width
          this.element_.title = this.tooltipMessage + this.formatNumber(scale);
        }
        
      }

      getGeodesicPixelSize(px?) {
        var map = this.getMap();
        var lonlat = px ? map.getCoordinateFromPixel(px) : (
          map.getView().getCenter() || [0,0]);
        var res = map.getView().getResolution();
        var left = ol.coordinate.add(lonlat, [-res / 2, 0]);
        var right = ol.coordinate.add(lonlat, [res / 2, 0]);
        var bottom = ol.coordinate.add(lonlat, [0, -res / 2]);
        var top = ol.coordinate.add(lonlat, [0, res / 2]);
        var dest = new ol.proj.Projection({
                        code:"EPSG:4326"
                      });
        var source = map.getView().getProjection() || dest;
        if(source.getCode() != dest.getCode()) {
            left = ol.proj.transform(left, source, dest);
            right = ol.proj.transform(right, source, dest);
            bottom = ol.proj.transform(bottom, source, dest);
            top = ol.proj.transform(top, source, dest);
        }
        
        return [
            distVincenty(left, right),//w
            distVincenty(bottom, top)//h
            ];
      }

      displayClass;
      showTopBar;
      showBottomBar;
      eTop;
      eBottom;
      draw() {
        if (!this.eTop) {
            if (!this.displayClass) {
              this.displayClass = "";
            }
            // stick in the top bar
            this.eTop = document.createElement("div");
            this.eTop.className = this.displayClass + "Top";
            var theLen = this.topInUnits.length;
            this.element_.appendChild(this.eTop);
            if((this.topOutUnits == "") || (this.topInUnits == "") || !this.showTopBar) {
                this.eTop.style.visibility = "hidden";
            } else {
                this.eTop.style.visibility = "visible";
            }
            this.eTop.style.display = this.showTopBar?"":"none";

            // and the bottom bar
            this.eBottom = document.createElement("div");
            this.eBottom.className = this.displayClass + "Bottom";
            this.element_.appendChild(this.eBottom);
            if((this.bottomOutUnits == "") || (this.bottomInUnits == "") || !this.showBottomBar) {
                this.eBottom.style.visibility = "hidden";
            } else {
                this.eBottom.style.visibility = "visible";
            }
            this.eBottom.style.display = this.showTopBar?"":"none";
        }
      }

    }

    var VincentyConstants = {
      a: 6378137,
      b: 6356752.3142,
      f: 1/298.257223563
    };
    var rad = function(x) {return x*Math.PI/180;}
    var distVincenty = function(p1, p2) {
      var ct = VincentyConstants;
      var a = ct.a, b = ct.b, f = ct.f;
  
      var L = rad(p2.lon - p1.lon);
      var U1 = Math.atan((1-f) * Math.tan(rad(p1.lat)));
      var U2 = Math.atan((1-f) * Math.tan(rad(p2.lat)));
      var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
      var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
      var lambda = L, lambdaP = 2*Math.PI;
      var iterLimit = 20;
      while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit>0) {
          var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
          var sinSigma = Math.sqrt((cosU2*sinLambda) * (cosU2*sinLambda) +
          (cosU1*sinU2-sinU1*cosU2*cosLambda) * (cosU1*sinU2-sinU1*cosU2*cosLambda));
          if (sinSigma==0) {
              return 0;  // co-incident points
          }
          var cosSigma = sinU1*sinU2 + cosU1*cosU2*cosLambda;
          var sigma = Math.atan2(sinSigma, cosSigma);
          var alpha = Math.asin(cosU1 * cosU2 * sinLambda / sinSigma);
          var cosSqAlpha = Math.cos(alpha) * Math.cos(alpha);
          var cos2SigmaM = cosSigma - 2*sinU1*sinU2/cosSqAlpha;
          var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
          lambdaP = lambda;
          lambda = L + (1-C) * f * Math.sin(alpha) *
          (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
      }
      if (iterLimit==0) {
          return NaN;  // formula failed to converge
      }
      var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
      var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
      var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
      var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
          B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
      var s = b*A*(sigma-deltaSigma);
      var d = Number.parseFloat(s.toFixed(3))/1000; // round to 1mm precision
      return d;
    };

    const PROJECTION_INCHES_PER_UNIT = { 
      'inches': 1.0,
      'ft': 12.0,
      'mi': 63360.0,
      'm': 39.3701,
      'km': 39370.1,
      'dd': 4374754,
      'yd': 36
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

    var layers = [];
    if (this.baseLayers) {
      layers = layers.concat(this.baseLayers);
    }
    if (this.layers) {
      layers = layers.concat(this.layers)
    }
    this.map = new ol.Map({
      target: 'map',//this.mapContainer.nativeElement,
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
    var scaleLineControl = //new ol.control.ScaleLine();
                            new ScaleBarControl({
                              showTopBar: true,//metric
                              showBottomBar: false,//non-metric
                            });

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

    /*if ((this.defaultViewerMode != null) && (this.defaultViewerMode != undefined) && 
        (this.viewerModes != null) && (this.viewerModes != undefined)) {*/
    if ((this.defaultViewerMode != null) && (this.defaultViewerMode != undefined)) {
      // Base layer selection control
      this.selectBaseLayerControl = new SelectBaseLayerControl({
        mapSelectorTooltip: messages["mapSelectorTooltip"],
        aerialSelectorTooltip: messages["aerialSelectorTooltip"],
        hybridSelectorTooltip: messages["hybridSelectorTooltip"],
        layerSelectionTooltip: messages["layerSelectionTooltip"],
        mapViewLayers: this.mapViewLayers,
        aerialViewLayers: this.aerialViewLayers,
        hybridViewLayers: this.hybridViewLayers,
        layers: this.layers
      });
      this.selectBaseLayerControl.setDialog(this.dialog);
      this.map.addControl(this.selectBaseLayerControl);

      // Initialize the map base layer
      switch(this.defaultViewerMode) {
        case VIEWER_MODE_TYPES.AERIAL: this.selectBaseLayerControl.selectAerial();
                    break;
        case VIEWER_MODE_TYPES.HYBRID: this.selectBaseLayerControl.selectHybrid();
                    break;
        default: this.selectBaseLayerControl.selectMap();
                    break;
      }
    }

    this.loadingControl = new LoadingControl({
      progress: false
    });
    this.map.addControl(this.loadingControl);

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

    this.overViewMapControl = new ol.control.OverviewMap({
      label: overViewNode,
      collapseLabel: overViewNodeCollapsed,
      tipLabel: messages["overviewTooltip"],
      layers: [new ol.layer.Vector()]
    });
    this.map.addControl(this.overViewMapControl);

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

    // Load default base layers
    if (this.loaddefaults) {
      this.configureBaseLayers(this.getDefaultBaseLayers());
    }
  }

  getMapConfig() {
    var configuration = new MapConfiguration();
    configuration.initialZoom = 0;
    configuration.initialLon = 405808.5;
    configuration.initialLat = 4623846.5;
    configuration.initialProjection = "EPSG:25831";
    /*configuration.viewerModes = [
      new ViewerMode(VIEWER_MODE_TYPES.MAP, ["imgmapa_et", "imgmapa", "imgeix"]),
      new ViewerMode(VIEWER_MODE_TYPES.AERIAL, ["ICC1", "imgaeria_fons", "imgeix"]),
      new ViewerMode(VIEWER_MODE_TYPES.HYBRID, ["imghibrid_fons", "imghibrid_ctra", "imghibrid_et", "ICC2", "imgeix"])
    ];*/
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

  getDefaultBaseLayers() {
    var baseLayers = new Array<LayerGroup>();

    var layerGroup = new LayerGroup();
    layerGroup.id = MAP_ID_TYPE;
    layerGroup.layers = [];

    var layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imgmapa_et";
    layer["id"] = "imgmapa_et";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imgmapa";
    layer["id"] = "imgmapa";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = true;
    layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_BTE50_412A,M_EDIF_1M_611A,M_XHE50_111L,M_BTE50_313L_FFCC,M_EIX,M_EIX_sobre_EDIF,M_XCE50_AUTO,M_XCE50_BASICA,M_XCE50_LOCAL,M_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f,M_MUNIS_f,M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imgeix";
    layer["id"] = "imgeix";
    layer["format"] = "gif";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayers.push(layerGroup);

    layerGroup = new LayerGroup();
    layerGroup.id = AERIAL_ID_TYPE;
    layerGroup.layers = [];
    layer = new Layer();

    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254904.96, 4484796.89, 530907.3, 4749795.1];
    layer["title"] = "Cartografia ICC 1";
    layer["serverName"] = "ICC1";
    layer["id"] = "ICC1";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://mapcache.icc.cat/map/bases/service?";
    layer["isBaseLayer"] = true;
    layer["name"] = "orto";
    layer["tiled"] = true;
    layer["url_exception"] = "INIMAGE";
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 0.7;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0xFEFEFE";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imgaeria_fons";
    layer["id"] = "imgaeria_fons";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_PROV_FONS,M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imgeix";
    layer["id"] = "imgeix";
    layer["format"] = "gif";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayers.push(layerGroup);

    layerGroup = new LayerGroup();
    layerGroup.id = HYBRID_ID_TYPE;
    layerGroup.layers = [];
    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 0.7;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0xFEFEFE";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imghibrid_fons";
    layer["id"] = "imghibrid_fons";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_EDIF_1M_611A,M_EIX,M_EIX_sobre_EDIF";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 0.85;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imghibrid_ctra";
    layer["id"] = "imghibrid_ctra";
    layer["format"] = "jpg";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "IH_XCE50_AUTO,IH_XCE50_BASICA,IH_XCE50_LOCAL,IH_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imghibrid_et";
    layer["id"] = "imghibrid_et";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254904.96, 4484796.89, 530907.3, 4749795.1];
    layer["title"] = "Cartografia ICC 2";
    layer["serverName"] = "ICC2";
    layer["id"] = "ICC2";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://mapcache.icc.cat/map/bases/service?";
    layer["isBaseLayer"] = true;
    layer["name"] = "orto";
    layer["tiled"] = true;
    layer["url_exception"] = "INIMAGE";
    layerGroup.layers.push(layer);

  
    // Configuration data

    layer = new Layer();
    layer["visibility"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Instituto de Cartografía y Geología de Cataluña";
    layer["desc"] = "";
    layer["url_transparent"] = "true";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254000, 4479000, 538000, 4755000];
    layer["title"] = "";
    layer["serverName"] = "imgeix";
    layer["id"] = "imgeix";
    layer["format"] = "gif";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayers.push(layerGroup);
    
    return baseLayers;
  }

  getLayers() {
    return [
      {
        visibility: false,
        id:"imgmapa",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        opacity:1,
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
        visibility: false,
        id:"ICC1",
        desc:"Cartografia ICC 1",
        url:"http://mapcache.icc.cat/map/bases/service?",
        opacity:1,
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
        visibility: false,
        id:"ICC2",
        desc:"Cartografia ICC 2",
        url:"http://mapcache.icc.cat/map/bases/service?",
        opacity:1,
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
        visibility: false,
        id:"imgmapa_et",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        opacity:1,
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
        visibility: false,
        id:"imgaeria_fons",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        opacity:0.7,
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
        visibility: false,
        id:"imghibrid_fons",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        opacity:0.7,
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
        visibility: false,
        id:"imghibrid_ctra",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        opacity:0.85,
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
        visibility: false,
        id:"imghibrid_et",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        opacity:1,
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
        visibility: false,
        id:"imgeix",
        desc:"",
        url:"http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer",
        opacity:1,
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

  parseFormat(format:String) {
    return ((format.indexOf("image") == -1)?
                "image/":"") + 
                format;
  }
}