import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HistorialComponent } from './componentes/historial/historial.component';
import { ReservaCitaComponent } from './componentes/reserva-cita/reserva-cita.component';
import { VistaComponent } from './componentes/vista-citas/vista-citas.component';
import { EditarCitaComponent } from './componentes/editar-cita/editar-cita.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';

export const routes: Routes = [
   { path: '', component: InicioComponent }, // Ruta principal
   { path: 'login', component: LoginComponent }, // Ruta de login
   { path: 'registro', component: RegistroComponent }, // Ruta de registro
   { path: 'historial', component: HistorialComponent }, // Ruta de historial
   { path: 'reserva-cita', component: ReservaCitaComponent },
   { path: 'vista-citas', component: VistaComponent },
   { path: 'editar-cita', component: EditarCitaComponent },
   { path: 'catalogo', component: CatalogoComponent},
   { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta no encontrada redirige a la principal
];

