import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HorasService } from 'src/app/model/horasService';


@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

  selectedHour: string = ''; // Esta propriedade vai armazenar o valor selecionado do select
  hours: string[]; // O array de horas
   
  
  

  reservaDTO = {
    setor: '',
    responsavel : '',
    equipamento: {
      equipamento: '',
      quantidade: ''
    },
    agenda: [{
      dataRetirada: '',
      horaRetirada: '',
      dataDevolucao: '',
      horaDevolucao: ''

    }]
    
  }

   
  // dando erro 
  constructor(private horasService: HorasService) {
    this.hours = this.horasService.getHours();
  }
  

  ngOnInit(): void {
     console.log('Antes do submit', this.reservaDTO)
  }





  processForm() {
    
    console.log('submit: ',this.reservaDTO)
    
    

    

  }

 



}
