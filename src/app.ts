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
