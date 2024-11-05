import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearCitaDTO } from './dto/CitaDTO/crear-cita-dto';
import { MensajeDTO } from './dto/mensaje-dto';
import { VistaEdicionCitaDTO } from './dto/CitaDTO/vista-edicion-cita-dto';
import { EditarCitaDTO } from './dto/CitaDTO/editar-cita-dto';
import { AgregarProductoStockDTO } from './dto/agregar-producto-stock-dto';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  
  

  private apiCita = 'http://localhost:8080/api/cita'; // Cambia la URL a la de tu backend
  private apiService = 'http://localhost:8080/api/servicio'; // Cambia la URL a la de tu backend
  private apiEstilista = 'http://localhost:8080/api/estilista'; // Cambia la URL a la de tu backend
  private apiInventario = 'http://localhost:8080/api/inventario';
  constructor(private http: HttpClient) {}

  editarCita(edicion : EditarCitaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.apiCita}/editar-cita`, edicion);
  }

  obtenerCita(id: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiCita}/cita/obtener/${id}`);
  }

  getServicios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiService}/obtener`);
  }

  getCitas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiCita}/listar-citas`);
  }

  getEstilistas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiEstilista}/obtener`);
  } 


  getInventario(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiInventario}/listarProductos`);
  } 

  agregarInventario(agregarProducto: AgregarProductoStockDTO) {
    return this.http.post<MensajeDTO>(`${this.apiInventario}/agregarProducto`, agregarProducto);
  }

  eliminarProducto(id: string) {
    return this.http.delete<MensajeDTO>(`${this.apiCita}/eliminar-producto/${id}`);
  }


  eliminarCita(id : string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiCita}/eliminar-cita/${id}`);
  } 

  crearCita(citaData: CrearCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiCita}/crear-cita`, citaData);
  }
}
