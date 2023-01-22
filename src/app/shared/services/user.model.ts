export class User {
  public id: string;
  public firstname: string;
  public lastname: string;
  public email?: string;
  private _token?: string;
  private _tokenExpirationDate?: Date;

  constructor(
    id: string,
    firstname: string,
    lastname: string,
    email?: string,
    _token?: string,
    _tokenExpirationDate?: Date
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    if(email) this.email = email;
    if(_token) this._token = _token;
    if(_tokenExpirationDate) this._tokenExpirationDate = _tokenExpirationDate;
  }
  

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
