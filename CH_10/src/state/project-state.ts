import { Project, ProjectStatus } from "../model/project.js";
//Project State Management
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
export class ProjectState extends State<Project> {
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
export const projectState = ProjectState.getInstance();
