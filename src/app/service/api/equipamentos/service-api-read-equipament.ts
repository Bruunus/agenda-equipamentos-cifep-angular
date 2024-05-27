import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription,  interval, Observable, switchMap, takeUntil, map } from "rxjs";

@Injectable()
export class ServiceApiReadEquipament {


  private getEstoque: string = 'http://localhost:8080/load/getestoque';
  private pollInterval: number = 5000;                            // Intervalo de atualização em milissegundos (5 segundos)
  private unsubscribe$: Subject<void> = new Subject<void>();      // Observable para cancelar a assinatura


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



  getListEquipamentsPoll(): Observable<{ [descricao: string]: number }> {
    return interval(this.pollInterval).pipe(
      switchMap(() => this.http.get<{ id: number, descricao: string, valor: string, quantidade: number }[]>(this.getEstoque)),
      map(array => array.reduce((obj, item) => {
        // Use 'descricao' como chave e 'quantidade' como valor
        obj[item.valor] = item.quantidade;
        return obj;
      }, {} as { [descricao: string]: number })),
      takeUntil(this.unsubscribe$)
    );
  }




  /**
   * Finaliza a assinatura do Observable para evitar consumo desnecessário de recursos.
   */
  unsubscribe(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
