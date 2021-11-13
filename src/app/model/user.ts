import {Contact} from './contact';
export class User {
  constructor(
    public login:string,
    public password:string,
    public bornDate:string,
    public contacts: Contact[] = []
  ) {}
  clone():User {
    return new User(this.login, this.password, this.bornDate, this.contacts);
  }
}
