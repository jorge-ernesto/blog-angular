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
  public status: string;
  public token;
  public identity;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Identificate'; //Lo normal es darle un valor a las propiedades dentro del constructor
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._userService.signup(this.user).subscribe(
      response => {
                
        //OBTENER TOKEN
        if(response.status == "success"){
          this.status = "success";
          this.token = response.token;
          //OBTENEMOS USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;
              console.log(this.token);
              console.log(this.identity);
            },
            error => {
              this.status = "error";
              console.log(<any>error)              
            }
          ) //CERRAR OBTENEMOS USUARIO IDENTIFICADO
        }else{
          this.status = "error";          
        } //CERRAR OBTENER TOKEN        

      },
      error => {        
        this.status = "error";
        console.log(<any>error)
      }
    )
  }

}
