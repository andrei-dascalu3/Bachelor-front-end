export class Proposal {
  title: string;
  description: string;
  id?: number;
  resources?: string;
  places?: number;

  constructor(
    title: string,
    desc: string,
    id?: number,
    resources?: string,
    places?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = desc;
    this.resources = resources;
    this.places = places;
  }
}
