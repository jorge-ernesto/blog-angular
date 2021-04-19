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
  public identity;
  public token;  
  public user: User;
  public status: string;

  constructor(    

    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.page_title = 'Identificate'; //Lo normal es darle un valor a las propiedades dentro del constructor
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.verificarUsuarioAutenticado();
    this.logout();
  }

  onSubmit(form){
    //ENVIAMOS INFORMACION DE USUARIO A SIGNUP (ESTO RETORNARA EL TOKEN)
    this._userService.signup(this.user).subscribe(
      response => {
        console.log('TOKEN:', JSON.stringify(response));

        //OBTENEMOS TOKEN
        if(response.status == "success"){
          this.status = "success";
          this.token = response.token;

          //ENVIAMOS INFORMACION DE USUARIO A SIGNUP (ESTO RETORNARA LA DATA DEL USUARIO AUTENTICADO, QUE ES EL TOKEN DECODIFICADO)
          this._userService.signup(this.user, true).subscribe(
            response => {              
              console.log('USUARIO AUTENTICADO:', JSON.stringify(response));              

              //OBTENEMOS USUARIO AUTENTICADO
              if(response.status == "success"){
                this.status = "success";
                this.identity = response;                

                //PERSISTIR DATOS DE USUARIO IDENTIFICADO                
                localStorage.setItem('token', JSON.stringify(this.token));
                localStorage.setItem('identity', JSON.stringify(this.identity.user));

                //REDIRECCION A LA PAGINA PRINCIPAL
                this._router.navigate(['inicio']);
              }else{
                this.status = "error";
              }
            },
            error => {
              this.status = "error";
              console.log(<any>error)              
            }
          )
        }else{
          this.status = "error";          
        } 

      },
      error => {        
        this.status = "error";
        console.log(<any>error)
      }
    )
  }

  //SE EJECUTA SIEMPRE QUE CARGA EL COMPONENTE, PERO SOLO CIERRA LA SESION SOLO CUANDO LE LLEGA EL PARAMETRO SURE POR LA URL
  logout(){
    this._route.params.subscribe(params => {
      let logout = +params['sure']; //+ para indicarle que es integer
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //REDIRECCION A LA PAGINA PRINCIPAL
        this._router.navigate(['login']);
      }
    })
  }

  //VERIFICAMOS QUE EL USUARIO ESTE AUTENTICADO PARA REDIRECCIONAR A INICIO
  verificarUsuarioAutenticado(){
    this.identity = this._userService.getIdentity();    
    if(this.identity){
      this._router.navigate(['inicio']);
    }
  }

}
