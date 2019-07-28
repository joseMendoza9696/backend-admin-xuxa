import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styles: []
})
export class OrdenComponent implements OnInit {

  @Input() ordenes: any;
  @Input() cuenta: number;

  nombreCliente: string;
  nombreFactura: string;
  nit: number;

  constructor( private router: Router ) { }

  ngOnInit() { }

  getNombreCliente(nombre: string){
    this.nombreCliente = nombre;
    console.log(this.nombreCliente);
  }
  getNombreFactura(nombre: string){
    this.nombreFactura = nombre;
    console.log(this.nombreFactura);
  }
  getNitFactura(nit: number){
    this.nit = nit;
    console.log(this.nit);
  }
  eliminarOrden(posicion: number){
    console.log(posicion);
    
    this.ordenes.splice(posicion,1);
  }

  enviarPedido(){
    const pedido = {
      cliente: this.nombreCliente,
      fecha: new Date(), 
      ordenes: this.ordenes,
      nit: this.nit,
      factura: this.nombreFactura,
      cuenta: this.cuenta,
      estado: false
    }
    
    console.log(pedido);
    this.router.navigate(['#']);

  }

}
