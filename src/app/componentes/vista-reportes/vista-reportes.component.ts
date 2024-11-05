import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../cita.service';
import { RangoFechasDTO } from '../../dto/rango-fechas-dto';
import { ReporteDTO } from '../../dto/reporte-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cita',
  standalone: true,
  templateUrl: './vista-reportes.component.html',
  styleUrls: ['./vista-reportes.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class VistaReportesComponent{

  reporteForm !: FormGroup;
  reportes : ReporteDTO[] = []
  public estilista: any;

  constructor(private route: ActivatedRoute,private citaService: CitaService, private fb: FormBuilder, private formBuilder: FormBuilder) {
    this.crearFormulario()
  }

  private crearFormulario(){
      this.reporteForm = this.formBuilder.group({
        fechaInicio: [''],
        fechaFin: ['']
      });
  }


  obtenerReporte() {
    const fechaInicio = this.reporteForm.controls['fechaInicio']?.value;
    const fechaFin = this.reporteForm.controls['fechaFin']?.value;


    const rangoFechas: RangoFechasDTO = {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };
  
    this.citaService.obtenerReporte(rangoFechas).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Carga de Reportes',
           text: 'Se cargo el reporte exitosamente',
           icon: 'success',
           confirmButtonText: 'Aceptar'
        });
        this.reportes = data.respuesta
        console.log(this.reportes)
        console.log("REPORTE GENERADO CORRECTAMENTE");
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
        console.log("ERROR AL GENERAR EL REPORTE", error);
      }
    });
  }

  cargarReporte() {
    this.obtenerReporte()
  }
}
