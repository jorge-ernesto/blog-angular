import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './services/user.service';
import {CategoryService} from './services/category.service';
import {global} from './global';

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
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
    title = 'blog-angular';
    public identity;
    public token;
    public url;
    public categories;
    public interval;

    constructor(
        public _userService: UserService,
        public _categoryService: CategoryService
    ){
        this.loadUser();
        this.url = global.url;
        console.log("Constructor carga primero");
    }

    ngOnInit(){
        console.log("ngOnInit carga despues de constructor");
        console.log("Webapp cargada correctamente");        
        
        this.getCategoriesWithSetInterval();
    }  

    ngDoCheck(){
        //NO USAMOS ESTE METODO YA QUE NGDOCHECK SE RECARGA CADA SEGUNDO HACIENDO PETICIONES HTTP, LO CUAL PUEDE SER NO TAN CONVENIENTE
        // this.loadUser();
        // if(this.identity && this.identity.sub){ //Solo si esta autenticado
        //     this.getCategories();
        // }
    }

    getCategoriesWithSetInterval(){ 
        //TRAEMOS AL INICIAR LA APLICACION LA DATA DE CATEGORIAS
        this.loadUser();
        if(this.identity && this.identity.sub){ //Solo si esta autenticado
            this.getCategories();
        }

        //EJECUTAMOS LA ACTUALIZACION DE CATEGORIAS CADA 30 SEGUNDOS
        this.interval = setInterval(function(){
          
            this.loadUser();
            if(this.identity && this.identity.sub){ //Solo si esta autenticado        
                this.getCategories();
            }

        }.bind(this), 30000);    
    }

    loadUser(){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        
        // console.log('CARGAMOS DATOS DE USUARIOS QUE SE CARGAN AUTOMATICAMENTE');
        // console.log('IDENTITY:',this.identity);
        // console.log('TOKEN:',this.token);
    }

    getCategories(){
        this._categoryService.getCategories().subscribe(
            response => {
                if(response.status == "success"){
                    this.categories = response.categories;
                    // console.log(this.categories);
                }        
            },
            error => {
                console.log(<any>error);
            }
        )
    }
}
