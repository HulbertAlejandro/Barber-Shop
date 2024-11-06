import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../cita.service';
import { ItemServicioDTO } from '../../dto/ServicioDTO/item-servicio-dto';
import Swal from 'sweetalert2';
import { CreacionEmpleadoDTO } from '../../dto/creacion-empleado-dto';

@Component({
  selector: 'app-editar-cita',
  standalone: true,
  templateUrl: './creacion-empleado.component.html',
  styleUrls: ['./creacion-empleado.component.css'],
  imports: [ReactiveFormsModule]  // Ensure ReactiveFormsModule is included here
})
export class CreacionEmpleadoComponent implements OnInit {
  public empleadoForm: FormGroup;
  public servicios: ItemServicioDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.empleadoForm = this.fb.group({
      nombre: ['', [Validators.required]], 
      especialidad: ['', [Validators.required]] 
    });
  }

  ngOnInit(): void {
    this.cargarServicios();
  }

  crearEmpleado() {
    const crearEmpleado: CreacionEmpleadoDTO = {
      nombre: this.empleadoForm.value.nombre,
      especialidad: this.empleadoForm.value.especialidad
    };

    this.citaService.crearEmpleado(crearEmpleado).subscribe({
      next: () => {
        Swal.fire({
          title: 'Creación de Estilista',
          text: 'Estilista creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar'
        });
        console.error("Error al crear estilista:", error);
      }
    });
  }

  cargarServicios() {
    this.citaService.getServicios().subscribe({
      next: (data) => this.servicios = data.respuesta,
      error: (error) => console.error("Error al cargar servicios:", error)
    });
  }
}
