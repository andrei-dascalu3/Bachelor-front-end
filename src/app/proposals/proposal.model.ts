export class Proposal {
  title: string;
  description: string;
  resources: string[];
  places?: number;
  isProject: boolean;

  constructor(
    title: string,
    desc: string,
    resources: string[],
    isProject: boolean,
    places?: number
  ) {
    this.title = title;
    this.description = desc;
    this.resources = resources;
    this.isProject = isProject;
    this.places = places
  }
}
