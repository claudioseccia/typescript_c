/* 
const person = {
  name: "Maximilian",
  age: 30,
};
console.log(person); //prints the object 
*/
//hovering person variable in the prev line (or cmd k + i)
//prints the object inferred type by typescript, wich looks like:
// const person: {
//     name: string;
//     age: number;
// }
//assigning const person:object = {... } prints out only:
// const person: object;
// console.log(person.nickname); //throws an error, no nickname in the object
/* 
const person: object = {
  name: "Maximilian",
  age: 30,
};
console.log(person); //prints the object
console.log(person.name); //throws an error 
*/
//now working, we specify all the elements in the object
const person: {
  name: string;
  age: number;
} = {
  name: "Maximilian",
  age: 30,
};
//same as the automatically inferred way of represent the object:
// const person = {
//   name: "Maximilian",
//   age: 30,
// };
console.log(person.name); //prints the object
