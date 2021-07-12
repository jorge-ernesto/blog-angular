//IMPORTS NECESARIOS
import {Routes, RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {ProfileComponent} from './components/profile/profile.component';

import {CategoryListComponent} from './components/category/category-list/category-list.component';
import {CategoryCreateComponent} from './components/category/category-create/category-create.component';
import {CategoryPostComponent} from './components/category/category-post/category-post.component';

import {PostCreateComponent} from './components/post/post-create/post-create.component';
import {PostEditComponent} from './components/post/post-edit/post-edit.component';
import {PostDetailComponent} from './components/post/post-detail/post-detail.component';

//IMPORTAMOS GUARDS
import {DefaultGuard} from './services/default.guard';
import {IdentityGuard} from './services/identity.guard';

//DEFINIR RUTAS
const APP_ROUTES: Routes = [
    {path: ''            , component: LoginComponent   , canActivate: [DefaultGuard]},
    {path: 'login'       , component: LoginComponent   , canActivate: [DefaultGuard]},
    {path: 'logout/:sure', component: LoginComponent   , canActivate: [DefaultGuard]},
    {path: 'inicio'      , component: HomeComponent    , canActivate: [DefaultGuard]},
    {path: 'home'        , component: HomeComponent    , canActivate: [DefaultGuard]},
    {path: 'register'    , component: RegisterComponent, canActivate: [DefaultGuard]},
    {path: 'ajustes'     , component: UserEditComponent, canActivate: [IdentityGuard]},
    {path: 'perfil/:id'  , component: ProfileComponent , canActivate: [DefaultGuard]},

    {path: 'category'          , component: CategoryListComponent, canActivate: [IdentityGuard]},
    {path: 'category/create'   , component: CategoryCreateComponent , canActivate: [IdentityGuard]},
    {path: 'category/posts/:id', component: CategoryPostComponent, canActivate: [DefaultGuard]},
    
    {path: 'post/create'       , component: PostCreateComponent     , canActivate: [IdentityGuard]},
    {path: 'post/:id'          , component: PostDetailComponent  , canActivate: [DefaultGuard]},
    {path: 'post/:id/edit'     , component: PostEditComponent    , canActivate: [IdentityGuard]},    
        
    {path: '**'                , component: ErrorComponent       , canActivate: [DefaultGuard]}
];

//EXPORTAR CONFIGURACION
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);