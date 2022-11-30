# UdacityMyStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.
This is a project destinated to complete the angular module of FullStack Javascritpt Developer nanodegree.

## Installation

Node version: 16.18.0
Npm version: 8.19.2

If you are using NVM, run `nvm install` to install the required version.

Run `npm install` to install package and dependencies

## Development server

### Run the local fake backend server

This project includes **json-server** to provide a fake REST api.

Follow these steps to setup the local backend server:

1 - Open a terminal

2 - Access the root folder of the application

3 - Run the command `npm run backend`

Note: This command will block the terminal, open another terminal to run the angular application

### Run the application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Additional Info

### Json Server

This project includes the json server based on `data.json` file that is in root folder. This package emulates a REST api based on a json file, notice that the `data.json` file has two arrays `Products` and `Cart` these are the two entities managed by the applications.
Also notice that to run the application it needs to run `npm start` instead of `ng serve` (check `package.json` file)
