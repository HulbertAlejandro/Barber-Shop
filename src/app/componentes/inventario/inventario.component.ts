import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitaService } from '../../cita.service';
import { AgregarProductoStockDTO } from '../../dto/agregar-producto-stock-dto';
import { ProductoStockDTO } from '../../dto/producto-stock-dto';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productoForm!: FormGroup;
  productos: ProductoStockDTO[] = [];

  constructor(private citaService: CitaService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarProductos();
  }

  crearFormulario() {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  cargarProductos() {
    this.citaService.getInventario().subscribe({
      next: (data) => {
        console.log("Productos" , data.respuesta); // Verificar el contenido de los datos
        this.productos = data.respuesta;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  agregarProducto(): void {
    const nuevoProducto: AgregarProductoStockDTO = this.productoForm.value;

    this.citaService.agregarInventario(nuevoProducto).subscribe({
      next: () => {
        console.log("PRODUCTO AGREGADO CORRECTAMENTE");
        this.cargarProductos(); // Recarga la lista de productos
        this.productoForm.reset(); // Limpia el formulario después de agregar
      },
      error: (error) => {
        console.log("ERROR AL AGREGAR PRODUCTO", error);
      }
    });
  }

  eliminarProducto(id: string): void {
    console.log("Id producto eliminar", id)
    this.citaService.eliminarProducto(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Eliminacion de Producto',
           text: 'Se elimino el producto correctamente',
           icon: 'success',
           confirmButtonText: 'Aceptar'
        });
        console.log("PRODUCTO ELIMINADO CORRECTAMENTE");
        this.cargarProductos(); // Recarga la lista de productos después de eliminar
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
        console.log("ERROR AL ELIMINAR PRODUCTO", error);
      }
    });
  }
}
