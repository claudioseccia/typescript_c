//tsc -w
//npm start
//****************************************
//9.1/2 - Getting Started
//****************************************
//9.3 - DOM Element Selection & OOP Rendering
//STEP 1: in the index.html: get the form inside the element template with id "project-input" inside the div with id "app"
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; //or generic HTMLElement
  element: HTMLFormElement;
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
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}
const prjInput = new ProjectInput();
