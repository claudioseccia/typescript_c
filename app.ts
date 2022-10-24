// tsc app.ts
// npm run
//****************************************
//2.17 function return types and void
function add(n1: number, n2: number): number {
  return n1 + n2;
}
//even though undefined is a valid type a function is not allowed to return undefined, hence it is set as void
//with void we state that deliberatly this function does not return anything
//type is void because function is not returning anything, it's only doing console
//NOTE: it's not necessary to return the void type for the function, it can be automatically inferred by typescript
function printResult(num: number): void {
  console.log("Result: " + num);
}
printResult(add(5, 12)); //Result: 17
// console.log(printResult(add(5, 17))); //undefined, doing a console log of a function that returns undefined returns undefined
//
//****************************************
//2.18 function as types
/*
let combineValues;
combineValues = add; //store a pointer of a function in another variable
combineValues = 8; //re-assign
//tsc app.js:
//compiles anyway because combinedValue is of type "any", but gives ERROR at runtime!!!
console.log(combineValues(8, 8)); //!!! ERROR !!! app.js:23 Uncaught TypeError: combineValues is not a function
*/
//SOLUTION
// let combineValues: Function;
//FUNCTION TYPE:
let combineValues: (a: number, b: number) => number;
combineValues = add; //store a pointer of a function in another variable
// combineValues = 8; //COMPILE ERROR, typescript checks the value!
// combineValues = printResult; //works if we do not set function types, setting --> let combineValues: Function;
// combineValues = printResult; //checked at runtime: Typescript is now throwing an error --> let combineValues: (a: number, b: number) => number;
console.log(combineValues(8, 8));
//
//****************************************
//2.19 function types and callbacks
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result); //cb is a callback, we pass result to the callback function
}
addAndHandle(10, 20, (result) => {
  console.log(result);
  return result; //still working, void type doesn't care if something is returned or not
});
