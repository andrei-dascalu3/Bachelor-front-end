enum Rank {
  Asistent,
  Lector,
  Conferentiar,
  Profesor,
}

class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public type: string
  ) {}
}

type Student = User & { serialNumber: string };

type Professor = User & { rank: string };

export { Rank, User, Student, Professor };
