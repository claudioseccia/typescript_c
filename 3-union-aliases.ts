// tsc app.js
// npm run
//****************************************
//2.13 UNION TYPES
/* 
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}
const combinedAges = combine(30, 26);
console.log(combinedAges);
const combinedNames = combine("Max", "Anna");
console.log(combinedNames);
*/
//****************************************
//2.14 LITERAL TYPES
//types that specify the exact value and type
/*
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text"
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  //   if (resultConversion === "as-number") {
  //     return +result; //return result as a number
  //   } else {
  //     return result.toString(); //concatenats as a string
  //   }
  return result;
}
const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);
const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);
const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
*/
//****************************************
//2.15 TYPE ALIASES CUSTOM TYPES
//type keyword
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";
function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}
const combinedAges = combine(30, 26, "as-number");
console.log(combinedAges);
const combinedStringAges = combine("30", "26", "as-number");
console.log(combinedStringAges);
const combinedNames = combine("Max", "Anna", "as-text");
console.log(combinedNames);
//****************************************
//2.16 TYPE ALIASES AND OBJECT TYPES
// Type aliases can be used to "create" your own types.
// You're not limited to storing union types though - you can also provide an alias to a (possibly complex) object type.
// For example:
// type User = { name: string; age: number };
// const u1: User = { name: 'Max', age: 30 }; // this works!

// This allows you to avoid unnecessary repetition and manage types centrally.
// For example, you can simplify this code:
// function greet(user: { name: string; age: number }) {
//   console.log('Hi, I am ' + user.name);
// }
// function isOlder(user: { name: string; age: number }, checkAge: number) {
//   return checkAge > user.age;
// }
// To:
type User = { name: string; age: number };
function greet(user: User) {
  console.log("Hi, I am " + user.name);
}
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
