import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../cita.service';
import { CitasDTO } from '../../dto/CitaDTO/citas-dto';
import { ItemServicioDTO } from '../../dto/ServicioDTO/item-servicio-dto';
import { EstilistaDTO } from '../../dto/estilista-dto';
import { CrearCitaDTO } from '../../dto/CitaDTO/crear-cita-dto';
import { VistaEdicionCitaDTO } from '../../dto/CitaDTO/vista-edicion-cita-dto';
import { EditarCitaDTO } from '../../dto/CitaDTO/editar-cita-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cita',
  standalone: true,
  templateUrl: './edicion-empleados.component.html',
  styleUrls: ['./edicion-empleados.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class EditarEmpleadosComponent implements OnInit {
  public estilistaForm: FormGroup;
  public estilista: any;

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private fb: FormBuilder,
  ) {
    // Initialize the form with idEstilista disabled by default
    this.estilistaForm = this.fb.group({
      nombre: [''], // Control para el servicio // Deshabilitado al crear el formulario
      especialidad: [''], // Control para la fecha
    });
  }

  ngOnInit() {
    this.estilista = {}; // Asegura que cita esté inicializado
    this.obtenerEstilista();// Cargar todos los estilistas inicialmente
}

obtenerEstilista() {
  const estilistaId = this.route.snapshot.paramMap.get('id');
  if (estilistaId) {
    this.citaService.obtenerEstilista(estilistaId).subscribe({
      next: (data) => {
        this.estilista = data.respuesta;
        console.log("Estilista Edicion: ", data.respuesta)
        this.estilistaForm.patchValue({
          nombre: this.estilista.nombreEstilista,
          especialidad : this.estilista.especialidad // Asigna la hora (HH:MM)
        });
      },
      error: (error) => console.error(error),
    });
  }
}

  editarEstilista() {
    const nombreEstilista = this.estilistaForm.controls['nombre']?.value;
    const nombreEspecialidad = this.estilistaForm.controls['especialidad']?.value;
    // Verifica que todos los datos estén presentes
    if (!nombreEstilista || !nombreEspecialidad ) {
      console.log("Error: Campos obligatorios faltantes.");
      return;
    }
  
    const editarEstilista: EstilistaDTO = {
      id: this.estilista.id,
      nombreEstilista: nombreEstilista ,
      especialidad: nombreEspecialidad
    };
  
    this.citaService.editarEstilista(editarEstilista).subscribe({
      next: () => {

        Swal.fire({
          title: 'Edicion de esilista',
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
          confirmButtonText: 'Reintentar',
          customClass: {
            title: 'swal-title-custom',
            htmlContainer: 'swal-text-custom'
          }
        });
        console.log("ERROR AL EDITAR ESTILISTA", error);
      }
    });
  }
  


}
