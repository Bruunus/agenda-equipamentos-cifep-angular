import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ServiceApiRead } from '../service/service-api-read';
import { CommonModule } from '@angular/common';
=======
import { CommonModule, DatePipe } from '@angular/common';
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})

export class ReservasComponent implements OnInit {

  horaRetiradaFormatter: any;
  horaDevolucaoFormatter: any;
  reservas: any[] = [];
  http: any;
  error: any;


<<<<<<< HEAD


  constructor(private serviceApi: ServiceApiRead) {}
=======
  constructor(private http: HttpClient, ) {}
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)


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
