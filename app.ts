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
