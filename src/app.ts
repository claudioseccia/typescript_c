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
