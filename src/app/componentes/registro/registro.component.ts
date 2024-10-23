import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.crearFormulario();
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
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
    if (this.registroForm.valid) {
      console.log(this.registroForm.value);
      // Lógica para registrar el cliente
    } else {
      console.log('El formulario no es válido');
    }
  }
}
