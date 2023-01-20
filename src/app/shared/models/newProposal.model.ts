export class NewProposal {
  constructor(
    private title: string,
    private description: string,
    private id?: number,
    private resources?: string,
    private places?: number
  ) {}
}
