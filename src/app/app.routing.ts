//IMPORTS NECESARIOS
import {Routes, RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';

//DEFINIR RUTAS
const APP_ROUTES: Routes = [
    {path: '', component: LoginComponent},
    {path: 'inicio', component: HomeComponent},    
    {path: 'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'ajustes', component: UserEditComponent},
    {path: '**', component: ErrorComponent}
];

//EXPORTAR CONFIGURACION
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);