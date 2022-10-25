//****************************************
//3.2 Live/Watch Mode in compile time
//LIVE MODE COMPILE!!!
// tsc app.js --watch
//or
// tsc app.js -w
//--> watch mode: re-compile at any change
const userName = "Maximilian";
// userName = 3; //!!! ERROR !!!
console.log(userName);

//****************************************
//3.3 Compiling the entire project multiple files
// tsc --init       <-- it creates a file: tsconfig.json with many rules to configure
//with the command:
// tsc
//we now compile all typescript files in the project
// tsc --watch      <-- to go in watch mode (ctrl+c to exit)
//****************************************
//3.4 Including and excluding files
// see tsconfig.jscon in the "exclude" section

//****************************************
//3.4 Setting a compilation target
//see "compilerOptions": { "target" .... option in tsconfig.json
