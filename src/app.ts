//CH5
//CLASSES AND INTERFACES
//Working with objects
//****************************************
//5.3 Creating a fist class
//convention is to start with uppercase char for class names
//ES6 syntax:
class Department {
  name: string;
  //constructor() is executed when the object is created
  constructor(n: string) {
    this.name = n;
  }
}
//create a first object based on the class "blueprint":
const accounting = new Department("Accounting");
console.log(accounting);

//****************************************
//5.4 Compiling to javascript
//changing to ES5 into tsconfig ("target": "ES5"), it will change in the compilation with the old ES5 syntax
