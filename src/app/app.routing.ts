//IMPORTS NECESARIOS
import {Routes, RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {CategoryNewComponent} from './components/category-new/category-new.component';
import {PostNewComponent} from './components/post-new/post-new.component';
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import {PostEditComponent} from './components/post-edit/post-edit.component';
import {CategoryDetailComponent} from './components/category-detail/category-detail.component';

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

    {path: 'crear-categoria'   , component: CategoryNewComponent   , canActivate: [IdentityGuard]},
    {path: 'crear-entrada'     , component: PostNewComponent       , canActivate: [IdentityGuard]},
    {path: 'entrada/:id'       , component: PostDetailComponent    , canActivate: [DefaultGuard]},
    {path: 'editar-entrada/:id', component: PostEditComponent      , canActivate: [IdentityGuard]},
    {path: 'categoria/:id'     , component: CategoryDetailComponent, canActivate: [DefaultGuard]},
    {path: '**'                , component: ErrorComponent         , canActivate: [DefaultGuard]}
];

//EXPORTAR CONFIGURACION
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);