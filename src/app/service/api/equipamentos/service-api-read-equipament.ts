import { EstoquePollInterface } from '../../model/interfaces/equipamento/estoque-poll-interface';
import { EstoqueInterface } from '../../model/interfaces/equipamento/estoque-interface';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription,  interval, Observable, catchError, switchMap, throwError, tap, delayWhen, map } from "rxjs";
import { delay, retry, retryWhen } from 'rxjs/operators';

@Injectable()
export class ServiceApiReadEquipament {


  private GET_EQUIPAMENTO_LIST_URL: string = 'http://localhost:8080/load/getestoque';
  private GET_EQUIPAMENTO_ESTOQUE_LIST_URL: string = 'http://localhost:8080/load/getestoquequantidade';
  private GET_RESERVAS_DE_ESTOQUE_FUTURO: string = 'http://localhost:8080/load/pesquisa-reservas-futuras';
  private GET_RESERVAS_DO_DIA: string = 'http://localhost:8080/load/current-day/reservas';

  private pollInterval: number = 5000;                            // Intervalo de atualização em milissegundos (5 segundos)
  private unsubscribe$: Subject<void> = new Subject<void>();      // Observable para cancelar a assinatura
  private status_connection: boolean = false;
  private intervalId: any;
  private listaDeEquipamentosPoll: any[] = []
  private subscription: Subscription = Subscription.EMPTY;



  constructor(private http: HttpClient) { }


  /**
   * Esse método oferece a lista de equipamentos offine não sincronizada do banco de dados para serem carregados
   * nos selects dos formulários de criação de reserva. Os dados já são enviados em ordem alfabética para não
   * dar trabalho a classe que o invoca.
   * @returns
   */
  getListEquipaments(): Promise<EstoqueInterface[]> {

    return new Promise<EstoqueInterface[]>((resolve, reject) => {

      const subscription: Subscription = this.http.get<EstoqueInterface[]>(this.GET_EQUIPAMENTO_LIST_URL).subscribe({
        next: (listaDeEquipamentos: EstoqueInterface[]) => {
          console.log(listaDeEquipamentos)  //{Debug}\\
          listaDeEquipamentos.sort((a, b) => {
            const descricaoA = a.descricao.toUpperCase();
            const descricaoB = b.descricao.toUpperCase();
            if (descricaoA < descricaoB) {
              return -1;
            }
            if (descricaoA > descricaoB) {
              return 1;
            }
            return 0;
          });
          subscription.unsubscribe();
          resolve(listaDeEquipamentos);
        },
        error: (error) => {
          console.error('Erro ao carregar lista de equipamentos', error);
          reject(error);
        }
      });
    });
  }



  /**
   * Método que realiza técnica de polling no servidor, executando o módulo a cada 5 segundos. O objetivo
   * desse método é realiza a busca atualizada do estoque, mas deixa os dados retornados para serem tratados
   * e modelados conforme a necessidade da classe que o invoca, podendo trabalhar de várias formas.
   * @returns lista observable
   */
  getListEquipamentsPoll(): Observable<EstoquePollInterface[]> {
    this.setStatus_connection = false
    return interval(1500).pipe(
      switchMap(() => {
        return this.http.get<EstoquePollInterface[]>(this.GET_EQUIPAMENTO_ESTOQUE_LIST_URL).pipe(
          tap((equipamentos: EstoquePollInterface[]) => {
            // Implemente o código para manipular os equipamentos recebidos
            this.setStatus_connection = true
            // console.log(equipamentos);   //{Debug}\\

          })
        );
      })
    );
  }


  /**
   * Método que realiza uma API em modo assíncrono para o servidor para trazer todas
   * as reservas agendadas em uma lista de reservas
   * @param datas
   * @returns
   */
  getReservasFuturas(datas: any[]): Observable<any> {
    const payload = JSON.stringify(datas);
    return this.http.post(this.GET_RESERVAS_DE_ESTOQUE_FUTURO, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        console.error('Erro na requisição:', error);
        throw error;
      })
    );
  }


  /**
   * API de carregamento dos equipamentos
   */
  public async loadListEquipaments(): Promise<EstoqueInterface[]> {
    return this.getListEquipaments()
      .then((lista: EstoqueInterface[]) => {
        // console.log(lista)   //{debug}\\
        return lista;
      });
  }




  /**
   * API para carregar as reservas do dia
   */
  loadReservasOfDay() {
    return this.http.get<any[]>(this.GET_RESERVAS_DO_DIA);
  }

































  // fechamento de conexão do observable


  ngOnDestroy(): void {



    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Finaliza a assinatura do Observable para evitar consumo desnecessário de recursos.
   */
  unsubscribe(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  // sessão getters

  public get getListaDeEquipamentosPoll(): boolean {
    return this.status_connection;
  }

  set setStatus_connection(status: boolean) {
    this.status_connection = status;
  }



}
