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

//DEFINIR RUTAS
const APP_ROUTES: Routes = [
    {path: ''            , component: LoginComponent},
    {path: 'login'       , component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'inicio'      , component: HomeComponent},    
    {path: 'home'        , component: HomeComponent},    
    {path: 'register'    , component: RegisterComponent},    
    {path: 'ajustes'     , component: UserEditComponent},

    {path: 'crear-categoria', component: CategoryNewComponent},
    {path: 'crear-entrada'  , component: PostNewComponent},
    {path: '**'             , component: ErrorComponent}
];

//EXPORTAR CONFIGURACION
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);