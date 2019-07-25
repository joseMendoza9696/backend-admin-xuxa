import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';
import { ResumenDiaComponent } from './components/resumen-dia/resumen-dia.component';
import { ResumenTotalComponent } from './components/resumen-total/resumen-total.component';
// import { PizzasComponent } from './components/nuevo-pedido/pizzas.component';
// import { AlitasComponent } from './components/nuevo-pedido/alitas.component';
// import { RefrescosComponent } from './components/nuevo-pedido/refrescos.component';
// import { HeladosComponent } from './components/nuevo-pedido/helados.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },

    { path: 'nuevo-pedido', component: NuevoPedidoComponent},
    // { path: 'nuevo-pedido/Pizzas', component: PizzasComponent},
    // { path: 'nuevo-pedido/Alitas', component: AlitasComponent},
    // { path: 'nuevo-pedido/Refrescos', component: RefrescosComponent},
    // { path: 'nuevo-pedido/Helados', component: HeladosComponent},

    { path: 'resumen-dia', component: ResumenDiaComponent },
    { path: 'resumen-total', component: ResumenTotalComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
