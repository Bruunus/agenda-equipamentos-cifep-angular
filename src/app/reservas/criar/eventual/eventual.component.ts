import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CreateTags } from 'src/app/model/createTags';


@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

   
   
  
  

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

   

  constructor() {
     
  }

  ngOnInit(): void {
     
  }





  processForm() {
    
    console.log(this.reservaDTO)
    
    

    

  }

 



}
