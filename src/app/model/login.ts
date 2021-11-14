import {NgForm} from '@angular/forms';
export class Login {
  constructor(
    public login:string = '1',
    public password:string,
  ) {}
  clone() {
    return new Login(this.login, this.password);
  }
  onSubmit(form: NgForm){
    console.log(form);
  }
}
