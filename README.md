# TodoListTestProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.


Run the following command to install dependencies.

    npm install


Run the following commands in two separate terminals.

The first one will start a back-end running at port 8000:

    npm run-script serve

The second will start a dev front-end running at port 4200:

    npm start


### Managing dependencies
Npm is also used to manage dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

To add a library as a runtime dependency of your application, you would run following command:

    npm install <library_name>

To add a library as a development dependency, you would run following command:

    npm install --save-dev <library_name>


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
