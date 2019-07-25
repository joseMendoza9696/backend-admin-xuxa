import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {

  tamanoPizza: string[] = ['Duo','Pequeña','Mediana','Grande','Familiar','Super','Jumbo' ];
  
  tam: string;
  des: string;
  cant: number;

  public orden: any[] = ['orden'];


  constructor( private _route: ActivatedRoute ) { 
  }
  
  ngOnInit() { }

  getTamano(tamano){
    this.tam = tamano;
    console.log(this.tam);
  }
  getDescripcion(valor){
    this.des = valor;
    console.log(this.des);
  }
  getCantidad(valor){
    this.cant = valor;
    console.log(this.cant);
  }
  
  agregarOrden(){
    // this.orden = [ this.productoItem, this.tam, this.des, this.cant ];
    // console.log(this.orden);
    // this.enviarPedido.emit(33);
  
  }

}
