import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class ServiceEquipamentos {





  private getEstoque: string = 'http://localhost:8080/load/getestoque';


  constructor(private http: HttpClient) { }


  getListEquipaments() {
    return this.http.get<any[]>(this.getEstoque);
  }










}
