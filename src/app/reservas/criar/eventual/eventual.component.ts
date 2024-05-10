import { EquipamentosComponent } from './../../componentes-templates/equipamentos/equipamentos.component';

import { Input, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";
import { EquipamentoInterface } from 'src/app/service/model/equipamento-interface';



@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

  reservaDTO = {}
  //equipamentos = [{}]
  equipamentos: EquipamentoInterface[] = [];


  equipamentosInterface: EquipamentoInterface[] = [];

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




  constructor(private horasService: HorasService, private equipamentoComponent: EquipamentosComponent ) {

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


  // teste

  onListaEquipamentosEvent(equipamentos: EquipamentoInterface[]): void {
    this.equipamentos = equipamentos;
    console.log('Lista vinda de equipamentos', this.equipamentos)
  }



  processForm() {

  this.reservaDTO = {
      setor: this.setor,
      responsavel : this.responsavel,
      equipamentos: this.equipamentos,  // aqui
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

    // const teste = this.equipamentoComponent.getEquipamentos()    // teste falhou
    // console.log('Lista vinda de equipamento component', teste)




  }


  onResponsavel(responsavel: string): void {
    this.responsavel = responsavel;
  }

  onSetor(setor: string): void {
    this.setor = setor;
  }



  getEquipamentos(equipamentos: EquipamentoInterface[]): void {
    this.equipamentos = equipamentos;
  }



  testeCarregarEquipamentos(event: Array<any>) {
    console.log('Lista vinda de equipamentos', event)
  }


}
