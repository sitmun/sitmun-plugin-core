import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

/** Layer model: configure Layer data and displaying configuration */ 
export class Layer {
  // Display data
  /** layer visibility*/  
  visibility: boolean = false;
  /** Transparency (Transparent) 0-1 (Opaque)*/
  opacity: number = 1.0;

  // Configuration data
  /** title*/
  title: string;
  
  /** Id to index*/
  id: any;
  
  /** Service Name*/
  serverName: string;

  /** Service attributions*/
  attributions: string = "";

  /** Request format (image/jpg, ...)*/
  format: string;
  
  /** Request service version*/
  version:string;

  /** Service url*/
  url: string;

  /** Is base layer?*/
  isBaseLayer: boolean;

  /** Request layer name*/
  name: string;

  /** Is tiled?*/
  tiled: boolean;
  
  /** Description*/
  desc: string = "";
  
  /**  Transparent request parameter?*/
  url_transparent: string = "true";
  
  /** Request Background parameter color (Hexa)*/
  url_bgcolor: string = "0x000000";
  
  /** Request Exception URL*/
  url_exception: string;
  
  /** Extent for tiled services*/
  extent: any = null;

  /** Tile height (if not defined, the default map is taken)*/
  tileHeight?:number;
  
  /** Tile width (if not defined, the default map is taken)*/
  tileWidth?:number;
  
  /** Enabled for GetFeatureInfo requests (enabled to use the viewer features information tool)*/
  queryable?:boolean = false;
  
  /** Minimum scale*/
  minimumScale?:number;
  
  /** Maximum scale*/
  maximumScale?:number;
  
  /** List of available CRS*/
  projections?:string;
  
  /** Features information URL*/
  infoUrl?:string;
  
  /** Metadata information URL*/
  metadataUrl?:string;
  
  /** Legend URL*/
  legendUrl?:string;
  
  /** Array of OptionalParameter object that defines other optional parameter-value pairs for the request (TIME ...)*/
  optionalParameters?:Array<OptionalParameter>;
}

/** Optional parameter model: configure parameter-value pair to add to the request layer URL */
export class OptionalParameter {
  /** key*/key:string;
  /** value*/value:string;
}

/** Layer configuration model: modify the configuration of a layer when interacting with the map (make visible, move the layer ...) */
export class LayerConfiguration {
  /** Identifier to index*/id: any;
  /** Layer visibility*/visibility: boolean;
  /** Layer transparency (Transparent) 0-1 (Opaque)*/opacity: number;
  /** Layer position*/position: number;
}

/** Layer group model*/
export class LayerGroup {
  /** initially activated (all visible layers)*/active?:boolean;
  /** group name*/name?: String;
  /** group id*/id: String;
  /** array of child Layers*/layers: Array<Layer>;
}

/** Map options configuration model*/
export class MapOptionsConfiguration {
  /** scales*/scales?: string;
  /** projections*/projections?: string;
  /** minimum scale*/minScale?:number;
  /** maximum scale*/maxScale?:number;
  /** extent*/extent?:any;
  /** maximum extent*/maxExtent?:any;
  /** tile width*/tileWidth?:number;
  /** tile height*/tileHeight?:number;
  /** parameters*/parameters?: Array<OptionalParameter>
}

/** Map component status model*/
export class MapComponentStatus {
    /** loaded?*/loaded: boolean = false;
}

@Injectable({
  providedIn: 'root'
})

/** Map configuration manager service*/
export class MapConfigurationManagerService {
  private layersSubject = new BehaviorSubject([]);
  private layers: Array<Layer> = null;

  private baseLayerGroupsSubject = new BehaviorSubject([]);
  private baseLayerGroups: Array<LayerGroup> = null;

  private layerConfigurationSubject = new BehaviorSubject([]);

  private addLayersSubject = new BehaviorSubject([]);
  private removeLayersSubject = new BehaviorSubject([]);

  private situationMapConfigurationSubject = new BehaviorSubject([]);
  private mapOptionsConfigurationSubject = new BehaviorSubject([]);

  private mapComponentStatusSubject = new BehaviorSubject([]);

  /** constructor*/
  constructor() { 
   //
  }
  
  /** layer count */
  count = 0;

  /** configure the overlay layers of the map, by passing as a parameter an array of objects of type Layer objects defining the layers to load.*/
  loadLayersConfiguration(configuration) {
    if (this.layers != null) {
      this.clearLayers(false);
    }
    this.setLayers(configuration);
  }
  
  /**configure the base layers of the map by passing as a parameter an array of objects of type LayerGroup each of them with the corresponding Layer objects defining the layers to load.*/
  loadBaseLayersConfiguration(configuration) {
    this.setBaseLayerGroups(configuration);
  }

  /** get base layer groups*/
  getBaseLayerGroups(): Observable<LayerGroup[]> {
    return this.baseLayerGroupsSubject.asObservable();
  }

  /** set base layer groups*/
  setBaseLayerGroups(groups:Array<LayerGroup>) {
    this.baseLayerGroups = groups;
    this.refreshBaseLayerGroups();
  }

  private refreshBaseLayerGroups() {
    // Send the new values so that all subscribers are updated
    this.baseLayerGroupsSubject.next(this.baseLayerGroups);
  }

  /** get layers*/
  getLayers(): Observable<Layer[]> {
    return this.layersSubject.asObservable();
  }

  /** remove all layers from map*/
  clearLayers(refresh:boolean) {
    while(this.layers.length) {
      this.layers.pop();
    }
    if (refresh) {
      this.refreshLayers();
    }
  }

  /** set layers*/
  setLayers(layers:Array<Layer>) {
    this.layers = layers;
    this.refreshLayers();
  }

  /** add given layer to map*/
  addLayer(layer:Layer) {
    this.layers.push(layer);
    this.refreshAddLayers(layer);
  }

  /** add given layer to map at given index*/
  addLayerAt(layer:Layer, index:number) {
    if (index == 0) {
      this.layers = [layer].concat(this.layers);
    } else if (index >= this.layers.length) {
      this.layers.push(layer);
    } else {
      this.layers = this.layers.slice(0, index)
                    .concat([layer])
                    .concat(this.layers.slice(index, this.layers.length));
    }
    this.refreshAddLayers(layer);
    this.refreshLayerConfiguration(layer.id, null, null, index);
  }

  /** remove given layer from map*/
  removeLayer(layer:Layer) {
    var index = this.layers.indexOf(layer);
    this.removeLayerIndex(index);
  }

  /** remove layer with given id from map */
  removeLayerId(id) {
    var index = -1;
    for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
      if (this.layers[i].id == id) {
        index = i;
        break;
      }
    }
    this.removeLayerIndex(index);
  }

  /** remove layer at given index from map */
  removeLayerIndex(index:number) {
    var layer = this.layers[index];
    this.layers.splice(index, 1);
    this.refreshRemoveLayers(layer);
  }

  /** refresh layers */
  private refreshLayers() {
    // Send the new values so that all subscribers are updated
    this.layersSubject.next(this.layers);
  }

  /** Observable for layers added */
  getLayersAdded(): Observable<Layer[]> {
    return this.addLayersSubject.asObservable();
  }

  private refreshAddLayers(layer:Layer) {
    // Send the new values so that all subscribers are updated
    this.addLayersSubject.next([layer]);
  }

  getLayersRemoved(): Observable<Layer[]> {
    return this.removeLayersSubject.asObservable();
  }

  private refreshRemoveLayers(layer:Layer) {
    // Send the new values so that all subscribers are updated
    this.removeLayersSubject.next([layer]);
  }

  getLayerConfigurationListener(): Observable<LayerConfiguration[]> {
    return this.layerConfigurationSubject.asObservable();
  }

  private getLayerIndexById(id:string):number{
    var index = -1;
    for (var i = 0, iLen = this.layers.length; i < iLen; i++) {
      if (this.layers[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  }
  
  /** move layer with given id to the given index*/
  moveLayer(id, index) {
    var layerIndex = this.getLayerIndexById(id);
    if (layerIndex != -1) {
      var layer = this.layers.splice(layerIndex, 1);
      this.layers = 
        this.layers.slice(0, index)
        .concat(layer)
        .concat(this.layers.slice(index, this.layers.length));
    }
    this.refreshLayerConfiguration(id, null, null, index);
  }

  /** change visibility of layer with given id to the given value*/
  changeLayerVisibility(id, visibility) {
    this.refreshLayerConfiguration(id, null, visibility, null);
  }

  /** change opacity of layer with given id to the given value*/
  changeLayerOpacity(id, opacity) {
    this.refreshLayerConfiguration(id, opacity, null, null);
  }

  private refreshLayerConfiguration(id, opacity, visibility, position) {
    // Send the new values so that all subscribers are updated
    var layer = new LayerConfiguration();
    layer.id = id;
    layer.opacity = opacity;
    layer.visibility = visibility;
    layer.position = position;
    this.layerConfigurationSubject.next([layer]);
  }

  getSituationMapConfigurationListener(): Observable<Layer[]> {
    return this.situationMapConfigurationSubject.asObservable();
  }

  /** configure the situation map of the map component by passing as a parameter an array of objects of type LayerGroup, each of them with the corresponding Layer objects defining the layers to load as situation map.*/
  loadSituationMapConfiguration(layers:Array<Layer>) {
    // Send the new values so that all subscribers are updated
    this.situationMapConfigurationSubject.next(layers);
  }

  getMapOptionsConfigurationListener(): Observable<MapOptionsConfiguration[]> {
    return this.mapOptionsConfigurationSubject.asObservable();
  }

  /** load map options configuration */
  loadMapOptionsConfiguration(configuration:MapOptionsConfiguration) {
    // Send the new values so that all subscribers are updated
    this.mapOptionsConfigurationSubject.next([configuration]);
  }

  getMapComponentStatusListener(): Observable<MapComponentStatus[]> {
    return this.mapComponentStatusSubject.asObservable();
  }
  
  /** set map component status */
  setMapComponentStatus(status:MapComponentStatus) {
    //Notify the map component status
    this.mapComponentStatusSubject.next([status]);
  }

}
