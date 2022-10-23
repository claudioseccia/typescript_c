// tsc app.ts
// npm run
//****************************************
//2.17 function return types and void
function add(n1: number, n2: number): number {
  return n1 + n2;
}
//even though undefined is a valid type a function is not allowed to return undefined, hence it is set as void
//with void we state that deliberatly this function does not return anything
//type is void because function is not returning anything, it's only doing console
//NOTE: it's not necessary to return the void type for the function, it can be automatically inferred by typescript
function printResult(num: number): void {
  console.log("Result: " + num);
}
printResult(add(5, 12)); //Result: 17
// console.log(printResult(add(5, 17))); //undefined, doing a console log of a function that returns undefined returns undefined
//
//****************************************
//2.18
