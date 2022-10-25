//****************************************
//3.2 Live/Watch Mode in compile time
//LIVE MODE COMPILE!!!
// tsc app.js --watch
//or
// tsc app.js -w
//--> watch mode: re-compile at any change
// const userName = "Maximilian";
// // userName = 3; //!!! ERROR !!!
// console.log(userName);

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

//****************************************
//3.5 Understanding typescript core libs
// const button = document.querySelector("button")!;
// button.addEventListener("click", () => {
//   console.log("clicked");
// });
//if lib[] entry is not set in tsconfig.jscon all defaults like DOM are included (like running the js in the browser)
//uncommenting we HAVE TO set in the array some values
//ex these are the default settings (like if "lib":[] entry is commented)
// "lib": [
//     "dom",
//     "es6",
//     "dom.iterable",
//     "scripthost"
// ]

//****************************************
//3.6 More configuration and compilation options
//in tsconfig.json
//"allowjs": true   //<-- includes js files
//"checkjs": true   //<-- checks js files

//****************************************
//3.7 Working with Source Maps
//source maps helps us on development and debugging
//generates a .js.map file too and it makes visible .ts typescript files in the chrome dev tools
// in this way we can even set breakpoints to the ts code to debug !!!

//****************************************
//3.8 rootDir and outDir
//typically we have a src folder and a dist folder in our projects
//src folder will hold all our typescript files
//dist folder all the compiled files (all the javascript files)

// to output all the compiled files into dist we set "outDir" as dist
// if we create a subfolder and place file inside it the folder structure is replicated into dist folder

// to make ts compiler watch only at src and its structure we set it as: "rootDir": "./src"
//in this way files on other folders will be ignored, otherwise all files and folder also in the root will be watched

//"removeComments": true, <-- this removes comments from compilation
//"noEmit": true, <-- this will not export js

//****************************************
//3.9 Stop emitting files on compilation errors
// "noEmitOnError": true, <-- default is false (when commented)
// setting it on true js will not be generated when an error is detected by js

//****************************************
//3.10 Strict compilation
//setting: "strict": true, <-- is the same than setting all the separate settings below separately

//noImplicitAny --> see analytics.ts

//strictNullChecks --> if set to false it's not necessary the exclamation mark here to check if the button exists:
// const button = document.querySelector("button"); //typescript doesn't know if button does not exist at compilation time
// ! -->exclamation mark tells typescript about elements the dev knowns do exists
//otherwise, without using ! do:
// if(button) {
//   button.addEventListener("click", () => {
//     console.log("clicked");
//   });
// }

//strictBindCallApply
const button = document.querySelector("button")!;

function clickHandler(msg: string) {
  console.log("clicked " + msg);
}
button.addEventListener("click", clickHandler.bind(null, "You're wellcome!"));

//****************************************
//3.11 Code quality options
//noUnusedLocals
//throw errors if variables are set but not used etc... (unused global variables are allowed)

//noUnusedParameters
//checks for unused parameters in functions

//noImplicitReturns etc...
//this function does not always return something (ex. cases outside if statement)
// function add(n1: number, n2: number) {
//   if (n1 + n2 > 0) {
//     return n1 + n2;
//   }
// }
