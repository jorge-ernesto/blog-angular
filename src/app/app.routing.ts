//IMPORTS NECESARIOS
import {Routes, RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ErrorComponent} from './components/error/error.component';

//DEFINIR RUTAS
const APP_ROUTES: Routes = [
    {path: '', component: LoginComponent},
    {path: 'inicio', component: LoginComponent},    
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', component: ErrorComponent}
];

//EXPORTAR CONFIGURACION
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);