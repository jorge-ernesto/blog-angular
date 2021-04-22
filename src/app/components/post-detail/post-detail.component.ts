import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public page_title: string;
  public post: Post;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _postService: PostService,    
  ) { 
    this.page_title = "Post detail";
  }

  ngOnInit(): void {
    this.getPost()
  }

  getPost(){
    //SACAR EL ID DEL POST DE LA URL
    this._route.params.subscribe(params => {
      let id = +params['id']; //+ para indicarle que es integer
      console.log(id);

      //PETICION AJAX PARA SACAR LOS DATOS
      this._postService.getPost(id).subscribe(
        response => {
          if(response.status == "success"){                                  
            this.post = response.post;
            console.log( this.post );

            this.status = 'success';            
          }else{          
            this.status = 'error';              
            //REDIRECCIONAMOS A INICIO SI HAY UN ERROR
            this._router.navigate(['/inicio']);
          }        
        },
        error => {
          this.status = 'error';
          console.log(<any>error);
          //REDIRECCIONAMOS A INICIO SI HAY UN ERROR
          this._router.navigate(['/inicio']);
        }
      )
    })

    
  }

}
