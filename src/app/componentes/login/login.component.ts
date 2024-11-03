import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginDTO } from '../../dto/ClienteDTO/login-dto';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,  private authService : AuthService, private router: Router) {
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
        // Swal.fire({
        //   title: 'Cuenta creada',
        //   text: 'La cuenta se ha creado correctamente',
        //   icon: 'success',
        //   confirmButtonText: 'Aceptar'
        // });
        console.log("INICIO DE SESION CORRECTO")// Redirige a la página de Activar Cuenta
      },
      error: (error) => {
        // Swal.fire({
        //   title: 'Error',
        //   text: error.error.respuesta,
        //   icon: 'error',
        //   confirmButtonText: 'Aceptar'
        // })
        console.log("INICIO DE SESION INCORRECTO ")
      }
    });
  }
}

