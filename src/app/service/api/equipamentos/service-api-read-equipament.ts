import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription,  interval, Observable, map, switchMap, throwError, tap, delayWhen, timer } from "rxjs";
import { retryWhen } from 'rxjs/operators';

@Injectable()
export class ServiceApiReadEquipament {


  private GET_EQUIPAMENTO_LIST_URL: string = 'http://localhost:8080/load/getestoque';
  private GET_EQUIPAMENTO_ESTOQUE_LIST_URL: string = 'http://localhost:8080/load/getestoquequantidade';

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
  getListEquipaments(): Promise<any[]> {

    return new Promise<Object[]>((resolve, reject) => {

      const subscription: Subscription = this.http.get<string[]>(this.GET_EQUIPAMENTO_LIST_URL).subscribe({
        next: (listaDeEquipamentos: any[]) => {
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
  getListEquipamentsPoll(): Observable<any[]> {
    this.setStatus_connection = false
    return interval(1500).pipe(
      switchMap(() => {
        return this.http.get<any[]>(this.GET_EQUIPAMENTO_ESTOQUE_LIST_URL).pipe(
          tap((equipamentos: any[]) => {
            // Implemente o código para manipular os equipamentos recebidos
            this.setStatus_connection = true
            // console.log(equipamentos);   //{Debug}\\

          }),
          retryWhen(errors => errors.pipe(
            delayWhen(() => throwError('Erro ao conectar ao servidor. Tentando novamente em 5 segundos...'),
          this.getListEquipamentsPoll()),
          ))
        );
      })
    );
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
