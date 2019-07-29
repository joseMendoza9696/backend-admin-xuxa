import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeApiService {

  constructor( private http: HttpClient ) { 
    console.log('Servicio listo');
  }

  readonly URL: string = 'http://localhost:3000';

  // pide las comandas que se estan realizando ese mismo dia
  getComandasHoy() {
    return this.http.get(this.URL);
  }
  
  // envia una nueva comanda al servidor y se guarda en la DB
  postPedido(pedido: any){
    return this.http.post(`${this.URL}/nuevo`, pedido);
  }

}
