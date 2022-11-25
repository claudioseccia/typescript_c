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

import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
