import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string; //Creamos una propiedad publica
  public user: User;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Identificate'; //Lo normal es darle un valor a las propiedades dentro del constructor
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(this.user);
  }

}
