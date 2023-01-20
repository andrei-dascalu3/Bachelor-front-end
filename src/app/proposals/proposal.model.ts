export class Proposal {
  id: number;
  title: string;
  description: string;
  resources?: string;
  places?: number;

  constructor(
    id: number,
    title: string,
    desc: string,
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
