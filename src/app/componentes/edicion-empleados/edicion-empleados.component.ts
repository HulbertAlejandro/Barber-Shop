import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../cita.service';
import { ItemServicioDTO } from '../../dto/ServicioDTO/item-servicio-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empleados',
  standalone: true,
  templateUrl: './edicion-empleados.component.html',
  styleUrls: ['./edicion-empleados.component.css'],
  imports: [ReactiveFormsModule, FormsModule], // Ensure ReactiveFormsModule is imported here
})
export class EditarEmpleadosComponent implements OnInit {
  public estilistaForm: FormGroup;
  public estilista: any;
  public servicios: ItemServicioDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private fb: FormBuilder
  ) {
    this.estilistaForm = this.fb.group({
      nombre: [''],
      especialidad: ['']
    });
  }

  ngOnInit(): void {
    this.cargarServicios();
    this.obtenerEstilista();
  }

  obtenerEstilista() {
    const estilistaId = this.route.snapshot.paramMap.get('id');
    if (estilistaId) {
      this.citaService.obtenerEstilista(estilistaId).subscribe({
        next: (data) => {
          this.estilista = data.respuesta;
          this.estilistaForm.patchValue({
            nombre: this.estilista.nombreEstilista,
            especialidad: this.estilista.especialidad
          });
        },
        error: (error) => console.error(error),
      });
    }
  }

  editarEstilista() {
    const nombreEstilista = this.estilistaForm.controls['nombre']?.value;
    const nombreEspecialidad = this.estilistaForm.controls['especialidad']?.value;

    if (!nombreEstilista || !nombreEspecialidad) {
      console.log("Error: Campos obligatorios faltantes.");
      return;
    }

    const editarEstilista = {
      id: this.estilista.id,
      nombreEstilista: nombreEstilista,
      especialidad: nombreEspecialidad
    };

    this.citaService.editarEstilista(editarEstilista).subscribe({
      next: () => {
        Swal.fire({
          title: 'Edicion de estilista',
          text: 'Estilista editado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        console.log("ESTILISTA EDITADO CORRECTAMENTE");
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar'
        });
        console.log("ERROR AL EDITAR ESTILISTA", error);
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
