import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';
import { CrearClienteDTO } from '../../dto/ClienteDTO/crear-cliente-dto';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl:'./registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService : AuthService) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],  // Asegura que sean exactamente 10 dígitos
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],  // Cambia minLength a 8
      confirmaPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions);
  }
  

  // Validador personalizado para confirmar que las contraseñas coincidan
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;

    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  // Método que se ejecuta al enviar el formulario
  public registrar() {
    // Extrae solo los campos que están en CrearClienteDTO
    const crearCuenta: CrearClienteDTO = {
      id: this.registroForm.get('id')?.value,
      nombre: this.registroForm.get('nombre')?.value,
      telefono: this.registroForm.get('telefono')?.value,
      correo: this.registroForm.get('correo')?.value,
      password: this.registroForm.get('password')?.value
    };
  
    console.log(crearCuenta);
  
    this.authService.crearCuenta(crearCuenta).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Creacion de Cuenta',
           text: 'Se creo la cuenta correctamente',
           icon: 'success',
           confirmButtonText: 'Aceptar'
        });
        console.log("CUENTA CREADA", data.respuesta);
        // Redirige a la página de Activar Cuenta
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
        console.log("NO SE CREO LA CUENTA ");
      }
    });
  }
  
}
