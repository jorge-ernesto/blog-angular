import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  
  constructor() { 
    this.page_title = "Registrate";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');

    /*
    public id: number,
    public name: string,
    public surname: string,
    public role: string,
    public email: string,
    public password: string,
    public description: string,
    public image:string
    */
  }

  ngOnInit(): void {
    console.log("Componente de registro lanzado");
  }

  onSubmit(form){
    console.log(this.user);
    console.log(form);
    form.reset();
  }

}
