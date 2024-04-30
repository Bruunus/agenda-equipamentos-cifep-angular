import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { EventualComponent } from './reservas/criar/eventual/eventual.component';
import { MultiplaComponent } from './reservas/criar/multipla/multipla.component';
import { AnualComponent } from './reservas/criar/anual/anual.component';
import { EditarViewComponent } from './reservas/editar-view/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';
import { EditarChangeComponent } from './reservas/editar-change/editar-change.component';


const routes: Routes = [
  { path: 'reservas', component: ReservasComponent },  
  { path: 'reservas/criar/eventual', component: EventualComponent},
  { path: 'reservas/criar/multipla', component: MultiplaComponent},
  { path: 'reservas/criar/anual', component: AnualComponent},
  { path: 'reservas/editar', component: EditarViewComponent},
  { path: 'reservas/historico', component: HistoricoComponent},
  { path: 'reservas-calendar', component: CalendarioComponent},
  { path: 'reservas/editar-change', component: EditarChangeComponent},
  { path: '', redirectTo: '/reservas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
