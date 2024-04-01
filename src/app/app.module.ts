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
import { EditarComponent } from './reservas/editar/editar.component';
import { HistoricoComponent } from './reservas/historico/historico.component';

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
    EditarComponent,
    HistoricoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule { }
