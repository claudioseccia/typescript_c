//
//Component Base Class (base class for ProjectList)
//select elements on the DOM, has the attach method and manages shared functionalities
// T, U --> generics!
//component: UI renderable component with some functionalities in it
//
//ABSTRACT CLASS CANNOT BE INSTANTIATED, ONLY USED FOR INHERITANCE
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
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
