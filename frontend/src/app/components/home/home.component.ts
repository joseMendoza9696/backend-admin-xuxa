import { Component, OnInit } from '@angular/core';
import { NodeApiService } from 'src/app/services/node-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  pedidos: any;

  constructor(private nodeService: NodeApiService) { 
    this.nodeService.getComandasHoy()
      .subscribe( data => {
        this.pedidos = data;
        console.log(this.pedidos);
      });
  }

  ngOnInit() {
  }

  cambiarEstado() {
    
  }

}
