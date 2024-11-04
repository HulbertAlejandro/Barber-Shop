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

@Component({
  selector: 'app-editar-cita',
  standalone: true,
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class EditarCitaComponent implements OnInit {
  public citaForm: FormGroup;
  public cita: any;
  public servicios: ItemServicioDTO[] = [];
  public estilistas: EstilistaDTO[] = [];
  public estilistasFiltrados: EstilistaDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private citaService: CitaService,
    private fb: FormBuilder,
  ) {
    this.servicios = [];
    this.estilistas = [];
    this.estilistasFiltrados = [];

    this.cargarServicios();
  
    // Initialize the form with idEstilista disabled by default
    this.citaForm = this.fb.group({
      idServicio: [''], // Control para el servicio
      idEstilista: [{ value: '', disabled: true }], // Deshabilitado al crear el formulario
      fechaInicioCita: [''], // Control para la fecha
      horaInicioCita: [''], // Control para la hora
    });
    
    
    
  }

  ngOnInit() {
    this.cita = {}; // Asegura que cita esté inicializado
    this.obtenerCita();
    this.cargarEstilistas(); // Cargar todos los estilistas inicialmente
}

obtenerCita() {
  const citaId = this.route.snapshot.paramMap.get('id');
  if (citaId) {
    this.citaService.obtenerCita(citaId).subscribe({
      next: (data) => {
        this.cita = data.respuesta;

        // Aquí, usamos la fecha y hora directamente sin ajuste de zona horaria
        const fecha = this.cita.fechaInicioCita; // formato "YYYY-MM-DD"
        const hora = this.cita.horaCita; // formato "HH:MM:SS"

        // Asigna los valores al formulario
        this.citaForm.patchValue({
          idServicio: this.cita.servicio,
          idEstilista: this.cita.estilista,
          fechaInicioCita: fecha, // Asigna directamente la fecha
          horaInicioCita: hora.slice(0, 5), // Asigna la hora (HH:MM)
        });

        // Filtra los estilistas en base al servicio
        this.cargarEstilistasFiltrados(this.cita.servicio);
      },
      error: (error) => console.error(error),
    });
  }
}


  cargarEstilistasFiltrados(servicio: string) {
    // Filter stylists based on the given service
    this.estilistasFiltrados = this.estilistas.filter(estilista => estilista.especialidad === servicio);
    this.citaForm.get('idEstilista')?.enable();
  }

  onOpcionSeleccionada(event: Event): void {
    const servicioSeleccionado = (event.target as HTMLSelectElement).value;
  
    if (servicioSeleccionado) {
      this.cargarEstilistasFiltrados(servicioSeleccionado);
      this.citaForm.get('idEstilista')?.enable(); // Activa el control si hay un servicio seleccionado
    } else {
      this.estilistasFiltrados = [];
      this.citaForm.get('idEstilista')?.disable(); // Desactiva si no hay servicio seleccionado
    }
  }

  cargarServicios() {
    this.citaService.getServicios().subscribe({
      next: (data) => this.servicios = data.respuesta,
      error: (error) => console.error(error),
    });
  }

  cargarEstilistas() {
    this.citaService.getEstilistas().subscribe({
      next: (data) => this.estilistas = data.respuesta,
      error: (error) => console.error(error),
    });
  }

  editarCita() {
    const nombreServicio = this.citaForm.controls['idServicio']?.value;
    const nombreEstilista = this.citaForm.controls['idEstilista']?.value;
    const fecha = this.citaForm.controls['fechaInicioCita']?.value;
    const hora = this.citaForm.controls['horaInicioCita']?.value;
  
    // Verifica que todos los datos estén presentes
    if (!nombreServicio || !nombreEstilista || !fecha || !hora) {
      console.log("Error: Campos obligatorios faltantes.");
      return;
    }
  
    // Encuentra los IDs del servicio y estilista seleccionados
    const servicioSeleccionado = this.servicios.find(servicio => servicio.nombreServicio === nombreServicio);
    const estilistaSeleccionado = this.estilistas.find(estilista => estilista.nombreEstilista === nombreEstilista);
  
    if (!servicioSeleccionado || !estilistaSeleccionado) {
      console.log("Error: Servicio o estilista no encontrado.");
      return;
    }
  
    // Combina fecha y hora sin convertir a zona horaria
    const fechaFormateada = `${fecha}T${hora}:00`; // Formato "YYYY-MM-DDTHH:MM:SS"
  
    const editarCita: EditarCitaDTO = {
      idCita: this.cita.idCita,
      idServicio: servicioSeleccionado.id,
      idEstilista: estilistaSeleccionado.id,
      fechaInicioCita: fechaFormateada,
    };
  
    this.citaService.editarCita(editarCita).subscribe({
      next: () => {
        console.log("CITA EDITADA CORRECTAMENTE");
      },
      error: (error) => {
        console.log("ERROR AL EDITAR CITA", error);
      }
    });
  }
  


}
