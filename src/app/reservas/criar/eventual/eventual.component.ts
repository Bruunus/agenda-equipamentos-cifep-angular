import { Input, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";



@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {




  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  opcaoSelecionada: string = '';


  constructor(private horasService: HorasService) {

  }


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
      dataDevolucao: this.opcaoSelecionada,
      horaDevolucao: ''

    }]

  }






  ngOnInit(): void {
    this.options = this.horasService.getHours();

    //  console.log('Antes do submit', this.reservaDTO)
  }



  onClickOpcaoSelecionada(event: Event) {
    this.opcaoSelecionada = this.horasService.getOptionSelecionado(event);
  }


  processForm() {



    console.log('submit: ',this.reservaDTO)





  }





}
