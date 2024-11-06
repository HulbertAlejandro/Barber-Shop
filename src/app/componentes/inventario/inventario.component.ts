import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CitaService } from '../../cita.service';
import { AgregarProductoStockDTO } from '../../dto/agregar-producto-stock-dto';
import { ProductoStockDTO } from '../../dto/producto-stock-dto';
import Swal from 'sweetalert2';
import { AgregarCantidadProductoStockDTO } from '../../dto/agregar-cantidad-producto';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule,  FormsModule],
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
        this.cargarProductos(); // Recarga la lista de productos
        this.productoForm.reset(); // Limpia el formulario después de agregar
      },
      error: (error) => {
        console.log("ERROR AL AGREGAR PRODUCTO", error);
      }
    });
  }

  agregarCantidadProducto(id: string, cantidadAgregar: number): void {
    if (cantidadAgregar <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad a agregar debe ser mayor a 0.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (!cantidadAgregar) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese una cantidad',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const agregarCantidad : AgregarCantidadProductoStockDTO ={
      id: id,
      cantidad: cantidadAgregar.toString()
    }
    this.citaService.agregarCantidadProducto(agregarCantidad).subscribe({
      next: () => {
        Swal.fire({
          title: 'Agregar Cantidad de Producto',
          text: 'Se agrego la cantidad del producto correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.cargarProductos(); // Recarga la lista de productos después de la reducción
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar'
        });
        console.error("ERROR AL AGREGAR CANTIDAD DE PRODUCTO", error);
      }
    });
  }

  reducirCantidadProducto(id: string, cantidadAEliminar: number): void {
    if (cantidadAEliminar <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad a reducir debe ser mayor a 0.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (!cantidadAEliminar) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese una cantidad',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    const cantidad = cantidadAEliminar.toString()
    this.citaService.reducirCantidadProducto(id, cantidad).subscribe({
      next: () => {
        Swal.fire({
          title: 'Reducción de Producto',
          text: 'Se redujo la cantidad del producto correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.cargarProductos(); // Recarga la lista de productos después de la reducción
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar'
        });
        console.error("ERROR AL REDUCIR CANTIDAD DE PRODUCTO", error);
      }
    });
  }

  eliminarProducto(id: string): void {
    this.citaService.eliminarProducto(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Eliminación de Producto',
          text: 'Se eliminó el producto correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.cargarProductos(); // Recarga la lista de productos después de eliminar
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
          confirmButtonText: 'Reintentar'
        });
        console.error("ERROR AL ELIMINAR PRODUCTO", error);
      }
    });
  }
}
