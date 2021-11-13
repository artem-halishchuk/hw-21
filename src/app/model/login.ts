export class Login {
  constructor(
    public login:string,
    public password:string,
  ) {}
  clone() {
    return new Login(this.login, this.password);
  }
}
