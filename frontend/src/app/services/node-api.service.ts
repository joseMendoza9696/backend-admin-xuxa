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

  getComandasHoy() {
    return this.http.get(this.URL);
  }
  
  postPedido(pedido: any){
    return this.http.post(`${this.URL}/nuevo`, pedido);
  }

}
