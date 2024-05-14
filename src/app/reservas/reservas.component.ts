import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceApiRead } from '../service/service-api-read';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})

export class ReservasComponent implements OnInit {


  horaRetiradaFormatter: any;
  horaDevolucaoFormatter: any;
  reservas: any[] = [];

  error: any;


  constructor(private http: HttpClient, private serviceApi: ServiceApiRead, private route: ActivatedRoute ) {}


  ngOnInit(): void {
    this.loadDataOfDay();


  }

  data: any;

  loadDataOfDay() {

    this.serviceApi.loadReservasOfDay().subscribe({
      next: (reservas: any[]) => {
        this.reservas = reservas;
        // console.log('Reservas do dia:', this.reservas);
        this.reservas.forEach(timerFormatter => {
          timerFormatter.agenda.forEach((timer: any) => {
            this.horaRetiradaFormatter = timer.horaRetirada.split(':').slice(0, 2).join(':');
            this.horaDevolucaoFormatter = timer.horaDevolucao.split(':').slice(0, 2).join(':');
            console.log(this.horaDevolucaoFormatter);
          });
        });
      },
      error: (error) => {
        console.error('Erro ao carregar as reservas do dia:', error);
      }
    });


  }



}
