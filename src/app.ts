//tsc -w
//****************************************
//5.16 - A first interface
//DEFINITION: an interface describes an object
//only typescript!!!
//values can NOT be put into an interface (ex: name:string = 'Peter')
interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

//we can use our interface as a type
let user1: Person;
user1 = {
  name: "Max",
  age: 31,
  greet(phrase: string) {
    //implementation of the greet method described in the interface
    console.log(phrase + " " + this.name);
  },
};
user1.greet("Hi there! I am");
