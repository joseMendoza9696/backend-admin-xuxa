import { Component, OnInit, ViewChild } from '@angular/core';
import { NodeApiService } from '../../services/node-api.service';
import { PedidoHoyComponent } from './pedido-hoy.component';


@Component({
  selector: 'app-resumen-dia',
  templateUrl: './resumen-dia.component.html',
  styles: []
})
export class ResumenDiaComponent implements OnInit {

  pedidosHoy: any;
  ganancia: number;
  flag: boolean;
  id: any;

  @ViewChild('childPedido',{static: true}) pedido: PedidoHoyComponent;

  constructor( private nodeService: NodeApiService ) { }

  ngOnInit() {
    this.ganancia = 0;

    this.flag = true;
    this.nodeService.getComandasHoy()
      .subscribe( data => {
        this.pedidosHoy = data;
        
        for (let i = 0; i < this.pedidosHoy.length; i++) {
          this.ganancia = this.pedidosHoy[i].cuentaTotal + this.ganancia;
        }
        console.log(this.pedidosHoy);
      });
  }

  cambiarPagina(id){
    this.flag = false;
    // console.log(id);
    this.id = id;
  }
  
  // esta funcion es para recargar la pagina al regresar de /pedido-hoy
  recibir(event){
    console.log(event);
    this.flag = event;
  }

}
