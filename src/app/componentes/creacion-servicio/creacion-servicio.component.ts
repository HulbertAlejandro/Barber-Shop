import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../cita.service';
import Swal from 'sweetalert2';
import { CrearServicioDTO } from '../../dto/ServicioDTO/crear-servicio-dto';

@Component({
  selector: 'app-editar-cita',
  standalone: true,
  templateUrl: './creacion-servicio.component.html',
  styleUrls: ['./creacion-servicio.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class CreacionServicioComponent{
  public servicioForm: FormGroup;
  public estilista: any;

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private fb: FormBuilder,
  ) {
    // Initialize the form with idEstilista disabled by default
    this.servicioForm = this.fb.group({
      nombre: ['', [Validators.required]], // Control para el servicio // Deshabilitado al crear el formulario
      descripcion: ['', [Validators.required]], // Control para la fecha
      precio: ['',[Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)   ]], // Control para la fecha
      duracion: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)   ]], // Control para la fecha
    });
  }

  crearServicio(){
      const nombre = this.servicioForm.controls['nombre'].value;
      const descrip = this.servicioForm.controls['descripcion'].value;
      const pre = this.servicioForm.controls['precio'].value;
      const dur = this.servicioForm.controls['duracion'].value;
      
      const crearServicio: CrearServicioDTO = {
        nombreServicio: nombre,
        descripcion: descrip,
        precio: pre,
        duracionMinutos: dur
      };
    
      this.citaService.crearServicio(crearServicio).subscribe({
        next: () => {
  
          Swal.fire({
            title: 'Creacion de Servicio',
             text: 'Se creo el servicio correctamente',
             icon: 'success',
             confirmButtonText: 'Aceptar'
          });
  
          console.log("SERVICIO CREADO CORRECTAMENTE");
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
          console.log("ERROR AL CREAR SERVICIO", error);
        }
      });
  }
}
  
