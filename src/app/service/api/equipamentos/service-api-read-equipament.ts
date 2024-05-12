import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export class ServiceApiReadEquipament {


    private getEstoque: string = 'http://localhost:8080/load/getestoque';

    constructor(private http: HttpClient) { }
    

    /**
     * Realiza a chamada para api backend, realiza ordenação alfabética
     * @returns 
     */
    getListEquipaments(): Promise<any[]> {

        return new Promise<Object[]>((resolve, reject) => {
            
          const subscription: Subscription = this.http.get<any[]>(this.getEstoque).subscribe({
            next: (listaDeEquipamentos: any[]) => {
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
    


}