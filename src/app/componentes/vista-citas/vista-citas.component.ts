import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CitaService } from '../../cita.service';
import { Router } from '@angular/router';
import { CitasDTO } from '../../dto/CitaDTO/citas-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-citas.component.html',
  styleUrls: ['./vista-citas.component.css']
})
export class VistaComponent {
  public citas: CitasDTO[] = [];
  public selectedCita: CitasDTO | null = null; // Para almacenar la cita seleccionada
  public showModal: boolean = false; 
  public showDeleteModal: boolean = false; 

  constructor(
    private citaService: CitaService,
    private router: Router,
  ) {
    this.cargarCitas();
  }

  editarCita(idCita: string, event: Event) {
    event.stopPropagation(); // Evita que se dispare el evento click en la fila
    this.router.navigate(['/editar-cita', idCita]);
  }
  

  private cargarCitas() {
    this.citaService.getCitas().subscribe({
      next: (data) => {
        console.log(data.respuesta); // Verificar el contenido de los datos
        this.citas = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Método para mostrar detalles de la cita
  showDetails(cita: CitasDTO) {
    this.selectedCita = cita; // Almacena la cita seleccionada
    this.showModal = true; // Muestra el modal de detalles
  }

  // Método para cerrar el modal de detalles
  closeModal() {
    this.showModal = false; // Cierra el modal de detalles
  }

  // Método para confirmar la eliminación de la cita
  confirmDelete(cita: CitasDTO, event: Event) {
    event.stopPropagation(); // Prevenir el evento de clic en la fila
    this.selectedCita = cita; // Almacena la cita seleccionada para eliminar
    this.showDeleteModal = true; // Muestra el modal de eliminación
  }

  // Método para ejecutar la lógica de eliminación
  confirmarDelete() {
    if (this.selectedCita?.idCita) {
      this.citaService.eliminarCita(this.selectedCita.idCita).subscribe({
          next: (response) => {
              this.showDeleteModal = false; // Cierra el modal de eliminación
              this.cargarCitas(); // Opcional: recargar las citas después de eliminar
          },
          error: (error) => {
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
