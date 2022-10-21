//********* GENERAL INSTRUCTIONS *************//
//tsc app.ts <-- to compile in js
//npm init
//npm install --save-dev lite-server
//npm start <-- lite server opens a browser page, each time we change something we need to run: tsc app.ts
console.log('Your code goes here...');
//Typescript adds more types to javascript
//CORE TYPES (already known by javascript)
//number    (no differentiation between integer or floats)
//string
//boolean
/*
function add(n1,n2) {
    return n1+n2;
}
// const number1 = 5;
//set number1 wrongly as a text:
const number1 = '5';
const number2 = 2.8;
const result = add(number1,number2);
console.log(result); //with number1 set as a string results is wrong
*/
function add(n1:number,n2:number):number {
    return n1+n2;
}
const number1 = 5;
// set number1 wrongly as a text:
// const number1 = '5'; //throws an error with types set
const number2 = 2.8;
const result = add(number1,number2);
console.log(result); //with number1 set as a string results is wrong