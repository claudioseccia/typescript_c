//CH 7 - GENERICS
//****************************************
//7.1 Generics
//generics exist in typescript but not in javascript
//1.What are generics
//2.Generic function and classes
//3.Constraints
//4.Special Typescript Types

//****************************************
//7.2 - Built-in Generics & What are Generics

//GIVES MORE INFORMATION FOR CERTAIN TYPES
//ex. an array is a combination of various values
// const names = ["Max", "Manu"]; //in this case it's an array of strings
//const names: string[] = ["Max", "Manu"]; //same as above, forced
// const names: Array = ["Max", "Manu"]; //ERROR !!! require at least one type
// const names: any[] = ["Max","Manu",2]; //Ugly but works
// const names: Array<string> = ["Max", "Manu"]; //WORKS! -- same as const names: string[] = ...
/*
const names: Array<string | number> = ["Max", "Manu", 2]; //WORKS (union types) - Array<any> <-- to set any type

//PROMISE TYPE
//here we tell typesctipt that we have a Promise that resolves in a string
const promise: Promise<string> = new Promise((resolve) => {
  //we typically set as --> new Promise(resolve,reject)
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});
//if we set:
//const promise: Promise<number> = new Promise((resolve) => {
//and
//resolve(10);
//typescript will give error on: data.split(" "); --> split is a type only for strings
*/
//****************************************
//7.3 - Creating a Generic Function
/*
//ex. function that takes as a param two objects and returns an object
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}
console.log(merge({ name: "Max" }, { age: 20 }));
const mergedObject = merge({ name: "Max" }, { age: 20 });
// console.log(mergedObject.name); //ERROR!!!   typescript doesn't know the type of the returned values
// console.log(mergedObject.age); //ERROR!!!   typescript doesn't know the type of the returned values
// we can do type casting as like: 
//const mergedObject = merge({ name: "Max" }, { age: 20 }): as {name: string, age:number};
//but it's cumbersome. Here's another solution: GENERICS
*/
//SOLUTION: <GENERICS>
//since "object" as a type is a highly un-specified type
//in this Generic assignment T and U are treated as any possible value extending object. Typescript automatically infers
// function merge<T,U>(objA: T, objB: U) { //ERROR!
//WITH TYPE CONSTRAINTS <T extends...
function merge<T extends object, U extends object>(objA: T, objB: U) {
  //optional (TS automatically infers): ...(objA: T, objB: U): T & U
  return Object.assign(objA, objB);
}
const mergedObject = merge(
  { name: "Max", hobbies: ["sport", "develpment"] },
  { age: 30 }
);
//not necessary! TS automatically infers values from generic types:
// const mergedObject = merge<{name: string, hobbies: string[]},{age: number}>({ name: "Max", hobbies: ["sport", "develpment"] },{ age: 30 });
console.log("mergedObject age:", mergedObject.age); //WORKS!
console.log("mergedObject age:", mergedObject.hobbies); //WORKS!
//THIS GIVES A LOT OF FLEXIBILITY, CREATING GENERIC TYPES TO ACCESS ANY PROPERTY INSIDE THE OBJECT

const mergedObject2 = merge({ name: "Frank" }, { age: 20 });
console.log("mergedObject2 name:", mergedObject2.name); //WORKS!
//
//****************************************
//7.4 - Working with Constraints
//const mergedObject3 = merge({ name: "John" }, 30);//ERROR!!
//console.log("mergedObject3 age:", mergedObject3.age); //ERROR!!

//extends keyword
//can be anything, ex.

//basic type: <T extends object....
//union type: <T extends string|number....
//custom type: <T extends Person ()
//
//****************************************
//7.5 - Another Generic Function
interface Lengthy {
  length: number;
}
//return value describes the returned tuple: [T, string]
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  // return a tuple with two elements: first should be my element, the second a description string
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got" + element.length + " elements";
  }
  return [element, descriptionText];
}
console.log(countAndDescribe("Hi there! ")); //['Hi there! ', 'Got10 elements']
console.log(countAndDescribe(["Sports", "Cooking"])); //[Array(2), 'Got2 elements']
console.log(countAndDescribe([])); //[Array(0), 'Got no value.']
// console.log(countAndDescribe(10)); //ERROR!! a number has not lenght value
//
//****************************************
//7.6 - The keyof Constraint
//function extractAndConvert(obj: object, key: string) { //ERROR: TS doesn't know if that object really will have that key
//IN THIS GENERIC WE SET:
//first parameter (type of T) should be an object
//second parameter should be any kind of key in that object
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key]; //we want to return a specific key out of an object
}
// console.log(extractAndConvert({}, "name")); //ERROR!!
console.log(extractAndConvert({ name: "Max", age: 30 }, "name")); //WORKS!
console.log(extractAndConvert({ name: "Max", age: 30 }, "age")); //WORKS!
// console.log(extractAndConvert({ name: "Max", age: 30 }, "job")); //ERROR! job key doesn't exist in the first param object
//
//****************************************
//7.7 - Generic Classes
//
class DataStorage<T> {
  private data: T[] = [];
  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); //indexOf removes the last element if it doesn't find anything
  }
  getItems() {
    return [...this.data];
  }
}
const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log("textStorage", textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(3);
numberStorage.addItem(12);
console.log("numberStorage", numberStorage.getItems());

const tupleStorage = new DataStorage<string | number>();
tupleStorage.addItem("Max");
tupleStorage.addItem("Frank");
tupleStorage.addItem(14);
tupleStorage.removeItem("Max");
console.log("tupleStorage", tupleStorage.getItems());

//const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem({ name: "Max" }); //NOT WORKING! the parameter in removeItem is a brand new object, removeItem does not work
//
//SOLUTION1 : store in a new constant the value of the object we want to remove
// const objStorage = new DataStorage<object>();
// const maxObject = { name: "Max" };
// objStorage.addItem(maxObject);
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem(maxObject); //WORKS! same object in memory
// console.log("objStorage", objStorage.getItems());
//
//SOLUTION2: block the usage of arrays and objects for the class
//class DataStorage<T extends string | number | boolean> { ...
//
//
//****************************************
//7.9 - Generic Utility Types
//
//built in generic types (only in typescript)
//
//Partial --> allow optional properties
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  //   return {
  //     title: title,
  //     description: description,
  //     completeUntil: date,
  //   };
  //let's say we want to add all the properties one at the time
  //let courseGoal: CourseGoal = {}; //error: cannot assign an empty object
  let courseGoal: Partial<CourseGoal> = {}; //WORKS! allows us to set all the CourseGoal properties optional
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}
//Readonly
const names: Readonly<string[]> = ["Max", "Anna"];
// names.push("Manu"); //not allowed by Readonly
// names.pop(); //not allowed by Readonly
