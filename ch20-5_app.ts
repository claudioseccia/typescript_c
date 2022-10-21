//********* GENERAL INSTRUCTIONS *************//
//tsc app.ts <-- to compile in js
//npm init
//npm install --save-dev lite-server
//npm start <-- lite server opens a browser page, each time we change something we need to run: tsc app.ts
//console.log('Your code goes here...');
//********* end GENERAL INSTRUCTIONS ********//

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
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  //TYPE CHCEK IN JAVASCRIPT
  // typeof <-- makes type check in javascript
  // if(typeof n1 !== 'number' && typeof n2 !== 'number') { throw new Error('Incorrect Input!'); }
  //difference: javascript is dynamically typed, check can be made at runtime
  //typescript: is statically typed: we need to check types to successfully compile
  //javascript fails at runtime, typescript at compile type
  //typescript can check more types than javascript
  const result = n1 + n2;
  if (showResult) {
    //console.log(phrase + n1 + n2); //now everything gets converted to a text, use the calculation in a separate const
    console.log(phrase + result);
  } else {
    return result;
  }
}
// set number1 wrongly as a text:
// const number1 = '5'; //throws an error with types set
// const number1 = 5;
//ASSIGNING AND TYPE INFERENCE
//typescript automatically understands the type declaring a variable and assigning a value
//if we only declare a variable without declaring it we should assign the type (ex. let number3:number;)
let number1: number;
number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = "Result is: ";
// resultPhrase = 0; //throws an error, we're trying to assign a number to a previously declared string

const result = add(number1, number2, printResult, resultPhrase);
//console.log(result); //with number1 set as a string results is wrong
