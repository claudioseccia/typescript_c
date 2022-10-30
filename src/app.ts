//tsc -w
//****************************************
//5.16 - A first interface
//DEFINITION: an interface describes an object
//only typescript!!!
//values can NOT be put into an interface (ex: name:string = 'Peter')
/*
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
*/
//****************************************
//5.17 - Using Interfaces with Classes
//difference between type and interface
// type Person = {
//     name: string;
//     age: number;
//     greet(phrase: string): void;
// }
//it will work the same

//differences:
//1) interfaces can only be used to describe the structure of an object
//2) inside a custom type we can set union types inside it (looks like they are more flexible, however...)
//3) an interface looks more clear to define an object, AND you can implement an interface in a class
//   an interface can be used like a "contract" a class can implement, like the minimum properties to have inside it
//4) an interface can share functionalities among different classes
//
//difference between inheritance and interface:
//you can inherit only from one class, but an interface can be a blueprint for more than one class
//
//difference between abstract class and interface:
//interface has not implementation details at all, an abstract class has (and can be overridden)
/*
interface Greetable {
  name: string;
  greet(phrase: string): void;
}
//here name property and greet method have to be implemented, since the class Person implements Greetable interface:
class Person implements Greetable {
  //can inherit from more than one interface like: class Person implements Greetable, AnotherInterface { ....
  name: string;
  age = 30; //more properties, over the original interface
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    //implementation of the greet method described in the interface
    console.log(phrase + " " + this.name);
  }
}
let user1: Greetable; //let user1: Person; <- works too
user1 = new Person("Max");
user1.greet("Hi there, my name is");
console.log(user1);
*/
//****************************************
//5.18 - Why Interfaces
//interfaces are extremly useful when we want to share functionalities among classes, and enforce a certain structure
//in our example ANY classes implementing greetable has to have the name and greet method as described by the interface
//
//****************************************
//5.19 - Readonly Interface Properties
//in a type or interface we can set a "readonly property"
/*
interface Greetable {
  readonly name: string;
  greet(phrase: string): void;
}
//here name property and greet method have to be implemented, since the class Person implements Greetable interface:
class Person implements Greetable {
  //can inherit from more than one interface like: class Person implements Greetable, AnotherInterface { ....
  name: string;
  age = 30; //more properties, over the original interface
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    //implementation of the greet method described in the interface
    console.log(phrase + " " + this.name);
  }
}
let user1: Greetable; //let user1: Person; <- works too
user1 = new Person("Max");
// user1.name = "Frank"; //not working!!! property is readonly in the implemented Greetable interface
user1.greet("Hi there, my name is");
console.log(user1);
*/
//****************************************
//5.20 - Extending Interfaces
// we can also implement inheritance with interfaces

/* 
//SOLUTION 1:
interface Named {
  readonly name: string;
}
interface Greetable {
  greet(phrase: string): void;
}
//here name property and greet method have to be implemented, since the class Person implements Greetable interface:
class Person implements Greetable, Named {
//NOTE: with normal inheritance, with the extends class we can only inherit from one class!!!
    ...
*/
//SOLUTION 2: the Greetable extends Named and has also the definitions within it:
interface Named {
  readonly name: string;
}
interface Greetable extends Named {
  greet(phrase: string): void;
}
//here name property and greet method have to be implemented, since the class Person implements Greetable interface:
class Person implements Greetable {
  name: string;
  age = 30; //more properties, over the original interface
  constructor(n: string) {
    this.name = n;
  }
  greet(phrase: string) {
    //implementation of the greet method described in the interface
    console.log(phrase + " " + this.name);
  }
}
let user1: Greetable; //let user1: Person; <- works too
user1 = new Person("Max");
// user1.name = "Frank"; //not working!!! property is readonly in the implemented Greetable interface
user1.greet("Hi there, my name is");
console.log(user1);
