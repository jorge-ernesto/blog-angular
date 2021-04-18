import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {Post} from '../../models/post';
import {Category} from 'src/app/models/category';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public post: Post;
  public categories: Category;
  public status: string;

  //OPCIONES DE FROALA
  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _router: Router,    
    private _route: ActivatedRoute,
  ) { 
    this.page_title = "Crear una entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null);
    this.getCategories();
  }

  onSubmit(form){
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

}
