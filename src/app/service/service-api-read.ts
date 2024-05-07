import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServiceApiRead {

  constructor(private http: HttpClient) { }


  /**
   * API para carregar as reservas do dia
   */
  loadReservasOfDay() {
    return this.http.get<any[]>('http://localhost:8080/load/current-day/reservas');
  }



}
