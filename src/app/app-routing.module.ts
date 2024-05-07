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

import { TesteComponent } from './reservas/teste/teste.component';
import { DadosDoUsuarioComponent } from './reservas/componentes-templates/dados-do-usuario/dados-do-usuario.component';
import { EquipamentosComponent } from './reservas/componentes-templates/equipamentos/equipamentos.component';
import { EquipamentoComponent } from './config/equipamento/equipamento.component';
import { ConfigComponent } from './config/config.component';


const routes: Routes = [
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservas/criar/eventual', component: EventualComponent},
  { path: 'reservas/criar/multipla', component: MultiplaComponent},
  { path: 'reservas/criar/anual', component: AnualComponent},
  { path: 'reservas/editar', component: EditarViewComponent},
  { path: 'reservas/historico', component: HistoricoComponent},
  { path: 'reservas-calendar', component: CalendarioComponent},
  { path: 'reservas/editar-change', component: EditarChangeComponent},
// teste dos componentes
  { path: 'reservas/teste', component: TesteComponent},
  { path: 'reservas/componentes/dados-do-usuario', component: DadosDoUsuarioComponent},
  { path: 'reservas/componentes/equipamentos', component: EquipamentosComponent},

  // sessão adm
  { path: 'reservas/adm/config', component: ConfigComponent},



  { path: '', redirectTo: '/reservas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
