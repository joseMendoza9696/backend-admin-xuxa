import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styles: []
})
export class PizzasComponent implements OnInit {

  @Output() enviarOrden = new EventEmitter();

  tamanoPizza: string[] = ['Duo','Pequeña','Mediana','Grande','Familiar','Super','Jumbo', 'Porcion' ];
  precioPizza: number[] = [45,55,60,95,110,140,190,15];
  
  
  tam: string;
  des: string;
  costo: number;
  cant: number;
  prePorciones: number;
  precioFinal: number;

  constructor( private router: Router ) { }

  ngOnInit() {
    this.tam = '';
    this.des = '';
  }

  getTamano(tamano){
    this.tam = tamano;
    for (let i = 0; i < this.tamanoPizza.length; i++) {
      if (this.tam === this.tamanoPizza[i]) {
        this.costo = this.precioPizza[i];
      }
    }
    this.precioFinal = this.costo;
    this.cant = 1;
    console.log(this.tam);
    console.log(`costo: ${this.costo}`);
  }
  getDescripcion(valor: string){
    this.des = valor;
    console.log(this.des);
  }

  getCantidad(porciones: number){
    
    if(!porciones){
      this.cant = 1;
    }
    this.prePorciones = this.costo * porciones;
    this.precioFinal = this.prePorciones;
    this.cant = porciones;
  }
  

  agregarOrden(){
    const orden = {
      producto: 'Pizzas',
      tamano: this.tam,
      descripcion: this.des,
      cantidad: this.cant,
      costo: this.precioFinal
    };

    console.log(orden);
    this.enviarOrden.emit(orden);
    this.router.navigate(['nuevo-pedido']);

    this.tam = '';
    this.des = '';
    this.precioFinal = null;
  }

}
