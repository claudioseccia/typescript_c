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
/*
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
*/
//****************************************
//8.3 - Working with Decorator Factories
//besides the declaration of a decorator as before we can also define a decorator factory which returns a decorator but allows us also to configure it
/*
//we can now add argumentd to this function
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString); //printed before any code in the instantiated class - runs when the class is declared (not instantiated)
    console.log(constructor);
  };
}
@Logger("LOGGING - PERSON") //EXECUTE NOW AS A FUNCTION, WITH CUSTOMIZED PARAMS
//
class Person {
  name = "Max";
  constructor() {
    console.log("creating Person object...");
  }
}
const pers = new Person();
console.log(pers);
*/
//****************************************
//8.4 - Building More Useful Decorators
//Angular uses decorators to pass in objects to specify object to elements in the dom where templates should be rendered
/*
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString); //printed before any code in the instantiated class - runs when the class is declared (not instantiated)
    console.log(constructor);
  };
}
//DECORATOR THAT DOES THINGS BEHIND THE SCENE:
function WithTemplate(template: string, hookId: string) {
  //I use _ as a placeholder, since I'm not using this parameter
  //return function (_: Function) {
  return function (constructor: any) {
    //I want to render some template (html code), to some place in the DOM
    //create a div with id of "app" inside index.html
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}
//@Logger("LOGGING - PERSON") //EXECUTE NOW AS A FUNCTION, WITH CUSTOMIZED PARAMS
@WithTemplate("<h1>My Person Object</h1>", "app")
//
class Person {
  name = "Max";
  constructor() {
    console.log("creating Person object...");
  }
}
const pers = new Person();
console.log(pers);
*/
//****************************************
//8.5 Adding Multiple Decorators
//
function Logger(logString: string): (constructor: Function) => void {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString); //printed before any code in the instantiated class - runs when the class is declared (not instantiated)
    console.log(constructor);
  };
}
//DECORATOR THAT DOES THINGS BEHIND THE SCENE:
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  //I use _ as a placeholder, since I'm not using this parameter
  //return function (_: Function) {
  return function (constructor: any) {
    console.log("Rendering template");
    //I want to render some template (html code), to some place in the DOM
    //create a div with id of "app" inside index.html
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}
//Multiple decorators are run bottom up (except the content before the factory)
@Logger("LOGGING - PERSON") //EXECUTE NOW AS A FUNCTION, WITH CUSTOMIZED PARAMS
@WithTemplate("<h1>My Person Object</h1>", "app")
//
class Person {
  name = "Max";
  constructor() {
    console.log("creating Person object...");
  }
}
const pers = new Person();
console.log(pers);
