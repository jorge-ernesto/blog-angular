import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {PostService} from '../../../services/post.service';

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    providers: [UserService, PostService]
})
export class PostListComponent implements OnInit {

    @Input() posts;
    @Input() identity;
    @Input() url;

    public token; //El token no lo permite obtener por @Input, quizas por el largo de la variable, asi que lo obtenemos por UserService

    constructor(
        private _userService: UserService,
        private _postService: PostService,
    ) { 
        this.token = _userService.getToken();
    }

    ngOnInit(): void {
    }

    getPosts(){
        this._postService.getPosts().subscribe(
            response => {
                if(response.status == 'success'){
                    this.posts = response.posts;
                    console.log('POSTS:', this.posts);
                }
            },
            error => {        
                console.log(<any>error);
            }
        );
    }

    deletePost(id){
        // console.log('deletePost');
        // console.log(id, this.token);

        this._postService.delete(id, this.token).subscribe(
            response => {
                if(response.status == 'success'){          
                    console.log('RESPONSE DELETE:', response);
                    this.getPosts();          
                }
            },
            error => {        
                console.log(<any>error);
            }
        )
    }

}
