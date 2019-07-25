import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-helados',
  templateUrl: './helados.component.html',
  styles: []
})
export class HeladosComponent implements OnInit {

  @Output() enviarOrden = new EventEmitter();

  tamanoHelados: string[] = ['1 sabor','2 sabores','3 sabores' ];
  precioHelado: number[] = [ 5,10,15 ];
  
  tam: string; // tamano del producto
  des: string; // descripcion del producto 
  cant: number; // cantidad del producto
  costo: number; // costo unitario del producto
  precio: number;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.des = '';
    this.tam = '';
    this.costo = 0;
    this.cant = null;
    this.precio = 0;
  }

  getTamano(tamano){
    this.tam = tamano;
    console.log(this.tam);
    for (let i = 0; i < this.tamanoHelados.length; i++) {
      if (this.tam === this.tamanoHelados[i]) {
        this.costo = this.precioHelado[i];
        this.precio = this.costo;
      }
    }
  }
  getDescripcion(valor){
    this.des = valor;
    console.log(this.des);
  }
  getCantidad(valor){
    this.cant = valor;
    console.log(this.cant);

    this.precio = this.cant * this.costo;

  }
  agregarOrden(){
    if (this.cant === null) {
      this.cant = 1;
    }
    const orden = {
      producto: 'Helados',
      tamano: this.tam,
      descripcion: this.des,
      cantidad: this.cant,
      costo: this.precio
    };
    // console.log(orden);
    this.enviarOrden.emit(orden);
    this.router.navigate(['nuevo-pedido']);

    this.des = '';
    this.tam = '';
    this.costo = 0;
    this.cant = null;
    this.precio = 0;
  
  }

}


