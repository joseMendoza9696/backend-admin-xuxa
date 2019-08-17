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

  alerta: boolean = false;

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
  
  // aqui enviamos el objeto a la lista de ordenes
  agregarOrden(){

    const orden = {
      producto: 'Pizzas',
      tamano: this.tam,
      cantidad: this.cant,
      precio: this.precioFinal,
      descripcion: this.des
    };

    if (!this.tam || !this.des ) {
      if (this.tam === 'Porcion' ) {
        this.alerta = false;
        
        console.log(orden);
        this.enviarOrden.emit(orden);
        this.router.navigate(['nuevo-pedido']);
        this.tam = '';
        this.des = 'porciones';
        this.precioFinal = null;
      } else {
        this.alerta = true
      }
    } else {
      this.alerta = false;

      console.log(orden);
      this.enviarOrden.emit(orden);
      this.router.navigate(['nuevo-pedido']);
      this.tam = '';
      this.des = '';
      this.precioFinal = null;
      this.alerta = false;
    }

  }

}
