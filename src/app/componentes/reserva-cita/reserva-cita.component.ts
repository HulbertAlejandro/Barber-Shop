import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reserva-cita',
  standalone: true,
  templateUrl: './reserva-cita.component.html',
  styleUrls: ['./reserva-cita.component.css'],
  imports: [FormsModule] // Importa FormsModule aquí
})
export class ReservaCitaComponent {
  selectedService: string = '';
  selectedStylist: string = '';
  selectedDate: string = '';
  selectedTime: string = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Aquí puedes manejar la lógica de reserva
      console.log('Reserva realizada:', {
        service: this.selectedService,
        stylist: this.selectedStylist,
        date: this.selectedDate,
        time: this.selectedTime
      });
      // Reiniciar el formulario después de enviar
      form.reset();
    }
  }
}
