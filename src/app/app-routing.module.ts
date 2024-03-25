import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  { path: 'reservas', component: ReservasComponent },
  { path: '', redirectTo: '/reservas', pathMatch: 'full'},
  { path: 'reservas-calendar', component: CalendarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
