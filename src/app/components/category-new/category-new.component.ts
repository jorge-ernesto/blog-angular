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
  public identity;
  public token;
  public category: Category;  
  public status: string;

  constructor(    
    private _route: ActivatedRoute,
    private _router: Router,    
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.page_title = "Crear nueva categoria";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');    
    this.status = "";
  }

  ngOnInit(): void {
  }

  onSubmit(form){    
    this.status = "";

    //ENVIAMOS INFORMACION DE CATEGORIA Y TOKEN
    this._categoryService.create(this.category, this.token).subscribe(
      response => {        

        console.log("RESPONSE:", JSON.stringify(response));

        //OBTENEMOS INFORMACION DE RESPUESTA        
        if(response.status == "success"){          
          this.status = 'success';
          form.reset();          
          this._router.navigate(['/crear-categoria']);
        }else{             
          this.status = 'error';          
        }

      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

}
