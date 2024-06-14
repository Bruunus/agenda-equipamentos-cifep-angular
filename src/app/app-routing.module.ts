import { DatepickerComponent } from './reservas/suporte/datepicker/datepicker.component';
import { SuporteComponent } from './reservas/suporte/suporte.component';
import { RedirectedComponent } from './reservas/redirected/redirected.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './reservas/reservas.component';
import { EventualComponent } from './reservas/criar/eventual/eventual.component';
import { MultiplaComponent } from './reservas/criar/multipla/multipla.component';
import { AnualComponent } from './reservas/criar/anual/anual.component';
import { EditarViewComponent } from './reservas/editar-view/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';
import { EditarChangeComponent } from './reservas/editar-change/editar-change.component';


import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { FinalizarComponent } from './reservas/finalizar/finalizar.component';
import { AgendaComponent } from './reservas/agenda/agenda.component';


const routes: Routes = [
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservas/criar/eventual', component: EventualComponent},
  { path: 'reservas/criar/multipla', component: MultiplaComponent},
  { path: 'reservas/criar/anual', component: AnualComponent},
  { path: 'reservas/editar', component: EditarViewComponent},
  { path: 'reservas/historico', component: HistoricoComponent},
  { path: 'reservas/editar-change', component: EditarChangeComponent},
  { path: 'reservas/finalizar', component: FinalizarComponent },
  { path: 'reservas/agenda', component: AgendaComponent},
// teste dos componentes
  { path: 'reservas/suporte', component: SuporteComponent},
  { path: 'reservas/suporte/datepicker', component: DatepickerComponent},



// Redirecionamento
  { path: 'reservas/redirect', component: RedirectedComponent},

  // sessão adm
  { path: 'reservas/adm/config', component: ConfiguracaoComponent},


  { path: '', redirectTo: '/reservas', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
