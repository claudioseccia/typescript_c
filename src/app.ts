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
/*
import _ from "lodash";
declare var GLOBAL: any; //declare syntax, executed after the boundle in the index.html (defer keyword there)
console.log(_.shuffle([1, 2, 3, 4]));
console.log(GLOBAL);
*/
//****************************************
//12.04 - No Types Needed class-transformer
//normal scenario
/* 
import { Product } from "./product.model";
const products = [
  { title: "A carpet", price: 29.99 },
  { title: "A book", price: 10.99 },
];
// const p1 = new Product("A book", 99);
// console.log(p1.getInformation()); //['A book', '$99']
const loadedProducts = products.map((prod) => {
  return new Product(prod.title, prod.price);
});
for (const prod of loadedProducts) {
  console.log(prod.getInformation()); //prints the info on products
} 
*/
//CLASS-TRANSFORMER
//https://www.npmjs.com/package/class-transformer
//npm install class-transformer --save
//npm install reflect-metadata --save

import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { Product } from "./product.model";
const products = [
  { title: "A carpet", price: 29.99 },
  { title: "A book", price: 10.99 },
];
// plainToClass(class we want to convert to, data to transform)
const loadedProducts = plainToInstance(Product, products);
for (const prod of loadedProducts) {
  console.log(prod.getInformation()); //prints the info on products, same as 12.04 code
}
