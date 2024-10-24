import { Component, OnInit } from '@angular/core';

// Interfaz para el producto
interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  descripcion: string;
}

// Enumeración de las claves
type ProductoKey = keyof Producto;

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  
  productos: Producto[] = [];
  nuevoProducto: Producto = { id: 0, nombre: '', cantidad: 0, descripcion: '' };

  ngOnInit(): void {
    // Inicializar productos de ejemplo
    this.productos = [
      { id: 1, nombre: 'Champú', cantidad: 15, descripcion: 'Champú hidratante para cabello seco' },
      { id: 2, nombre: 'Tinte', cantidad: 8, descripcion: 'Tinte color rubio' },
      { id: 3, nombre: 'Acondicionador', cantidad: 25, descripcion: 'Acondicionador reparador' }
    ];
  }

  // Método para agregar un producto
  agregarProducto(): void {
    if (this.nuevoProducto.nombre && this.nuevoProducto.cantidad > 0) {
      this.nuevoProducto.id = this.productos.length + 1;
      this.productos.push({ ...this.nuevoProducto });
      this.nuevoProducto = { id: 0, nombre: '', cantidad: 0, descripcion: '' };
    } else {
      alert("Por favor, complete todos los campos requeridos.");
    }
  }

  // Método para eliminar un producto
  eliminarProducto(id: number): void {
    this.productos = this.productos.filter(producto => producto.id !== id);
  }

  // Manejar entradas
  onInput(event: Event, campo: ProductoKey): void {
    const target = event.target as HTMLInputElement | null;
  }
}