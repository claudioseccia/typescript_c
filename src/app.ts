//****************************************
//6.2 - Intersection Types
//allow us to combine other types
//here some types (could also have been interfaces)
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};
//Date is a supported type by ts, which is related to the javascript Date obj
type ElevatedEmployee = Admin & Employee; //combines the two types
const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create", "read", "delete"],
  startDate: new Date(),
};

//with INTERFACES
//intersection types is closely related to interface inheritance
interface Admin1 {
  name: string;
  privileges: string[];
}
interface Employee1 {
  name: string;
  startDate: Date;
}
//type ElevatedEmployee1 = Admin1 & Employee1;
//same as:
interface ElevatedEmployee1 extends Employee1, Admin1 {
  //...
}
//
type Combinable = string | number; // union typpe |
type Numeric = number | boolean; // union typpe |
type Universal = Combinable & Numeric;

//****************************************
//6.3 - More on Type Guards
//type guards helps with union types
//three types of type guards:
//1) typeof - only for natives (string, number, array, boolean...)
function add(a: Combinable, b: Combinable) {
  //TYPE GUARD
  if (typeof a === "string" || typeof b === "string") {
    //type guard, to run correctly the code. If it's a string concatenates a string
    return a.toString() + b.toString();
  }
  //otherwise concatenates a number
  return a + b;
}

//2) in obj
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  //TYPE GUARD: property check in the object
  if ("privileges" in emp) {
    console.log("Privileges (Admin type): " + emp.privileges); //privileges does only exist on Employee
  }
  //TYPE GUARD:
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
printEmployeeInformation(e1);
//3) instanceof (IN CLASSES)
//with interfaces we cannot use instanceof. Interfaces do not compile to any javascript
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo " + amount);
  }
}
type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  //TYPE GUARD used to check the property (or method) in an object
  //in used in classes
  //if ("loadCargo" in vehicle) {
  //SAME AS
  //instanceof - check if the vehicle is a truck!!!
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(5);
  }
}
useVehicle(v1);
useVehicle(v2);

//****************************************
//6.4 - Discriminated Unions
//helps with type guards: a pattern to implement type guards easier
//works with interfaces and eliminates the danger of mis-typing
interface Bird {
  type: "bird"; //added for approach 3 (Discriminated Unions)
  flyingSpeed: number;
}
interface Horse {
  type: "horse"; //added for approach 3 (Discriminated Unions)
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  /*
  //approach 1: use " in obj " schema
  if ("flyingSpeed" in animal) {
    console.log("Moving with speed: " + animal.flyingSpeed);
  }
  if ("runningSpeed" in animal) {
    console.log("Moving with speed: " + animal.runningSpeed);
  }
  
  //approach 2: "instanceof" --> DOES NOT WORK WITH INTERFACES!!! INTERFACES ARE NOT COMPILED AT RUNTIME!!!
  if (animal instanceof Bird) {
    console.log("Moving with speed: " + animal.flyingSpeed);
  }
  if (animal instanceof Horse) {
    console.log("Moving with speed: " + animal.runningSpeed);
  }
  */
  //approach 3 (Discriminated Unions)
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving with speed: " + speed);
}
moveAnimal({ type: "bird", flyingSpeed: 10 }); //typescript automatically understands the type of speed to assign
moveAnimal({ type: "horse", runningSpeed: 10 }); //typescript automatically understands the type of speed to assign

//****************************************
//6.5 - Type Casting
//helps to tell typescript that some value is of a specific type
//ex. access something in the DOM (create a paragraph in index.html)
const paragraph = document.querySelector("p"); //selecting by the p tag
//typescript already knows that paragraph is of type html element
//if we assign an id to the paragraph we as devs know that but typescript doesn't
const paragraphById = document.getElementById("message-output");
// const userInputElement = document.getElementById("user-input");
// userInputElement.value = "Hi there!"; //error: value does not exist on type htmlelement, cause it's generic, just as paragraphById detected by typescript
//
//TYPE CASTING
//version 1
// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-input")!
// );
// userInputElement.value = "Hi there!"; //assigning the type to the element it now works!!!
//
//version 2 (more suitable with REACT, since Jsx already has the <TAG> syntax):
const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement; //<--  ! EXCLAMATION MARK: tells typescript that the expression before will never return null
userInputElement.value = "Hi there!"; //assigning the type to the element it now works!!!
//WITHOUT EXCLAMATION MARK WE SHOULD HAVE DONE SOMETHING LIKE (! shorter and better)
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hello there!";
}

//****************************************
//6.6 Index Properties
//let's say we want to create an interface with flexible values, like
// { id: "1", email: "Not a valid email", username: "Must start with a character"}
//but I don't know what elements I will have, other than email and username
//or, for example I will have an error only on email and I want to omit username
interface ErrorContainer {
  id: string;
  [prop: string]: string;
}
//this means that whatever object I'm constructing must have properties which are strings, expressed as strings
//in this case only id of the error is mandatory
const errorBag: ErrorContainer = {
  id: "1",
  email: "Not a valid email!",
};
