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
