//npx tsc -w
//npm start
//****************************************
//****************************************
//10.03 - Working with namespaces
//create drag-drop-interfaces.ts and move interfaces code there
//create project-model.js and move model there
//use a single namespace through all of them (ex. App), and create the same namespace in app.ts
//IMPORTANT: ENABLE: "outFile": "./dist/bundle.js" AND change "module": "commonjs", TO "module": "amd", IN tsconfig.json to allow JS transpiling in one single file
//NOW: bundle.js is created (change the import from app.js to bundle.js )
//IMPORT in index.html ./dist/bundle.js in place of ./dist/app.js
//add three slashes to import reference to a namespace
/*
//move the drag & drop interfaces to a separate file:
/// <reference path="drag-drop-iterfaces.ts" />
//move the project model to a separate file:
/// <reference path="project-model.ts" />
*/
//****************************************
//10.04 - Organizing files and folders
/*
//move the project state to a separate file:
/// <reference path="project-state.ts" />
//move validation to a separate file:
/// <reference path="validation.ts" />
//move decorators to a separate file:
/// <reference path="autobind-decorator.ts" />
*/
/* 
//organize in folders:
/// <reference path="./model/drag-drop.ts" />
/// <reference path="./model/project.ts" />
/// <reference path="./state/project-state.ts" />
/// <reference path="./util/validation.ts" />
/// <reference path="./decorators/autobind.ts" />
/// <reference path="./components/base-component.ts" />
/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" /> 
*/

//****************************************
//10.05 - A problem with namespaces Imports
//Include as a namespace reference only what is needed (best of both worlds?)

//****************************************
//10.07 - Using ES6 Modules
//remember to import all required references with .js extension!
//change "module": "commonjs", TO "module": "es2015", IN tsconfig.json to enable es6 modules AND comment "outFile"
//this will replicate the structure of typescript instead of a unique file bundle.js
//import app.js in index.html, remove defer attribute and add type="module"

//****************************************
//10.08 - Understanding various Import & Export Syntaxes

//MODULES are imported only once. It's preferred on Namespaces. With Webpack (CH11) we can also have bundling

// More-on-JS-Modules
// https://medium.com/computed-comparisons/commonjs-vs-amd-vs-requirejs-vs-es6-modules-2e814b114a0b

//****************************************
//11.04 - Installing Webpack & Important Dependencies
//run:
//npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
//
//****************************************
//11.05 - Adding Entry & Output Configuration
//in tsconfig.json:
//comment entry: "rootDir": "./src",    <-- webpack manages that
//keep: "target": "es6",  -- "module": "es2015",
//create another configuration file: webpack.config.js
//insert into that:
/*
const path = require("path");
module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,'dist')
    },
    
};
*/
//remove all .js from the imports of ALL the files, like: import { ProjectInput } from "./components/project-input";
//****************************************
//11.06 - Adding TypeScript Support with the ts-loader Package
// add these lines to module.exports in webpack.config.js:
/*
 module: {
        rules: [ //define the tests and use ts-lader excludin node_modules
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts",".js"] //bundles all ts and js extensions file
    }
*/
// go back in ts-config.json and make sure "sourceMap": true, is enabled
// to add webpack.config.js in  module.exports:
//devtools: "inline-source-map",
// go to package.json file and add to scripts:
/* 
"scripts": {
    ...
    "build": "webpack"
}
*/
// remove everything in /dist folder
//RUN: npm run build
//modify index.html to point to bundle.js: <script type="module" src="dist/bundle.js"></script>
//run: npm start <-- test the application with lite-server

//****************************************
//11.07 - Finishing the Setup & Adding webpack-dev-server
//add two environments: one for production and one for development
// add webpack-dev-server to package.json
/*
"scripts": {
    ...
    "start": "webpack-dev-server",
...
*/

//NOTE: for webpack-dev-server 4+
//https://stackoverflow.com/questions/71602863/webpack-dev-server-cannot-get
//change this in webpack.config.js
/* 
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
},
devServer: {
    static: {
        directory: path.join(__dirname, '/')
    }
}... 
*/
//AND SET THIS IN package.json:
/*
"scripts": {
    ...
    "start": "webpack serve",
    ...
*/
//IN webpack.config.js
//mode: 'development',
//will give more meaningful error messages!
//****************************************
import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
console.log("HI");
