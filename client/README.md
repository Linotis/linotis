# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Main structure

```
src/
├─ app/
│  ├─ core/ 
│  ├─ data/
│  ├─ layout/
│  ├─ modules/
│  ├─ shared/
├─ styles/

```
`core` - This module is for classes used by app.module. Resources which are always loaded such as route guards, HTTP interceptors, and application level services.

`data` - The data is a top level directory and holds the types (models/entities) and services (repositories) for data consumed by the application.

`layout` - The layout directory contains one or more components which act as a layout or are parts of a layout.

`modules` - The modules directory contains a collection of modules which are each independent of each other. This allows Angular to load only the module it requires to display the request thereby saving bandwidth and speeding the entire application.

`shared` - The shared module contains classes and resources which are used in more than one dynamically loaded module. By always loading with the application the shared components are ready whenever a module requests them.

`styles` -The styles directory is used to store scss style sheets for the application. It can contain themes, Bootstrap, Angular Material, and any other styles.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
