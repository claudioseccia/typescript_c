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

import _ from "lodash";
console.log(_.shuffle([1, 2, 3, 4]));
