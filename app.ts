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

/* 
// Of course object types can also be created for nested objects.
// Let's say you have this JavaScript object:

const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
//This would be the type of such an object:

{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
//So you have an object type in an object type so to say.
*/
type nestedObj = {
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  };
};
const product: nestedObj = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};
console.log(product);
