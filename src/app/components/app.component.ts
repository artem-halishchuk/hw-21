import { Component } from '@angular/core';
import {User} from '../model/user';
import {Login} from '../model/login';
import {Contact} from '../model/contact';

//--------------------------------------------------------
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
        /*input.ng-touched.ng-invalid {border:solid red 2px; border-radius: 3px}
        input.ng-touched.ng-valid {border:solid green 2px;  border-radius: 3px}*/
    `],
})
export class AppComponent {
  visibleRegister = false;
  showRegister() {
    this.visibleRegister = !this.visibleRegister;
  }

  visiblePopup = false;
  popupMassage:string = '';
  showPopup(massage:string) {
    this.visiblePopup = !this.visiblePopup;
    this.popupMassage = massage;
  }

  public user: User = new User('', '', '', []);
  public users: User[] = [new User('user', '1Qaz', '9999-99-99', []),
                          new User('', '', '')];

  registerUser() {
    let search = false;
    this.users.map(e => {
      if (e.login === this.user.clone().login) {
        this.showPopup('Login busy');
        this.user = new User('', this.user.clone().password, this.user.clone().bornDate, []); //очистка формы
        search = true;
        return;
      }
    });
    if (search) return;
    this.users.push(this.user.clone());
    this.user = new User('', '', '', []); //очистка формы
    this.showRegister();
    this.showPopup('User added');
  }

  public login: Login = new Login('', '');
  public currentUser:number = -1;
  loginUser() {
    let search = false;
    this.users.map((e, i) => {
      if (e.login === this.login.clone().login && e.password === this.login.clone().password) {
        this.currentUser = i;
        this.visibleLogin = false;
        this.visibleBook = true;
        this.login = new Login('', ''); //очистка формы
        search = true;
        return;
      }
    });
    if (search) return;
    this.showPopup('User not found');
    this.login = new Login('', ''); //очистка формы
  }

  public visibleBook = false;
  public visibleLogin = true;

  signOut() {
    this.visibleBook = !this.visibleBook;
    this.visibleLogin = !this.visibleLogin;
  }

  public typeContacts:string = 'phone';
  public contact: Contact = new Contact('', '', '');

  addContact() {
    this.users[this.currentUser].contacts.push(this.contact.clone());
    this.contact = new Contact('', '', ''); //очистка формы
    console.log(this.users[this.currentUser].contacts);
  }

  public currentContact: Contact|null = null;
  public currentContactIndex: number|null = null;
  public visibleCurrentContact = false;

  aboutContact(contact: Contact, i: number) {
    this.currentContact = contact;
    this.visibleCurrentContact = true;
    this.currentContactIndex = i;
  }
  showCurrentContact() {
    this.visibleCurrentContact = !this.visibleCurrentContact;
    this.currentContact = null;
  }

  public visibleButtonAddContact = true;
  public visibleSaveContact = false;
  edit(contact: Contact) {
    this.visibleButtonAddContact = !this.visibleButtonAddContact;
    this.visibleSaveContact = !this.visibleSaveContact;
    this.contact.name = contact.name;
    this.contact.type = contact.type;
    this.contact.value = contact.value;
  }
  save(name: string|null, type: string|null, value: string|null, i: number|null) {
    if (i === null) return;
    this.users[this.currentUser].contacts[i].name = name;
    this.users[this.currentUser].contacts[i].type = type;
    this.users[this.currentUser].contacts[i].value = value;
    this.contact = new Contact('', this.contact.type, ''); //очистка формы
    this.visibleButtonAddContact = !this.visibleButtonAddContact;
    this.visibleSaveContact = !this.visibleSaveContact;
  }

  deleteContact(i: number) {
    this.currentContactIndex = i;
    if (this.currentContact === this.users[this.currentUser].contacts[this.currentContactIndex]) this.showCurrentContact();
    this.users[this.currentUser].contacts.splice(this.currentContactIndex, 1);
  }
}

