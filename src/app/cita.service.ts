import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearCitaDTO } from './dto/CitaDTO/crear-cita-dto';
import { MensajeDTO } from './dto/mensaje-dto';
import { VistaEdicionCitaDTO } from './dto/CitaDTO/vista-edicion-cita-dto';
import { EditarCitaDTO } from './dto/CitaDTO/editar-cita-dto';
import { AgregarProductoStockDTO } from './dto/agregar-producto-stock-dto';
import { EstilistaDTO } from './dto/estilista-dto';
import { RangoFechasDTO } from './dto/rango-fechas-dto';
import { CrearServicioDTO } from './dto/ServicioDTO/crear-servicio-dto';
import { CreacionEmpleadoDTO } from './dto/creacion-empleado-dto';
import { CitaUpdateDTO } from './dto/CitaDTO/cita-update-dto';
import { AgregarCantidadProductoStockDTO } from './dto/agregar-cantidad-producto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  
  private apiCita = 'http://localhost:8080/api/cita'; // Cambia la URL a la de tu backend
  private apiService = 'http://localhost:8080/api/servicio'; // Cambia la URL a la de tu backend
  private apiEstilista = 'http://localhost:8080/api/estilista'; // Cambia la URL a la de tu backend
  private apiInventario = 'http://localhost:8080/api/inventario';
  constructor(private http: HttpClient) {}


  //CITAS

  updateCita(cita : CitaUpdateDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.apiCita}/update-cita`, cita);
  }

  editarCita(edicion : EditarCitaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.apiCita}/editar-cita`, edicion);
  }

  obtenerCita(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiCita}/cita/obtener/${id}`);
  }

  getCitas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiCita}/listar-citas`);
  }

  eliminarCita(id : string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiCita}/eliminar-cita/${id}`);
  } 

  crearCita(citaData: CrearCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiCita}/crear-cita`, citaData);
  }


  //SERVICIOS

  crearServicio(servicioData: CrearServicioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiService}/crear-servicio`, servicioData);
  }

  getServicios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiService}/obtener`);
  }



  //ESTILISTAS


  crearEmpleado(empleadoData: CreacionEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiEstilista}/crear-estilista`, empleadoData);
  }

  getEstilistas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiEstilista}/obtener`);
  } 

  eliminarEstilista(id: string) : Observable<MensajeDTO>{
    return this.http.delete<MensajeDTO>(`${this.apiEstilista}/eliminar/${id}`);
  }

  obtenerEstilista(id: string) : Observable<MensajeDTO>  {
    return this.http.get<MensajeDTO>(`${this.apiEstilista}/obtener/${id}`);
  }

  editarEstilista(editarEstilista: EstilistaDTO) :Observable<MensajeDTO>  {
    return this.http.put<MensajeDTO>(`${this.apiEstilista}/editar-estilista`, editarEstilista);
  }


  
  //INVENTARIO
  agregarCantidadProducto(cantidad :AgregarCantidadProductoStockDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.apiInventario}/agregar-cantidad-producto`, cantidad);
  }
  
  reducirCantidadProducto(id :string, cantidad : string): Observable<MensajeDTO> {
    console.log("ID : " , id, " cantidad : ", cantidad)
    return this.http.delete<MensajeDTO>(`${this.apiInventario}/eliminar-cantidad/${id}/${cantidad}`);
  }

  getInventario(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiInventario}/listarProductos`);
  } 

  agregarInventario(agregarProducto: AgregarProductoStockDTO) : Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiInventario}/agregarProducto`, agregarProducto);
  }

  eliminarProducto(id: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiInventario}/eliminarProducto/${id}`);
  }


  //REPORTES

  obtenerReporte(rangoFechas: RangoFechasDTO) :  Observable<MensajeDTO>  {
    const {fechaInicio, fechaFin } = rangoFechas;
    return this.http.get<MensajeDTO>(`${this.apiInventario}/generarReporte/${fechaInicio}/${fechaFin}`);
  }

  obtenerHistorial(id: string) :  Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiInventario}/generarHistorial/${id}`);
  }
  
}
