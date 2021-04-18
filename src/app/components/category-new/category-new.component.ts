import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from './../../services/user.service';
import {Category} from './../../models/category'; 
import {CategoryService} from './../../services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public status: string;
  public identity;
  public token;
  public category: Category;  

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {
    this.page_title = "Crear nueva categoria";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    // console.log("Categoria")
    // console.log(this.category);

    this._categoryService.create(this.category, this.token).subscribe(
      response => {
        if(response.status == "success"){
          this.status = 'success';
          form.reset();
          console.log(response);
          
          this._router.navigate(['/inicio']);
        }else{          
          this.status = 'error';
          console.log(response);
        }        
      },
      error => {
        this.status = 'success';
        console.log(<any>error);
      }
    );
  }

}
