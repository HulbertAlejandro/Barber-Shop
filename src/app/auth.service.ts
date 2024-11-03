import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from './dto/mensaje-dto';
import { CrearClienteDTO } from './dto/ClienteDTO/crear-cliente-dto';
import { TokenDTO } from './dto/token-dto';
import { LoginDTO } from './dto/ClienteDTO/login-dto';


@Injectable({
 providedIn: 'root'
})
export class AuthService {


 private authURL = "http://localhost:8080/api/clientes";


 constructor(private http: HttpClient) { }

 public crearCuenta(cuentaDTO: CrearClienteDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/registrar`, cuentaDTO);
 }
 
 public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
 }

public refresh(tokenDTO: TokenDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/refresh`, tokenDTO);
   }
}

