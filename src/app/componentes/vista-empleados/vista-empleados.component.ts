import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CitaService } from '../../cita.service';
import { Router } from '@angular/router';
import { CitasDTO } from '../../dto/CitaDTO/citas-dto';
import { CommonModule } from '@angular/common';
import { EstilistaDTO } from '../../dto/estilista-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-empleados.component.html',
  styleUrls: ['./vista-empleados.component.css']
})
export class VistaEmpleadosComponent {
  public estilistas: EstilistaDTO[] = [];
  public selectedEstilista: EstilistaDTO | null = null; // Para almacenar la cita seleccionada
  public showModal: boolean = false; 
  public showDeleteModal: boolean = false; 

  constructor(
    private citaService: CitaService,
    private router: Router,
  ) {
    this.cargarEstilistas();
  }

  editarEstilista(idEstilista: string, event: Event) {
    event.stopPropagation(); // Evita que se dispare el evento click en la fila
    this.router.navigate(['/editar-estilista', idEstilista]);
  }
  

  private cargarEstilistas() {
    this.citaService.getEstilistas().subscribe({
      next: (data) => {
        console.log(data.respuesta); // Verificar el contenido de los datos
        this.estilistas = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Método para mostrar detalles de la cita
  showDetails(cita: EstilistaDTO) {
    this.selectedEstilista = cita; // Almacena la cita seleccionada
    this.showModal = true; // Muestra el modal de detalles
  }

  // Método para cerrar el modal de detalles
  closeModal() {
    this.showModal = false; // Cierra el modal de detalles
  }

  // Método para confirmar la eliminación de la cita
  confirmDelete(cita: EstilistaDTO, event: Event) {
    event.stopPropagation(); // Prevenir el evento de clic en la fila
    this.selectedEstilista = cita; // Almacena la cita seleccionada para eliminar
    this.showDeleteModal = true; // Muestra el modal de eliminación
  }

  // Método para ejecutar la lógica de eliminación
  confirmarDelete() {
    if (this.selectedEstilista?.id) {
      this.citaService.eliminarEstilista(this.selectedEstilista.id).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Carga de Datos',
               text: 'Se cargaron los datos exitosamente',
               icon: 'success',
               confirmButtonText: 'Aceptar'
            });
              this.showDeleteModal = false; // Cierra el modal de eliminación
              this.cargarEstilistas(); // Opcional: recargar las citas después de eliminar
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
              console.error(error);
          },
      });
  } else {
      alert('No se pudo eliminar la cita: ID no encontrado');
  }
  }

  // Método para cerrar el modal de eliminación
  closeDeleteModal() {
    this.showDeleteModal = false; // Cierra el modal de eliminación
  }
}
