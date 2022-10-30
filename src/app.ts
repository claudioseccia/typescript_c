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
/*
class Department {
  //PROPERTIES
  //public and private are introduced by typescript
  private name: string; //name: string;  --> same as public name: string;
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
*/
//****************************************
//5.7 - Shorthand Initialization
/* 
class Department {
  //PROPERTIES
  private employees: string[] = []; //private property, also methods can be set as private
  //CONSTRUCTOR
  //constructor() is executed when the object is created, here with shorthand initialization
  constructor(private id: string, private name: string) {}
  //METHOD
  describe() {
    //the this keywork make accessible all the properties inside the whole class
    console.log(`Department whith id ${this.id} is: ${this.name}`);
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
const accounting = new Department("1", "Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");
//accounting.employees[2] = "Anna"; //without the private keyword the propery is a public property, accessible from the outside like this
accounting.describe();
accounting.printEmployeeInformation();
*/
//
//****************************************
//5.8 - readonly Properties
/*
class Department {
  //PROPERTIES
  //readonly is introduced by typescript to make a property or a method not only private but not changable therefore
  // private readonly id: string
  //NOTE: readonly IS ADDED BY TYPESCRIPT, it doesn't exist in javascript - it's an extry type safety check
  private employees: string[] = []; //private property, also methods can be set as private
  //CONSTRUCTOR
  //constructor() is executed when the object is created, here with shorthand initialization
  constructor(private readonly id: string, private name: string) {}
  //METHOD
  describe() {
    //the this keywork make accessible all the properties inside the whole class
    console.log(`Department whith id ${this.id} is: ${this.name}`);
  }
  addEmployee(employee: string) {
    //this.id = 'd2';   //!!!ERROR!!! id is a readonly property
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//create a first object based on the class "blueprint":
const accounting = new Department("1", "Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");
//accounting.employees[2] = "Anna"; //without the private keyword the propery is a public property, accessible from the outside like this
accounting.describe();
accounting.printEmployeeInformation();
*/
//****************************************
//5.9 - Inheritance
/*
class Department {
  //PROPERTIES
  //readonly is introduced by typescript to make a property or a method not only private but not changable therefore
  // private readonly id: string
  //NOTE: readonly IS ADDED BY TYPESCRIPT, it doesn't exist in javascript - it's an extry type safety check
  private employees: string[] = []; //private property, also methods can be set as private
  //CONSTRUCTOR
  //constructor() is executed when the object is created, here with shorthand initialization
  constructor(private readonly id: string, private name: string) {}
  //METHOD
  describe() {
    //the this keywork make accessible all the properties inside the whole class
    console.log(`Department whith id ${this.id} is: ${this.name}`);
  }
  addEmployee(employee: string) {
    //this.id = 'd2';   //!!!ERROR!!! id is a readonly property
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//ITDepartment inherits Department
class ITDepartment extends Department {
  //we need to create a dedicated constructor otherwise the Department one will be used
  constructor(id: string, public admins: string[]) {
    //in this example we just want the "IT" department to be hardcoded in the name property
    super(id, "IT"); //super calls the parent class constructor
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "ACCOUNTING");
  }
  addReport(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }
}
//create a first object based on the class "blueprint":
const generalDpt = new Department("d1", "generalDpt");
generalDpt.addEmployee("Max");
generalDpt.addEmployee("Manu");
generalDpt.describe();
generalDpt.printEmployeeInformation();

const it = new ITDepartment("it1", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
it.describe();
it.printEmployeeInformation();
console.log(it);

const accounting = new AccountingDepartment("acc1", []);
accounting.addReport("Something went wrong!");
accounting.printReports();
*/
//****************************************
//5.10 - Overriding properties & the protected modifier
/*
//we can override methods or properties of our base class
class Department {
  //PROPERTIES
  //readonly is introduced by typescript to make a property or a method not only private but not changable therefore
  // private readonly id: string
  //NOTE: readonly IS ADDED BY TYPESCRIPT, it doesn't exist in javascript - it's an extry type safety check
  // private employees: string[] = []; //private property, also methods can be set as private
  protected employees: string[] = []; //makes the property accessible to the extending classes
  //CONSTRUCTOR
  //constructor() is executed when the object is created, here with shorthand initialization
  constructor(private readonly id: string, private name: string) {}
  //METHOD
  describe() {
    //the this keywork make accessible all the properties inside the whole class
    console.log(`Department whith id ${this.id} is: ${this.name}`);
  }
  addEmployee(employee: string) {
    //this.id = 'd2';   //!!!ERROR!!! id is a readonly property
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//ITDepartment inherits Department
class ITDepartment extends Department {
  //we need to create a dedicated constructor otherwise the Department one will be used
  constructor(id: string, public admins: string[]) {
    //in this example we just want the "IT" department to be hardcoded in the name property
    super(id, "IT"); //super calls the parent class constructor
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "ACCOUNTING");
  }
  //OVERRIDES THE Department addEmployee method:
  addEmployee(name: string): void {
    //adds a dummy custom logic just as an example
    if (name === "Max") {
      return;
    }
    this.employees.push(name); //throws an error if we don't set employees from private to protected in the Department class
  }
  addReport(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }
}
//create a first object based on the class "blueprint":
const generalDpt = new Department("d1", "generalDpt");
generalDpt.addEmployee("Max");
generalDpt.addEmployee("Manu");
generalDpt.describe();
generalDpt.printEmployeeInformation();

const it = new ITDepartment("it1", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
it.describe();
it.printEmployeeInformation();
console.log(it);

const accounting = new AccountingDepartment("acc1", []);
accounting.addEmployee("Max"); //this is ignored due to the dummy logic in the extended method of the Accounting class
accounting.addEmployee("Manu");
accounting.addReport("Something went wrong!");
accounting.printReports();
accounting.printEmployeeInformation();
*/

//****************************************
//5.11 - Getters & Setters
//tsc -w
//npm start

//so far all the main functionalities are provided by modern javascript, except protected and type assignment
//we can override methods or properties of our base class
/*
class Department {
  //PROPERTIES
  //readonly is introduced by typescript to make a property or a method not only private but not changable therefore
  // private readonly id: string
  //NOTE: readonly IS ADDED BY TYPESCRIPT, it doesn't exist in javascript - it's an extry type safety check
  // private employees: string[] = []; //private property, also methods can be set as private
  protected employees: string[] = []; //makes the property accessible to the extending classes

  //STATIC PROPERTY
  static fiscalYear = 2020; //NOT available inside the class like this.fiscalYear

  //CONSTRUCTOR
  //constructor() is executed when the object is created, here with shorthand initialization
  constructor(protected readonly id: string, private name: string) {
    // console.log(this.fiscalYear); //NOT WORKING, fiscalYear is STATIC
    console.log(
      "access a static method inside the class - fiscalYear",
      Department.fiscalYear
    ); //WORKING
  }

  //STATIC METHOD
  static createEmployee(name: string) {
    return { name: name };
  }
  //METHOD
  describe() {
    //the this keywork make accessible all the properties inside the whole class
    console.log(`Department whith id ${this.id} is: ${this.name}`);
  }
  addEmployee(employee: string) {
    //this.id = 'd2';   //!!!ERROR!!! id is a readonly property
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//ITDepartment inherits Department
class ITDepartment extends Department {
  //we need to create a dedicated constructor otherwise the Department one will be used
  constructor(id: string, public admins: string[]) {
    //in this example we just want the "IT" department to be hardcoded in the name property
    super(id, "IT"); //super calls the parent class constructor
  }
}

class AccountingDepartment extends Department {
  //properties
  private lastReport: string;
  //getter
  get mostRecentReport() {
    if (this.lastReport) {
      //encapsulate returning a private property
      return this.lastReport;
    } else {
      throw new Error("No report found.");
    }
  }
  //setter
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }
  //constructor
  constructor(id: string, private reports: string[]) {
    super(id, "ACCOUNTING");
    this.lastReport = reports[0];
  }
  //OVERRIDES THE Department addEmployee method:
  addEmployee(name: string): void {
    //adds a dummy custom logic just as an example
    if (name === "Max") {
      return;
    }
    this.employees.push(name); //throws an error if we don't set employees from private to protected in the Department class
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
  //this methods overrides the one on the parent class
  describe() {
    console.log(`Accounting Department - ID: ${this.id}`);
  }
}
//create a first object based on the class "blueprint":
const generalDpt = new Department("d1", "generalDpt");
generalDpt.addEmployee("Max");
generalDpt.addEmployee("Manu");
generalDpt.describe();
generalDpt.printEmployeeInformation();

const it = new ITDepartment("it1", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
it.describe();
it.printEmployeeInformation();
console.log(it);

const accounting = new AccountingDepartment("acc1", []);
accounting.addEmployee("Max"); //this is ignored due to the dummy logic in the extended method of the Accounting class
accounting.addEmployee("Manu");
//GETTER
// console.log(accounting.mostRecentReport); //GETTER access like a normal property -- throws our custom error in the getter
//SETTER
// accounting.mostRecentReport = ""; //SETTER -- throws custom Error
accounting.mostRecentReport = "Year End Report"; //SETTER
//GETTER
// console.log(accounting.mostRecentReport); //GETTER prints out our last report using the getter
//add report normal function (not accessing the last one)
accounting.addReport("Something went wrong!");
//GETTER
console.log(accounting.mostRecentReport); //GETTER prints out our last report using the getter
accounting.printReports();
accounting.printEmployeeInformation();
*/
//****************************************
//5.12 - Static Methods & Properties

//static properties and methods allows you to add properties and methods to a class which are not accessed through an instance of the class
//no need to call the new Obj
//it's part of ES6

//ex.Math object
//you don't have to instantiate the Math object like: const example = new Math(); but are accessible directly
const pi = Math.PI; // access to a static property
const pow = Math.pow(2, 3); //same as the ** operator 2**3
console.log("pi", pi, "pow", pow);

//SEE THE createEmployee METHOD IN THE DEPARTMENT CLASS
// const employee1 = Department.createEmployee("Frank");
// console.log("static method to access employee1", employee1);
// //we call it directly on the class without the new keyword
// const fiscalYr = Department.fiscalYear;
// console.log("static property fiscalYear", fiscalYr);

//****************************************
//5.13 - Abstract Classes
//accounting.describe(); //accessible from extending classes if not set as an abstract method into an abstract class
/*
abstract class Department {
  //PROPERTIES
  //readonly is introduced by typescript to make a property or a method not only private but not changable therefore
  // private readonly id: string
  //NOTE: readonly IS ADDED BY TYPESCRIPT, it doesn't exist in javascript - it's an extry type safety check
  // private employees: string[] = []; //private property, also methods can be set as private
  protected employees: string[] = []; //makes the property accessible to the extending classes

  //STATIC PROPERTY
  static fiscalYear = 2020; //NOT available inside the class like this.fiscalYear

  //CONSTRUCTOR
  //constructor() is executed when the object is created, here with shorthand initialization
  constructor(protected readonly id: string, private name: string) {}

  //STATIC METHOD
  static createEmployee(name: string) {
    return { name: name };
  }
  //ABSTRACT METHOD
  //it has to be implemented in any class extending Department
  abstract describe(this: Department): void; //NO IMPLEMENTATION IN THE ABSTRACT METHOD
  addEmployee(employee: string) {
    //this.id = 'd2';   //!!!ERROR!!! id is a readonly property
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.name);
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//ITDepartment inherits Department
class ITDepartment extends Department {
  //we need to create a dedicated constructor otherwise the Department one will be used
  constructor(id: string, public admins: string[]) {
    //in this example we just want the "IT" department to be hardcoded in the name property
    super(id, "IT"); //super calls the parent class constructor
  }
  //ABSTRACT CLASS IMPLEMENTATION
  describe() {
    console.log("IT Department" + this.id);
  }
}

class AccountingDepartment extends Department {
  //properties
  private lastReport: string;
  //getter
  get mostRecentReport() {
    if (this.lastReport) {
      //encapsulate returning a private property
      return this.lastReport;
    } else {
      throw new Error("No report found.");
    }
  }
  //setter
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }
  //constructor
  constructor(id: string, private reports: string[]) {
    super(id, "ACCOUNTING");
    this.lastReport = reports[0];
  }

  //OVERRIDES THE Department addEmployee method:
  addEmployee(name: string): void {
    //adds a dummy custom logic just as an example
    if (name === "Max") {
      return;
    }
    this.employees.push(name); //throws an error if we don't set employees from private to protected in the Department class
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
  //this methods overrides the one on the parent class
  describe() {
    console.log(`Accounting Department - ID: ${this.id}`);
  }
}
//create a first object based on the class "blueprint":
//const generalDpt = new Department("d1", "generalDpt"); //ABSTRACT CLASS CANNOT BE INSTANTIATED!!!

const it = new ITDepartment("it1", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
it.describe();
it.printEmployeeInformation();
console.log(it);

const accounting = new AccountingDepartment("acc1", []);
accounting.addEmployee("Max"); //this is ignored due to the dummy logic in the extended method of the Accounting class
accounting.addEmployee("Manu");
//GETTER
// console.log(accounting.mostRecentReport); //GETTER access like a normal property -- throws our custom error in the getter
//SETTER
// accounting.mostRecentReport = ""; //SETTER -- throws custom Error
accounting.mostRecentReport = "Year End Report"; //SETTER
//GETTER
// console.log(accounting.mostRecentReport); //GETTER prints out our last report using the getter
//add report normal function (not accessing the last one)
accounting.addReport("Something went wrong!");
//GETTER
console.log(accounting.mostRecentReport); //GETTER prints out our last report using the getter
accounting.printReports();
accounting.printEmployeeInformation();
*/
//****************************************
//5.14 - Singletons & Private Constructors
//singleton: we ensure that we have one and only one instance of a class
abstract class Department {
  //PROPERTIES
  //readonly is introduced by typescript to make a property or a method not only private but not changable therefore
  // private readonly id: string
  //NOTE: readonly IS ADDED BY TYPESCRIPT, it doesn't exist in javascript - it's an extry type safety check
  // private employees: string[] = []; //private property, also methods can be set as private
  protected employees: string[] = []; //makes the property accessible to the extending classes

  //STATIC PROPERTY
  static fiscalYear = 2020; //NOT available inside the class like this.fiscalYear

  //CONSTRUCTOR
  //constructor() is executed when the object is created, here with shorthand initialization
  constructor(protected readonly id: string, private name: string) {}

  //STATIC METHOD
  static createEmployee(name: string) {
    return { name: name };
  }
  //ABSTRACT METHOD
  //it has to be implemented in any class extending Department
  abstract describe(this: Department): void; //NO IMPLEMENTATION IN THE ABSTRACT METHOD
  addEmployee(employee: string) {
    //this.id = 'd2';   //!!!ERROR!!! id is a readonly property
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.name);
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//ITDepartment inherits Department
class ITDepartment extends Department {
  //we need to create a dedicated constructor otherwise the Department one will be used
  constructor(id: string, public admins: string[]) {
    //in this example we just want the "IT" department to be hardcoded in the name property
    super(id, "IT"); //super calls the parent class constructor
  }
  //ABSTRACT CLASS IMPLEMENTATION
  describe() {
    console.log("IT Department" + this.id);
  }
}
//SINGLETON: CREATE ONLY ONE AccountingDepartment object making the constructor private
class AccountingDepartment extends Department {
  //properties
  private lastReport: string;

  //SINGLETON
  private static instance: AccountingDepartment;
  //end SINGLETON

  //getter
  get mostRecentReport() {
    if (this.lastReport) {
      //encapsulate returning a private property
      return this.lastReport;
    } else {
      throw new Error("No report found.");
    }
  }
  //setter
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }
  //SINGLETON
  //constructor private: we now cannot instantiate an object referencing AccountingDepartment class
  //we can use then the class creating a static method, hence
  private constructor(id: string, private reports: string[]) {
    super(id, "ACCOUNTING");
    this.lastReport = reports[0];
  }

  static getInstance(id: string, reports: string[]) {
    //static getInstance() { //WITH HARDCODED PARAMS
    if (this.instance) {
      //or AccountingDepartment.instance
      return this.instance;
    }
    // this.instance = new AccountingDepartment("acc1", []); //WITH HARDCODED PARAMS
    this.instance = new AccountingDepartment(id, reports);

    return this.instance;
  }
  //end SINGLETON
  //OVERRIDES THE Department addEmployee method:
  addEmployee(name: string): void {
    //adds a dummy custom logic just as an example
    if (name === "Max") {
      return;
    }
    this.employees.push(name); //throws an error if we don't set employees from private to protected in the Department class
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
  //this methods overrides the one on the parent class
  describe() {
    console.log(`Accounting Department - ID: ${this.id}`);
  }
}
//create a first object based on the class "blueprint":
//const generalDpt = new Department("d1", "generalDpt"); //ABSTRACT CLASS CANNOT BE INSTANTIATED!!!

const it = new ITDepartment("it1", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
it.describe();
it.printEmployeeInformation();
console.log(it);

//SINGLETON
//const accounting = new AccountingDepartment("acc1", []);
//CREATE NEW INSTANCE WITH SINGLETON
const accounting = AccountingDepartment.getInstance("acc1", []);
const accounting2 = AccountingDepartment.getInstance("acc2", []); //NOT WORKING WITH SINGLETON
console.log("accounting instance ", accounting, accounting2); //only the first one gets instantiated
//
//
accounting.addEmployee("Max"); //this is ignored due to the dummy logic in the extended method of the Accounting class
accounting.addEmployee("Manu");
//GETTER
// console.log(accounting.mostRecentReport); //GETTER access like a normal property -- throws our custom error in the getter
//SETTER
// accounting.mostRecentReport = ""; //SETTER -- throws custom Error
accounting.mostRecentReport = "Year End Report"; //SETTER
//GETTER
// console.log(accounting.mostRecentReport); //GETTER prints out our last report using the getter
//add report normal function (not accessing the last one)
accounting.addReport("Something went wrong!");
//GETTER
console.log(accounting.mostRecentReport); //GETTER prints out our last report using the getter
accounting.printReports();
accounting.printEmployeeInformation();
