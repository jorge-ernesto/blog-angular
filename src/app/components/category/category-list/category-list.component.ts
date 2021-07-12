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

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _categoryService: CategoryService,
    ) { 
        this.page_title = "Listar categoria";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts(){
        this._categoryService.getCategories().subscribe(
            response => {
                if(response.status == 'success'){
                    this.categories_ = response.categories_;
                    console.log('CATEGORIES:', this.categories_);
                }
            },
            error => {        
                console.log(<any>error);
            }
        );
    }

}
