import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Ajustes de usuario";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    //RELLENAR OBJETO USUARIO
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image,
      '',
    );
  }

  ngOnInit(): void {
  }

  onSubmit(form){   
    this._userService.update(this.token, this.user).subscribe(
      response => {        
        if(response.status == "success"){
          this.status = "success";

          //ACTUALIZAR USUARIO
          if(response.user){
            this.user = response.user;            
          }

          //ACTUALIZAR USUARIO EN SESSION          
          localStorage.setItem("identity", JSON.stringify(response.user));

          console.log(response);
        }else{
          this.status = "error";
          console.log(response);
        }        
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }
}
