import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], // Importa CommonModule y CurrencyPipe
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  @Input() historialServicios: any[] = [ // Recibe los servicios como input, inicializa como un array vacío
    { id: '1', nombreServicio: 'Corte de Cabello', descripcion: 'Corte moderno', precio: 25.0, duracionMinutos: 30 },
    { id: '2', nombreServicio: 'Coloración', descripcion: 'Tinte completo', precio: 60.0, duracionMinutos: 90 },
    // Otros servicios...
  ];

  volver() {
    // Lógica para cerrar sesión o redirigir a otra página
    console.log('Salir del sistema');
  }

  constructor() {}
}

