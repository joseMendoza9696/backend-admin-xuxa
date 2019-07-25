import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';
import { ResumenDiaComponent } from './components/resumen-dia/resumen-dia.component';
import { ResumenTotalComponent } from './components/resumen-total/resumen-total.component';

import { ROUTES } from './app.routes';
import { OrdenComponent } from './components/nuevo-pedido/orden.component';
import { PedidoComponent } from './components/nuevo-pedido/pedido.component';
import { PizzasComponent } from './components/nuevo-pedido/pizzas.component';
import { AlitasComponent } from './components/nuevo-pedido/alitas.component';
import { RefrescosComponent } from './components/nuevo-pedido/refrescos.component';
import { HeladosComponent } from './components/nuevo-pedido/helados.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NuevoPedidoComponent,
    ResumenDiaComponent,
    ResumenTotalComponent,
    OrdenComponent,
    PedidoComponent,
    PizzasComponent,
    AlitasComponent,
    RefrescosComponent,
    HeladosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot( ROUTES, { useHash: true } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
