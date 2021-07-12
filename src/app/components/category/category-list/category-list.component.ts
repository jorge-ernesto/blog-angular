import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Category} from '../../../models/category'; 
import {CategoryService} from '../../../services/category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css'],
    providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {

    public category: Category;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _categoryService: CategoryService,
    ) { }

    ngOnInit(): void {
    }

}
