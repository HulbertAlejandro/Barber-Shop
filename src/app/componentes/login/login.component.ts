import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '../../dto/ClienteDTO/login-dto';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,  private authService : AuthService, private router: Router,  private tokenService: TokenService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  // Método que se ejecuta al enviar el formulario
  public iniciarSesion() {
    const login = this.loginForm.value as LoginDTO
    console.log(login)
    this.authService.iniciarSesion(login).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Inicio de Sesion',
           text: 'Inicio de sesion correcto',
           icon: 'success',
           confirmButtonText: 'Aceptar'
        });
        this.tokenService.login(data.respuesta.token);
        console.log("INICIO DE SESION CORRECTO")// Redirige a la página de Activar Cuenta
        console.log(data.respuesta)
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar',
          customClass: {
            title: 'swal-title-custom',
            htmlContainer: 'swal-text-custom'
          }
        });
        console.log("INICIO DE SESION INCORRECTO ")
      }
    });
  }
}

