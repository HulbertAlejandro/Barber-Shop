import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ReservaCitaComponent } from './componentes/reserva-cita/reserva-cita.component';
import { VistaComponent } from './componentes/vista-citas/vista-citas.component';
import { EditarCitaComponent } from './componentes/editar-cita/editar-cita.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { InventarioComponent} from './componentes/inventario/inventario.component';
import { VistaEmpleadosComponent } from './componentes/vista-empleados/vista-empleados.component';
import { EditarEmpleadosComponent } from './componentes/edicion-empleados/edicion-empleados.component';
import { VistaReportesComponent } from './componentes/vista-reportes/vista-reportes.component';
import { HistorialUsuarioComponent } from './componentes/historial-usuario/historial-usuario.component';
import { CreacionServicioComponent } from './componentes/creacion-servicio/creacion-servicio.component';
import { CreacionEmpleadoComponent } from './componentes/creacion-empleado/creacion-empleado.component';

export const routes: Routes = [
   { path: '', component: LoginComponent },
   { path: 'registro-cliente', component: RegistroComponent },
   { path: 'reserva-cita', component: ReservaCitaComponent },
   { path: 'vista-citas', component: VistaComponent },
   { path: 'editar-cita/:id', component: EditarCitaComponent },
   { path: 'catalogo', component: CatalogoComponent},
   { path: 'inventario', component: InventarioComponent},
   { path: 'empleados', component: VistaEmpleadosComponent},
   { path: 'editar-estilista/:id', component: EditarEmpleadosComponent},
   { path: 'reportes', component: VistaReportesComponent},
   { path: 'historial', component: HistorialUsuarioComponent},
   { path: 'crear-servicio', component: CreacionServicioComponent},
   { path: 'crear-estilista', component: CreacionEmpleadoComponent},
   { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta no encontrada redirige a la principal
];

