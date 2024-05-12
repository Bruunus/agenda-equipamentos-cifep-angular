import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HttpClientModule } from '@angular/common/http';
import { CriarComponent } from './reservas/criar/criar.component';
import { EditarViewComponent } from './reservas/editar-view/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';
import { EditarChangeComponent } from './reservas/editar-change/editar-change.component';
import { FormsModule } from '@angular/forms';
import { EventualComponent } from './reservas/criar/eventual/eventual.component';
import { MultiplaComponent } from './reservas/criar/multipla/multipla.component';
import { AnualComponent } from './reservas/criar/anual/anual.component';
import { HorasService } from './service/model/horasService';
<<<<<<< HEAD
import { DadosDoUsuarioComponent } from './reservas/componentes-templates/dados-do-usuario/dados-do-usuario.component';
import { EquipamentosComponent } from './reservas/componentes-templates/equipamentos/equipamentos.component';
import { TesteComponent } from './reservas/teste/teste.component';
import { ConfigComponent } from './config/config.component';
import { ServiceEquipamentos } from './service/service-equipamentos';
import { ServiceApiRead } from './service/service-api-read';
import { ServiceApiCreate } from './service/service-api-create';
import { ServiceApiUpdate } from './service/service-api-update';
import { ServiceApiDelete } from './service/service-api-delete';
=======
import { TesteComponent } from './reservas/teste/teste.component';
import { ConfigComponent } from './config/config.component';
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)
import { ServiceModule } from './service/service-module';



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
    ConfigComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
<<<<<<< HEAD
    ServiceModule
  ],
  providers: [EquipamentosComponent],
=======
    ServiceModule,
    ServiceModule
  ],
  providers: [ServiceModule],
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule { }