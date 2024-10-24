import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  // Definición de servicios por separado
  servicio1 = {
    id: 1,
    nombre: 'Corte de Cabello',
    descripcion: 'Corte de cabello a la moda según tu estilo.',
    imagen: 'https://cdn.pixabay.com/photo/2019/02/25/13/45/barbershop-4019683_1280.jpg',
    precio: 15
  };

  servicio2 = {
    id: 2,
    nombre: 'Peinado',
    descripcion: 'Peinado especial para cualquier ocasión.',
    imagen: 'https://cdn.pixabay.com/photo/2016/11/21/16/08/tying-hair-1846171_1280.jpg',
    precio: 20
  };

  servicio3 = {
    id: 3,
    nombre: 'Maquillaje',
    descripcion: 'Maquillaje profesional para eventos.',
    imagen: 'https://cdn.pixabay.com/photo/2019/11/22/18/21/cosmetics-4645407_1280.jpg',
    precio: 25
  };

  servicio4 = {
    id: 4,
    nombre: 'Manicura',
    descripcion: 'Cuidado de uñas y manos.',
    imagen: 'https://cdn.pixabay.com/photo/2017/08/06/00/41/people-2587157_960_720.jpg',
    precio: 10
  };
}
