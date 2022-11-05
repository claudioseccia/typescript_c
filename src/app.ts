//change in tsconfig.json:
//1.set         "target": "ES6",
//2.uncomment   "experimentalDecorators": true,
//tsc -w
//npm start
//****************************************
//DECORATORS
//8.1 Module introduction
//feature useful for meta programming: not for experiece of the users but for other developers
//
//WHAT
//DECORATOR USAGE
//EXAMPLES
//****************************************
//8.2 - A First Class Decorator
//decorators in general are for classes
//decorator are just functions, applied to something (ex. a class)
//decorator runs before the class is instntiated,
//DECORATOR
function Logger(constructor: Function) {
  console.log("Logging..."); //printed before any code in the instantiated class - runs when the class is declared (not instantiated)
  console.log(constructor);
}
@Logger
//
class Person {
  name = "Max";
  constructor() {
    console.log("creating Person object...");
  }
}
const pers = new Person();
console.log(pers);
//
