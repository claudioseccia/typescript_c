//CH5
//CLASSES AND INTERFACES
//Working with objects
//****************************************
//5.3 Creating a fist class
//convention is to start with uppercase char for class names
class Department {
  name: string;
  //constructor() is executed when the object is created
  constructor(n: string) {
    this.name = n;
  }
}
//create a first object based on the class "blueprint":
const accounting = new Department("Accounting");
console.log(accounting);
