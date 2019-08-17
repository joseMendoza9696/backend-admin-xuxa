import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';
import { ResumenDiaComponent } from './components/resumen-dia/resumen-dia.component';
import { ResumenTotalComponent } from './components/resumen-total/resumen-total.component';
import { PedidoHoyComponent } from './components/resumen-dia/pedido-hoy.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },

    { path: 'nuevo-pedido', component: NuevoPedidoComponent},
    { path: 'resumen-dia', component: ResumenDiaComponent, children: [
        { path: 'pedido-hoy', component: PedidoHoyComponent }
    ]},
    { path: 'resumen-total', component: ResumenTotalComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
