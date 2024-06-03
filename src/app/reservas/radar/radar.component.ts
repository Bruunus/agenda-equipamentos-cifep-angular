import { Subscription } from 'rxjs';
import { Component, HostListener, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { Subject, interval, Observable, switchMap, takeUntil, map, tap, delayWhen, timer } from "rxjs";


@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit, OnDestroy  {

  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament) { }

  listaQuantidade: any[] = []
  loading: boolean = true;
  status: string = '';
  status_connetion: boolean = true;
  color_alerta = '#ED9400'
  color_indisponivel = '#ff836d'
  subscription: Subscription | null = null;
  interval: any;


  ngOnInit(): void {
    this.loading = true;
    this.getRadarQuantidade()
  }


  /**
   * Metodo que realiza observação em tempo real do status da conexão com o servidor. Enquanto o servidor
   * estiver fora do ar o setInterval acionará o loading deixando-o permanecer até que a conexão seja
   * estabelecida novamente. Quando a conexão é estabelecida o subscribe é lido pois ele só executa
   * em caso de o servidor e conexão estiverem ativa, uma vez executado o subscribe ele preenche a lista
   * e remove o loading da página.
   */
  protected getRadarQuantidade(): void  {

    this.interval = setInterval(() => {
      this.status_connetion = this.serviceApiReadEquipament.getListaDeEquipamentosPoll;   // retorna true ou false a cada 6 segundos
      if (this.status_connetion) {

        // console.log('status ', this.status_connetion, '(true)')   //{Debug}\\

      } else {
        // console.log('status ', this.status_connetion, '(false)')   //{Debug}\\
        // console.log('Executando o loading ...')      //{Debug}\\
        this.loading = true   // ponto de recarregamento do loading
      }
    },2000)


    this.subscription = this.serviceApiReadEquipament.getListEquipamentsPoll()
    .subscribe(
      (lista: any[]) => {

        if(this.status_connetion) {
          // console.log('Removendo o loading ... ')   //{Debug}\\

          this.loading = false      // ponto de remoção do loading
          this.listaQuantidade = lista;
          // console.log('Recebendo lista ', this.listaQuantidade)
        }

      }
    );

  }

  protected alertRadar(quantidade: number): string {
    if (quantidade > 1) {
      return 'inherit';
    } else if (quantidade === 1) {
      return this.color_alerta;
    } else {
      return this.color_indisponivel;
    }
  }

  protected statusRadar(quantidade: number): string {
    if (quantidade > 1) {
      this.status = 'Disponível';
      return 'inherit';
    } else if (quantidade === 1) {
      this.status = 'Disponível';
      return this.color_alerta;
    } else {
      this.status = 'Indisponível';
      return this.color_indisponivel;
    }
  }






  ngOnDestroy(): void {
    clearInterval(this.interval);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
