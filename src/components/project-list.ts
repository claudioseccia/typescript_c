import Component from "./base-component";
import { DragTarget } from "../model/drag-drop";
import { Project, ProjectStatus } from "../model/project";
import { Autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";
//ProjectList Class
export class ProjectList
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
