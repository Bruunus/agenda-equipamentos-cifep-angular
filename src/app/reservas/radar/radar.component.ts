import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { Subject, interval, Observable, switchMap, takeUntil, map, tap, delayWhen, timer } from "rxjs";

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit, OnDestroy  {

  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament) { }
  listaQuantidade: { [key: string]: number } = {};
  loading: boolean = true;
  radar: boolean = true;
  status: string = '';
  status_connetion: boolean = true;
  color_alerta = '#ED9400'
  color_indisponivel = '#ff836d'
  subscription: Subscription | null = null;


  ngOnInit(): void {



    setInterval(() => {
      console.log('executando set interval ...')
      // if(this.status_connetion) {
      //   console.log('Conexão estabelecida !', this.status_connetion)


      // } else {
      //   console.log('Tentando conexão...')
      //   this.loading = true;
      //   this.listaQuantidade = {}
      //   this.loadListEquipaments();
      // }
    }, 6000); // atualiza a lista a cada 6 segundos


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



  /**
   * API de carregamento dos equipamentos. Realizamos um map para mapear dentro do objeto
   * a quantidade e a descrição para poderem ser renderizadas no ngIf e ngFor
   */







  /**
   * API de carregamento dos equipamentos. Realizamos um map para mapear dentro do objeto
   * a quantidade e a descrição para poderem ser renderizadas no ngIf e ngFor
   */

  /*  // lógica adequada para receber um observable
  private loadListEquipaments(): void {
    this.loading = true;
    this.subscription = this.serviceApiReadEquipament.getListEquipamentsPoll().subscribe(
      data => {
        this.listaQuantidade = data;
        if(Object.keys(this.listaQuantidade).length === 0) {
          this.loading = true;
          this.setConnection = false;

        } else {
          this.loading = false;

        }
        console.log('Dados do estoque atualizados:', this.listaQuantidade);
      },
      error => {
        console.log('Erro ao carregar os equipamentos:', error);
        this.loading = true;


      }
    );
  }
*/





  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  get getConnection(): boolean {
    return this.status_connetion;
  }


  set setConnection(status: boolean) {
    this.status_connetion = status;
  }


}
