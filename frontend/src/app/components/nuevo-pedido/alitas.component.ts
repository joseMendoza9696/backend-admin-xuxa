import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alitas',
  templateUrl: './alitas.component.html',
  styles: []
})
export class AlitasComponent implements OnInit {

  @Output() enviarOrden = new EventEmitter();

  tamanoAlitas: string[] = ['6 alitas','12 alitas','24 alitas','48 alitas' ];
  precioAlita: number[] = [ 30, 60, 80, 120 ];

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
    console.log(this.tam);
    for (let i = 0; i < this.tamanoAlitas.length; i++) {
      if (this.tam === this.tamanoAlitas[i]) {
        this.costo = this.precioAlita[i];
      }
    }
  }
  getDescripcion(valor){
    this.des = valor;
    console.log(this.des);
  }
  
  
  agregarOrden(){
    const orden = {
      producto: 'Alitas',
      tamano: this.tam,
      descripcion: this.des,
      cantidad: 1,
      costo: this.costo
    };
    this.enviarOrden.emit(orden);
    this.router.navigate(['nuevo-pedido']);
    
    this.tam = '';
    this.des = '';
    this.costo = null;

  }

}
