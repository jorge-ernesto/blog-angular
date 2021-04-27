import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {global} from './../../global';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    providers: [UserService]
})
export class UserEditComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public user: User;  
    public status; 
    public url;

    //OPCIONES DE FROALA
    public froala_options: Object = {
        charCounterCount: true,
        toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
        toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
        toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    };  

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
        fileNameIndex : true,
        replaceTexts: {      
            selectFileBtn : ' Seleccionar archivos ' , 
            resetBtn : ' Restablecer ' , 
            uploadBtn : ' Subir ' , 
            dragNDropBox : ' Arrastrar y soltar ' ,       
            attachPinBtn: ' Sube tu avatar de usuario ',
            afterUploadMsg_success : ' ¡Subido con éxito! ' , 
            afterUploadMsg_error : ' ¡Error al cargar ! ' , 
            sizeLimit : ' Límite de tamaño ' 
        }
    };  

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.page_title = "Ajustes de usuario";    
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '', '');
        this.url = global.url;

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
        // console.log('USUARIO:', JSON.stringify(this.user));
        // console.log('TOKEN:', JSON.stringify(this.token));        
        this.status = "";
        
        //ENVIAMOS INFORMACION DE USUARIO Y TOKEN
        this._userService.update(this.user, this.token).subscribe(
            response => {  
                
                console.log('RESPONSE:', JSON.stringify(response));
                        
                //OBTENEMOS INFORMACION DE RESPUESTA
                if(response.status == "success"){                                        
                    //ACTUALIZAR USUARIO
                    if(response.user){
                        this.identity.name        = response.user.name;
                        this.identity.surname     = response.user.surname;
                        this.identity.email       = response.user.email;
                        this.identity.description = response.user.description;
                        this.identity.image       = response.user.image;
                    }

                    //ACTUALIZAR USUARIO EN SESSION          
                    localStorage.setItem("identity", JSON.stringify(this.identity));                   
                    
                    //ACTUALIZAMOS IDENTITY Y TOKEN
                    this.identity = this._userService.getIdentity();
                    this.token = this._userService.getToken();
                    
                    //VERIFICAMOS IDENTITY
                    console.log('IDENTITY:', JSON.stringify(this.identity));

                    //MOSTRAMOS MENSAJE DE EXITO
                    this.status = "success";   
                    
                    //REDIRECCIONAMOS A LA MISMA PAGINA PARA QUE LA IMAGEN CARGUE CORRECTAMENTE EN EL NAVBAR
                    // this._router.navigate(['/ajustes']);
                    location.reload();
                }else{
                    this.status = "error";
                }        

            },
            error => {
                this.status = 'error';
                console.log(<any>error);
            }
        );
    }

    avatarUpload(datos){    
        console.log("Datos:",JSON.stringify(datos));
        let data = datos.body;
        this.user.image = data.image;    
    }
}
