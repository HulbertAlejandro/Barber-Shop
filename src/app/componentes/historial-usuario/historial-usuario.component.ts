import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CitaService } from '../../cita.service';
import { Router } from '@angular/router';
import { CitasDTO } from '../../dto/CitaDTO/citas-dto';
import { CommonModule } from '@angular/common';
import { EstilistaDTO } from '../../dto/estilista-dto';
import { HistorialDTO } from '../../dto/historial-dto';

@Component({
  selector: 'app-vista-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-usuario.component.html',
  styleUrls: ['./historial-usuario.component.css']
})
export class HistorialUsuarioComponent {
showDetails(_t24: HistorialDTO) {
throw new Error('Method not implemented.');
}
  public historial: HistorialDTO[] = [];
  public selectedEstilista: EstilistaDTO | null = null; // Para almacenar la cita seleccionada
  public showModal: boolean = false; 
  public showDeleteModal: boolean = false; 

  constructor(
    private citaService: CitaService,
    private router: Router,
  ) {
    this.cargarHistorial();
  }

  private cargarHistorial() {
    this.citaService.obtenerHistorial("1104697206").subscribe({
      next: (data) => {
        console.log(data.respuesta); // Verificar el contenido de los datos
        this.historial = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
