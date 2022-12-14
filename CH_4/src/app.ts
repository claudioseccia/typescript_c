//ES6+

//****************************************
//4.2 Let and Const
//CONST
const userName = "Max";
// userName = "Bill"; //!!! ERROR !!! Cannot re-declare constant

//LET
let age = 26;
age = 29; //can be changed

//VAR vs LET
//VAR
//var should not be used anymore
//difference between var and let

//var has a global and function scope
// function add(a: number, b: number) {
//   var result;
//   result = a + b;
//   return result;
// }
// console.log(result); //!!! ERROR !!! var is defined only inside the scope of add function

// var result;
// function add(a: number, b: number) {
//   result = a + b;
//   return result;
// }
// console.log(result); //WORKS! result is defined at global scope

// age = 29;
// if (age > 20) {
//   var isOld = true; //var registers a variable always globally
// }
// console.log(isOld); //error in typescript but fine in javascript

//LET
//LET AND CONST add the concept of block scope
//any let or const are valid only inside a block or a nested block inside the one where they are defined
// {
//     let variable = 'cool';
//     {
//         console.log(variable); //WORKS!
//     }
//     console.log(variable); //WORKS!
// }
// console.log(variable); //!!! ERROR !!!

//ex.
// age = 29;
// if (age > 20) {
//   let isOld = true; //var registers a variable always globally
// }
// console.log(isOld); //!!! ERROR !!! isOld is not defined

//****************************************
//4.3 Arrow functions
//named function
// const add = function() {
//     //...
// }

//arrow function
// const add = (a: number, b: number) => {
//   return a + b;
// };
//same as:
// const add = (a: number, b: number) => a + b;
// console.log(add(2, 5));

// const printOutput = (output: string | number) => console.log(output);
// printOutput(add(5, 2));
const button = document.querySelector("button");
if (button) {
  button.addEventListener("click", (event) => console.log(event));
}

//****************************************
//4.4 Default function parameters
//set the default parameter as last not to get error
//const add = (a: number = 10, b: number) => { ... //gets an error
// const add = (a: number, b: number = 10) => {
//   return a + b;
// };
// // console.log(add(2, 5)); //7
// console.log(add(5)); //15

//****************************************
//4.5 Spread operator
const hobbies = ["Sports", "Cooking"];
console.log(hobbies[0]);
//const activeHobbies = ["Hiking"];
//activeHobbies.push(hobbies); //ERROR -  in js nests the two arrays
//activeHobbies.push(...hobbies); //WORKS spreads the hobbies array elements inside activeHobbies
const activeHobbies = ["Hiking", ...hobbies]; //spread operator during array creation
console.log(activeHobbies);

//spread in objects
const person = {
  name: "Max",
  age: 26,
};
// const copiedPerson = person; //copies the pointer in memory
const copiedPerson = { ...person, hobbies: hobbies }; //copies all the values into the copiedPerson object
console.log(copiedPerson);

//****************************************
//4.6 Rest parameters
//USED IN FUNCTION ARGUMENTS WHEN WE DON'T KNOW HOW MANY ARGUMENTS
const add = (...numbers: number[]) => {
  //handles infinite amounts
  return numbers.reduce((currentResult, currentValue) => {
    return currentResult + currentValue;
  }, 0);
};
const addedNumber = add(5, 10, 2, 3.7, 12.5);
console.log(addedNumber);

//works also with tuples
const combineAges = (...ages: [number, number, string]) => {
  const sumOfAges = ages[0] + ages[1];
  console.log(ages[2] + sumOfAges);
};
combineAges(22, 23, "The sum of the two ages is: "); //The sum of the two ages is: 45

//****************************************
//4.7 Arrays and objects destructuring
//ARRAY destructuring
const sports = ["swimming", "boxe", "gym", "cycling"];
// const sport1 = sports[0];
// const sport2 = sports[1];
// const sport3 = sports[2];
//...
const [sport1, sport2, ...remainingSports] = sports; //we now have variables: sport1, sport2 and an array of the remaining un-destructured array elements
console.log(sport1, sport2, remainingSports);

//OBJECT destructuring
const employee = {
  firstname: "Frank",
  work: "Employee",
  sex: "male",
  hair: "brown",
};

const { firstname: username, work, sex, hair } = employee; //pull out all the desidered values from object
//firstname is pulled out as username (javascript syntax, not typescript)
console.log(username, work, sex, hair);
