//tsc -w
//npm start
//****************************************
//9.1/2 - Getting Started
//****************************************
//9.3 - DOM Element Selection & OOP Rendering
//STEP 1: in the index.html: get the form inside the element template with id "project-input" inside the div with id "app"
//****************************************
//9.4 - Interacting with DOM Elements
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
  private submitHandler(event: Event) {
    event.preventDefault(); //prevent http submit request!!!
    console.log("SUBMITTED!");
    //the this keyword does not point at the class
    //when we bind an element to an event  (see configure method)
    console.log(this.titleInputElement.value); //!!ERROR!! IF WE DON'T BIND THE EVENT LISTENER IN configure() (*)
  }
  private configure() {
    //setup an event listener and bind to submit to the private submitHandler method
    this.element.addEventListener("submit", this.submitHandler.bind(this)); //(*) bind(this) tells that this keyword inside submitHandler() will refer to the same this into the context (the class)
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}
const prjInput = new ProjectInput();
