export abstract class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public serial_number: string
  ) {}
}
