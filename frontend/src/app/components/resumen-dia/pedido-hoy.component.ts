import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NodeApiService } from '../../services/node-api.service';

@Component({
  selector: 'app-pedido-hoy',
  templateUrl: './pedido-hoy.component.html',
  styles: []
})
export class PedidoHoyComponent implements OnInit {

  @Output() retroceder = new EventEmitter();
  @Input() id: any;

  pedido: any;

  flag: boolean = true;
  constructor( private router: Router, 
                private activeRoute: ActivatedRoute, 
                private nodeService: NodeApiService ) { }

  ngOnInit() {
    // console.log( this.id );

    this.nodeService.getPedido(this.id)
      .subscribe( data => {
        this.pedido = data;
        console.log(this.pedido);
      });

  }

  atras(){
    this.retroceder.emit(this.flag);
    this.router.navigate(['resumen-dia']);
  }

}
