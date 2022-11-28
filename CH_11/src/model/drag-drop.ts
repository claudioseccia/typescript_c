//Drag & Drop interfaces
//Interface Draggable - to set some object to be draggable
//implement to any class that can be draggable (ProjectItem class)
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
//Interface DragTarget - to set some object to be a drop target
//implement to any class that can be a drop target (ProjectList class - the boxes where Active and Finished projects are)
export interface DragTarget {
  dragOverHandler(event: DragEvent): void; //signal the browser and js that the thing we're trying to drag over is a valid drag target
  dropHandler(event: DragEvent): void; //react to actual drop happens (and update data in the app)
  dragLeaveHandler(event: DragEvent): void; //useful for giving some visual feedback to the user
}
