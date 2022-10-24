// tsc app.ts
// npm run
//****************************************
//2.20 unknown type
let userInput: unknown;
let userName: string;
userInput = 5;
userInput = "Max";
// userName = userInput; //!!! Error !!! Type 'unknown' is not assignable to type 'string'.
//assigning userInput to any it's working instead
//unknown requires an extra check on type:
if (typeof userInput === "string") {
  userName = userInput;
}
//****************************************
//2.21 never type
//a function like that should not return void but never
function generateError(message: string, code: number): never {
  throw {
    message: message,
    errorCode: code,
  };
  //while(true) {} //never also for an infinite loop :-D
}
const result = generateError("En error occurred!!!", 500); //an error is thrown in console!
console.log(result); //does not return undefined! so the correct type for returning a value is never, it never produces a value!
