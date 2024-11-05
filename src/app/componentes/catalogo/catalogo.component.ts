import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemServicioDTO } from '../../dto/ServicioDTO/item-servicio-dto';
import { Router } from '@angular/router';
import { CitaService } from '../../cita.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent {
  public catalogo : ItemServicioDTO[] = []

  constructor(
    private citaService: CitaService,
    private router: Router){

    this.cargarCatalogo()
    
    }

    private cargarCatalogo(){
      this.citaService.getServicios().subscribe({

        next: (data) => {

          Swal.fire({
            title: 'Cargando Datos',
             text: 'Se cargaron los datos',
             icon: 'success',
             confirmButtonText: 'Aceptar'
          });
          
          console.log(data.respuesta); // Verificar el contenido de los datos
          this.catalogo = data.respuesta;
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
    }
}
