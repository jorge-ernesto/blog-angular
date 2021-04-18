import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {global} from './../../global';

//TODOS LOS PLUGINS DE FROALA
// Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';
// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';
// Import a Froala Editor language file.
import 'froala-editor/js/languages/de.js';
// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
//CERRAR TODOS LOS PLUGINS DE FROALA

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

  //OPCIONES DE FROALA
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };
  //CERRAR OPCIONES DE FROALA

  //OPCIONES DE ANGULAR FILE UPLOADER
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'user/upload',
      method:"POST",
      headers: {     
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      attachPinBtn: 'Sube tu avatar de usuario'
    }    
  };
  //CERRAR OPCIONES DE ANGULAR FILE UPLOADER

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
      '', //password
      this.identity.description,
      this.identity.image,
      '', //getToken
    );
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log('Usuario');
    console.log(this.user);

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

  avatarUpload(datos){    
    let data = datos.body;
    this.user.image = data.image;    
  }
}
