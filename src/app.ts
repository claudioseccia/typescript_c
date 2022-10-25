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
