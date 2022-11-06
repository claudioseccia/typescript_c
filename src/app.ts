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
/*
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
*/
//****************************************
//8.6 - Diving into Property Decorators
/*
//simple decorator (not factory)
//add a decorator to a property
//receives two arguments:
//target: the prototype of the object (set to any since we dont' know the structure of the class)
//the decorator executes before the Product class has being instantiated
function Log(target: any, propertyName: string | symbol) {
  console.log("Property decorator");
  console.log(target); //prints prototype of the object
  console.log(propertyName); //prints the property name "title"
}
class Product {
  @Log
  title: string;
  private _price: number;
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price value - should be positive");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
*/
//****************************************
//8.7 - Accessor & Parameter Decorators
//we can also write decorators to accessors (get and set)
/* 
function Log(target: any, propertyName: string | symbol) {
  console.log("Property decorator");
  console.log(target); //prints prototype of the object
  console.log(propertyName); //prints the property name "title"
}
//decorator for accessor (it receives three arguments: target, name and descriptor)
//note: PropertyDescriptor is a type from typescript
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", descriptor);
}
//decorator for method
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Method decorator!");
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", descriptor);
}

//decorator for parameter
function Log4(target: any, name: string, position: number) {
  console.log("Parameter decorator!");
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", position);
}

class Product {
  @Log
  title: string;
  private _price: number;
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price value - should be positive");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
} 
*/
//****************************************
//8.8 - When Do Decorators Execute
//all decorators run without instantiating the class, they all execute when we define the class!!!
//they allow to set additional behind the scenes setup work when a class is defined
//ex.
// const p1 = new Product("Book", 19);
// const p2 = new Product("Book2", 29);
//nothing appens as driven by decorators: everything is already run before instantiation of the class
//
//****************************************
//8.9 - Returning (and changing) a Class in a Class Decorator
//decorators can also return values ( in this case a decorator factory )
//decorator for class
function WithTemplate(template: string, hookId: string) {
  //create a generic T that extends a new object with a property string
  //..._ spreads any parameter. _ is used as a special char to define a var even if it will not be used
  return function <T extends { new (..._: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //RETURN VALUE
    //in this example a class extending the original constuctor with some logic
    //in this way I need to instantiate the object so to create the instance object inside the Decorator
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template...");
        //added logic inside constructor
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    }; //I return a constructor based on the original constructor function
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";
  constructor() {
    console.log("creating Person object...");
  }
}
//if we comment this code THE LOGIC INSIDE THE DECORATOR WILL NOT BE EXECUTED!
const pers = new Person();
console.log(pers);

//****************************************
//8.10 - Other Decorator Return Types
//
//NOTE: decorators that return something are decorator you add to methods and to accessors
//return values on decorators for properties and parameters will be ignored
//we can return on Log3 (method decorator) and Log2 (accessor decorator) a property descriptor
//we can assign a value set it writable or not
//
function Log(target: any, propertyName: string | symbol) {
  console.log("Property decorator");
  console.log(target); //prints prototype of the object
  console.log(propertyName); //prints the property name "title"
}
//decorator for accessor (get and set) - it receives three arguments: target, name and descriptor
//note: PropertyDescriptor is a type from typescript
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", descriptor);
}
//decorator for method
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Method decorator!");
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", descriptor);
}

//decorator for parameter
function Log4(target: any, name: string, position: number) {
  console.log("Parameter decorator!");
  console.log("target", target);
  console.log("name", name);
  console.log("descriptor", position);
}

class Product {
  @Log
  title: string;
  private _price: number;
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price value - should be positive");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
const p1 = new Product("Book", 19);
const p2 = new Product("Book2", 29);

//****************************************
//8.11 - Example Creating an Autobind Decorator
//we name target and name with _ and _2 since we're not using these paraemeters
function AutoBind(
  _: any,
  _2: string | Symbol | number,
  descriptor: PropertyDescriptor
) {
  //set this to the method of the object it belongs
  const originalMethod = descriptor.value;
  //get method: triggered by the object it belongs
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); //this will refer to the object on wich we originally defined the method
      return boundFn;
    },
  };
  return adjDescriptor;
}
class Printer {
  message = "This works!";
  //add AutoBind to showMessage method
  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();
p.showMessage(); //WORKS
//
const button = document.querySelector("button");
//button?.addEventListener("click", p.showMessage); //NOT WORKING! not triggering console.log! - with eventListener we lost the this keyword
//vanilla JS solution:
//button?.addEventListener("click", p.showMessage.bind(p)); //WORKS - clicking the button the showMessage method is triggered
//
//with AutoBind now working! (same as the manual binding above!):
button?.addEventListener("click", p.showMessage);
