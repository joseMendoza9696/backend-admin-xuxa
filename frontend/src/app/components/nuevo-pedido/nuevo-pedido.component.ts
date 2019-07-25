import { Component, OnInit, ViewChild } from '@angular/core';
import { PizzasComponent } from './pizzas.component';
import { AlitasComponent } from './alitas.component';
import { RefrescosComponent } from './refrescos.component';
import { HeladosComponent } from './helados.component';


@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styles: []
})
export class NuevoPedidoComponent implements OnInit {

  ordenes: any[] = []; // arreglo de todas la ordenes de un cliente
  cuenta: number;

  mPizzas: boolean = true;
  mAlitas: boolean = false;
  mRefrescos: boolean = false;
  mHelados: boolean = false;
  
  @ViewChild('childPizzas',{static: true}) pizzas: PizzasComponent;
  @ViewChild('childAlitas',{static: false}) alitas: AlitasComponent;
  @ViewChild('childRefrescos',{static: false}) refrescos: RefrescosComponent;
  @ViewChild('childHelados',{static: false}) helados: HeladosComponent;

  constructor() { }

  ngOnInit() { }

  mostrarPizzas(){
    this.mPizzas = true;
    this.mAlitas = false;
    this.mRefrescos = false;
    this.mHelados = false;
  }
  mostrarAlitas(){
    this.mPizzas = false;
    this.mAlitas = true;
    this.mRefrescos = false;
    this.mHelados = false;
  }
  mostrarRefrescos(){
    this.mPizzas = false;
    this.mAlitas = false;
    this.mRefrescos = true;
    this.mHelados = false;
  }
  mostrarHelados(){
    this.mPizzas = false;
    this.mAlitas = false;
    this.mRefrescos = false;
    this.mHelados = true;
  }

  recibirOrden(event){
    this.cuenta = 0;
    this.ordenes.push(event);
    console.log('nuevo pedido:');
    console.log(this.ordenes);
    for (let i = 0; i < this.ordenes.length; i++) {
      this.cuenta = this.cuenta + this.ordenes[i].costo;
    }
  }
}
