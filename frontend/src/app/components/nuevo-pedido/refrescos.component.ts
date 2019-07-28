import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-refrescos',
  templateUrl: './refrescos.component.html',
  styles: []
})
export class RefrescosComponent implements OnInit {

  @Output() enviarOrden = new EventEmitter();

  des: string;
  cant: number;
  costo: number;
  precio: number;
  alerta: boolean = false;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.des = '';
    this.cant = null;
    this.costo = 0;
  }

  getDescripcion(valor){
    this.des = valor;
    console.log(this.des);

  }
  getCantidad(valor){
    this.cant = valor;
    console.log(this.cant);
    if (this.cant >= 1) {
      this.costo = this.cant * this.precio;
    } else {
      this.cant = 1;
      this.costo = this.precio;
    }
  }
  getPrecio(valor){
    this.precio = valor;
    console.log(this.precio);
    if (this.cant >= 1) {
      this.costo = this.cant * this.precio;
    } else {
      this.cant = 1;
      this.costo = this.precio;
    }
  }
  agregarOrden(){
    const orden = {
      producto: 'Refrescos',
      tamano: '',
      descripcion: this.des,
      cantidad: this.cant,
      costo: this.costo
    };

    if (!this.des || !this.precio) {
      this.alerta = true;
    } else {
      this.alerta = false;
      this.enviarOrden.emit(orden);
      this.router.navigate(['nuevo-pedido']);
  
      this.des = '';
      this.precio = null;
      this.cant = null;
      this.costo = 0;
    }

    // console.log(orden);
  }

}
