//tsc -w
//npm start
//****************************************
//9.1/2 - Getting Started
//****************************************
//9.3 - DOM Element Selection & OOP Rendering
//STEP 1: in the index.html: get the form inside the element template with id "project-input" inside the div with id "app"
//****************************************
//9.4 - Interacting with DOM Elements
//
//****************************************
//9.5 - Creating & Using an Autobind Decorator
//with a decorator we can automatically bind the this keyword
//Autobind decorator
//a decorator is a function that can execute code before the instantiation of the class
//for that enable: "experimentalDecorators": true in tsconfig.json
//
//****************************************
//9.6 - Fetching User Input
//STEP 2: take all the input value and create new elements to print on the DOM
//
//****************************************
//9.7 - Creating a Re-Usable Validation Functionality
//use decorators to make a reusable validation functionality
//we want a function to use like: validate({value:enteredTitle, required: true, minLength: 5})
//
//****************************************
//9.8 - Rendering Project Lists
//
//****************************************
//9.9 - Managing Application State with Singletons
//
//class to manage the state of my appplication, and setup listeners for the various parts of my application
//ProjectState Class (singleton)
class ProjectState {
  //listeners
  private listeners: any[] = []; //array of function references. Everytime something changes we call a listener function
  //array of projects
  private projects: any[] = [];
  //SINGLETON sutup
  private static instance: ProjectState;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }
  //end SINGLETON sutup
  //subscription pattern: we manage a list of listeners called whenever something changes
  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }
  //add new Project
  addProject(title: string, description: string, numOfPeople: number) {
    //project I want to store
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); //slice will return a copy of that array, array and objects are reference values in javascript
    }
  }
}
//we now need to call addProject from ProjectList when submitting the form and display the result on ProjectList
//create a global instance of ProjectState using the static getInstance method:
//SINGLETON: we'll have only one object instance of the type for the entire application!
const projectState = ProjectState.getInstance();

//
//Validator decorator
//? optional operator ---> ex. required?: boolean <-- means required must be a boolean or undefined
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
function validate(validatableInput: Validatable) {
  // check for all the properties to exeist and do the proper validatiion
  let isValid = true; //basic flag, set to true ->goes to false as soon as one of the checks fails
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  //minLength check
  if (validatableInput.minLength) {
    //!= null -->this check includes null and undefined --> we're checking even if minLenght is zero
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }
  }
  //maxLength check
  if (validatableInput.maxLength) {
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
  }
  //min check
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  //max check
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}
//Autobind decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}
//ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];
  //type of the project we'll expect when we'll instantiate the class is 'active' or 'finished'
  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement; //same as above!
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];
    //
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //true stands to import all the nodes inside of the html
    this.element = importedNode.firstElementChild as HTMLElement; //set this.element as the firstElementChild (<section class="projects">...</section>)
    this.element.id = `${this.type}-projects`; //assign the id to the element dynamically, either for active or finished projects
    //add a listener to the globally available projectState.addListener function
    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    }); //pass an anonymous function
    this.attach();
    this.renderContent();
  }
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-lists`
    )! as HTMLUListElement;
    //render all the projects we have
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl?.appendChild(listItem);
    }
  }
  private renderContent() {
    //populate the fields
    const listId = `${this.type}-project-lists`;
    this.element.querySelector("ul")!.id = listId; //add ids to the ul elements
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}
//ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; //or generic HTMLElement
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    // this.templateElement = <HTMLTemplateElement>(
    //   document.getElementById("project-input")!
    // ); //! to tell ts that the element will exist for sure in the dom (it won't be null!)
    //or
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement; //same as above!
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    //
    //render the content of templateElement (the form) inside the hostElement (the div)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //true stands to import all the nodes inside of the html
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input"; //assign the id to the element so that the css will apply correctly the styles for that id

    //access the different input elements:
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
    //bind the submit of the form to an internal method (submitHandler)
    this.configure();
    //run the private method to put the template inside app
    this.attach();
  }
  private gatherUserInput(): [string, string, number] | void {
    //[string, string, number] --> example of a tuple definition, we want three elements of three different types
    //union type with void is made for the return value of nathing. Alternatively we can implement error handling and throw new error
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    /* 
    //trivial validation
    //check that no input is empty
    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      //more checks, ex.
      //check length of description
      //check minumum number of people... etc
      alert("Invalid input, please try again!");
      return; //void return value, function is not returning anything
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]; //+ number conversion, everything extracted with .value from DOM is text
    }
    */
    //construct my Validatable objects
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
      return; //void return value, function is not returning anything
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]; //+ number conversion, everything extracted with .value from DOM is text
    }
  }
  //clear all the inputs after the form submit
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault(); //prevent http submit request!!!
    console.log("SUBMITTED!");
    //the this keyword does not point at the class
    //when we bind an element to an event  (see configure method)
    //console.log(this.titleInputElement.value); //!!ERROR!! IF WE DON'T BIND THE EVENT LISTENER IN configure() (*)
    const userInput = this.gatherUserInput(); //might be a tuple
    //cannot use typeof check for tuple, we use just array check in vanilla JS
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput; //array destructuring
      console.log(title, desc, people);
      projectState.addProject(title, desc, people);
      this.clearInputs(); //clear inputs after form submission
    }
  }
  private configure() {
    //setup an event listener and bind to submit to the private submitHandler method
    this.element.addEventListener("submit", this.submitHandler);
    //binding is not necessary with @Autobind decorator
    //this.element.addEventListener("submit", this.submitHandler.bind(this)); //(*) bind(this) tells that this keyword inside submitHandler() will refer to the same this into the context (the class)
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
