import Component from "./base-component"; //default export in base-component.js(single element on that file to be exported as default)
// import Cmp from "./base-component.js";  //we can also use a different name in respect of the one used in base-component default export

import { Autobind } from "../decorators/autobind";
import * as Validation from "../util/validation"; //grouping everything within the object Validation
import { projectState } from "../state/project-state";
//ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  //inherited by Component class:
  // templateElement: HTMLTemplateElement;
  // hostElement: HTMLDivElement; //or generic HTMLElement
  // element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", true, "user-input");
    // this.templateElement = <HTMLTemplateElement>(
    //   document.getElementById("project-input")!
    // ); //! to tell ts that the element will exist for sure in the dom (it won't be null!)
    //or
    //inherited by Component class:
    // this.templateElement = document.getElementById(
    //   "project-input"
    // )! as HTMLTemplateElement; //same as above!
    // this.hostElement = document.getElementById("app")! as HTMLDivElement;
    // //
    // //render the content of templateElement (the form) inside the hostElement (the div)
    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // ); //true stands to import all the nodes inside of the html
    // this.element = importedNode.firstElementChild as HTMLFormElement;
    // this.element.id = "user-input"; //assign the id to the element so that the css will apply correctly the styles for that id

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
    //inherited by Component class:
    // this.attach();
  }
  //PUBLIC METHODS
  // private configure() {
  //have to set it as public since is inherited
  configure() {
    //setup an event listener and bind to submit to the private submitHandler method
    this.element.addEventListener("submit", this.submitHandler);
    //binding is not necessary with @Autobind decorator
    //this.element.addEventListener("submit", this.submitHandler.bind(this)); //(*) bind(this) tells that this keyword inside submitHandler() will refer to the same this into the context (the class)
  }
  //to be compiant of the Component class we inherit from
  renderContent() {}
  //PRIVATE METHODS
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
    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
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

  //inherited by Component class:
  // private attach() {
  //   this.hostElement.insertAdjacentElement("afterbegin", this.element);
  // }
}
