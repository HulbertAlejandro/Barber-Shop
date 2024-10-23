import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HistorialComponent } from './componentes/historial/historial.component'; 

export const routes: Routes = [
   { path: '', component: InicioComponent }, // Ruta principal
   { path: 'login', component: LoginComponent }, // Ruta de login
   { path: 'registro', component: RegistroComponent }, // Ruta de registro
   { path: 'historial', component: HistorialComponent }, // Ruta de historial
   { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta no encontrada redirige a la principal
];
