import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservasComponent } from './reservas/reservas.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarioComponent } from './calendario/calendario.component';
import { JaneiroComponent } from './calendario/meses/janeiro/janeiro.component';
import { FevereiroComponent } from './calendario/meses/fevereiro/fevereiro.component';
import { MarcoComponent } from './calendario/meses/marco/marco.component';
import { AbrilComponent } from './calendario/meses/abril/abril.component';
import { MaioComponent } from './calendario/meses/maio/maio.component';
import { JunhoComponent } from './calendario/meses/junho/junho.component';
import { JulhoComponent } from './calendario/meses/julho/julho.component';
import { AgostoComponent } from './calendario/meses/agosto/agosto.component';
import { SetembroComponent } from './calendario/meses/setembro/setembro.component';
import { OutubroComponent } from './calendario/meses/outubro/outubro.component';
import { NovembroComponent } from './calendario/meses/novembro/novembro.component';
import { DezembroComponent } from './calendario/meses/dezembro/dezembro.component';
import { CriarComponent } from './reservas/criar/criar.component';
import { EditarViewComponent } from './reservas/editar-view/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';
import { EditarChangeComponent } from './reservas/editar-change/editar-change.component';
import { FormsModule } from '@angular/forms';
import { EventualComponent } from './reservas/criar/eventual/eventual.component';
import { MultiplaComponent } from './reservas/criar/multipla/multipla.component';
import { AnualComponent } from './reservas/criar/anual/anual.component';
import { HorasService } from './service/model/horasService';
import { DadosDoUsuarioComponent } from './reservas/componentes/dados-do-usuario/dados-do-usuario.component';
import { EquipamentosComponent } from './reservas/componentes/equipamentos/equipamentos.component';
import { TesteComponent } from './reservas/teste/teste.component';
import { ConfigComponent } from './config/config.component';



@NgModule({
  declarations: [
    AppComponent,
    ReservasComponent,
    CalendarioComponent,
    JaneiroComponent,
    FevereiroComponent,
    MarcoComponent,
    AbrilComponent,
    MaioComponent,
    JunhoComponent,
    JulhoComponent,
    AgostoComponent,
    SetembroComponent,
    OutubroComponent,
    NovembroComponent,
    DezembroComponent,

    CriarComponent,
    EditarViewComponent,
    HistoricoComponent,
    EditarChangeComponent,
    EventualComponent,
    MultiplaComponent,
    AnualComponent,
    DadosDoUsuarioComponent,
    EquipamentosComponent,
    TesteComponent,
    ConfigComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HorasService],
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule { }
