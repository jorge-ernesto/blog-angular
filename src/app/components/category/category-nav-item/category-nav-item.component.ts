import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {CategoryService} from '../../../services/category.service';

@Component({
    selector: 'app-category-nav-item',
    templateUrl: './category-nav-item.component.html',
    styleUrls: ['./category-nav-item.component.css'],
    providers: [UserService, CategoryService]
})
export class CategoryNavItemComponent implements OnInit {

    public identity;
    public token;
    public categories;
    public interval;

    constructor(
        private _userService: UserService,
        private _categoryService: CategoryService,
    ) { 
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit(): void {
        this.getCategoriesWithSetInterval();
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
                    // console.log('categories', this.categories);
                }        
            },
            error => {
                console.log(<any>error);
            }
        )
    }

}
