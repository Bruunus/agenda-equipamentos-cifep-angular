import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription,  interval, Observable, switchMap, takeUntil, map, tap, delayWhen, timer } from "rxjs";
import { retryWhen } from 'rxjs/operators';

@Injectable()
export class ServiceApiReadEquipament {


  private getEstoque: string = 'http://localhost:8080/load/getestoque';
  private pollInterval: number = 5000;                            // Intervalo de atualização em milissegundos (5 segundos)
  private unsubscribe$: Subject<void> = new Subject<void>();      // Observable para cancelar a assinatura
  private status_connection: boolean = false;
  private intervalId: any;


  constructor(private http: HttpClient) { }


  /**
   * Realiza a chamada para api backend, realiza ordenação alfabética
   * @returns
   */
  getListEquipaments(): Promise<any[]> {

    return new Promise<Object[]>((resolve, reject) => {

      const subscription: Subscription = this.http.get<string[]>(this.getEstoque).subscribe({
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



  getListEquipamentsPoll() {
    this.intervalId = setInterval(() => {
      this.http.get<{ id: number, descricao: string, valor: string, quantidade: number }[]>(this.getEstoque)
        .subscribe(
          array => {
            const result = array.reduce((obj, item) => {
              this.setStatus_connection = true;
              console.log('status da conexão = ', this.getStatus_connection)
              obj[item.valor] = item.quantidade;
              return obj;
            }, {} as { [descricao: string]: number });
            console.log(result);
          },
          error => {
            this.setStatus_connection = false;
            console.log(`Got error, retrying...`);
          }
        );
    }, 5000);
  }

  ngOnDestroy() {
    // if (this.intervalId) {     // do método observable
    //   clearInterval(this.intervalId);
    // }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }



/*  // técnica de long polling usando observable
  getListEquipamentsPoll(): Observable<{ [descricao: string]: number }> {
    return interval(this.pollInterval).pipe(
      switchMap(() => this.http.get<{ id: number, descricao: string, valor: string, quantidade: number }[]>(this.getEstoque).pipe(
        retryWhen(errors => errors.pipe(
          tap(val => {
            this.setStatus_connection = false;
            console.log(`Got error, retrying...`);

          }),
          delayWhen(val => timer(5000)) // delay retry by 5 seconds
        ))
      )),
      map(array => array.reduce((obj, item) => {
        // Use 'descricao' como chave e 'quantidade' como valor
        this.setStatus_connection = true;
        obj[item.valor] = item.quantidade;
        return obj;
      }, {} as { [descricao: string]: number })),
      takeUntil(this.unsubscribe$)
    );
  }
*/




  /**
   * Finaliza a assinatura do Observable para evitar consumo desnecessário de recursos.
   */
  unsubscribe(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



  get getStatus_connection(): boolean {
    return this.status_connection
  }

  set setStatus_connection(status: boolean) {
    this.status_connection = status;
  }

  public getConnection(): boolean {
    return this.getStatus_connection
  }


}
