//npm start
//****************************************
//12.02 - Using JavaScript ( ) Libraries with TypeScript
//install a library that does not use typescript, ex. Lodash
//npm install --save lodash
//it won't work, because lodash is not written in typescript - typescript throws an error
//IMPORTANT: to make it work, change in tsconfig.json: "noEmitOnError": false AND "moduleResolution": "node",
//an error during the import is still thrown but we can run the code with npm start
//do: npm i --save-dev @types/lodash
//now works
//IMPORTANT: not always there is a @types/lodash, but can have a check in this repo: https://github.com/DefinitelyTyped/DefinitelyTyped
//seach for @types/ANYPOPULARJAVASCRIPTLIBRARY, ex: @types/jquery
//
//****************************************
//****************************************
//12.03 - Using declare as a Last Resort
//add a script inside the body of index.html, and then use "declare var" syntax to get the set globally variable value

import _ from "lodash";
declare var GLOBAL: any; //declare syntax, executed after the boundle in the index.html (defer keyword there)
console.log(_.shuffle([1, 2, 3, 4]));
console.log(GLOBAL);
