import { ServiceEquipamentos } from './../../../service/service-equipamentos';
import { Input, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";



@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

  reservaDTO = {}

  responsavel: string = '';
  setor: string = '';
  dataRetirada: string = '';
  horaRetirada: string = '';
  dataDevolucao: string = '';
  horaDevolucao: string = '';

  opcaoSelecionada: string = '';

  opcaoEquipamentoSelecionado: string = '';
  opcaoQuantidadeSelecionado: string = '';








  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];




  constructor(private horasService: HorasService ) {

  }









  ngOnInit(): void {
    this.options = this.horasService.getHours();


    //  console.log('Antes do submit', this.reservaDTO)
  }



  onClickOpcaoSelecionada(event: Event) {
    this.opcaoSelecionada = this.horasService.getOptionSelecionado(event);
  }

  onSelectedOptionEquipamentoChange(value: any) {
    // console.log('Opção selecionada:', value);
    this.opcaoEquipamentoSelecionado = value;
  }

  onSelectedOptionQuantidadeChange(value: any) {
    // console.log('Quantidade selecionada:', value);
    this.opcaoQuantidadeSelecionado = value;
  }




  processForm() {

  this.reservaDTO = {
      setor: this.setor,
      responsavel : this.responsavel,
      equipamento: [{
        equipamento: this.opcaoEquipamentoSelecionado,
        quantidade: this.opcaoQuantidadeSelecionado
      }],
      agenda: [{
        dataRetirada: this.dataRetirada,
        horaRetirada: this.horaRetirada,
        dataDevolucao: this.dataDevolucao,
        horaDevolucao: this.horaDevolucao

      }]

    }

     console.log('submit: ',this.reservaDTO)
    // console.log(this.responsavel)
    // console.log(this.setor)




  }


  onResponsavel(responsavel: string): void {
    this.responsavel = responsavel;
  }

  onSetor(setor: string): void {
    this.setor = setor;
  }




}
