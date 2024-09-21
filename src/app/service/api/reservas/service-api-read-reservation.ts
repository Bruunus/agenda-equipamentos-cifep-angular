import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ServiceApiReadReservation {


  constructor(private http: HttpClient) { }



  /**
   * API para carregar as reservas do dia
   */
  loadReservasOfDay() {
    return this.http.get<any[]>('http://localhost:8080/load/current-day/reservas');
  }



}
