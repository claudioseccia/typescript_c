//change a commit message name: git commit --amend -m "new commit message"
//****************************************
//OBJECTS
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
//****************************************
//NESTED OBJECTS
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
//****************************************
//ARRAYS
const newPerson = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
};
// let favouriteActivities: string[] = ["Sports",2]; //error, mixed array
// let favouriteActivities: any[] = ["Sports",2]; //correct, mixed array: any[] is defining an array of any type
let favouriteActivities: string[] = ["Sports", "Music", "Cooking"]; //correct: strings[] is defining an array of strings
console.log(newPerson);
console.log(favouriteActivities);
for (const hobby of newPerson.hobbies) {
  console.log(`Hobby: ${hobby.toUpperCase()}`);
  // console.log(hobby.map()); //!!! ERROR !!!, can't map a string
}
//****************************************
//TUPLES
//tuples are fixed lenght and fixed type array
//
const newPersonWithTuple: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Maximilian",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  role: [1, "Author"],
};
//role always has two elements: first is numeric (ex an id), the second a string (ex.description)
// newPersonWithTuple.role = [1, "Boss", "American"]; //!!! ERROR !!! only three elements allowed
// newPersonWithTuple.role.push("Admin"); //push is an exception, allowed by TypeScript
//newPersonWithTuple.role[1] = 10; //!!! ERROR !!! second value of the tuple is a string
