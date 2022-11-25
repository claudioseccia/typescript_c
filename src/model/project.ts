//Project Type
export enum ProjectStatus {
  Active,
  Finished,
}
//Poject object definition:
export class Project {
  //assigning properties to the constructor automatically instantiates the properties
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
