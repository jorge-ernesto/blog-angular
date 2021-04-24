import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {PostService} from '../../services/post.service';
import {Category} from 'src/app/models/category';
import {Post} from '../../models/post';
import {global} from './../../global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, PostService] //ESTO ES MUY IMPORTANTE, SIN CARGARLO EN LOS PROVIDERS NO FUNCIONARA
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;  
  public url;
  public categories: Category;
  public post: Post;
  public status: string;
  public is_edit: boolean;

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
      url: global.url+'post/upload',
      method:"POST",
      headers: {     
        "Authorization" : this._userService.getToken()
      }
    },
    theme: "dragNDrop",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,    
    fileNameIndex : true,
    replaceTexts: {
      attachPinBtn: 'Sube tu avatar de usuario',
      selectFileBtn : ' Seleccionar archivos ' , 
      resetBtn : ' Restablecer ' , 
      uploadBtn : ' Subir ' , 
      dragNDropBox : ' Arrastrar y soltar ' ,       
      afterUploadMsg_success : ' ¡Subido con éxito! ' , 
      afterUploadMsg_error : ' ¡Error al cargar ! ' , 
      sizeLimit : ' Límite de tamaño ' 
    }
  };

  constructor(
    private _router: Router,    
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,    
  ) { 
    this.page_title = "Crear una entrada";
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = false;
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null);
    this.getCategories();
  }

  onSubmit(form){
    this.status = "";
    
    //ENVIAMOS INFORMACION DE POST Y TOKEN
    this._postService.create(this.post, this.token).subscribe(
      response => {
         
        console.log('RESPONSE:', JSON.stringify(response));

        //OBTENEMOS INFORMACION DE RESPUESTA
        if(response.status == "success"){          
          this.status = "success";
          form.reset();          
          this._router.navigate(['/crear-entrada']);
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

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {

        //OBTENEMOS CATEGORIAS
        if(response.status == 'success'){
          this.categories = response.categories;
          console.log("CATEGORIAS:", this.categories);
        }

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  imageUpload(datos){    
    console.log("Datos:",JSON.stringify(datos));
    let data = datos.body;
    this.post.image = data.image;    
  }

}
