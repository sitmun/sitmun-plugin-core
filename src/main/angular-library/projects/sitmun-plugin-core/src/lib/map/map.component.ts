import { Component, OnInit, ViewEncapsulation, Input, ViewChild, Inject } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

//Openlayers imports
import * as ol from 'openlayers';
import * as proj4x from 'proj4';
/** proj4 object */
const proj4 = (proj4x as any).default;

import {LayerSelectionDialogComponent, LayerSelectionDialogData} from './layer-selection-dialog.component';
import {FeatureInfoDialogComponent, FeatureInfoDialogData, FeatureInfoRequestData} from './feature-info-dialog.component';

//Material imports
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

import { ElementRef } from '@angular/core';

import {MapConfigurationManagerService, Layer, LayerConfiguration, LayerGroup, MapOptionsConfiguration, MapComponentStatus} from 'sitmun-frontend-core';

import { Observable, of} from 'rxjs';
import { UserConfigurationService } from 'sitmun-frontend-core';

try {
	ol.proj.setProj4(proj4);
} catch(ex) {
  if ((typeof console != "undefined") && (typeof console.log == "function")) {
    console.log("Failed to load proj4js in OpenLayers");
  }
}

/** base 64 coded location image*/
const locationImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAnCAYAAABnlOo2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAUVrAAFFawEaKylfAAAAB3RJTUUH4gUeDgsQG6NbUAAABbhJREFUWMOtmEuMFEUYx/9V3VXd8zLrsko0wZiYmBjwRpR4UExMwEQJF4KJiUbCBRMvxEQg6kEwcEBM5KBeFA+ACeADX6tLENcnykPQQEAPxA0cdmcHhpmeflR3lYep2S16u+ex0Ellemaqqn/9ff/6vq+KoP+LpO4JAGrcE6OPSjVp3MPoM+eyBoQheowFwNZAAoDEggWA7xMALgCu/7cyoLNesPuPOX2o0cKjhcJmB1jiKLWaRFGRAJCcBw3gyyYh558eGdmNiQkbQKKhBYBYf5e6zbEU6QOGACAFSi1//Xrx4/792wqt1hYkSfeBlOKy6767Kgh2UCmJBAIAoQEns1xJ+rHMEKX2awsX3vVotTpOhFg0gO4gGJvcxvmzo543kQAeAN8AS3SbsRTpBVOm1HpuZOT2ddPTl5AkLuZxKdsWGxh76pTvX5FAA22wwHDjjPtID1dZAMQJxqYgxII+NZd5xbbdXMbYcvi+AFDHrLUibSXVEWo3EVs/FYtvQYiRm4EBADuOy/uUeh3AbQAqAArGapzhoDnj26tp0SK74Psbuz3IAmBzDouxnjFkcRStGuZ8oYYqAnAMIJoXhygAwgE2FscvOUI8kfeAKmOTr7ru3s1BcOB9Kb89XyqdWwrcW5SynNVfKoV7CAnGpLyYEQqSLFGb2pHHOT9jRdHirMkbtl1/XMqdkBIwl7Rlhd8DOypJcmfWOM9xph4Lw3UArgGY0p+eHp/QLoJWVhw/kOfPPY4zqmE8Pek0gCpJksanrvthnuDKUXSH1k9BR3WmDUAAEJoTJKn+IVNjFiH4yPPO6rdqmkAKqL7jeYdt20aXXOXoxtIaojnJjnTLc0QpoFAgGsjXUNf1cr6G4eFA5kRy/UCuYVgq33Vf9iov+gLYqtQjWoiRbgEAnwDhviBYm6js0YkRUgzLkCyXzbGupHQ6M/ICWCnEkw86zlC6FFlZqQzfH0Uv500a2Xack/3b8aoLkOMxdrQSx2sy3ZYkZI+U2/5w3c+O2faRkmU1VoThsvuazQ1KqdxJz1N6Vj/XTK4zkrFzDAACkP8YG1vi+2vypldKYWkQrH4IWI3U7Hn6OanURaNomwNFc58FyOeF+JqQ3hnDLG66pg9CsFvK0zlBMTeXzdL7fjLJ2EHcouuUbZ9FHHdgIiOxzrxTHpDqUP88NLSX3AIYG8DHnP+qYQLdIqNYU1kuUykrxVsnJ3/3Ob94s0BTtl0b9bx/dOwygWLDZfka6gBRgI4XCttvxkoUwB7GviHtOX3dTCDZTUM3AEkg2lKvH/EZ+3e+QDXOa3t9/0/VBmnp1jeQuZdKAEQEoN8Vi1vpPGAsAO8x9oWer6WTccsoYZNuGkqDJQBiBYRv1Ovjdc5PDgo0wfnlg553zoAxS1eRDl+0jxATayvJnZXKpkGsxAFssaxD+sEeZgv8zs4j6RcovQ0WCgi/mp6+dLlYPNQv0HHOz/zt+1c0RNNwl7kNuiF19HrhGbd1AtkzrvumolT13O4SghcJ+VxrJcs6cVaQ76UhE0oA8L1arXGmWNzea4d5wHVHRRh6Ket0gEwxo9+da3pLZOuyswzA/YXzH3gU3Z01qMnY9eVCbNcgVQCTun6+qn8LDEFjEFGnI7cAEFBAHuD8FZqTInZZ1kHS7tvUrmqmdqtztNMv0JxACSCSgP92s3m86jjH0hNe4PzC4SA4p9oQJlBmIMwpcfu2UkdLIQCxolTaSI36hBGCFwj5QOukoevsphEI427WGdRCZhUQAfBVreb9VSrt6nQac5xPWmF4VRf715F9sKAyTtMGOrBK9+2cnrkAyuDc/k2pE0Qp/rCUayFlSQPUtYivGS6L08cvg9TUWVYiRo5rCzyKyuOFwqaYkCHSaoVqtrxoplZUkndqNl8LZYUBrkNBUX86nc2FkdX9lJi7AtkDAnWsZAq8813ojR+MEjXstczT1/9sLctpXytdQgAAAABJRU5ErkJggg==";

/** measurement stroke finished color style*/
const measurementStrokeFinishedColorStyle:string = "rgba(158,17,57,1)";
/** measurement stroke measuring color style*/
const measurementStrokeMeasuringColorStyle:string = "rgba(0, 0, 0, 0.5)";
/** measurement stroke image measuring color style*/
const measurementStrokeImageMeasuringColorStyle:string = "rgba(0, 0, 0, 0.7)";
/** measurement background color style*/
const measurementBackgroundColorStyle:string = "rgba(255, 255, 255, 0.2)";

/** Map option model*/
export class MapOptions {
  /** x-coordinate of center of the map*/lon: number;
  /** y-coordinate of center of the map*/lat: number;
  /** code of the srs projection of the coordinates defined in extent, lon and lat*/projection: string;
  /** zoom of the map*/zoom: number;
  /** array of numbers representing the extent of the initial view of the map component: [minx, miny, maxx, maxy].*/extent: ol.Extent;
};

/** Map configuration model*/
export class MapConfiguration {
  /** initial zoom of the map*/initialZoom: number;
  /** x-coordinate of initial center of the map*/initialLon: number;
  /** y-coordinate of initial center of the map*/initialLat: number;
  /** code of the srs projection of the coordinates defined in extent, initialLon and initialLat*/initialProjection: string;
  /** tile height*/tileHeight: number;
  /** tile width*/tileWidth: number;
  /** map projection units*/mapUnits: string;
  /** code of the srs projection of the map*/mapProjection: string;
  /** map maximum scale*/mapMaxScale: number;
  /** map minimum scale*/mapMinScale: number;
  /** map maximum extent*/mapMaxExtent: ol.Extent;
  /** map resolutions*/mapResolutions: Array<number>;
};

/** Base layer group*/
export class BaseLayerGroup {
  /** BaseLayer Group Id*/
  id: string;
  /** BaseLayer Group Name (to be shown in the selection list)*/
  name: string;
  /** Member layer positions relative to the base layers array*/
  memberPositions: number[];
  /** Member layer ids*/
  memberIds: number[];
}

@Component({
  selector: 'sitmun-map-viewer-map',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

/** Map Component*/
export class MapComponent implements OnInit {

  // Default values
  /** default map projection units*/ defaultMapUnits:string = "m";
  /** default map projection*/ defaultProjection:string = "EPSG:25831";
  /** map projections*/ projections;
  /** map scales*/ scales;
  /** tile height*/ tileHeight: number = 500;
  /** tile width*/tileWidth: number = 500;
  /** map projection units*/ units = "m";
  /** map projection*/projection = "EPSG:25831";

  /** map maximum scale*/maxScale: number;
  /** map minimum scale*/ minScale: number;

  /** map maximum extent*/maxExtent: ol.Extent;

  /** resolutions*/ resolutions: Array<number>;

  /** x-coordinate of initial center of the map*/
  @Input() initialLon;

  /** y-coordinate of initial center of the map*/
  @Input() initialLat;

  /** code of the srs projection of the coordinates defined in extent, initialLon and initialLat*/
  @Input() initialProjection;

  /** inital zoom of the map*/
  @Input() initialZoom;

  /** reference to view mapContainer element*/
  @ViewChild('mapContainer') mapContainer:ElementRef;

  /** map extent*/
  _extent: ol.Extent;

  /** set map extent*/
  @Input()
  set extent(extent: ol.Extent) {
    this._extent = extent;
    if ((this.getMap() != null) && (this.getMap() != undefined)) {
      this.setExtent(extent);
    }
  };

  /** load defaults value, default false*/
  _loadDefaults:boolean = false;

  /** set load defaults value*/
  @Input()
  set loadDefaults(value:boolean) {
    if (this._loadDefaults != value) {
      if (value) {
        this.loadDefaultMapConfiguration();
      }
      //TODO remove default configuration in else??
    }
    this._loadDefaults = value;
  }

  /** get load defaults value*/
  get loadDefaults():boolean {
    return this._loadDefaults;
  }

  /** map options*/
  mapOptions: MapOptions;

  /** map controls labels*/
  messages = {
    zoomInTooltip: "Zoom in",
    zoomOutTooltip: "Zoom out",
    geolocationTooltip: "Locate user",
    scaleLineTooltip: "Map scale",
    attributionsTooltip: "Attributions",
    layerSelectionTooltip: "Select base layer",
    getFeatureInfoTooltip: "Information from cartography",
    overviewTooltip: "Overview map",
    lenghtTooltip: "Length measurement",
    areaTooltip: "Area measurement",
    continueLineMsg: "Click to continue drawing the line",
    continuePolygonMsg: "Click to continue drawing the polygon"
  };

  /** translate map controls labels*/
  translateLabels() {
    this.messages["zoomInTooltip"] = this.translate.instant("ZOOM_IN_TOOLTIP");
    this.messages["zoomOutTooltip"] = this.translate.instant("ZOOM_OUT_TOOLTIP");
    this.messages["geolocationTooltip"] = this.translate.instant("LOCATION_TOOLTIP");
    this.messages["scaleLineTooltip"] = this.translate.instant("SCALE_BAR_TOOLTIP");
    this.messages["attributionsTooltip"] = this.translate.instant("ATTRIBUTIONS_TOOLTIP");
    this.messages["layerSelectionTooltip"] = this.translate.instant("BASE_LAYER_SELECTOR_TOOLTIP");
    this.messages["getFeatureInfoTooltip"] = this.translate.instant("GET_FEATURE_INFO_TOOLTIP");
    this.messages["overviewTooltip"] = this.translate.instant("OVERVIEW_MAP_TOOLTIP");
    this.messages["lengthTooltip"] = this.translate.instant("LENGTH_MEASUREMENT_TOOLTIP");
    this.messages["areaTooltip"] = this.translate.instant("AREA_MEASUREMENT_TOOLTIP");
    this.messages["continueLineMsg"] = this.translate.instant("CONTINUE_LINE_MSG");
    this.messages["continuePolygonMsg"] = this.translate.instant("CONTINUE_POLYGON_MSG");
    this.updateTranslations();
  }

  /** update map controls labels translations */
  updateTranslations() {
    //zoom
    if (this.zoomToolControl) {
      var nodes = document.getElementsByClassName("ol-zoom-in");
      if (nodes && (nodes.length > 0)) {
        nodes[0].setAttribute("title", this.messages["zoomInTooltip"]);
      }
      nodes = document.getElementsByClassName("ol-zoom-out");
      if (nodes && (nodes.length > 0)) {
        nodes[0].setAttribute("title", this.messages["zoomOutTooltip"]);
      }
    }

    //attributions
    if (this.attributionToolControl) {
      var nodes = document.getElementsByClassName("ol-attribution-btn");
      if (nodes && (nodes.length > 0)) {
        nodes[0].setAttribute("title", this.messages["attributionsTooltip"]);
      }
    }

    //overview
    if (this.overViewMapControl) {
      var nodes = document.getElementsByClassName("ol-overviewmap-btn");
      if (nodes && (nodes.length > 0)) {
        nodes[0].setAttribute("title", this.messages["overviewTooltip"]);
      }
    }

    //geolocation
    if (this.locationToolControl) {
      this.locationToolControl.updateTooltip(this.messages["geolocationTooltip"]);
    }

    //scalebar
    if (this.scaleLineToolControl) {
      this.scaleLineToolControl.updateTooltip(this.messages["scaleLineTooltip"]);
    }

    //layer selector
    if (this.selectBaseLayerControl) {
      this.selectBaseLayerControl.updateTooltip(this.messages["layerSelectionTooltip"]);
    }

    //layer selector
    if (this.getFeatureInfoControl) {
      this.getFeatureInfoControl.updateTooltip(this.messages["getFeatureInfoTooltip"]);
    }

    //measurement
    if (this.measurementToolControl) {
      this.measurementToolControl.updateMessages({
        lengthTooltip: this.messages["lengthTooltip"],
        areaTooltip: this.messages["areaTooltip"],
        continueLineMsg: this.messages["continueLineMsg"],
        continuePolygonMsg: this.messages["continuePolygonMsg"]
      });
    }
  }

  /** translate service*/
  translate: TranslateService;

  /** constructor*/
  constructor(private dialog: MatDialog,
    private featureInfoDialog: MatDialog,
    private mapConfigurationManagerService: MapConfigurationManagerService,
    translate: TranslateService) {
    this.translate = translate;
    this.translate.onLangChange.subscribe(() => {
        this.translateLabels();
    });
    this.translateLabels();
  }

  /** OpenLayers map */
  map: ol.Map = null;

  setExtent(extent: ol.Extent) {
    if ((extent != null) && (extent != undefined)) {
      this.getMap().getView().fit(extent);
      this.getMap().getView().setZoom(
        this.getMap().getView().getZoomForResolution(
          this.getMap().getView().getResolutionForExtent(extent)));
    }
  }

  /** get OpenLayers map */
  getMap(){
    return this.map;
  }

  // MapConfigurationManagerService event subscriptors
  /** layers events subscription*/
  layerSubscription;

  /** base layers events subscription*/
  baseLayersSubscription;

  /** layer configuration events subscription*/
  layerConfigurationSubscription;

  /** add layer events subscription*/
  addLayersSubscription;

  /** remove layer events subscription*/
  removeLayersSubscription;

  /** situation map events subscription*/
  situationMapConfigurationSubscription;

  /** map options events subscription*/
  mapOptionsConfigurationSubscription;

  /** show message on console*/
  showMessage(msg:string) {
    if (console && (typeof console.log == "function")) {
      console.log(msg);
    }
  }

  /** initialize MapConfigurationManager*/
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
    this.situationMapConfigurationSubscription = this.mapConfigurationManagerService.getSituationMapConfigurationListener().subscribe(
      layers => {
                  this.situationMapLayers = [];
                  this.parseLayers(this.situationMapLayers, layers);
                  this.updateOverviewMap();
                },
      error => this.showMessage("error configuration"),
      () => this.showMessage("on complete configuration")
    );
    this.mapOptionsConfigurationSubscription = this.mapConfigurationManagerService.getMapOptionsConfigurationListener().subscribe(
      options => {
                  if (options && (options.length > 0)) {
                    this.updateMapOptions(options[0]);
                  }
                },
      error => this.showMessage("error configuration"),
      () => this.showMessage("on complete configuration")
    );
  }

  /** set default map projection units*/
  setDefaultMapUnits(units) {
    if (units) {
      this.defaultMapUnits = units;
    }
  }

  /** get default map projection units*/
  getDefaultMapUnits():string {
    return this.defaultMapUnits;
  }

  /** set default map projection*/
  setDefaultProjection(projection) {
    if (projection) {
      this.defaultProjection = projection;
    }
  }

  /** get default map projection*/
  getDefaultProjection():string {
    return this.defaultProjection.slice();//Return the value cloned
  }

  /** get projection units*/
  getProjectionUnits(projection) {
    try {
      var prj = ol.proj.get(projection);
      if (prj) {
        return prj.getUnits();
      } else {
        return "m";
      }
    } catch (e) {
      return "m";
    }
  }

  /** set map projection*/
  setProjection(projectionList:any) {
    var projection:ol.proj.Projection = null;

    for (var i = 0, iLen = projectionList.length; i < iLen; i++) {
      projection = ol.proj.get(projectionList[i]);
      if (projection) {
        break;
      }
    }
    if (projection != null) {
      this.projection = projection.getCode();
    }
  }

  /** transform projection of given coordinates (lonlat) from given source projection to given destination projection*/
  transformLonLat(lonlat, projectionFrom:string, projectionTo:string) {
    if (lonlat) {
      return ol.proj.transform(lonlat, new ol.proj.Projection({
        code: projectionFrom
      }), new ol.proj.Projection({
        code: projectionTo
      }));
    }
    return null;
  }

  /** transform projection of given extentfrom given source projection to given destination projection*/
  transformExtent(extent, projectionFrom:string, projectionTo:string) {
    if (extent) {
      return ol.extent.applyTransform(
        [extent[0], extent[1], extent[2], extent[3]],
          ol.proj.getTransform(new ol.proj.Projection({
            code: projectionFrom
          }), new ol.proj.Projection({
            code: projectionTo
          })));
    }
    return null;
  }

  /** update map options with given data*/
  updateMapOptions(options:MapOptionsConfiguration) {
    if (!options) {
      //If no options defined load default values
      this.updateMapOptions(this.getDefaultMapOptionsConfiguration());
      return;
    }

    if (options.projections) {
      this.projections = options.projections.split(',');
      if (this.projections.length == 0) {
        this.projections = [this.getDefaultProjection()]
      } else {
        this.projections.forEach(function(projection, index, projections) {
          projections[index] = projection.trim();
        });
      }
    } else {
      this.projections = [this.getDefaultProjection()]
    }

    if (options.scales) {
      var scales = options.scales.split(',');
      if (scales.length) {
        this.scales = [];
        for (var i = 0, iLen = scales.length; i<iLen; i++) {
          if ((scales[i] != undefined) && (scales[i] != null) && (scales[i] != "")) {
            this.scales.push(parseFloat(scales[i].trim()));
          }
        }
      } else {
        this.scales = [];
        this.scales = this.scales.concat(this.getDefaultMapScales());
      }
    } else {
      this.scales = [];
      this.scales = this.scales.concat(this.getDefaultMapScales());
    }

    if ((options.tileHeight != undefined) && (options.tileHeight != null)) {
      this.tileHeight = options.tileHeight;
    }
    if ((options.tileWidth != undefined) && (options.tileWidth != null)) {
      this.tileWidth = options.tileWidth;
    }

    var maxZoom = this.scales.length-1;
    if (options.maxScale) {
      this.maxScale = options.maxScale;
      var normalizedMaxScale = this.maxScale>1.0?(1.0/this.maxScale):this.maxScale;
      var scale, prevScale;
      for (var i = 0, iLen:number = this.scales.length; i < iLen; i++) {
        scale = this.scales[i];
        if (scale > 1.0) {
          scale = 1.0/scale;
        }
        if (scale < normalizedMaxScale) {
          //Get the closest zoom level one
          var factor = 0;
          if (i > 0) {
            prevScale = this.scales[i-1];
            if (prevScale > 1.0) {
              prevScale = 1.0/prevScale;
            }
            if (Math.abs(normalizedMaxScale-scale) >
                Math.abs(normalizedMaxScale-prevScale)) {
              //Closest to the prevous one
              factor = 1;
            }
          }
          maxZoom = this.scales.length-i-factor-1;
          break;
        }
      }
    } else {
      this.maxScale = this.scales[this.scales.length-1];
    }

    var minZoom = 0;
    if (options.minScale) {
      this.minScale = options.minScale;
    } else {
      this.minScale = this.scales[0];
    }

    var maxExtent;
    if (options.maxExtent && options.projections) {
      //The extent's projection is assumed to be the first on the list
      maxExtent = options.maxExtent;
    }

    if (options.parameters) {
      for (var i = 0, iLen = options.parameters.length; i < iLen; i++) {
        //TODO parse other options
      }
    }

    var oldProjection = this.projection + "";//Clone current projection
    this.projection = this.projections[0];
    var currentExtent = this.getMap().getView().calculateExtent();
    if (oldProjection != this.projection) {
      currentExtent = this.transformExtent(currentExtent,
                            oldProjection, this.projection);
    }

    this.units = this.getProjectionUnits(this.projection);

    var resolutions = this.getResolutionsFromScales(this.scales, this.units);
    if (resolutions) {
      this.resolutions = resolutions;
    } else {
      this.resolutions = this.getResolutionsFromScales(this.getDefaultMapScales(), this.units);
      if (!this.resolutions) {
        this.resolutions = this.getDefaultMapResolutions();
      }
    }

    var viewOptions = {
      projection: new ol.proj.Projection({
        code: this.projection,
        units: this.units
      }),
      resolutions: this.resolutions,
      zoom: 0
    };

    if (maxExtent) {
      this.maxExtent = maxExtent;
      viewOptions["extent"] = this.maxExtent;
    } else {
      //No max extent restriction
      this.maxExtent = null;
    }

    var extent;
    if (options.extent) {
      extent = options.extent;
    } else {
      if (this.maxExtent) {
        extent = this.maxExtent;
      } else {
        //Use the transformed current extent
        extent = currentExtent;
      }
    }

    var view = new ol.View(viewOptions);

    if (this.getMap()) {
      this.getMap().setView(view);
      //FIXME force layer repojection
      //update controls with event listeners
      if (this.overViewMapControl) {
        //Define center otherwise an error is raised
        if (extent) {
			    viewOptions["center"] = ol.extent.getCenter(extent);
        }
        this.overViewMapControl.getOverviewMap().setView(
          new ol.View(viewOptions)
        );
      }
      if (this.scaleLineToolControl != null) {
        this.scaleLineToolControl.updateMap(this.getMap());
      }
      if (extent) {
        //Set the map and overview map centers
        view.fit(extent);
      }
    }
  }

  /** get resolutions from given scales*/
  getResolutionsFromScales(scales:number[], units?):number[] {
    var resolutions = [];
    for (var i = 0, iLen = scales.length; i < iLen; i++) {
      resolutions.push(MapComponent.getResolutionFromScale(scales[i], units));
    }
    return resolutions;
  }

  /** get scales from given resolutions*/
  getScalesFromResolutions(resolutions:number[], units?):number[] {
    var scales = [];
    for (var i = 0, iLen = resolutions.length; i < iLen; i++) {
      scales.push(MapComponent.getScaleFromResolution(resolutions[i], units));
    }
    return scales;
  }

  /** parse layers from array of layers*/
  parseLayers(layers, layerDataConfig:Array<Layer>) {
    if (!layerDataConfig || !layerDataConfig.length) {
      return;
    }
    if (!layers) {
      layers = [];
    }
    var layer;
    var properties;
    var layerParams;
    var projection;

    for (var i = 0, iLen:number = layerDataConfig.length; i < iLen; i++) {
      layerParams = {
        "LAYERS":layerDataConfig[i].name,
        "TRANSPARENT": layerDataConfig[i].url_transparent?layerDataConfig[i].url_transparent.toUpperCase():"FALSE",
        "BGCOLOR": layerDataConfig[i].url_bgcolor,
        "VERSION": layerDataConfig[i].version,
        "FORMAT": this.parseFormat(layerDataConfig[i].format),
        "EXCEPTION": layerDataConfig[i].url_exception
      };
      if (layerDataConfig[i].optionalParameters) {
        for (var j = 0, jLen = layerDataConfig[i].optionalParameters.length; j < jLen; j++) {
          try {
            layerParams[layerDataConfig[i].optionalParameters[j].key] = layerDataConfig[i].optionalParameters[j].value;
          } catch (e) {
            //ignore those params that generate an exception
          }
        }
      }
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
      if (layerDataConfig[i].title) {
        if (properties == null) {
          properties = {
            queryable: layerDataConfig[i].title
          };
        } else {
          properties["title"] = layerDataConfig[i].title;
        }
      }
      if (layerDataConfig[i].queryable) {
        if (properties == null) {
          properties = {
            queryable: layerDataConfig[i].queryable
          };
        } else {
          properties["queryable"] = layerDataConfig[i].queryable;
        }
      }
      if ((layerDataConfig[i].projections != undefined) && (layerDataConfig[i].projections != null)) {
        var projections = layerDataConfig[i].projections.split(',');
        projections.forEach(function(projection, index, projections) {
          projections[index] = projection.trim();
        });
        if (properties == null) {
          properties = {
            projections: projections
          };
        } else {
          properties["projections"] = projections;
        }
        projection = projections[0];
      } else {
		    projection = this.projection;
      }
      if (layerDataConfig[i].tiled) {
         layer = new ol.layer.Tile({
              minResolution:layerDataConfig[i].minimumScale?
                            MapComponent.getResolutionFromScale(layerDataConfig[i].minimumScale):undefined,
              maxResolution:layerDataConfig[i].maximumScale?
                            MapComponent.getResolutionFromScale(layerDataConfig[i].maximumScale):undefined,
              extent: layerDataConfig[i].extent?
                        [layerDataConfig[i].extent[0], layerDataConfig[i].extent[1], layerDataConfig[i].extent[2], layerDataConfig[i].extent[3]]:
                          undefined,
              source: new ol.source.TileWMS({
                url: layerDataConfig[i].url,
                params: layerParams,
                projection: projection + "",//Clone the value
                attributions: layerDataConfig[i].attributions,
                // Countries have transparency, so do not fade tiles:
                transition: 0,
                tileGrid: new ol.tilegrid.TileGrid({
                  extent: layerDataConfig[i].extent?
                          [layerDataConfig[i].extent[0], layerDataConfig[i].extent[1], layerDataConfig[i].extent[2], layerDataConfig[i].extent[3]]:
                            undefined,
                  resolutions: this.resolutions,
                  tileSize: [layerDataConfig[i].tileWidth?
                              layerDataConfig[i].tileWidth:
                              this.tileWidth,
                              layerDataConfig[i].tileHeight?
                              layerDataConfig[i].tileHeight:
                              this.tileHeight]
                })
              }),
              visible:layerDataConfig[i].visibility/*,
              //WMTS do not take into account any opacity defined
              opacity:
                      layerDataConfig[i].opacity?
                        layerDataConfig[i].opacity:undefined*/
          });
        layer.setProperties(properties);
        layers.push(layer);
      } else {
        layer = new ol.layer.Image({
            minResolution:layerDataConfig[i].minimumScale?
                          MapComponent.getResolutionFromScale(layerDataConfig[i].minimumScale):undefined,
            maxResolution:layerDataConfig[i].maximumScale?
                          MapComponent.getResolutionFromScale(layerDataConfig[i].maximumScale):undefined,
            extent: layerDataConfig[i].extent?
              [layerDataConfig[i].extent[0], layerDataConfig[i].extent[1], layerDataConfig[i].extent[2], layerDataConfig[i].extent[3]]:
                undefined,
            source: new ol.source.ImageWMS({
              url: layerDataConfig[i].url,
              params: layerParams,
              projection: projection + "",//clone the value
              //ratio: 1,
              attributions: layerDataConfig[i].attributions
            }),
            visible:layerDataConfig[i].visibility,
            opacity:
                    layerDataConfig[i].opacity?
                      layerDataConfig[i].opacity:undefined
          });
        layer.setProperties(properties);
        layers.push(layer);
      }
      layers[layers.length-1].baselayer = layerDataConfig[i].isBaseLayer;
    }
  }

  /** get map layer by given id*/
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

  /** get map layer index by given id*/
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

  /** layers*/
  layers;

  /** configure given array of layers*/
  configureLayers(layerDataConfig:Array<Layer>) {
    if (layerDataConfig) {
      if (this.layers && (this.layers.length)) {
        if (this.loadingControl) {
          //Hide loading control
          this.loadingControl.reset();
        }
        //Clear non base layers
        if (this.map) {
          var layer;
          for (var i = 0, iLen:number = this.layers.length; i < iLen; i++) {
            layer = this.layers[i];
            if (layer && layer.getProperties() && layer.getProperties()["loading"]) {
              layer.setProperties({loading: false});
              if (this.loadingControl) {
                this.loadingControl.addLoaded();
              }
            }
            this.map.removeLayer(layer);
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

  /** loadingControl*/
  loadingControl;

  /** add given array of layers to map*/
  addLayers(layerDataConfig:Array<Layer>) {
    if (layerDataConfig) {
      var newLayers = [];
      this.parseLayers(newLayers, layerDataConfig);

      if (newLayers && this.map) {
        var layer;
        var source;
        var layerIndex;
        var loadingControl_ = this.loadingControl;
        var getFeatureInfoControl_ = this.getFeatureInfoControl;
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
                if (layer.getProperties() && !layer.getProperties()["loading"]) {
                  layer.setProperties({loading: true});
                  loadingControl_.addLoading();
                }
              });
              source.on('imageloadend', function() {
                if (layer.getProperties() && layer.getProperties()["loading"]) {
                  layer.setProperties({loading: false});
                  loadingControl_.addLoaded();
                }
              });
              source.on('imageloaderror', function() {
                if (layer.getProperties() && layer.getProperties()["loading"]) {
                  layer.setProperties({loading: false});
                  loadingControl_.addLoaded();
                }
              });
              layer.on('change:visible', function(){
                if (!layer.getVisible()) {
                  if (layer.getProperties() && layer.getProperties()["loading"]) {
                    //Cancel the loading request
                    layer.setProperties({loading: false});
                    loadingControl_.addLoaded();
                  }
                  if (getFeatureInfoControl_ != null) {
                    getFeatureInfoControl_.updateVisibleLayers(layer.getVisible());
                  }
                } else {
                }
              });
            } else if (getFeatureInfoControl_ != null) {
              layer.on('change:visible', function(){
                getFeatureInfoControl_.updateVisibleLayers(layer.getVisible());
                if (!layer.getVisible()) {
                  if (layer.getProperties() && layer.getProperties()["loading"]) {
                    //Cancel the loading request
                    layer.setProperties({loading: false});
                    loadingControl_.addLoaded();
                  }
                }
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

      if (this.getFeatureInfoControl != null) {
        this.getFeatureInfoControl.onDataChanged({
          layers: this.getQueryableLayers()
        });
      }
    }
  }

  /** remove given array of layers to map*/
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
          if (layerToRemove.getProperties() && layerToRemove.getProperties()["loading"]) {
            layerToRemove.setProperties({loading: false});
            if (this.loadingControl) {
              this.loadingControl.addLoaded();
            }
          }
          this.map.removeLayer(layerToRemove);
        }
        //Update layers
        if (this.layers != null) {
          indexToRemove = -1;
          for (var j = 0, jLen = this.layers.length; j < jLen; j++) {
            if (this.layers[j].getProperties()["id"] == layer.id) {
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

  /** apply given layer configuration*/
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
          if (layer.getProperties() && layer.getProperties()["loading"]) {
            layer.setProperties({loading: false});
            if (this.loadingControl) {
              this.loadingControl.addLoaded();
            }
          }
          this.map.removeLayer(layer);
          var baseIndex = this.baseLayers?this.baseLayers.length:0;
          this.map.getLayers().insertAt(configuration.position+baseIndex, layer);
        }
      }
    }
  }

  /** update vector added layers*/
  updateVectorDataLayers() {
    if (this.map != null) {
      this.map.dispatchEvent("layersadded");
    }
  }

  /** base layers*/
  baseLayers;

  /** base layers gorups*/
  baseLayerGroups;

  /** select base layer control*/
  selectBaseLayerControl;

  /** situation layers*/
  situationMapLayers;

  /** GetFeatureInfo control*/
  getFeatureInfoControl;

  /** configure given array of group of layers as base layers*/
  configureBaseLayers(groups:Array<LayerGroup>) {
    var groupNames;
    if ((groups != null) && (groups != undefined)) {

      var baseLayersArray = [];
      var layersArray = [];

      var layersNamesArray = [];
      var layer;
      var group;

      var layerIndex = 0;
      var isBaseLayerIndex = 0;
      var baseLayerGroup:BaseLayerGroup;
      this.baseLayerGroups = [];
      var selectedGroup = 0;
      groupNames = [];
      for (var i = 0, iLen = groups.length; i < iLen; i++) {
        group = groups[i];

        baseLayerGroup = new BaseLayerGroup();
        baseLayerGroup.id = group.id;
        if ((group.name != undefined) && (group.name != null)) {
          baseLayerGroup.name = group.name;
        } else {
          baseLayerGroup.name = baseLayerGroup.id;
        }
        groupNames.push(baseLayerGroup.name);

        baseLayerGroup.memberIds = [];
        baseLayerGroup.memberPositions = [];
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
          baseLayerGroup.memberIds.push(layer.serverName);
        }
        this.baseLayerGroups.push(baseLayerGroup);
        if (group.active) {
          selectedGroup = i;
        }
      }
    }
    if (this.baseLayers && (this.baseLayers.length)) {
      //Clear non base layers
      if (this.map) {
        for (var i = 0, iLen:number = this.baseLayers.length; i < iLen; i++) {
          this.map.removeLayer(this.baseLayers[i]);
        }
        while(this.baseLayers.length) {
          this.baseLayers.pop();
        }
      }
    } else {
      if (!this.baseLayers) {
        this.baseLayers = [];
      }
      if (!this.baseLayerGroups) {
        this.baseLayerGroups = [];
      }
    }

    //Concatenate the base layers with the other non base layers
    layersArray = baseLayersArray.concat(layersArray);
    var layer;
    //Update layer insertion index to make it visible upon selecting the corresponding base layer group
    for (var i = 0, iLen = layersArray.length; i < iLen; i++) {
      layer = layersArray[i];
      for (var j = 0, jLen = this.baseLayerGroups.length; j < jLen; j++) {
        baseLayerGroup = this.baseLayerGroups[j];
        if (baseLayerGroup.memberIds.indexOf(layer.serverName) != -1) {
          baseLayerGroup.memberPositions.push(i);
          break;
        }
      }
    }

    //Calculate the insertion indexes for each group
    this.parseLayers(this.baseLayers, layersArray);
    if (this.baseLayers && this.map) {
      var index = 0;
      var layer;
      var source;
      var getFeatureInfoControl_ = this.getFeatureInfoControl;
      //Add the layers at the beginning of the map layers array
      for (var i = 0, iLen:number = this.baseLayers.length; i < iLen; i++) {
        layer = this.baseLayers[i];
        this.map.getLayers().insertAt(index++, layer);
        if (getFeatureInfoControl_ != null) {
          layer.on('change:visible', function(){
            getFeatureInfoControl_.updateVisibleLayers(layer.getVisible());
          });
        }
      }
      if (this.selectBaseLayerControl) {
        this.selectBaseLayerControl.onDataChanged({
          layerGroups: this.baseLayerGroups,
          groupNames: groupNames,
          layers: this.baseLayers,
          selection: selectedGroup
        });
      }

      if (!this.situationMapLayers ||
        (this.situationMapLayers.length == 0)) {
        //If there is no situation map configuration loaded then reload the overview with the new base layers
        this.updateOverviewMap();
      }

      if (this.getFeatureInfoControl != null) {
        this.getFeatureInfoControl.onDataChanged({
          layers: this.getQueryableLayers()
        });
      }
    }
  }

  /** get queryable layers*/
  getQueryableLayers() {
    var queryableLayers = null;
    if (this.getMap() && this.getMap().getLayers() != null) {
      this.getMap().getLayers().forEach(function (layer, index, layers) {
        if (layer.getProperties()["queryable"]) {
          if (queryableLayers == null) {
            queryableLayers = [];
          }
          queryableLayers.push(layer);
        }
      });
    }
    return queryableLayers;
  }

  /** update overview map*/
  updateOverviewMap() {
    if (this.overViewMapControl) {
      var layers;
      if (this.situationMapLayers && (this.situationMapLayers.length > 0)) {
        layers = this.situationMapLayers;
      } else {
        layers = this.baseLayers;
      }
      if (this.overViewMapControl) {
        for (var i = 0, iLen:number =
          this.overViewMapControl.getOverviewMap().getLayers().getLength(); i < iLen; i++) {
          this.overViewMapControl.getOverviewMap().removeLayer(
            this.overViewMapControl.getOverviewMap().getLayers().item(0)
          );
        }
        if (layers) {
          for (var i = 0, iLen:number =
            layers.length; i < iLen; i++) {
            //Remove all layers but the base ones
            this.overViewMapControl.getOverviewMap().addLayer(layers[i]);
          }
        }
      }
    }
  }

  /** unsubscribe to component events*/
  unsubscribeMapConfigurationManager() {
    this.layerSubscription.unsubscribe();
    this.layerConfigurationSubscription.unsubscribe();
    this.baseLayersSubscription.unsubscribe();
    this.addLayersSubscription.unsubscribe();
    this.removeLayersSubscription.unsubscribe();
    this.situationMapConfigurationSubscription.unsubscribe();
    this.mapOptionsConfigurationSubscription.unsubscribe();
  }

  /** component destroy handler*/
  ngOnDestroy(): void {
    this.unsubscribeMapConfigurationManager();
  }

  /** init proj4 for coordinate transformation*/
  initProj4js() {
    // mercator
    proj4.defs("EPSG:54004", "+title=world mercator EPSG:54004 +proj=merc +lat_ts=0 +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
    /*var projection = new ol.proj.Projection({
      code: "EPSG:54004",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    // ed50 / UTM
    proj4.defs("EPSG:23029", "+title=ED50 / UTM zone 29N  +proj=utm +zone=29 +ellps=intl +units=m +no_defs");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:23029",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:23030", "+title=ED50 / UTM zone 30N  +proj=utm +zone=30 +ellps=intl +units=m +no_defs");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:23030",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:23031", "+title=ED50 / UTM zone 31N  +proj=utm +zone=31 +ellps=intl +units=m +no_defs");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:23031",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:23032", "+title=ED50 / UTM zone 32N  +proj=utm +zone=32 +ellps=intl +units=m +no_defs");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:23032",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    // ETRS89 / UTM
    proj4.defs("EPSG:25829", "+proj=utm +zone=29 +ellps=GRS80 +units=m +no_defs");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:25829",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:25830",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:25831", "+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs");
                //'+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:25831",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:25832",
      units: "m"
    });
    ol.proj.addProjection(projection);
	  */
    // WGS84 / UTM
    proj4.defs("EPSG:32629", "+proj=utm +zone=29 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:32629",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:32630", "+proj=utm +zone=30 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:32630",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:32631", "+proj=utm +zone=31 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:32631",
      units: "m"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:32632", "+proj=utm +zone=32 +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:32632",
      units: "m"
    });
    ol.proj.addProjection(projection);
	  */

    // geographic
    proj4.defs("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs ");// wgs84
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:4326",
      units: "degrees"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:4230", "+proj=longlat +ellps=intl +no_defs");// ed50
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:4230",
      units: "degrees"
    });
    ol.proj.addProjection(projection);
    */
    proj4.defs("EPSG:4258", "+proj=longlat +ellps=GRS80 +no_defs");// etrs89
    /*
    projection = new ol.proj.Projection({
      code: "EPSG:4258",
      units: "degrees"
    });
    ol.proj.addProjection(projection);
    */
  }

  /** overview map control*/
  overViewMapControl:ol.control.OverviewMap;

  /** measurement control*/
  measurementToolControl;

  /** scale line tool control*/
  scaleLineToolControl;

  /** attribution tool control*/
  attributionToolControl;

  /** zoom control*/
  zoomToolControl;

  /** location tool control*/
  locationToolControl;

  /** component init handler*/
  ngOnInit() {

    if (this.getMap() != null) {
      //The map is already created do nothing
      return;
    }

    // Initialize projections
    this.initProj4js();

    //Retrieve info from input parameters
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

    //Load a default map configuration (projection, zoom, center, max extent...)
    var mapConfig = this.getDefaultMapConfiguration();

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
      if (mapConfig.mapUnits) {
        this.units = mapConfig.mapUnits;
      }

      if (mapConfig.tileHeight) {
        this.tileHeight = mapConfig.tileHeight;
      }

      if (mapConfig.tileWidth) {
        this.tileWidth = mapConfig.tileWidth;
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
        this.minScale = mapConfig.mapMinScale;
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

    /** check supported events */
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

    /** Custom Loading control*/
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
      hide(force?:boolean) {
        force = ((force != null) && (force != undefined))?force:false;
        if ((this.loading === this.loaded) || force) {
          //Avoid having negative counters
          this.loading = 0;
          this.loaded = 0;
          this.element.style.visibility = 'hidden';
          if (this.progress) {
            this.element.style.width = 0;
          }
        }
      };

      /**
       * Reset the counters and hide the loading view.
       */
      reset() {
        this.hide(true);
      }
    }

    /** Custom base layer selector control*/
    class SelectBaseLayerControl extends ol.control.Control{

      groupNames;
      layerGroups;
      layers;

      selectedGroup: number;

      dialog: MatDialog;
      selectionDialogRef: MatDialogRef<LayerSelectionDialogComponent>;
      toolContainer;

      button;

      /** set dialog*/
      setDialog(dialog: MatDialog) {
        this.dialog = dialog;
      }

      /** on data chenged handler*/
      onDataChanged(data) {
        if (data.layerGroups) {
          this.layerGroups = data.layerGroups;
        }
        if (data.layers) {
          this.layers = data.layers;
        }

        if ((this.layerGroups && (this.layerGroups.length > 0)) &&
            (this.layers && (this.layers.length > 0))) {
          //Show the first on the list
          if (data.groupNames) {
            this.groupNames = data.groupNames;
          } else {
            this.groupNames = [];
            for (var i = 0, iLen = this.layerGroups.length; i < iLen; i++) {
              this.groupNames.push(this.layerGroups[i].name);
            }
          }
          if ((data.selection != undefined) &&
              (data.selection != null)) {
            this.selectedGroup = data.selection;
          } else {
            this.selectedGroup = 0;
          }
        } else {
          this.selectedGroup = -1
        }
        //Reload
        this.selectLayerGroup(this.selectedGroup);
      }

      showSelectionDialog() {
        if ((this.dialog != null) && (this.dialog != undefined)) {
          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.hasBackdrop = true;

          var data = new LayerSelectionDialogData();

          data.selected = this.selectedGroup;
          data.itemList = this.groupNames;

          dialogConfig.data = data;

          var this_ = this;

          this.selectionDialogRef = this.dialog.open(LayerSelectionDialogComponent, dialogConfig);
          this.selectionDialogRef.afterClosed().subscribe(
            data => {
                try {
                  for (var i = 0, iLen = this.layerGroups.length; i < iLen; i++) {
                    if (data[this.layerGroups[i].name]) {
                      this_.selectLayerGroup(i);
                      break;
                    }
                  }
                } catch (e) {
                  //
                }
            }
          );
        }
      }

      constructor(opt_options) {
        var options = opt_options || {};

        var element = document.createElement("DIV");
        element.className = "ol-change-baselayer ol-unselectable ol-control"
        //initially hidden
        element.style.display = "none";
        element.style.visibility = "hidden";

        super({
          element: element,
          target: options.target
        });

        this.selectedGroup = -1;

        var this_ = this;

        var controlBtn = document.createElement("BUTTON");
        if ((options.tooltip != null) && (options.tooltip != null)) {
          controlBtn.title = options.tooltip;
        }

        controlBtn.setAttribute("type", "button");
        controlBtn.id="map-layer-selector-btn";
        controlBtn.className = "mat-raised-button";
        var icon = document.createElement('i');
        icon.className="material-icons";
        icon.innerHTML="layers";
        controlBtn.appendChild(icon);
        element.appendChild(controlBtn);
        if (isEventSupported('touchstart')) {
          controlBtn.addEventListener('touchstart', function() {
                this_.showSelectionDialog();
              }, false);
        } else {
          controlBtn.addEventListener('click', function() {
                this_.showSelectionDialog();
              }, false);
        }

        this.button = controlBtn;

        this.toolContainer = element;

        this.onDataChanged({
          layerGroups: options.layerGroups,
          layers: options.layers,
          selection: options.selection
        });
      }

      hideControlButton() {
        if (this.toolContainer) {
          this.toolContainer.style.display = "none";
          this.toolContainer.style.visibility = "hidden";
          //TODO Notify control hidden
        }
      }

      showControlButton() {
        if (this.toolContainer) {
          this.toolContainer.style.display = "";
          this.toolContainer.style.visibility = "visible";
          //TODO Notify control shown
        }
      }

      selectLayerGroup(value) {
        if (value < 0) {
          this.hideControlButton();
        } else {
          if (this.layerGroups && this.layerGroups.length > 1) {
            this.showControlButton();
          } else {
            this.hideControlButton();
          }
          var layerList = this.layerGroups[value].memberPositions;
          if ((layerList == null) || (layerList == undefined) || (this.layers == null) ||
              (this.layers == undefined)) {
            //No information for the requested type return
            //TODO raise error if needed be
            return;
          }
          this.selectedGroup = value;
          var layerName;
          var layerId;
          for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
            layerName = this.layers[i].getProperties()["serverName"] || "";
            layerId = this.layers[i].getProperties()["id"] || "";
            this.layers[i].setVisible(layerList.indexOf(i) != -1);
          }
        }
      }

      updateTooltip(tooltip) {
        if (this.button) {
          this.button.title = tooltip;
        }
      }
    }

    /** Custom geolocation control*/
    class GeolocationControl extends ol.control.Control{
      geolocation: ol.Geolocation;

      geolocationLayer: ol.layer.Vector;

      button;

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
        button.className="mat-raised-button";
        button.appendChild(icon);

        var element = document.createElement('div');
        element.className = 'geolocation-btn ol-unselectable ol-control';
        element.appendChild(button);

        super({
          element: element,
          target: options.target
        });

        this.button = button;

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
        if (isEventSupported('touchstart')) {
          button.addEventListener('touchstart', requestLocation, false);
        } else {
          button.addEventListener('click', requestLocation, false);
        }
      }

      updateTooltip(title) {
        if (this.button) {
          this.button.title = title;
        }
      }
    };

    /** Custom measurement control*/
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

      lengthSelected:boolean;
      areaSelected:boolean;

      updateMessages(messages) {
        if (this.buttonLength) {
          this.buttonLength.title = messages.lengthTooltip;
        }

        if (this.buttonArea) {
          this.buttonArea.title = messages.areaTooltip;
        }

        this.continueLineMsg = messages.continueLineMsg;
        this.continuePolygonMsg = messages.continuePolygonMsg;

        if (this.areaSelected || this.lengthSelected) {
          if (this.helpTooltipElement) {
            this.helpTooltipElement.innerHTML =
              this.areaSelected?this.continuePolygonMsg:this.continueLineMsg;
          }
        }
      }

      constructor(opt_options) {
        var options = opt_options || {};

        var element = document.createElement("DIV");
        element.className = "ol-measurement ol-unselectable ol-control"

        super({
          element: element,
          target: options.target
        });

        this.areaSelected = false;
        this.lengthSelected = false;

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

        this.buttonLength = document.createElement('button');
        this.buttonLength.setAttribute("type", "button");
        this.buttonLength.setAttribute("tool-type", "length");
        this.buttonLength.setAttribute("tool-active", "false");
        if (options.lengthTooltip) {
          this.buttonLength.title = options.lengthTooltip;
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
          this.areaSelected = true;
        } else {
          this.buttonLength.className += " tool-active";
          this.buttonLength.setAttribute("tool-active", "true");
          this.buttonArea.className  =
            this.buttonArea.className.replace(" tool-active", "");
          this.buttonArea.setAttribute("tool-active", "false");
          this.lengthSelected = true;
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
          this.areaSelected = false;
        } else {
          this.buttonLength.className =
            this.buttonLength.className.replace(" tool-active", "");
          this.buttonLength.setAttribute("tool-active", "false");
          this.lengthSelected = false;
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

      updateTooltip(tooltip) {
        this.tooltipMessage = tooltip;
        this.update();
      }

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

      updateMap(map:ol.Map) {
        this.setMap(map);
        this.updateElement();
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
          //Update bar width with top value always
          this.innerElement_.style.width = Math.round(topPx) + "px";
        }

        if (this.eBottom && this.eBottom.style && (this.eBottom.style.visibility == "visible")) {
            //Update bottom bar width with its corresponding value
            this.eBottom.style.width = Math.round(bottomPx) + "px";
            this.eBottom.innerHTML = bottomRounded + " " + bottomUnits ;
        }

        if (this.eTop && this.eTop.style && (this.eTop.style.visibility == "visible")) {
            //this.eTop.style.width = Math.round(topPx) + "px";
            this.eTop.innerHTML = topRounded + " " + topUnits;
        }

        if (this.element_) {
          var scale = MapComponent.getScaleFromResolution(this.getMap().getView().getResolution(),
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

    // Auxiliary functions to calculate and register resolution changes
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

    /**Custom GetFeatureInfo control*/
    class GetFeatureInfoControl extends ol.control.Control{

      dialog: MatDialog;
      controlDialogRef: MatDialogRef<FeatureInfoDialogComponent>;
      toolContainer;

      button;
      active:boolean;

      layers;
      listener;
      visibleLayers;
      defaultInfoFormat;
      disabled;

      setDialog(dialog: MatDialog) {
        this.dialog = dialog;
      }

      onDataChanged(data) {
        //Check if there are queryable layers available
        this.visibleLayers = 0;
        var this_ = this;
        if (data && data.layers && data.layers.length) {
          this.layers = data.layers;
          this.showTool();
          //Check if there are queryable layers visible
          data.layers.forEach(function(layer, index, layers){
            if (layer.getVisible()) {
              this_.visibleLayers++;
            }
          });
          if (this.visibleLayers > 0) {
            this.enableTool();
          } else {
            this.disableTool();
          }
        } else {
          this.layers = [];
          //hide tool
          this.hideTool();
        }
      }

      updateVisibleLayers(showLayer) {
        this.visibleLayers = this.visibleLayers + (showLayer?1:-1);
        if (this.visibleLayers < 0) {
          this.visibleLayers = 0;
        }
      }

      showToolDialog(location) {
        if (!location) {
          // No point or area info
          return;
        }
        if ((this.dialog != null) && (this.dialog != undefined)) {
          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.hasBackdrop = true;

          var data = new FeatureInfoDialogData();

          data.requests = this.getQueryRequests(location);

          dialogConfig.data = data;

          var this_ = this;

          this.controlDialogRef = this.dialog.open(FeatureInfoDialogComponent, dialogConfig);
          this.controlDialogRef.afterClosed().subscribe(
            data => {
                try {
                  // Do something??
                } catch (e) {
                  //
                }
            }
          );
        }
      }

      createGetFeatureInfoUrl(layer:ol.layer.Layer, location) {
        //Example
        //http://sitmun.diba.cat/arcgis/services/PUBLIC/DTE50/MapServer/WMSServer?SERVICE=WMS&REQUEST=GetFeatureInfo&LAYERS=DTE50_MUN&QUERY_LAYERS=DTE50_MUN&EXCEPTIONS=INIMAGE&VERSION=1.3.0&TRANSPARENT=true&FORMAT=image/png8&STYLES=&CRS=EPSG:25831&INFO_FORMAT=text/xml&WIDTH=1355&HEIGHT=753&BBOX=297073.421925,4554115.600155,548030.578075,4693577.399845&I=438&J=286
        var source = layer.getSource();
        var params = {};
        var format = layer.getProperties()["infoFormat"];
        params["INFO_FORMAT"] = format?format:this.defaultInfoFormat;
        if (source instanceof ol.source.TileWMS) {
          var tileWmsSource:ol.source.TileWMS = source;
          return tileWmsSource.getGetFeatureInfoUrl(
            location,
            this.getMap().getView().getResolution(),
            this.getMap().getView().getProjection(),
            params
          );
        } else if (source instanceof ol.source.ImageWMS) {
          var imageWmsSource:ol.source.ImageWMS = source;
          return imageWmsSource.getGetFeatureInfoUrl(
            location,
            this.getMap().getView().getResolution(),
            this.getMap().getView().getProjection(),
            params);
        }
		    return null;
      }

      getQueryRequests(location):Array<FeatureInfoRequestData> {
        var requests = new Array<FeatureInfoRequestData>();
        //Crear peticiones get feature info para cada capa visible
        var this_ = this;
        this.layers.forEach(function(layer, index, layers) {
          if (layer.getVisible()) {
            var url = this_.createGetFeatureInfoUrl(layer, location);
            if (url) {
              var request = new FeatureInfoRequestData();
              request.title = layer.getProperties()["title"];
              request.request = url;
              var format = layer.getProperties()["infoFormat"];
              request.type = format?format:this_.defaultInfoFormat;
              requests.push(request);
            }
          }
        });
        return requests;
      }

      toggleActivate() {
        if (!this.disabled) {
          if (!this.active) {
            this.activate()
          } else {
            this.deactivate();
          };
        }
      }

      activate() {
        if (this.disabled) {
          return;
        }
        if (!this.active) {
          if (this.button) {
            if (this.button.className.indexOf(" tool-active") == -1) {
              this.button.className += " tool-active";
            }
          }
          this.active = true;
          //register map clicks
          var this_ = this;
          this.listener = function(evt:ol.MapBrowserEvent) {
            this_.showToolDialog(this_.getMap().getCoordinateFromPixel(evt.pixel));
          };
          this.getMap().on("click", this.listener);
        }
      }

      deactivate() {
        if (this.active) {
          if (this.button) {
            if (this.button.className.indexOf(" tool-active") != -1) {
              this.button.className = this.button.className.replace(" tool-active", "");
            }
          }
          this.active = false;
          //unregister map clicks
          if (this.listener) {
            this.getMap().un("click", this.listener);
          }
          this.listener = null;
        }
      }

      constructor(opt_options) {
        var options = opt_options || {};

        var element = document.createElement("DIV");
        element.className = "ol-get-feature-info ol-unselectable ol-control"
        //initially hidden
        element.style.display = "none";
        element.style.visibility = "hidden";

        super({
          element: element,
          target: options.target
        });

        if (options.defaultInfoFormat) {
          this.defaultInfoFormat = options.defaultInfoFormat;
        } else {
          this.defaultInfoFormat = "text/xml";
        }

        var this_ = this;

        var controlBtn = document.createElement("BUTTON");
        if ((options.tooltip != null) && (options.tooltip != null)) {
          controlBtn.title = options.tooltip;
        }

        controlBtn.setAttribute("type", "button");
        controlBtn.id="get-feature-info-btn";
        controlBtn.className = "mat-raised-button";
        var icon = document.createElement('i');
        icon.className="material-icons";
        icon.innerHTML="perm_device_information";
        controlBtn.appendChild(icon);
        element.appendChild(controlBtn);

        if (isEventSupported('touchstart')) {
          controlBtn.addEventListener('touchstart', function() {
                this_.toggleActivate();
            }, false);
        } else {
            controlBtn.addEventListener('click', function() {
                this_.toggleActivate();
            }, false);
        }

        this.button = controlBtn;

        this.toolContainer = element;

        this.onDataChanged({
          layers: options.layers
        });
      }

      enableTool() {
        this.disabled = false;
        if (this.button) {
          if (this.button.className.indexOf(" tool-disabled") != -1) {
            this.button.className = this.button.className.replace(" tool-disabled", "");
          }
        }
      }

      disableTool() {
        this.disabled = true;
		    this.deactivate();
        if (this.button) {
          if (this.button.className.indexOf(" tool-disabled") == -1) {
            this.button.className = this.button.className += " tool-disabled";
          }
        }
      }

      hideTool() {
		    this.deactivate();
        if (this.toolContainer) {
          this.toolContainer.style.display = "none";
          this.toolContainer.style.visibility = "hidden";
          //TODO Notify control hidden
        }
      }

      showTool() {
        if (this.toolContainer) {
          this.toolContainer.style.display = "";
          this.toolContainer.style.visibility = "visible";
          //TODO Notify control shown
        }
      }

      updateTooltip(tooltip) {
        if (this.button) {
          this.button.title = tooltip;
        }
      }
    }

    ///////////////////////
    // Map configuration //
    ///////////////////////

    var attributionsLabel = document.createElement("I");
    attributionsLabel.className = "material-icons";
    attributionsLabel.innerHTML = "info";
    var attributionsCollapseLabel = document.createElement("I");
    attributionsCollapseLabel.className = "material-icons";
    attributionsCollapseLabel.innerHTML = "keyboard_arrow_right";

    this.attributionToolControl = new ol.control.Attribution({
      collapsible: true,
      tipLabel: this.messages["attributionsTooltip"],
      collapseLabel: attributionsCollapseLabel,
      label:attributionsLabel
    });

    this.zoomToolControl = new ol.control.Zoom({
      zoomInTipLabel: this.messages["zoomInTooltip"],
      zoomOutTipLabel: this.messages["zoomOutTooltip"]
    });

    var layers = [];
    if (this.baseLayers) {
      layers = layers.concat(this.baseLayers);
    }
    if (this.layers) {
      layers = layers.concat(this.layers)
    }
    var viewOptions = {
      projection: new ol.proj.Projection({
        code: this.projection,
        units: this.units
      })
    };
    if (this.maxExtent) {
      viewOptions["extent"] = this.maxExtent;
    }
    if (this.resolutions) {

      viewOptions["resolutions"] = this.resolutions;
    }
    if (initialCenter) {

      viewOptions["center"] = initialCenter;
    }
    if ((initialZoom != null) && (initialZoom != undefined)) {
      viewOptions["zoom"] = initialZoom;
    }
    this.map = new ol.Map({
      target: 'map',
      layers: layers,
      // Configure default controls
      controls: ol.control.defaults({attribution: false, zoom:false, rotate:false}).extend([this.attributionToolControl, this.zoomToolControl]),
      view: new ol.View(viewOptions)
    });

    //Update attribution button to apply a material style
    var attributionNodeList = document.getElementsByClassName("ol-attribution");
    if ((attributionNodeList != null) && (attributionNodeList != undefined) && (attributionNodeList.length > 0)) {
      var buttonList = attributionNodeList[0].getElementsByTagName("BUTTON");
      if ((buttonList != null) && (buttonList != undefined)) {
        for (var i = 0, iLen = buttonList.length; i < iLen; i++) {
          buttonList[i].className += " mat-raised-button ol-attribution-btn";
        }
      }
    }


    if ((this._extent != null) && (this._extent != undefined)) {
      this.setExtent(this._extent);
    }

    var zoomInBtnList = document.getElementsByClassName("ol-zoom-in");
    if ((zoomInBtnList != null) && (zoomInBtnList.length > 0)) {
      zoomInBtnList[0].className += " mat-raised-button";
    }
    var zoomOutBtnList = document.getElementsByClassName("ol-zoom-out");
    if ((zoomOutBtnList != null) && (zoomOutBtnList.length > 0)) {
      zoomOutBtnList[0].className += " mat-raised-button";
    }

    //////////////////////////////////
    // Custom control instantiation //
    //////////////////////////////////

    // Scale line control
    this.scaleLineToolControl =
                            new ScaleBarControl({
                              showTopBar: true,//metric
                              showBottomBar: false,//non-metric
                              tooltipMessage: this.messages["scaleLineTooltip"]
                            });

    this.map.addControl(this.scaleLineToolControl);
    var scaleLineElementContainerList = document.getElementsByClassName("ol-scale-line");

    this.locationToolControl = new GeolocationControl({
      geolocationTooltip: this.messages["geolocationTooltip"]
    });
    // Geolocation control
    this.map.addControl(this.locationToolControl);

    // Create the base layer selection control it will remain hidden until
    // more than one base layer group has been defined
    // Base layer selection control
    this.selectBaseLayerControl = new SelectBaseLayerControl({
      layerGroups: this.baseLayerGroups,
      layers: this.baseLayers,
      tooltip: this.messages["layerSelectionTooltip"]
    });
    this.selectBaseLayerControl.setDialog(this.dialog);
    this.map.addControl(this.selectBaseLayerControl);

    // Base layer selection control
    this.getFeatureInfoControl = new GetFeatureInfoControl({
      layers: this.getQueryableLayers(),
      tooltip: this.messages["getFeatureInfoTooltip"],
      defaultInfoFormat: this.defaultMapInfoFormat
    });
    this.getFeatureInfoControl.setDialog(this.featureInfoDialog);
    this.map.addControl(this.getFeatureInfoControl);

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

    this.overViewMapControl = new ol.control.OverviewMap({
      label: overViewNode,
      collapseLabel: overViewNodeCollapsed,
      tipLabel: this.messages["overviewTooltip"],
      layers: [new ol.layer.Vector()],//Add a layer to avoid copying the current map configuration
      view: new ol.View({//Configure the overview map view similar to the map's view
        projection: new ol.proj.Projection({
          code: this.map.getView().getProjection().getCode(),
          units: this.map.getView().getProjection().getUnits()
        }),
        resolutions: this.map.getView().getResolutions(),
        center: this.map.getView().getCenter(),
        zoom: this.map.getView().getZoom(),
        extent: this.maxExtent
      })
    });
    this.map.addControl(this.overViewMapControl);

    //Update attribution button to apply a material style
    var overviewNodeList = document.getElementsByClassName("ol-overviewmap");
    if ((overviewNodeList != null) && (overviewNodeList != undefined) && (overviewNodeList.length > 0)) {
      var buttonList = overviewNodeList[0].getElementsByTagName("BUTTON");
      if ((buttonList != null) && (buttonList != undefined)) {
        for (var i = 0, iLen = buttonList.length; i < iLen; i++) {
          buttonList[i].className += " mat-raised-button ol-overviewmap-btn";
        }
      }
    }

    //Measurement control
    this.measurementToolControl = new MeasurementControl({
      lengthTooltip: this.messages["lengthTooltip"],
      areaTooltip: this.messages["areaTooltip"],
      continueLineMsg: this.messages["continueLineMsg"],
      continuePolygonMsg:  this.messages["continuePolygonMsg"],
      strokeFinishedColorStyle: measurementStrokeFinishedColorStyle,
      strokeMeasuringColorStyle: measurementStrokeMeasuringColorStyle,
      strokeImageMeasuringColorStyle: measurementStrokeImageMeasuringColorStyle,
      backgroundColorStyle: measurementBackgroundColorStyle,
      drawHelpTooltip: false
    });
    this.map.addControl(this.measurementToolControl);

    //Register to receive map data updates
    this.initializeMapConfigurationManager();

    // Load default values
    if (this._loadDefaults) {
      this.loadDefaultMapConfiguration();
    }

    var mapStatus = new MapComponentStatus();
    mapStatus.loaded = true;
    //Notify the map has been initialized and is ready
    this.mapConfigurationManagerService.setMapComponentStatus(mapStatus);
  }

  /** normalize to given scale*/
  public static normalizeScale(scale) {
    var normScale=(scale>1.0)?(1.0/scale):scale;
    return normScale;
  }

  /** get scale from given resolution*/
  public static getScaleFromResolution(resolution, units?) {
    units = units?units:"m";
    var dpi = 25.4 / 0.28;
    var mpu = ol.proj.METERS_PER_UNIT[units];
    var inchesPerMeter = 39.37;
    return (resolution * (mpu * inchesPerMeter * dpi));
  }

  /** get resolution from given scale*/
  public static getResolutionFromScale(scale, units?) {
    units = units?units:"m";
    var normScale = MapComponent.normalizeScale(scale);
    var dpi = 25.4 / 0.28;
    var mpu = ol.proj.METERS_PER_UNIT[units];
    var inchesPerMeter = 39.37;
    return (1 /(normScale * (mpu * inchesPerMeter * dpi)));
  }

  /** defaults loaded?*/
  defaultsLoaded:boolean = false;

  /** load default map configuration*/
  loadDefaultMapConfiguration() {
    //Load default configuration
    //Projection, escales, extent
    if (this.getMap() != null) {
      if (!this.defaultsLoaded) {
        this.defaultsLoaded = true;
        this.updateMapOptions(this.getDefaultMapOptionsConfiguration());
        this.configureBaseLayers(this.getDefaultBaseLayersConfiguration());
      }
    }
  }

  /** default initial zoom*/
  defaultInitialZoom = 0;

  /** setdefault initial zoom*/
  setDefaultInitialZoom(zoom) {
    this.defaultInitialZoom = zoom;
  }

  /** get default initial zoom*/
  getDefaultInitialZoom():number {
    return this.defaultInitialZoom;
  }

  /** default initial lon*/
  defaultInitialLon = 405808.5;

  /** set default initial lon*/
  setDefaultInitialLon(lon) {
    this.defaultInitialLon = lon;
  }

  /** get default initial lon*/
  getDefaultInitialLon():number {
    return this.defaultInitialLon;
  }

  /** default initial lat*/
  defaultInitialLat = 4623846.5;

  /** set default initial lat*/
  setDefaultInitialLat(lat) {
    this.defaultInitialLat = lat;
  }

  /** get default initial lat*/
  getDefaultInitialLat():number {
    return this.defaultInitialLat;
  }

  /** default tile height*/
  defaultTileHeight = 500;

  /** set default tile height*/
  setDefaultTileHeight(height) {
    this.defaultTileHeight = height;
  }

  /** get default tile height*/
  getDefaultTileHeight():number {
    return this.defaultTileHeight;
  }

  /** set default tile width*/
  defaultTileWidth = 500;

  /** set default tile width*/
  setDefaultTileWidth(width) {
    this.defaultTileWidth = width;
  }

  /** get default tile width*/
  getDefaultTileWidth():number {
    return this.defaultTileWidth;
  }

  /** default map max scale*/
  defaultMapMaxScale = 3000000;

  /** set default map max scale*/
  setDefaultMapMaxScale(scale) {
    this.defaultMapMaxScale = scale;
  }

  /** get default map max scale*/
  getDefaultMapMaxScale():number {
    return this.defaultMapMaxScale;
  }

  /** default map min scale*/
  defaultMapMinScale = 3000;

  /** set default map min scale*/
  setDefaultMapMinScale(scale) {
    this.defaultMapMinScale = scale;
  }

  /** get default map min scale*/
  getDefaultMapMinScale():number {
    return this.defaultMapMinScale;
  }

  /** default map maximum extent*/
  defaultMapMaxExtent:[number, number, number, number] = [
    320000, //xMin
    4561229,//yMin
    491617, //xMax
    4686464 //yMax
  ];

  /** set default map maximum extent*/
  setDefaultMapMaxExtent(extent) {
    this.defaultMapMaxExtent = extent;
  }

  /** get default map maximum extent*/
  getDefaultMapMaxExtent():[number, number, number, number] {
    return this.defaultMapMaxExtent;
  }

  /** default map resolutions*/
  defaultMapResolutions = [
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

  /** set default map resolutions*/
  setDefaultMapResolutions(resolutions) {
    this.defaultMapResolutions = resolutions;
  }

  /** get default map resolutions*/
  getDefaultMapResolutions() {
    return this.defaultMapResolutions;
  }

  /** default map scales*/
  defaultMapScales = [
    1000000,
    700000,
    ​500000,
    400000,
    300000,
    200000,
    100000,
    50000,
    25000,
    20000,
    10000,
    5001,
    2500,
    1000,
    500
  ];

  /** set default map scales*/
  setDefaultMapScales(scales) {
    this.defaultMapScales = scales;
  }

  /** get default map scales*/
  getDefaultMapScales() {
    return this.defaultMapScales;
  }

  /** default map info format*/
  defaultMapInfoFormat:string = "text/xml";
  setDefaultMapInfoFormat(format:string) {
    this.defaultMapInfoFormat = format;
  }

  /** get default map info format*/
  getDefaultMapInfoFormat():string {
    return this.defaultMapInfoFormat;
  }


  /** get default map configuration*/
  getDefaultMapConfiguration() {
    var configuration = new MapConfiguration();
    configuration.initialZoom = this.getDefaultInitialZoom();
    configuration.initialLon = this.getDefaultInitialLon();
    configuration.initialLat = this.getDefaultInitialLat();
    configuration.initialProjection = this.getDefaultProjection();
    configuration.tileHeight = this.getDefaultTileHeight();
    configuration.tileWidth = this.getDefaultTileWidth();
    configuration.mapProjection = this.getDefaultProjection();
    configuration.mapUnits = this.getProjectionUnits(configuration.mapProjection);
    /*
    configuration.mapMaxScale = this.getDefaultMapMaxScale();
    configuration.mapMinScale = this.getDefaultMapMinScale();
    configuration.mapMaxExtent = this.getDefaultMapMaxExtent();
    configuration.mapResolutions = this.getDefaultMapResolutions();
    */
    return configuration;
  }

  /** get default map options configuration*/
  getDefaultMapOptionsConfiguration() {
    var configuration = new MapOptionsConfiguration();
    //configuration.extent = [this.getDefaultInitialLon(), this.getDefaultInitialLat()];
    configuration.tileHeight = this.getDefaultTileHeight();
    configuration.tileWidth = this.getDefaultTileWidth();
    configuration.projections = this.getDefaultProjection();
    configuration.maxScale = this.getDefaultMapMaxScale();
    configuration.minScale = this.getDefaultMapMinScale();
    configuration.maxExtent = this.getDefaultMapMaxExtent();
    configuration.scales = this.getDefaultMapScales().join(",");
    return configuration;
  }

  /** get default base layers configuration*/
  getDefaultBaseLayersConfiguration() {
    var baseLayers = new Array<LayerGroup>();

    var layerGroup = new LayerGroup();
    layerGroup.id = "map";
    layerGroup.name = "Mapa";
    layerGroup.layers = [];

    var layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = null;
    layer["title"] = "Base Mapa - imgmapa";
    layer["serverName"] = "226-212-210-245";
    layer["id"] = "226-212-210-245";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_BTE50_412A,M_EDIF_1M_611A,M_XHE50_111L,M_BTE50_313L_FFCC,M_EIX,M_EIX_sobre_EDIF,M_XCE50_AUTO,M_XCE50_BASICA,M_XCE50_LOCAL,M_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f,M_MUNIS_f,M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = null;
    layer["title"] = "Base Mapa - imgmapa_et";
    layer["serverName"] = "226-212-210-238";
    layer["id"] = "226-212-210-238";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = null;
    layer["title"] = "Base Mapa - imgeix";
    layer["serverName"] = "226-212-210-247";
    layer["id"] = "226-212-210-247";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayers.push(layerGroup);

    layerGroup = new LayerGroup();
    layerGroup.id = "aerial";
    layerGroup.name = "Aerèa";
    layerGroup.layers = [];

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254904.96, 4484796.89, 530907.3, 4749795.1];
    layer["title"] = "Base Aerial - ICC1";
    layer["serverName"] = "272-266-258-252";
    layer["id"] = "272-266-258-252";
    layer["format"] = "image/png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://mapcache.icc.cat/map/bases/service";
    layer["isBaseLayer"] = false;
    layer["name"] = "orto";
    layer["tiled"] = true;
    layer["tileHeight"] = 256;
    layer["tileWidth"] = 256;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 0.7;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0xFEFEFE";
    layer["extent"] = null;
    layer["title"] = "Base Aerial - imgaeria_fons";
    layer["serverName"] = "272-266-258-256";
    layer["id"] = "272-266-258-256";
    layer["format"] = "image/png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_PROV_FONS,M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = null;
    layer["title"] = "Base Aerial - imgeix";
    layer["serverName"] = "272-266-258-281";
    layer["id"] = "272-266-258-281";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayers.push(layerGroup);

    layerGroup = new LayerGroup();
    layerGroup.id = "hybrid";
    layerGroup.name = "Hìbrida";
    layerGroup.layers = [];

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = [254904.96, 4484796.89, 530907.3, 4749795.1];
    layer["title"] = "Base Aerial - ICC2";
    layer["serverName"] = "273-267-265-254";
    layer["id"] = "273-267-265-254";
    layer["format"] = "image/png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://mapcache.icc.cat/map/bases/service";
    layer["isBaseLayer"] = false;
    layer["name"] = "orto";
    layer["tiled"] = true;
    layer["tileHeight"] = 256;
    layer["tileWidth"] = 256;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 0.7;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0xFEFEFE";
    layer["extent"] = null;
    layer["title"] = "Base Hybrid - imghibrid_fons";
    layer["serverName"] = "273-267-265-259";
    layer["id"] = "273-267-265-259";
    layer["format"] = "image/png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_EDIF_1M_611A,M_EIX,M_EIX_sobre_EDIF";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 0.85;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = null;
    layer["title"] = "Base Hybrid - imghibrid_ctra";
    layer["serverName"] = "273-267-265-261";
    layer["id"] = "273-267-265-261";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false
    layer["name"] = "IH_XCE50_AUTO,IH_XCE50_BASICA,IH_XCE50_LOCAL,IH_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    layer = new Layer();
    layer["visibility"] = false;
    layer["queryable"] = false;
    layer["opacity"] = 1;
    layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
    layer["desc"] = "";
    layer["url_transparent"] = "TRUE";
    layer["url_bgcolor"] = "0x000000";
    layer["extent"] = null;
    layer["title"] = "Base Hybrid - imghibrid_et";
    layer["serverName"] = "273-267-265-263";
    layer["id"] = "273-267-265-263";
    layer["format"] = "png";
    layer["version"] = "1.1.1";
    layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
    layer["isBaseLayer"] = false;
    layer["name"] = "M_MUNIS";
    layer["tiled"] = false;
    layerGroup.layers.push(layer);

    baseLayers.push(layerGroup);

    return baseLayers;
  }

  /** parse given format*/
  parseFormat(format:String) {
    return ((format.indexOf("image") == -1)?
                "image/":"") +
                format;
  }
}
