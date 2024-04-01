import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CriarComponent } from './reservas/criar/criar.component';
import { EditarComponent } from './reservas/editar/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';

const routes: Routes = [
  { path: 'reservas', component: ReservasComponent },
  { path: '', redirectTo: '/reservas', pathMatch: 'full'},
  { path: 'reservas/criar', component: CriarComponent},
  { path: 'reservas/editar', component: EditarComponent},
  { path: 'reservas/historico', component: HistoricoComponent},
  { path: 'reservas-calendar', component: CalendarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
