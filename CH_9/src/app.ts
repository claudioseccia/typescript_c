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
//****************************************
//9.10 - More Classes & Custom Types
//
//****************************************
//9.11 - Filtering Projects with Enums
//we want to filter between active and finished projects: the best place to put filtering is our listener function (ProjectList constructor)
//
//****************************************
//9.12 - Adding Inheritance & Generics
//generic Component class  to extend functionalities to the other classes
//
//****************************************
//9.13 - Rendering Project Items with a Class
//
//****************************************
//9.14 - Using a Getter
//
//****************************************
//9.15 - Utilizing Interfaces to Implement Drag & Drop
//switch the project from being an Active Project to a Finished project. Not only visual.
//two things to implement:
//drag and drop (a bunch of event listeners)
//behind the scenes changing the State of the application and the status property in Project class
//
//****************************************
//9.16 - Drag Events & Reflecting the Current State in the UI
//(implementing actual drag and drop event listeners)
//
//****************************************
//9.18 - Finishing Drag & Drop
//
//****************************************
//9.19 - Wrap Up
//More on Drag & Drop: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
//
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//Drag & Drop Interfaces
//not only to define the structure of some object, but also to sign a contract with some classes
//and force them to implement certain methods that help us with drag and drop
//note: place draggable="true" in li inside the template with id="single-project"
//
//Interface Draggable - to set some object to be draggable
//implement to any class that can be draggable (ProjectItem class)
interface Draggable {
  //two handlers and event listeners for this event
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
//Interface DragTarget - to set some object to be a drop target
//implement to any class that can be a drop target (ProjectList class - the boxes where Active and Finished projects are)
interface DragTarget {
  //two event handlers to implement
  dragOverHandler(event: DragEvent): void; //signal the browser and js that the thing we're trying to drag over is a valid drag target
  dropHandler(event: DragEvent): void; //react to actual drop happens (and update data in the app)
  dragLeaveHandler(event: DragEvent): void; //useful for giving some visual feedback to the user
}

//Project Type
//class to have to build project objects always with the same structure
//a class and not an Interface or a custom type, to just instantiate it
// ProjectStatus enum type
enum ProjectStatus {
  Active,
  Finished,
}
//Poject object definition:
class Project {
  //assigning properties to the constructor automatically instantiates the properties
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
//type Listener definition - FUNCTION
//type Listener = (items: Project[]) => void; //the listener function doesn't need to have a return, hence void
//generic type definition fro State Class
type Listener<T> = (items: T[]) => void;
//

//State Class
//generic class defining the state (to be inherited by ProjectState)
class State<T> {
  //protected, private but accessible from classes that inherits:
  protected listeners: Listener<T>[] = []; //array of function references. Everytime something changes we call a listener function
  //subscription pattern: we manage a list of listeners called whenever something changes
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//ProjectState Class (singleton)
//class to manage the state of my appplication, and setup listeners for the various parts of my application
class ProjectState extends State<Project> {
  //listeners
  //private listeners: Listener[] = []; //array of function references. Everytime something changes we call a listener function
  //array of projects
  private projects: Project[] = [];
  //SINGLETON sutup
  private static instance: ProjectState;
  private constructor() {
    //for extending the State class:
    super();
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }
  //end SINGLETON sutup
  //not needed (parent class):
  //subscription pattern: we manage a list of listeners called whenever something changes
  // addListener(listenerFn: Listener) {
  //   this.listeners.push(listenerFn);
  // }
  //add new Project
  addProject(title: string, description: string, numOfPeople: number) {
    //project I want to store
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    //refactoring to this.updateListeners()
    // for (const listenerFn of this.listeners) {
    //   listenerFn(this.projects.slice()); //slice will return a copy of that array, array and objects are reference values in javascript
    // }
    this.updateListeners();
  }

  //function to change the state of the project after dragging and dropping
  //move from the list it is currently in to a new list
  moveProject(projectId: string, newStatus: ProjectStatus) {
    //find a project with that id in the array of projects
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus; //changes the object in the array
      this.updateListeners();
    }
  }

  private updateListeners() {
    //refactoring to allow DRY of code, updates all the listeners on state change
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

//
//Component Base Class (base class for ProjectList)
//select elements on the DOM, has the attach method and manages shared functionalities
// T, U --> generics!
//component: UI renderable component with some functionalities in it
//
//ABSTRACT CLASS CANNOT BE INSTANTIATED, ONLY USED FOR INHERITANCE
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  //T and U will be some kind of HTML element, depending of the needs (different from the two extending classes for hostElement and element)
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  //constructor parameters:
  //templateId - id to know how to select it
  //hostElementId -  id of where to render this component
  //insertAtStart - for the attach method
  //OPTIONAL PARAMETERS ALWAYS AS LAST!:
  //newElementId - id the element to attach (optional with the ? operator - alternative --> newElementId: string | undefined )
  constructor(
    templateId: string,
    hostElementId: string,
    insertAtBeginning: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //true stands to import all the nodes inside of the html
    this.element = importedNode.firstElementChild as U; //set this.element as the firstElementChild (<section class="projects">...</section>)
    if (newElementId) {
      this.element.id = newElementId; //assign the id to the element dynamically, either for active or finished projects
    }
    this.attach(insertAtBeginning);
  }
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  //force with abstract, any class that will inherit this one to have a configure and renderContent method:
  abstract configure(): void;
  abstract renderContent(): void;
}
//
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  //getter to get the proper number of people
  get persons() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return `${this.project.people} persons`;
    }
  }
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id); //"single-project" ->template id, hostId -> host element ID, insert at the beginning (true), id -> id to be assigned to the newly created element
    this.project = project;
    this.configure();
    this.renderContent();
  }
  //Draggable interface method implementation
  @Autobind
  dragStartHandler(event: DragEvent) {
    // console.log(event);
    //DRAG AND DROP
    event.dataTransfer!.setData("text/plain", this.project.id); //! it won't be null
    event.dataTransfer!.effectAllowed = "move";
  }
  dragEndHandler(event: DragEvent) {
    console.log("DragEnd" + event);
  }
  //use configure to reach elements where to implement drag and drop
  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent() {
    //added h2, h3 and p to the id "single-project" in index.html
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned"; //this.persons triggers the getter (get persons())
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

//ProjectList Class
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  //inherited by Component class:
  // templateElement: HTMLTemplateElement;
  // hostElement: HTMLDivElement;
  // element: HTMLElement;
  assignedProjects: Project[];
  //type of the project we'll expect when we'll instantiate the class is 'active' or 'finished'
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`); //call the constructor from Component class
    //inherited by Component class:
    // this.templateElement = document.getElementById(
    //   "project-list"
    // )! as HTMLTemplateElement; //same as above!
    // this.hostElement = document.getElementById("app")! as HTMLDivElement;
    this.assignedProjects = [];
    //inherited by Component class:
    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // ); //true stands to import all the nodes inside of the html
    // this.element = importedNode.firstElementChild as HTMLElement; //set this.element as the firstElementChild (<section class="projects">...</section>)
    // this.element.id = `${this.type}-projects`; //assign the id to the element dynamically, either for active or finished projects
    //add a listener to the globally available projectState.addListener function
    //
    //moved in the configure() method, called at the boottom:
    // projectState.addListener((projects: Project[]) => {
    //   //filter the projects based on the type (finished or active)
    //   const relevantProjects = projects.filter((prj) => {
    //     if (this.type === "active") {
    //       return prj.status === ProjectStatus.Active;
    //     }
    //     return prj.status === ProjectStatus.Finished;
    //   }); //filter only the desired values and assign to a new list: relevantProjects
    //   // this.assignedProjects = projects;
    //   this.assignedProjects = relevantProjects;
    //   this.renderProjects();
    // }); //pass an anonymous function
    // this.attach(); //already called in the Component class

    this.configure();
    this.renderContent();
  }
  //DROPPABLE IMPLEMENTATION
  @Autobind
  dragOverHandler(event: DragEvent) {
    //DRAG AND DROP
    //chack if drag and drop is allowed here:
    //ckeck the same dataTransfer type of dragStartHandler of projectItem
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault(); //prevent default to tell js that for this element you will allow dropping - we'll now allow dropHandeler to occur
      //signal the browser and js that the thing we're trying to drag over is a valid drag target
      //_ silent warnings for typescript not being event used in the function
      //change the appearance of my draggable element: add the droppable class to the ul
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable"); //adds .droppable to ul emenents (droppable container): pink background (active) and bluette background (finished) on dragover
    }
  }
  @Autobind
  dropHandler(event: DragEvent) {
    //console.log(event.dataTransfer!.getData("text/plain")); //project id we attached
    const prjId = event.dataTransfer!.getData("text/plain");
    //change the project status from active to finished and viceversa
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    ); //this.type resolves to the ProjectList type of the surrinding class
  } //react to actual drop happens (and update data in the app)
  @Autobind
  dragLeaveHandler(_: DragEvent) {
    //update the style leaving the droppable area
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  //PUBLIC METHODS
  configure() {
    //DRAG AND DROP EVENT LISTENERS
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    //
    projectState.addListener((projects: Project[]) => {
      //filter the projects based on the type (finished or active)
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      }); //filter only the desired values and assign to a new list: relevantProjects
      // this.assignedProjects = projects;
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }
  // private renderContent() { //already abstract in Component class
  renderContent() {
    //populate the fields
    const listId = `${this.type}-project-lists`;
    this.element.querySelector("ul")!.id = listId; //add ids to the ul elements
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
  //PRIVATE METHODS
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-lists`
    )! as HTMLUListElement;
    //fix duplication clearing the html of the listEl
    listEl.innerHTML = "";
    //render all the projects we have
    for (const prjItem of this.assignedProjects) {
      // const listItem = document.createElement("li");
      // listItem.textContent = prjItem.title;
      // listEl?.appendChild(listItem);
      //use the ProjectItem class (9.13):
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  //inherited by Component class:
  // private attach() {
  //   this.hostElement.insertAdjacentElement("beforeend", this.element);
  // }
}
//ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

  //inherited by Component class:
  // private attach() {
  //   this.hostElement.insertAdjacentElement("afterbegin", this.element);
  // }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
