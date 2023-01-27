export class Accord {
  constructor(
    public profId: number,
    public studId: number,
    public propId: number,
    public studUsername?: string,
    public profUsername?: string,
    public propTitle?: string,
    public accepted?: boolean,
  ) {}
}