import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
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
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate'; //Lo normal es darle un valor a las propiedades dentro del constructor
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit(): void {
    //SE EJECUTA SIEMPRE QUE CARGUE EL COMPONENTE Y CIERRA SESION SOLO CUANDO LE LLEGA EL PARAMETRO SURE POR LA URL
    this.logout();
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

              //PERSISTIR DATOS DE USUARIO IDENTIFICADO
              // console.log(this.token);
              // console.log(this.identity);

              localStorage.setItem('token', JSON.stringify(this.token));
              localStorage.setItem('identity', JSON.stringify(this.identity.user));

              //REDIRECCION A LA PAGINA PRINCIPAL
              this._router.navigate(['inicio']);
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

  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure']; //+ para indicarle que es integer
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //REDIRECCION A LA PAGINA PRINCIPAL
        this._router.navigate(['inicio']);
      }
    })
  }

}
