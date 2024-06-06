import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ErroServiceService } from "../../erro/reservas/erro-service.service";

@Injectable()
export class ServiceApiCreateReservation {

    private EVENTUAL: string = 'http://localhost:8080/new/scheduled/reserva'
    private MULTIPLE: string = 'http://localhost:8080/new/scheduled-multiple/reserva'
    private YEARLY: string = 'http://localhost:8080/new/scheduled-full-year/reserva'

    constructor(private http: HttpClient, private erroService: ErroServiceService) { }

    createEventualReservation(JSONData: Object): Promise<Object> {

        console.log('JSONData antes de enviar:', JSONData);

        return new Promise<Object>((resolve, reject) => {
            this.http.post<Object>(this.EVENTUAL, JSONData).subscribe({
                next: (response: Object) => {
                    resolve(response)
                },
                error: (error) => {
                    this.erroService.estoqueInsuficienteException(error)
                }

            })
        })

    }


    createMultipleReservation(JSONData: Object): Promise<Object> {

        console.log('JSONData antes de enviar:', JSONData);

        return new Promise<Object>((resolve, reject) => {
            this.http.post<Object>(this.MULTIPLE, JSONData).subscribe({
                next: (response: Object) => {
                    resolve(response)
                },
                error: (error) => {
                    console.error('Erro ao salvar JSON:', error);
                    reject(error);
                }

            })
        })

    }


    createYearlyReservation(JSONData: Object): Promise<Object> {

        console.log('JSONData antes de enviar:', JSONData);

        return new Promise<Object>((resolve, reject) => {
            this.http.post<Object>(this.YEARLY, JSONData).subscribe({
                next: (response: Object) => {
                    resolve(response)
                },
                error: (error) => {
                    console.error('Erro ao salvar JSON:', error);
                    reject(error);
                }

            })
        })

    }



}
