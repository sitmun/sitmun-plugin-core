# SITMUN Core Angular Library Usage
>  SITMUN application development using Spring and Angular 

## Table of Contents
- [Preface](#preface)
- [Requirements](#requirements)
- [Setup](#setup)
- [Application Layout](#layout)
- [Toolbar customization](#toobar)
- [Navigation customization](#navigation)
- [Home page customization](#home)
- [Adding a Map Viewer](#map)
- [Build and run (development)](#run_development)


## Preface

Spring Boot + Angular application.
SITMUN Core Angular Library Components
Angular Material Components
Application with a toolbar, a sidebar navigation, login/logout, account data editor, password change and map view components.

In order to develop an Angular Sitmun application, there are a handful of setup steps to go through that vary based on your app environment.
Generally, the steps are:

* Download the demo application repository
* Configure Spring
* Configure Angular
* Customize Application Layout
* Customize Application Navigation
* Add Components to Application

## Requirements
* Git
* Java 8 release
* Node 8.x (LTS) or greater LTS release


## Setup

### Init
* Create a folder with the proper name for your application 
* Download [SITMUN Demo application repository](https://github.com/sitmun/sitmun-demo-app/archive/master.zip) inside the folder
* From command line, go to the created folder and execute: ``git init``


### Configuring Spring 

Configure your application artifact identifier in ``./build.gradle`` file by changing `` sitmun-demo-app`` to your application artifact identifier:

```
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

Rename the java package name ``org.sitmun.app.demo`` to whatever package name you choose using a refactoring code tool (Eclipse, ...)


Create a Spring Boot configuration YML file by renaming ``./src/main/resources/.application-h2.yml`` to ``./src/main/resources/.application.yml`` and change application name property in this file:


```yml
	...
	spring:
    application:
        name: sitmun-demo-app
	...
```

In order to change application version it's required to edit ``./gradle.properties`` file and change the ``sitmun_version`` property value: 


```properties
	...
	sitmun_version=0.0.1-SNAPSHOT
	...	
```
	
### Configuring Angular

In order to change Angular application name edit ``./angular.json`` file and change the ``projects.webapp.root`` property:

```json	
	...
	"projects": {
    "webapp": {
      "root": "Sitmun Demo Application",
	...	
```


To change Angular application version it's required to edit ``./package.json`` file and change the ``version`` property value:

```json	
	...
	"version": "0.6.1",
	...	
```

### Launch development environment      

In order to set up an environment for developing the Angular application:

- From command line, go to the created folder.
- Build Spring application with `./gradlew assemble`.
- Run Spring application with `./gradlew bootRun`.
- Run Angular application with `ng serve --proxy-config proxy.conf.json` and open <http://localhost:4200>.


      
## <a name="layout">Application Layout</a>      

The application general layout is located in ``./src/main/angular/app/app.component.html`` file and consists of a toolbar with a content zone below with a left sidebar navigation:  

```html
<div class="main-container">
    <mat-toolbar color="primary">
		...
	</mat-toolbar>
    <mat-sidenav-container class="main-sidenav-container">
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

The layout is implemented using Angular Material Design components that are included in the ``.src/main/angular/app/app.module.ts`` as imports. Whatever module, component or service to be used in the application must be declared in this file. 
 
## <a name="toolbar">Customize Toolbar</a> 

The application toolbar consists of a toggle menu a home link with the appication Logo an a textear with the name of the application:

```html
	...
    <mat-toolbar color="primary">
    
    <button mat-icon-button (click)="snav.toggle()">
            <mat-icon>menu</mat-icon>
        </button>
        <button mat-button [routerLink]="['']">
            <img *ngIf="isHome" height="50px;" src="assets/logo.png">
        </button>
        <h1 [translate]="'applicationName'" fxHide.xs>Sitmun Demo App</h1> &nbsp;&nbsp; <span class="fill-remaining-space"></span> <span class="toolbar-spacer"></span>
		...
	</mat-toolbar>
            ... 
```

As we can see in the above code snippet the logo file is located at the relative path ``assets/logo.png``. We can change the logo replacing the logo file located in the ``src/main/angular/assets/`` or adding a new image file in the same folder and accordingly changing the ``src`` atributte value in the ``<img>`` tag.


We can add new components to the toolbar, for instance , a language toolset:

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
 
##<a name="navigation">Customize Navigation</a>
- app.component.html
- routes
- login
- logout
- account data editor
- password change

##<a name="home">Customize Home Component</a>
- home.component.html

##<a name="map"> Adding and configuring a MapViewer</a>

``.src/main/angular/app/app.module.ts``

```
import { MapConfigurationManagerService } from 'sitmun-plugin-core';
```

### Configure Base layers
### Configure Overlay layers
### Configure Map Extent



## <a name="run_development">Build and run (development)</a>

### With Spring Boot
- Prepare the environment with `./gradlew assemble`.
- Run `./gradlew bootRun` and open <http://localhost:8080>.


### With Docker
- Prepare the environment with `./gradlew assemble`.
- Run `./gradlew docker` to build the docker image.
- Run `./gradlew dockerRun` to start the container and open <http://localhost:8080> (wait a few seconds).
- To stop and to remove the container you can run `./gradlew dockerStop`.


