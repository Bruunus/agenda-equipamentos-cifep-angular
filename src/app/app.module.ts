import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HttpClientModule } from '@angular/common/http';
import { CriarComponent } from './reservas/criar/criar.component';
import { EditarViewComponent } from './reservas/editar-view/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';
import { EditarChangeComponent } from './reservas/editar-change/editar-change.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MultiplaComponent } from './reservas/criar/multipla/multipla.component';
import { AnualComponent } from './reservas/criar/anual/anual.component';

import { TesteComponent } from './reservas/teste/teste.component';
import { ConfigComponent } from './config/config.component';
import { ServiceModule } from './service/service-module';
import { FinalizarComponent } from './reservas/finalizar/finalizar.component';
import { AgendaComponent } from './reservas/agenda/agenda.component';
import { EventualComponent } from './reservas/criar/eventual/eventual.component';



@NgModule({
  declarations: [
    AppComponent,
    ReservasComponent,

    CriarComponent,
    EditarViewComponent,
    HistoricoComponent,
    EditarChangeComponent,
    EventualComponent,
    MultiplaComponent,
    AnualComponent,
    TesteComponent,
    ConfigComponent,
    FinalizarComponent,
    AgendaComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,

  ],

  providers: [ServiceModule],
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule { }
