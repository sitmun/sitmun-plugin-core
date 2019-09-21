# SITMUN Core Angular Library Usage <!-- omit in toc -->

> SITMUN application development using Spring and Angular

## Table of Contents <!-- omit in toc -->

- [Preface](#preface)
- [Requirements](#requirements)
- [Setup](#setup)
  - [Init](#init)
  - [Configuring Spring](#configuring-spring)
  - [Configuring Angular](#configuring-angular)
  - [Launch development environment](#launch-development-environment)
- [Application Layout](#application-layout)
- [Customize Toolbar](#customize-toolbar)
- [Customize Navigation](#customize-navigation)
- [Customize Home Component](#customize-home-component)
- [Adding and configuring a Map Component](#adding-and-configuring-a-map-component)
  - [Configure Map Extent, Scales and Tiles](#configure-map-extent-scales-and-tiles)
  - [Configure Layers](#configure-layers)
    - [Layer](#layer)
    - [OptionalParameter](#optionalparameter)
    - [LayerConfiguration](#layerconfiguration)
    - [LayerGroup](#layergroup)
  - [Configure Base layers](#configure-base-layers)
  - [Configure Overlay layers](#configure-overlay-layers)
  - [Configure Situation Map](#configure-situation-map)
- [Build and run (development)](#build-and-run-development)
  - [With Spring Boot](#with-spring-boot)
  - [With Docker](#with-docker)

## Preface

SITMUN applications are basically Angular applications on client side that communicates with Spring Boot on the server side via REST API.

In this document we will focus on the Angular client side development. SITMUN Angular application development is based on [SITMUN Core Angular Library](https://github.com/sitmun/sitmun-plugin-core/tree/master/src/main/angular-library) and [Angular Material](https://material.angular.io/) components.

In order to develop an Angular SITMUN application, there are a handful of setup steps to go through that vary based on your app environment. In order to simplify the process, we provide a demo application, that you can take advantage of it.
Generally, the steps are:

- Download the demo application repository
- Configure Spring
- Configure Angular
- Customize Application Layout
- Customize Application Navigation
- Add Components to Application

In the next sections we will see how to develop a [SITMUN Application](https://github.com/sitmun/sitmun-demo-app) consisting of a toolbar, a sidebar navigation, a login/logout component, an account data editor, a password change tool and a map component.

## Requirements

- Git
- Java 8 release
- Node 8.x (LTS) or greater LTS release

## Setup

### Init

- Create a folder with the proper name for your application.
- Download the [SITMUN Demo application repository](https://github.com/sitmun/sitmun-demo-app/archive/master.zip) (provided by us as an app template) inside the created folder.
- From the command line, go to the created folder and execute: ``git init``.

### Configuring Spring

Configure your application artifact identifier in the ``./build.gradle`` file by changing the value of the ``artifactId`` property (``sitmun-demo-app``):

```gradle
publishing {
    publications {
        mavenJava(MavenPublication) {
            groupId group
            artifactId 'sitmun-demo-app'
            version version
            from components.java
        }
    }
}
```

Rename the java package ``org.sitmun.app.demo`` to whichever package name you choose using a code refactoring code tool like Eclipse.

Create a Spring Boot configuration YML file by renaming ``./src/main/resources/application-h2.yml`` to ``./src/main/resources/application.yml`` and change the ``application`` ``name`` property:

```yml
...
spring:
    application:
        name: sitmun-demo-app
...
```

In order to change the application version it is required to edit the ``./gradle.properties`` file and change the ``sitmun_version`` property value:

```properties
...
sitmun_version=0.0.1-SNAPSHOT
...
```

### Configuring Angular

Change the Angular application name by editing the ``./angular.json`` file and changing the ``projects.webapp.root`` property:

```json
...
"projects": {
    "webapp": {
        "root": "Sitmun Demo Application",
        ...
    }
}
```

Change the Angular application version by editing the ``./package.json`` file and changing the ``version`` property value:

```json
...
"version": "0.6.1",
...
```

### Launch development environment

In order to set up an environment for developing the Angular application we have to follow these steps:

- From the command line, go to the created folder.
- Build the Spring application with `./gradlew assemble`.
- Run the Spring application with `./gradlew bootRun`.
- Run teh Angular application with `ng serve --proxy-config proxy.conf.json` and open the <http://localhost:4200> url from a browser.

## Application Layout

The application general layout is located in the ``./src/main/angular/app/app.component.html`` file and consists of a toolbar with a content zone below with a left sidebar navigation:  

```html
<div class="main-container">
    <mat-toolbar color="primary">
        ...
    </mat-toolbar>
    <mat-sidenav-container class="main-sidenav-container">
        <mat-sidenav>
            <mat-nav-list>
            ...
            </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
            <router-outlet></router-outlet>
        </mat-sidenav-content>
    </mat-sidenav-container>
</div>
```

The layout is implemented using [Angular Material Design](https://material.angular.io/) components that are included in the ``.src/main/angular/app/app.module.ts`` file as imports. Every module, component or service used in the application must be declared in this file.

## Customize Toolbar

The application toolbar consists of a toggle menu a home link with the application logo and a text area with the name of the application:

```html
...
<mat-toolbar color="primary">
    <button mat-icon-button (click)="snav.toggle()">
        <mat-icon>menu</mat-icon>
    </button>
    <button mat-button [routerLink]="['']">
        <img *ngIf="isHome" height="50px;" src="assets/logo.png">
    </button>
    <h1 [translate]="'applicationName'" fxHide.xs>Sitmun Demo App</h1>
    <span class="fill-remaining-space"></span>
    <span class="toolbar-spacer"></span>
    ...
</mat-toolbar>
...
```

As we can see in the above code snippet the logo file is located at the relative path ``assets/logo.png``. We can change the logo by replacing the logo file located in the ``src/main/angular/assets/`` or by adding a new image file in the same folder and accordingly changing the ``src`` atributte value in the ``<img>`` tag.

We can add new components to the toolbar, for instance, a language toolset:

```html
...
<button mat-stroked-button (click)="changeLanguage('ca')">CA</button>
<button mat-stroked-button (click)="changeLanguage('es')">ES</button>
<button mat-stroked-button (click)="changeLanguage('en')">EN</button>
...
```

As we can see in the above code snippet we've added  3 buttons for change application language to 3 different languages.
The language change action is triggered using the ``changeLanguage`` function. This function is defined in the ``.src/main/angular/app/app.module.ts`` file:

```ts
...
changeLanguage(locale: string ){
    this.translate.use(locale);
}
...
```

## Customize Navigation

Application navigation is defined in the ``.src/main/angular/app/app.module.ts`` file. In the Demo Application we define 4 navigation nodes/pages that are implemented with 3 SITMUN Core Angular Library components  ([``LoginComponent``](https://sitmun.github.io/doc-angular/components/LoginComponent.html), [``AccountEditComponent``](https://sitmun.github.io/doc-angular/components/AccountEditComponent.html), [``AccountChangePasswordComponent``](https://sitmun.github.io/doc-angular/components/AccountChangePasswordComponent.html)) and the Demo Application home component (``HomeComponent``):

```ts
const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'account',
        component: AccountEditComponent
    },
    {
        path: 'change-password',
        component: AccountChangePasswordComponent
    }
];
```

This pages can be accessed by the navigation links (see ``[routerLink]`` attributes in the ``a`` tags) defined in the sidebar menu defined in ``.src/main/angular/app/app.component.html``:

```html
...
<mat-nav-list>
    <span *ngIf="isLoggedIn()">
        <h3 [translate]="'menu.account'">{{'menu.account'| translate}}</h3>
        <a href=""
            [routerLink]="['/account']"
            mat-list-item>{{'account.data'| translate}}</a>
        <a href=""
            [routerLink]="['/change-password']"
            mat-list-item>{{'account.change-password'| translate}}</a>
        <a href=""
            (click)="logout()"
            mat-list-item>{{'account.closeSession'| translate}}</a>
    </span>
    <span *ngIf="!isLoggedIn()">
        <h3>
            <a href=""
                [routerLink]="['/login']"
                mat-list-item> {{'global.login'|translate}}</a>
        </h3>
    </span>
</mat-nav-list>
...
```

## Customize Home Component

Home Component is the only local component provided by our application and is rendered when application is first loaded and root navigation.
This component as any Angular component mainly consists  of 2 files: an html file with the component template (``home.component.html``) and a typescript file (``home.component.ts``) with the component class, both located at the ``.src/main/angular/app/home/`` folder.
We can customize this component by modifying this files and adding/configring SITMUN Core Angular Library components, other external components or local components developed for our application.

In the next section we'ĺl add a map viewer component ([``MapComponent``](https://sitmun.github.io/doc-angular/components/MapComponent.html)) from  SITMUN Core Angular Library to our ``HomeComponent``.

## Adding and configuring a Map Component

In order to add a map viewer component to our home component, first we have to modify ``.src/main/angular/app/app.module.ts`` and import the map configuration service ([``MapConfigurationManagerService``](https://sitmun.github.io/doc-angular/injectables/MapConfigurationManagerService.html)) configuring this service as a provider inside our application:

```ts
...
import { MapConfigurationManagerService } from 'sitmun-plugin-core';
...
providers: [
    ...
    //Map Configuration Service
    MapConfigurationManagerService
]
...
```

[``MapConfigurationManagerService``](https://sitmun.github.io/doc-angular/injectables/MapConfigurationManagerService.html) enables [``MapComponent``](https://sitmun.github.io/doc-angular/components/MapComponent.html) layer customization.
Now we can add the map component to our home component by placing the map component tag (``sitmun-map-viewer-map``) inside the home component template placed at ``.src/main/angular/app/home/``:  

```html
<sitmun-map-viewer-map
    [extent]="[256901.08041000657, 4544669.980255321, 554715.9195899934, 4703023.019744679]"
    [initialProjection]="'EPSG:25831'"></sitmun-map-viewer-map>
```

In the code above, we can see some of the map component input parameters, which are the following:

- `extent`: array of numbers representing the extent of the initial view of the map component: [minx, miny, maxx, maxy].
- `initialProjection`: code of the srs projection of the coordinates defined in extent, initialLon and initialLat
- `initialLon`: x-coordinate of initial center of the map
- `initialLat`: y-coordinate of initial center of the map
- `initialZoom`: initial zoom of the map

In order to add further configuration to the map component we have to import some required components and classes from SITMUN Core Angular Library in home component class (``home.component.ts``):

```ts
import {Principal,
        LoginService,
        MapConfigurationManagerService,
        Layer,
        LayerGroup,
        MapOptionsConfiguration,
        OptionalParameter,
        MapComponentStatus} from 'sitmun-plugin-core';
```

Then we inject [``MapConfigurationManagerService``](https://sitmun.github.io/doc-angular/injectables/MapConfigurationManagerService.html) in HomeComponent creation by adding to the constructor method:

```ts
constructor(
...
    private mapConfigurationManagerService: MapConfigurationManagerService,
...
)
```

In the next sections we'ĺl see how we can configure other aspects of the map using [``MapConfigurationManagerService``](https://sitmun.github.io/doc-angular/injectables/MapConfigurationManagerService.html).

### Configure Map Extent, Scales and Tiles

If we want to configure map extent, scales and tiles, then we´ll have to create a [``MapOptionsConfiguration``](https://sitmun.github.io/doc-angular/classes/MapOptionsConfiguration.html) object and set the proper values:

- `scales`: List of map scales
- `projections`: List of available crs
- `minScale`: Minimum scale
- `maxScale`: Maximum scale
- `extent`: Initial Extent
- `maxExtent`: Maximum Extent
- `tileWidth`: tile width
- `tileHeight`: tile height

In the code below we can see an example configuration of [``MapOptionsConfiguration``](https://sitmun.github.io/doc-angular/classes/MapOptionsConfiguration.html):

```ts
 // Set map configuration
    let mapOptionsConfiguration = new MapOptionsConfiguration();
    mapOptionsConfiguration.scales = [
        1000000, 700000, ​500000, 400000,
        300000, 200000, 100000, 50000, 25000,
        20000, 10000, 5001, 2500, 1000, 500].join();
    mapOptionsConfiguration.projections = ["EPSG:25831"].join();
    mapOptionsConfiguration.minScale = 3000;
    mapOptionsConfiguration.maxScale = 3000000;
    //Overrides the directive parameter
    mapOptionsConfiguration.extent = [
        256901.08041000657, // xMin
        4544669.980255321,  // yMin
        554715.9195899934,  // xMax
        4703023.019744679   // yMax
    ];
    mapOptionsConfiguration.maxExtent = [
        320000,     // xMin
        4561229,    // yMin
        491617,     // xMax
        4686464     // yMax
    ];
    mapOptionsConfiguration.tileWidth = 500;
    mapOptionsConfiguration.tileHeight = 500;

    this.mapConfigurationManagerService
        .loadMapOptionsConfiguration(mapOptionsConfiguration);
```

### Configure Layers

In order to add and configure layers y layer groups to the map component we'll have use the following classes by the SITMUN Core Angular Library.

#### Layer

The [``Layer``](https://sitmun.github.io/doc-angular/classes/Layer.html) class configure Layer data and displaying configuration by setting the following parameters:

- `visibility`: Visibility
- `opacity`: Transparency (Transparent) 0-1 (Opaque)
- `title`: Title
- `id`: Id to index
- `serverName`: Service Name
- `attributions`: Service attributions
- `format`: Request format (image / jpg ...)
- `version`: Request service version
- `url`: Service url
- `isBaseLayer`: Us base layer?
- `name`: Request layer name
- `tiled`: Is tiled?
- `desc`: Description
- `url_transparent`: Transparent request parameter?
- `url_bgcolor`: Request Background parameter color (Hexa)
- `url_exception`: Request Exception URL
- `extent`: Extent for tiled services
- `tileHeight`: Tile height (if not defined, the default map is taken)
- `tileWidth`: Tile width (if not defined, the default map is taken)
- `queryable`: Enabled for GetFeatureInfo requests (enabled to use the viewer features information tool)
- `minimumScale`: Minimum scale
- `maximumScale`: Maximum scale
- `projections`: List of available CRS
- `infoUrl`: Features information URL
- `metadataUrl`: Metadata information URL
- `legendUrl`: Legend URL
- `optionalParameters`: Array of OptionalParameter object that defines other optional parameter-value pairs for the request (TIME ...)

#### OptionalParameter

The [``OptionalParameter``](https://sitmun.github.io/doc-angular/classes/OptionalParameter.html) class configure parameter-value pair to add to the request layer URL by setting the following parameters:

- `key`: Parameter name
- `value`: Parameter value

#### LayerConfiguration

The [``LayerConfiguration``](https://sitmun.github.io/doc-angular/classes/LayerConfiguration.html)  lass modify the configuration of a layer when interacting with the map (make visible, move the layer ...) by setting the following parameters:

- `id`: Identifier to index
- `visibility`: Layer visibility
- `opacity`: Layer transparency (Transparent) 0-1 (Opaque)
- `position`: Layer position

#### LayerGroup

The [``LayerGroup``](https://sitmun.github.io/doc-angular/classes/LayerGroup.html) class configure a Layer group by setting the following parameters:

- `active`: Initially activated (all visible layers)
- `name`: Group Name
- `id`: Group id
- `layers`: Array of child Layers

### Configure Base layers

To configure the base layers of the map we must use the ``loadBaseLayersConfiguration`` method of [``MapConfigurationManagerService``](https://sitmun.github.io/doc-angular/injectables/MapConfigurationManagerService.html), to which we will pass as an parameter an array of objects of type [``LayerGroup``](https://sitmun.github.io/doc-angular/classes/LayerGroup.html) each of them with the corresponding [``Layer``](https://sitmun.github.io/doc-angular/classes/Layer.html) objects defining the layers to load.

In the code below we can see an example configuration of the map component base layers:

```ts
let baseLayersConfiguration = new Array<LayerGroup>();

var layerGroup = new LayerGroup();
layerGroup.id = "map";
layerGroup.name = "MAP"; //Name to be shown in the base layer selector tool
layerGroup.layers = [];

//Each layer will be a request to a map service
var layer = new Layer();
layer["visibility"] = false;
// Sets if this layer's service could be requested for additional information of a selected location on the map
layer["queryable"] = false;
// Opacity for this layer image in the map
layer["opacity"] = 1;
layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
// WMS request transparent parameter
layer["url_transparent"] = "TRUE";
// WMS request background color parameter
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Mapa - imgmapa";
layer["serverName"] = "1";
// Layer identifier to be used in layer indexation and retrieval
layer["id"] = "1";
// WMS request image format parameter
layer["format"] = "png";
// WMS request service version parameter
layer["version"] = "1.1.1";
// Service request url
layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
layer["isBaseLayer"] = false;
// Service layers to be requested
layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_BTE50_412A,M_EDIF_1M_611A,M_XHE50_111L,M_BTE50_313L_FFCC,M_EIX,M_EIX_sobre_EDIF,M_XCE50_AUTO,M_XCE50_BASICA,M_XCE50_LOCAL,M_XCE50_ALTRES,M_XCE50_AUTO_f,M_XCE50_BASICA_f,M_XCE50_LOCAL_f,M_XCE50_ALTRES_f,M_MUNIS_f,M_MUNIS";
// Sets if this layer will be represented by an only image covering the whole map area or by tile set
layer["tiled"] = false;
layerGroup.layers.push(layer);

layer = new Layer();
layer["visibility"] = false;
layer["queryable"] = false;
layer["opacity"] = 1;
layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Mapa - imgmapa_et";
layer["serverName"] = "2";
layer["id"] = "2";
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
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Mapa - imgeix";
layer["serverName"] = "3";
layer["id"] = "3";
layer["format"] = "png";
layer["version"] = "1.1.1";
layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
layer["isBaseLayer"] = false;
layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET";
layer["tiled"] = false;
layerGroup.layers.push(layer);

baseLayersConfiguration.push(layerGroup);

layerGroup = new LayerGroup();
layerGroup.id = "hybrid";
layerGroup.name = "HYBRID";
layerGroup.layers = [];

layer = new Layer();
layer["visibility"] = false;
layer["queryable"] = false;
layer["opacity"] = 1;
layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
//For tiled services the extent of the available data must be defined in order to calculate corretly its tile set
layer["extent"] = [254904.96, 4484796.89, 530907.3, 4749795.1];
layer["title"] = "Base Aerial - ICC2";
layer["serverName"] = "4";
layer["id"] = "4";
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
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0xFEFEFE";
layer["title"] = "Base Hybrid - imghibrid_fons";
layer["serverName"] = "5";
layer["id"] = "5";
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
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Hybrid - imghibrid_ctra";
layer["serverName"] = "6";
layer["id"] = "6";
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
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Hybrid - imghibrid_et";
layer["serverName"] = "7";
layer["id"] = "7";
layer["format"] = "png";
layer["version"] = "1.1.1";
layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
layer["isBaseLayer"] = false;
layer["name"] = "M_MUNIS";
layer["tiled"] = false;
layerGroup.layers.push(layer);

baseLayersConfiguration.push(layerGroup);

this.mapConfigurationManagerService.loadBaseLayersConfiguration(baseLayersConfiguration);
```

### Configure Overlay layers

To configure the overlay layers of the map we must use the ``loadLayersConfiguration`` method of [``MapConfigurationManagerService``](https://sitmun.github.io/doc-angular/injectables/MapConfigurationManagerService.html), to which we will pass as an parameter an array of objects of type [``Layer``](https://sitmun.github.io/doc-angular/classes/Layer.html) objects defining the layers to load.

In the code below we can see an example configuration of the map component overlay layers:

```ts
let overlayLayersConfiguration = new Array<Layer>();

layer = new Layer();
layer["visibility"] = true;
layer["queryable"] = true;
// Should a layer have this attribue set to true a
// Get Feature Information tool will beshown on the map to
// retrieve the available information of a point clicked on the map
layer["opacity"] = 0.2;
layer["attributions"] = "© IGME (Instituto Geologico y Minero de España)";
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Geology";
layer["serverName"] = "8";
layer["id"] = "8";
layer["format"] = "png";
layer["version"] = "1.3.0";
layer["url"] = "http://mapas.igme.es/gis/services/Cartografia_Geologica/IGME_Geologico_1M/MapServer/WMSServer";
layer["isBaseLayer"] = false;
layer["name"] = "0";
layer["tiled"] = false;

overlayLayersConfiguration.push(layer);

layer = new Layer();
layer["visibility"] = true;
layer["queryable"] = true;
layer["opacity"] = 1.0;
layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Transport";
layer["serverName"] = "9";
layer["id"] = "9";
layer["format"] = "png";
layer["version"] = "1.3.0";
layer["url"] = "http://servicios.idee.es/wms-inspire/transportes";
layer["isBaseLayer"] = false;
layer["name"] = "TN.RailTransportNetwork.RailwayLink";
layer["tiled"] = false;

overlayLayersConfiguration.push(layer);

this.mapConfigurationManagerService.loadLayersConfiguration(overlayLayersConfiguration);
```

### Configure Situation Map

To configure the situation map of the map component we must use the ``loadSituationMapConfiguration`` method of [``MapConfigurationManagerService``](https://sitmun.github.io/doc-angular/injectables/MapConfigurationManagerService.html). The [``Layer``](https://sitmun.github.io/doc-angular/classes/Layer.html), to which we will pass as an parameter an array of objects of type The [``LayerGroup``](https://sitmun.github.io/doc-angular/classes/LayerGroup.html)  each of them with the corresponding [``Layer``](https://sitmun.github.io/doc-angular/classes/Layer.html) objects defining the layers to load as situation map.

In the code below we can see an example configuration of the map component situation map:

```ts
// Set Overview Map (Situation map tool), if left undefined the currently displayed baselayer group configuration will be displayed in
// the situation map tool
let situationMapConfiguration = new Array<Layer>();

layer = new Layer();
layer["visibility"] = true;
layer["queryable"] = false;
layer["opacity"] = 1.0;
layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Mapa - imgeix";
layer["serverName"] = "10";
layer["id"] = "10";
layer["format"] = "png";
layer["version"] = "1.1.0";
layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
layer["isBaseLayer"] = false;
layer["name"] = "M_EIX_ET,M_EDI_ET,M_MUNIS_ET";
layer["tiled"] = false;

situationMapConfiguration.push(layer);

layer = new Layer();
layer["visibility"] = true;
layer["queryable"] = false;
layer["opacity"] = 1.0;
layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Mapa - imgmapa";
layer["serverName"] = "10";
layer["id"] = "10";
layer["format"] = "png";
layer["version"] = "1.1.0";
layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
layer["isBaseLayer"] = false;
layer["name"] = "M_PROV_FONS,M_EURB_250M,M_EDIF_1M_141A,M_BTE50_412A,M_EDIF_1M_611A,M_XHE50_111L,M_BTE50_313L_FFCC";
layer["tiled"] = false;

situationMapConfiguration.push(layer);

layer = new Layer();
layer["visibility"] = true;
layer["queryable"] = false;
layer["opacity"] = 1.0;
layer["attributions"] = "© Institut Cartogràfíc i Geològic de Catalunya";
layer["url_transparent"] = "TRUE";
layer["url_bgcolor"] = "0x000000";
layer["title"] = "Base Mapa - imgmapa_et";
layer["serverName"] = "10";
layer["id"] = "10";
layer["format"] = "png";
layer["version"] = "1.1.0";
layer["url"] = "http://sitmun.diba.cat/arcgis/services/PUBLIC/GCA_WEB/MapServer/WMSServer";
layer["isBaseLayer"] = false;
layer["name"] = "M_MUNIS";
layer["tiled"] = false;

situationMapConfiguration.push(layer);

this.mapConfigurationManagerService.loadSituationMapConfiguration(situationMapConfiguration);
```

## Build and run (development)

### With Spring Boot

- Build with `./gradlew assemble`.
- Run `./gradlew bootRun` and open <http://localhost:8080>.

### With Docker

- Build  with `./gradlew assemble`.
- Run `./gradlew docker` to build the docker image.
- Run `./gradlew dockerRun` to start the container and open <http://localhost:8080> (wait a few seconds).
- To stop and to remove the container you can run `./gradlew dockerStop`.
