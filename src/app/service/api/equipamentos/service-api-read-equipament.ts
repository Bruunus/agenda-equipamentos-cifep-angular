import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription,  interval, Observable, map, switchMap, throwError, tap, delayWhen, timer } from "rxjs";
import { retryWhen } from 'rxjs/operators';

@Injectable()
export class ServiceApiReadEquipament {


  private getEquipamentoListUrl: string = 'http://localhost:8080/load/getestoque';
                                        // http://localhost:8080/load/getestoque

  private pollInterval: number = 5000;                            // Intervalo de atualização em milissegundos (5 segundos)
  private unsubscribe$: Subject<void> = new Subject<void>();      // Observable para cancelar a assinatura
  private status_connection: boolean = false;
  private intervalId: any;
  private listaDeEquipamentosPoll: any[] = []
  private subscription: Subscription = Subscription.EMPTY;


  constructor(private http: HttpClient) { }


  /**
   * Realiza a chamada para api backend, realiza ordenação alfabética
   * @returns
   */
  getListEquipaments(): Promise<any[]> {

    return new Promise<Object[]>((resolve, reject) => {

      const subscription: Subscription = this.http.get<string[]>(this.getEquipamentoListUrl).subscribe({
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
   * Método que realiza técnica de polling no servidor, executando o módulo a cada 5 segundos 
   * @returns lista observable
   */
  getListEquipamentsPoll(): Observable<any[]> {
    this.setStatus_connection = false
    return timer(15, 4200).pipe(
      switchMap(() => {
        return this.http.get<any[]>(this.getEquipamentoListUrl).pipe(
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



  public get getListaDeEquipamentosPoll(): boolean {
    return this.status_connection;
  }

  set setStatus_connection(status: boolean) {
    this.status_connection = status;
  }
 


}
