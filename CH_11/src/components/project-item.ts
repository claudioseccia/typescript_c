import { Draggable } from "../model/drag-drop";
import { Project } from "../model/project";
import Component from "./base-component";
import { Autobind } from "../decorators/autobind";
//ProjectItem component
export class ProjectItem
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
