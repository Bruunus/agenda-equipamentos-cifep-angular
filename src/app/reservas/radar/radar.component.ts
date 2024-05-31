import { Subscription } from 'rxjs';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { Subject, interval, Observable, switchMap, takeUntil, map, tap, delayWhen, timer } from "rxjs";

 
@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit, OnDestroy  {

  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament) { }
  listaQuantidade2: { [key: string]: number } = {};
  listaQuantidade: any[] = []
  loading: boolean = true;
  radar: boolean = true;
  status: string = '';
  status_connetion: boolean = true;
  color_alerta = '#ED9400'
  color_indisponivel = '#ff836d'
  subscription: Subscription | null = null;


  ngOnInit(): void {
    this.loading = true;

    // deu certo a parte de ouvir o status da conexão, agora precida fazer o teste o loading dentro do subscribe
    //  posteriormente passe para um metodo a parte

    /**
     * Metodo que realiza observação em tempo real do status da conexão com o servidor. Enquanto o servidor 
     * estiver fora do ar o set interval vai alterar a exibição dos dados para loading...
     */
    setInterval(() => {
      this.status_connetion = this.serviceApiReadEquipament.getListaDeEquipamentosPoll;   // retorna true ou false a cada 6 segundos
      if (this.status_connetion) {

        console.log('status ', this.status_connetion, '(true)')   //{Debug}\\

      } else {
        console.log('status ', this.status_connetion, '(false)')//{Debug}\\
        console.log('Executando o loading ...')
        this.loading = true   // aqui que carrega o loading novamente
      }
    },6000)


    // TESTEI CHAMAR A API COM SUBSCRIBE E SE O SERVIDOR CAIR NÃO REALIZA NADA AQUI
    this.serviceApiReadEquipament.getListEquipamentsPoll()
    .subscribe(
      (lista: any[]) => {

        // se der erro não entra aqui...
        if(this.status_connetion) {
          console.log('Removendo o loading ... ')

          this.loading = false      // AQUI REMOVE O LOADING
          this.listaQuantidade = lista;
          console.log('Recebendo lista ', this.listaQuantidade)
        } 
 
      }
    );



    
    

    // TESTE CHAMANDO O GET PARA RETORNAR A LISTA DA SERVICE --   não deu certo a  lista volta vazia

    // this.listaQuantidade = this.serviceApiReadEquipament.getListaDeEquipamentosPoll();

    // console.log(this.listaQuantidade)



   

      






    // this.loadListEquipaments()
    // this.getListaQuantidade()
    // console.log(this.listaQuantidade)

    // setInterval(() => {
      // console.log('executando set interval ...')
      // if(this.status_connetion) {
      //   console.log('Conexão estabelecida !', this.status_connetion)


      // } else {
      //   console.log('Tentando conexão...')
      //   this.loading = true;
      //   this.listaQuantidade = {}
      //   this.loadListEquipaments();
      // }
    // }, 6000); // atualiza a lista a cada 6 segundos


  }


  getTest(): void  {
   
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
   public statusConnection(status: boolean): boolean {
    return status
  }










  /**
   * API de carregamento dos equipamentos. Realizamos um map para mapear dentro do objeto
   * a quantidade e a descrição para poderem ser renderizadas no ngIf e ngFor
   */

   // lógica adequada para receber um observable
  //  private loadListEquipaments(): void {
  //   this.loading = true;
  //   this.subscription = this.serviceApiReadEquipament.getListEquipamentsPoll().subscribe(
  //     data => {
  //       console.log('Entrou na clausula data');
  //       this.listaQuantidade = data;
  //       this.loading = false
  //       console.log('Verificando se a lista foi preenchida:', this.listaQuantidade); //{Debug}\\
  //       if (Object.keys(this.listaQuantidade).length === 0) {
  //         this.loading = true;
  //         // this.setConnection = false;
  //         this.listaQuantidade = {};
  //       } else {
  //         this.loading = false;
  //       }
  //       console.log('Conexão estabelecida:', this.listaQuantidade);
  //     },
  //     error => {
  //       console.log('Entrou na clausula error');
  //       this.loading = true;
  //       this.listaQuantidade = {};
  //     },
  //     () => {
  //       // Executado quando a stream é concluída (complete)
  //     }
  //   );
  
    // Intervalo de 5000ms para chamar o método da API novamente
  //   setInterval(() => {
  //     console.log('Entrou na set interval');
  //     this.serviceApiReadEquipament.getListEquipamentsPoll().subscribe(
  //       data => {
  //         console.log('Entrou na clausula data (set interval)');
  //         this.listaQuantidade = data;
  //         console.log('Verificando se a lista foi preenchida:', this.listaQuantidade); //{Debug}\\
  //         if (Object.keys(this.listaQuantidade).length === 0) {
  //           this.loading = true;
  //           // this.setConnection = false;
  //           this.listaQuantidade = {};
  //         } else {
  //           this.loading = false;
  //         }
  //         console.log('Conexão estabelecida:', this.listaQuantidade);
  //       },
  //       error => {
  //         console.log('Entrou na clausula error (set interval)');
  //         // console.log('Erro ao carregar os equipamentos:', error);
  //         this.loading = true;
  //         this.listaQuantidade = {};
  //       }
  //     );
  //   }, 5000);
  // }
 





  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  // get getConnection(): boolean {
  //   return this.status_connetion;
  // }


  // set setConnection(status: boolean) {
  //   this.status_connetion = status;
  // }


}
