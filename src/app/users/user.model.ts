export abstract class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public serialNumber: string
  ) {}
}
