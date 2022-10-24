//****************************************
//3.1 Live/Watch Mode in compile time
//LIVE MODE COMPILE!!!
// tsc app.js --watch
//or
// tsc app.js -w
//--> watch mode: re-compile at any change
const userName = "Maximilian";
// userName = 3; //!!! ERROR !!!
console.log(userName);
