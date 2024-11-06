import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'Barber-Shop';
  rol: string | null = null; // Declaración correcta de la variable

  constructor(private tokenService: TokenService) {
    this.rol = this.tokenService.getRol();
    console.log('Rol del usuario:', this.rol); // Depuración
  }
  
}
