export class UserData {
  constructor(
    public username: string,
    public uid: number,
    public roles: string[],
    public isProfessor: boolean,
    private _token: string,
    private _refreshToken: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
    {
      return null;
    }
    return this._token;
  }

  get refreshToken() {
    return this._refreshToken;
  }
}
