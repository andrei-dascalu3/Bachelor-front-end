export class NewUser {
  constructor(
    private firstName: string,
    private lastName: string,
    private username: string,
    private password: string,
    private professor: boolean,
    private roles: string[],
    private description?: string
  ) {}
}
