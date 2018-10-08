import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export class Layer {
  // Display data
  visibility: boolean = false;
  opacity: number = 1.0;

  // Configuration data
  title: string;
  id: any;
  serverName: string;
  attributions: string = "";
  format: string;
  version:string;
  url: string;
  isBaseLayer: boolean;
  name: string;
  tiled: boolean;
  desc: string = "";
  url_transparent: string = "true";
  url_bgcolor: string = "0x000000";
  url_exception: string;
  extent: any = null;
  tileHeight?:number;
  tileWidth?:number;
  queryable?:boolean = false;
  minimumScale?:number;
  maximumScale?:number;
  projections?:string;
  infoUrl?:string;
  metadataUrl?:string;
  legendUrl?:string;
  optionalParameters?:Array<OptionalParameter>;
}

export class OptionalParameter {
  key:string;
  value:string;
}

export class LayerConfiguration {
  id: any;
  visibility: boolean;
  opacity: number;
  position: number;
}

export class LayerGroup {
  active?:boolean;
  name?: String;
  id: String;
  layers: Array<Layer>;
}

export class MapOptionsConfiguration {
  scales?: string;
  projections?: string;
  minScale?:number;
  maxScale?:number;
  extent?:any;
  maxExtent?:any;
  tileWidth?:number;
  tileHeight?:number;
  parameters?: Array<OptionalParameter>
}

@Injectable({
  providedIn: 'root'
})

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

  constructor() { 
   //
  }

  count = 0;

  loadLayersConfiguration(configuration) {
    if (this.layers != null) {
      this.clearLayers(false);
    }
    this.setLayers(configuration);
  }

  loadBaseLayersConfiguration(configuration) {
    this.setBaseLayerGroups(configuration);
  }

  getBaseLayerGroups(): Observable<LayerGroup[]> {
    return this.baseLayerGroupsSubject.asObservable();
  }

  setBaseLayerGroups(groups:Array<LayerGroup>) {
    this.baseLayerGroups = groups;
    this.refreshBaseLayerGroups();
  }

  private refreshBaseLayerGroups() {
    // Send the new values so that all subscribers are updated
    this.baseLayerGroupsSubject.next(this.baseLayerGroups);
  }

  getLayers(): Observable<Layer[]> {
    return this.layersSubject.asObservable();
  }

  clearLayers(refresh:boolean) {
    while(this.layers.length) {
      this.layers.pop();
    }
    if (refresh) {
      this.refreshLayers();
    }
  }

  setLayers(layers:Array<Layer>) {
    this.layers = layers;
    this.refreshLayers();
  }

  addLayer(layer:Layer) {
    this.layers.push(layer);
    this.refreshAddLayers(layer);
  }

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

  removeLayer(layer:Layer) {
    var index = this.layers.indexOf(layer);
    this.removeLayerIndex(index);
  }

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

  removeLayerIndex(index:number) {
    var layer = this.layers[index];
    this.layers.splice(index, 1);
    this.refreshRemoveLayers(layer);
  }

  private refreshLayers() {
    // Send the new values so that all subscribers are updated
    this.layersSubject.next(this.layers);
  }

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

  changeLayerVisibility(id, visibility) {
    this.refreshLayerConfiguration(id, null, visibility, null);
  }

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

  loadSituationMapConfiguration(layers:Array<Layer>) {
    // Send the new values so that all subscribers are updated
    this.situationMapConfigurationSubject.next(layers);
  }

  getMapOptionsConfigurationListener(): Observable<MapOptionsConfiguration[]> {
    return this.mapOptionsConfigurationSubject.asObservable();
  }

  loadMapOptionsConfiguration(configuration:MapOptionsConfiguration) {
    // Send the new values so that all subscribers are updated
    this.mapOptionsConfigurationSubject.next([configuration]);
  }

}
