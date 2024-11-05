import { RedirectedComponent } from './reservas/redirected/redirected.component';
import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarViewComponent } from './reservas/editar-view/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';
import { EditarChangeComponent } from './reservas/editar-change/editar-change.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiplaComponent } from './reservas/criar/multipla/multipla.component';


import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { ServiceModule } from './service/service-module';
import { FinalizarComponent } from './reservas/finalizar/finalizar.component';
import { AgendaComponent } from './reservas/agenda/agenda.component';
import { EventualComponent } from './reservas/criar/eventual/eventual.component';
import { RadarComponent } from './reservas/radar/radar.component';
import { AgendaEventualComponent } from './reservas/criar/utilits/add-agenda/agenda-eventual/agenda-eventual.component';
import { AgendaMultiplaComponent } from './reservas/criar/utilits/add-agenda/agenda-multipla/agenda-multipla.component';
import { FormularioComponent } from './reservas/criar/utilits/add-formulario/formulario/formulario.component';
import { AdicionarEquipamentoComponent } from './reservas/criar/utilits/add-equipamento/adicionar-equipamento/adicionar-equipamento.component';



@NgModule({
  declarations: [
    AppComponent,
    ReservasComponent,

    EditarViewComponent,
    HistoricoComponent,
    EditarChangeComponent,
    EventualComponent,
    MultiplaComponent,
    RedirectedComponent,
    ConfiguracaoComponent,
    FinalizarComponent,
    AgendaComponent,
    RadarComponent,
    AdicionarEquipamentoComponent,
    AgendaEventualComponent,
    AgendaMultiplaComponent,
    FormularioComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,

  ],

  providers: [ServiceModule, RadarComponent],
  bootstrap: [AppComponent],
  exports: [HttpClientModule,]
})
export class AppModule { }
