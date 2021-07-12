import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
    providers: [UserService, CategoryService]
})
export class CategoryListComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public categories_: any;
    public status: string;

    //Variables para ngx-pagination
    public data   : any;    //Variable que contendra la información
    public page   : number; //Pagina en la que nos encontramos
    public total  : number; //Total de datos totales en la BD
    public perPage: number; //Cuantos elementos mostraremos
    public from   : number; //Desde el registro numero 1
    public to     : number; //Hasta el registro numero 10
    //Cerrar Variables para ngx-pagination

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _categoryService: CategoryService,
    ) { 
        this.page_title = "Listar categoria";
        this.identity   = this._userService.getIdentity();
        this.token      = this._userService.getToken();

        //Variables para ngx-pagination
        this.page    = 1;
        this.total   = 0;
        this.perPage = 10;        
        //Cerrar Variables para ngx-pagination
    }

    ngOnInit(): void {
        //Recogemos informacion de url
        this._route.params.subscribe((params: Params) => {
            this.page = +params.page || 1; //Si no encuentra el primer dato, mostrara 1
            this.getCategoriesPaginate(this.page);
            window.scrollTo(0, 0);
        });    
    }

    /**
     * Metodo que obtiene la información de categorias con paginacion
     */
    getCategoriesPaginate(page){
        this._categoryService.getCategoriesPaginate(page).subscribe(
            response => {
                if(response.status == 'success'){
                    this.categories_ = response.categories_;

                    //Variables para ngx-pagination
                    this.data    = response.categories_.data;
                    this.page    = +response.categories_.current_page;
                    this.total   = +response.categories_.total;
                    this.perPage = +response.categories_.per_page;
                    this.from    = +response.categories_.from;
                    this.to      = +response.categories_.to;
                    //Cerrar Variables para ngx-pagination
                    
                    console.log('response:', response);
                    console.log('CATEGORIES:', this.categories_);
                }
            },
            error => {        
                console.log(<any>error);
            }
        );
    }

    /**
     * Metodo que sirve para hacer el cambio de pagina facilitado por ngx-pagination
     */
    pageChanged(page) {
        this.page = page;
        const queryParams: Params = {page};
        this._router.navigate(
            [],
            {
                relativeTo: this._route,
                queryParams
            }
        );
        this.getCategoriesPaginate(this.page);
    }

}
