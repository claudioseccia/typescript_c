//CH5
//CLASSES AND INTERFACES
//Working with objects
//****************************************
//5.3 Creating a fist class
//convention is to start with uppercase char for class names
//ES6 syntax:
// class Department {
//   name: string;
//   //constructor() is executed when the object is created
//   constructor(n: string) {
//     this.name = n;
//   }
// }
// //create a first object based on the class "blueprint":
// const accounting = new Department("Accounting");
// console.log(accounting);

//****************************************
//5.4 Compiling to javascript
//changing to ES5 into tsconfig ("target": "ES5"), it will change in the compilation with the old ES5 syntax

//****************************************
//5.5 Constructor functions and the this keywork

// class Department {
//   //PROPERTIES
//   name: string;
//   //CONSTRUCTOR
//   //constructor() is executed when the object is created
//   constructor(n: string) {
//     this.name = n;
//   }
//   //METHOD
//   describe() {
//     //the this keywork make accessible all the properties inside the whole class
//     console.log("Department: " + this.name);
//   }
//   workingDescribe(this: Department) {
//     console.log("Department: " + this.name);
//   }
// }
// //create a first object based on the class "blueprint":
// const accounting = new Department("Accounting");
// accounting.describe();
// console.log(accounting);

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); //returns undefined for this.name inside describe() method

// const accountingCopyWorking = {
//   name: "DUMMY",
//   workingDescribe: accounting.workingDescribe,
// };
// accountingCopyWorking.workingDescribe(); //not working??

//****************************************
//5.6 - private and public Access Modifiers
class Department {
  //PROPERTIES
  //public and private are introduced by typescript
  name: string; //same as public name: string;
  private employees: string[] = []; //private property, also methods can be set as private
  //CONSTRUCTOR
  //constructor() is executed when the object is created
  constructor(n: string) {
    this.name = n;
  }
  //METHOD
  describe() {
    //the this keywork make accessible all the properties inside the whole class
    console.log("Department: " + this.name);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//create a first object based on the class "blueprint":
const accounting = new Department("Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");
//accounting.employees[2] = "Anna"; //without the private keyword the propery is a public property, accessible from the outside like this
accounting.describe();
accounting.printEmployeeInformation();
