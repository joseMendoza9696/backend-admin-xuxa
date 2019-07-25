import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeApiService {

  constructor( private http: HttpClient ) { 
    console.log('Servicio listo');
  }

  getComandasHoy() {
    return this.http.get('http://localhost:3000/');
  }  

}
