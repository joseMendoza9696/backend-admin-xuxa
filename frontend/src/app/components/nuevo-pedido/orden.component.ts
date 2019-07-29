import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { NodeApiService } from '../../services/node-api.service';


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

  alertaEnvio: boolean = false;
  cancelarOrden: boolean = false;
  
  constructor( private router: Router, private nodeService: NodeApiService ) { }

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

  cancelar(){
    this.cancelarOrden = true;
  }
  cancelarNo(){
    this.cancelarOrden = false;
  }

  enviarPedido(){
    
    const pedido = {
      nombreCliente: this.nombreCliente,
      fechaHora: new Date(), 
      orden: this.ordenes,
      nit: this.nit,
      nombre: this.nombreFactura,
      cuentaTotal: this.cuenta,
      estado: false
    }

    if (this.ordenes == 0 || !this.nombreCliente ) {
      this.alertaEnvio = true;
      console.log(pedido);
    } else {
      this.alertaEnvio = false;
      // const pedJson = JSON.stringify(pedido);

      this.nodeService.postPedido(pedido).subscribe( data => console.log(data) );
      
      this.router.navigate(['#']);
      // console.log(pedJson);
      // console.log(pedido);
    }

  }

}
