import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_ROUTING} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {AngularFileUploaderModule} from "angular-file-uploader";

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProfileComponent } from './components/profile/profile.component';

import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryPostComponent } from './components/category/category-post/category-post.component';
import { PostListComponent } from './components/category/post-list/post-list.component';

import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { PostDetailComponent } from './components/post/post-detail/post-detail.component';

//IMPORTAMOS GUARDS 
import {UserService} from './services/user.service'; //Ademas de añadir los guards, y para que estos funcionen es importante añadir el UserService porque demanera global necesitamos tener acceso a ese servicio
import {DefaultGuard} from './services/default.guard';
import {IdentityGuard} from './services/identity.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    UserEditComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryPostComponent,
    PostListComponent,
    PostCreateComponent,
    PostEditComponent,
    PostDetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    AngularFileUploaderModule,
  ],
  providers: [
    UserService,
    DefaultGuard,
    IdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
