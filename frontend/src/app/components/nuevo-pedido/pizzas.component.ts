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
    console.log(this.tam);
    console.log(`costo: ${this.costo}`);
  }
  getDescripcion(valor){
    this.des = valor;
    console.log(this.des);
  }
  

  agregarOrden(){
    // this.orden = [ 'Pizza', this.tam, this.des, this.cant, this.costo ];
    const orden = {
      producto: 'Pizzas',
      tamano: this.tam,
      descripcion: this.des,
      cantidad: 1,
      costo: this.costo
    };

    console.log(orden);
    this.enviarOrden.emit(orden);
    this.router.navigate(['nuevo-pedido']);

    this.tam = '';
    this.des = '';
    this.costo = null;
  }

}
