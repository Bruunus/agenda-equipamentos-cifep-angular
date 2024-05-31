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


  // AQUI DEU CERTO - SÓ NÃO IMPLANTOU O INTERVAL
  // getListEquipamentsPoll(): Observable<any[]> {
  //   return this.http.get<any[]>(this.getEquipamentoListUrl)
  //     .pipe(
  //       tap((equipamentos: any[]) => {
  //         // Implemente o código para manipular os equipamentos recebidos
  //         console.log(equipamentos);
  //       })
  //     );
  // }


  getListEquipamentsPoll(): Observable<any[]> {
    this.setStatus_connection = false
    return interval(5000).pipe(
      switchMap(() => {
        return this.http.get<any[]>(this.getEquipamentoListUrl).pipe(
          tap((equipamentos: any[]) => {
            // Implemente o código para manipular os equipamentos recebidos
            this.setStatus_connection = true
            // console.log(equipamentos);
            
          }),
          retryWhen(errors => errors.pipe(
            delayWhen(() => throwError('Erro ao conectar ao servidor. Tentando novamente em 5 segundos...'),
          this.getListEquipamentsPoll()),
          ))
        );
      })
    );
  }




    // 4° tentativa usando observable simples   // não alcançou o resultado
  // getListaEquipamento(): Observable<string[]> {
  //   return this.http.get<string[]>(this.getEquipamentoListUrl)
  //     .pipe(
  //       retryWhen(errors => errors.pipe(delay(5000))),
  //       catchError(error => {
  //         console.log('Falha na conexão, tentando novamente ... ');
  //         return of([]);
  //       })
  //     );
  // }


  /**
   *  Eu preciso que este método realize a técnica de polling. Que a cada 7 segundos ele repita
   * a solicitação para atualizar o estoque de equipamentos.
   *
   * Depois aplique o método reduce e transforme esse array em objeto que possam ser acessados
   * pelo valor do chave [imprime o array no console e mostre pra IA]


:
{id: 81, descricao: 'Adaptador', valor: 'ADAPTADOR', quantidade: 1}
1
:
{id: 79, descricao: 'Cabo HDMI', valor: 'CABO_HDMI', quantidade: 0}
2
:
{id: 86, descricao: 'Cabo P10', valor: 'CABO_P10', quantidade: 4}
3
:
{id: 85, descricao: 'Cabo P2', valor: 'CABO_P2', quantidade: 3}
4
:
{id: 76, descricao: 'Datashow', valor: 'DATASHOW', quantidade: 4}
5
:
{id: 80, descricao: 'Extensão', valor: 'EXTENSAO', quantidade: 4}
6
:
{id: 82, descricao: 'Flip Chart', valor: 'FLIP_CHART', quantidade: 1}
7
:
{id: 78, descricao: 'Lazer Pointer', valor: 'LASER_POINTER', quantidade: 1}
8
:
{id: 87, descricao: 'Microfone', valor: 'MICROFONE', quantidade: 3}
9
:
{id: 77, descricao: 'Notebook', valor: 'NOTEBOOK', quantidade: 5}
10
:
{id: 88, descricao: 'Outros', valor: 'OUTROS', quantidade: 0}
11
:
{id: 84, descricao: 'Pendrive', valor: 'PEN_DRIVE', quantidade: 0}
12
:
{id: 83, descricao: 'Webcam', valor: 'WEB_CAM', quantidade: 3}
length
:
13
[[Prototype]]
:
Array(0)



   *
   */
  // getListEquipamentsPoll(): Promise<any[]> {

  //   return new Promise<Object[]>((resolve, reject) => {

  //     const subscription: Subscription = this.http.get<string[]>(this.getEquipamentoListUrl).subscribe({
  //       next: (listaDeEquipamentos: any[]) => {

  //         console.log(listaDeEquipamentos)  //{Debug}\\

  //         subscription.unsubscribe();
  //         resolve(listaDeEquipamentos);
  //       },
  //       error: (error) => {
  //         console.error('Erro ao carregar lista de equipamentos', error);
  //         reject(error);
  //       }
  //     });
  //   });
  // }
















  /*  //  3° tentativa

  private getListEquipamentsPoll(): void {
    this.subscription = this.http.get<string[]>(this.getEstoque)
    .pipe(
      tap({
        next: (data) => {
          this.listaDeEquipamentosPoll = data;

        },
        error: () => {
          timer(5000).subscribe(() => this.getListEquipamentsPoll());
          console.log('tentando nova conexão...')
        }
      }),
      retryWhen(errors => errors.pipe(delayWhen(() => timer(5000))))
    )
    .subscribe({
      complete: () => {
        if (this.subscription) {
          console.log('lista carregada\n',this.getListaDeEquipamentosPoll)
          this.subscription.unsubscribe();
        }
      }
    });
  }
  */

/*  // 2° tentativa
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
  */

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }






   // técnica de long polling usando observable 1° tentativa
  // getListEquipamentsPoll(): Observable<{ [descricao: string]: number }> {
  //   return interval(this.pollInterval).pipe(
  //     switchMap(() => this.http.get<{ id: number, descricao: string, valor: string, quantidade: number }[]>(this.getEquipamentoListUrl).pipe(
  //       retryWhen(errors => errors.pipe(
          
  //         tap(val => {
  //           this.setStatus_connection = false;
  //           console.log(`Servidor fora do ar, tentando nova conexão ...` + this.getListaDeEquipamentosPoll);

  //         }),
          
  //         delayWhen(val => timer(5000)) // delay retry by 5 seconds
          
  //       ))
  //     )),
  //     map(array => array.reduce((obj, item) => {
  //       // Use 'descricao' como chave e 'quantidade' como valor
  //       this.setStatus_connection = true;
  //       obj[item.valor] = item.quantidade;
  //       return obj;
  //     }, {} as { [descricao: string]: number })),
  //     takeUntil(this.unsubscribe$)
  //   );
  // }
 




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

  // public getConnection(): boolean {
  //   return this.getStatus_connection
  // }


}
