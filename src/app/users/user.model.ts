enum Rank {
  Asistent,
  Lector,
  Conferentiar,
  Profesor,
}

class Role {
  constructor(public id: number, public name: string) {}
}

class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string,
    public roles: Role[],
    public professor: boolean
  ) {}
}

type Student = User & { serialNumber: string };

type Professor = User & { rank: string };

export { Rank, User, Student, Professor };
