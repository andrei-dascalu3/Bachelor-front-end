export class Preference {
  constructor(
    public studentId: number,
    public proposalId: number,
    public rating: number,
    public title?: string,
    public description?: string,
    public resources?: string,
    public profUsername?: string,
    public places?: number
  ) {}
}
