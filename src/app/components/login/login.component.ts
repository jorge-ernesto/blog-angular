import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public page_title: string; //Creamos una propiedad publica

  constructor() {
    this.page_title = 'Identificate'; //Lo normal es darle un valor a las propiedades dentro del constructor
  }

  ngOnInit(): void {
  }

}
