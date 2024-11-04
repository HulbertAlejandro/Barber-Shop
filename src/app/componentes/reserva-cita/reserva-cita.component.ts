import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrearCitaDTO } from '../../dto/CitaDTO/crear-cita-dto';
import { Router } from '@angular/router';
import { CitaService } from '../../cita.service';
import { TokenService } from '../../token.service';
import { ItemServicioDTO } from '../../dto/ServicioDTO/item-servicio-dto';
import { EstilistaDTO } from '../../dto/estilista-dto';

@Component({
  selector: 'app-reserva-cita',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reserva-cita.component.html',
  styleUrls: ['./reserva-cita.component.css']
})
export class ReservaCitaComponent implements OnInit {
  
  citaForm!: FormGroup;
  public servicios: ItemServicioDTO[];
  public estilistas: EstilistaDTO[];
  public estilistasFiltrados: EstilistaDTO[]; // Lista de estilistas filtrados por especialidad

  constructor(private formBuilder: FormBuilder, private citaService: CitaService, private router: Router, private tokenService: TokenService) {
    this.servicios = [];
    this.estilistas = [];
    this.estilistasFiltrados = [];
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarEstilistas();
  }

  private crearFormulario() {
    this.citaForm = this.formBuilder.group({
      idServicio: ['', Validators.required],
      idEstilista: [{ value: '', disabled: true }, Validators.required], // Inicialmente deshabilitado
      fechaInicioCita: ['', Validators.required],
      horaInicioCita: ['', Validators.required]
    });
  }

  private cargarServicios() {
    this.citaService.getServicios().subscribe({
      next: (data) => {
        console.log(data.respuesta); // Verificar el contenido de los datos
        this.servicios = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onOpcionSeleccionada(event: Event): void {
    const servicioSeleccionado = (event.target as HTMLSelectElement).value;

    if (servicioSeleccionado) {
      // Filtra los estilistas que tienen la misma especialidad que el servicio seleccionado
      this.estilistasFiltrados = this.estilistas.filter(estilista => estilista.especialidad === servicioSeleccionado);
      this.citaForm.get('idEstilista')?.enable(); // Habilitar el campo de estilistas
    } else {
      this.estilistasFiltrados = []; // Vaciar la lista si no hay un servicio seleccionado
      this.citaForm.get('idEstilista')?.disable(); // Deshabilitar el campo de estilistas
    }
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

  public reservarCita() {

    const nombreServicio = this.citaForm.controls['idServicio'].value;
    const nombreEstilista = this.citaForm.controls['idEstilista'].value;
    // Encuentra el servicio cuyo nombre coincida con `nombreServicio`
    const servicioSeleccionado = this.servicios.find(servicio => servicio.nombreServicio === nombreServicio);
    const estilistSeleccionado = this.estilistas.find(estilistas => estilistas.nombreEstilista === nombreEstilista);

    const fecha = this.citaForm.controls['fechaInicioCita'].value; // Ejemplo: '2024-10-10'
    const hora = this.citaForm.controls['horaInicioCita'].value; // Ejemplo: '14:30'

    // Combina fecha y hora en un solo string
    const fechaCompleta = `${fecha}T${hora}:00`; // Esto da '2024-10-10T14:30:00'

    // Crea un objeto Date a partir de la fecha completa
    const fechaEvento = new Date(fechaCompleta);
    const fechaFormateada = fechaEvento.toISOString().slice(0, 19); 

    const crearCita : CrearCitaDTO = {
      idCliente :'1104697206',
      idServicio : servicioSeleccionado?.id??'',
      idEstilista : estilistSeleccionado?.id??'',
      fechaInicioCita : fechaFormateada
    } 

    console.log(crearCita);
    this.citaService.crearCita(crearCita).subscribe({
      next: (data: any) => {
        console.log("CITA RESERVADA CORRECTAMENTE");
      },
      error: (data: any) => {
        console.log("ERROR AL RESERVAR CITA", data.error);
      }
    });
  }
}
