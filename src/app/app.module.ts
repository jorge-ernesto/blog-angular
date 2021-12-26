import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_ROUTING} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {AngularFileUploaderModule} from "angular-file-uploader";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';

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
    CategoryNewComponent,
    PostNewComponent,
    PostDetailComponent,
    PostEditComponent,
    CategoryDetailComponent
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
