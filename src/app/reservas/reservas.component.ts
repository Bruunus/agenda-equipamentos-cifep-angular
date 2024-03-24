import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  reservas: any[] = [];

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.loadDataOfDay();
  }



  loadDataOfDay() {

    this.http.get<any[]>('http://localhost:8080/load/current-day/reservas')
      .subscribe(
        (reservas: any[]) => {
          this.reservas = reservas;
          console.log('Reservas do dia:', this.reservas);
        },
        (error) => {
          console.error('Erro ao carregar as reservas do dia:', error);
        }
      )

    
  }
  


}
