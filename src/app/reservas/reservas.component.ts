import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  horaRetiradaFormatter: any;
  horaDevolucaoFormatter: any;
  reservas: any[] = [];

 

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.loadDataOfDay();
  }

  data: any;

  loadDataOfDay() {

    this.http.get<any[]>('http://localhost:8080/load/current-day/reservas')
      .subscribe(
        (reservas: any[]) => {
          this.reservas = reservas;
          console.log('Reservas do dia:', this.reservas);
          
           this.reservas.forEach(timerFormatter => {
            
             
            //const horaRetirada = timerFormatter.agenda[0].dataDevolucao;

            timerFormatter.agenda.forEach((timer:any) => {
              this.horaRetiradaFormatter = timer.horaRetirada.split(':').slice(0,2).join(':');
              this.horaDevolucaoFormatter = timer.horaDevolucao.split(':').slice(0, 2).join(':');
              


              console.log(this.horaDevolucaoFormatter)
            })
             

            //console.log(horaRetirada)

            
           })

        },
        (error) => {
          console.error('Erro ao carregar as reservas do dia:', error);
        }
      )

    
  }
  


}
