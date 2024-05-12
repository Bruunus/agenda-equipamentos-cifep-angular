<<<<<<< HEAD
import { EquipamentosComponent } from './../../componentes-templates/equipamentos/equipamentos.component';

import { Input, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";
import { EquipamentoInterface } from 'src/app/service/model/equipamento-interface';
=======
import { Component, OnInit, EventEmitter } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { OptionQtdService } from 'src/app/service/model/optionQtdService';
import { ServiceApiCreateReservation } from 'src/app/service/api/reservas/service-api-create-reservation';
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)



@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

  // data class
  reservaDTO = {}
<<<<<<< HEAD
  //equipamentos = [{}]
  equipamentos: EquipamentoInterface[] = [];


  equipamentosInterface: EquipamentoInterface[] = [];
=======
  listaEquipamento: Array<any> = [];
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)

  optionsListaEquipamento: any[] = []; 
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];
  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  selectedOptionListaEquipamento: string = '';
  selectedOptionListaQuantidade: string = '';
  equipamentoContId = 0;
  
  // data-biding form
  responsavel: string = '';
  setor: string = '';
  dataRetirada: string = '';
  horaRetirada: string = '';
  dataDevolucao: string = '';
  horaDevolucao: string = '';
<<<<<<< HEAD

  opcaoSelecionada: string = '';

  opcaoEquipamentoSelecionado: string = '';
  opcaoQuantidadeSelecionado: string = '';








  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];




  constructor(private horasService: HorasService, private equipamentoComponent: EquipamentosComponent ) {

  }






=======
  opcaoSelecionada: string = '';

  // data share
  selectedOptionQuantidadeChange: EventEmitter<string> = new EventEmitter<string>();
  selectedOptionEquipamentoChange: EventEmitter<string> = new EventEmitter<string>();
 
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)


  constructor(
    private horasService: HorasService, private serviceApiReadEquipament: ServiceApiReadEquipament,
    private optionQtdService: OptionQtdService, private serviceApiCreateReservation: ServiceApiCreateReservation
    ) { }

  ngOnInit(): void {
    this.optionsHours = this.horasService.getHours();
    this.loadListEquipaments()
    this.getListQuantidade()
  }




  // get datas

  loadListEquipaments(): void {
    this.serviceApiReadEquipament.getListEquipaments()
      .then((lista: any[]) => {
        //  console.log(lista)   //{debug}\\
        this.optionsListaEquipamento = lista;

        // this.optionsListaEquipamento.forEach(data => {   //{debug}\\
        //   console.log(data)
        // })

      })
  }

  getListQuantidade() {
    return this.optionQuantidade = this.optionQtdService.getQuantidade();
  }

   

  
  
  // events

  onClickOpcaoSelecionada(event: Event) {
    this.opcaoSelecionada = this.horasService.getOptionSelecionado(event);
  }

<<<<<<< HEAD
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


=======
  onOptionEquipamentoChange(event: any) {
    const selectedValue = event.target.value;
    this.selectedOptionListaEquipamento = selectedValue;
    this.selectedOptionEquipamentoChange.emit(selectedValue);
  }

  onOptionQuantidadeChange(event: Event) {
    const quantidadeSelecionada = this.optionQtdService.getOptionQuantidadeSelecionado(event);
    const quantidadeSelecionadaString = quantidadeSelecionada.toString();
    this.selectedOptionQuantidadeChange.emit(quantidadeSelecionadaString);
  }

  adicionarEquipamento(event: Event) {
    event.preventDefault()

    this.equipamentoContId++

    const quantidade = parseInt(this.selectedOptionListaQuantidade, 10)

    this.objectEquipamentos = {
      id: this.equipamentoContId,
      descricao: this.selectedOptionListaEquipamento,  
      quantidade: quantidade
    }

    this.listaEquipamento.push(this.objectEquipamentos)


  }



  removerEquipamento(event: Event) {

    // alert('remover item')

    const deletar = (event.target as HTMLElement).classList.contains('delete');

    // console.log('O id foi datectado? ',deletar)   //{debug}\\

    if (deletar) {
      const liElement = (event.target as HTMLElement).closest('li');

      console.log(liElement)

      if (liElement) {
            
            const idLi = liElement.dataset['id'];   // get id for remove

            if (idLi !== undefined) {
              const id = parseInt(idLi, 10);        // convert this for type number

              this.listaEquipamento.forEach((objectElements, item) => {
                if (objectElements.id === id) {
                    this.listaEquipamento.splice(item, 1);
                }
              })
              
              console.log(this.listaEquipamento)  //{Debug}\\
            }  
            
        }
    }


  }



  // submit
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)

  processForm() {

  

  this.reservaDTO = {
      setor: this.setor,
      responsavel : this.responsavel,
<<<<<<< HEAD
      equipamentos: this.equipamentos,  // aqui
=======
      equipamentos: this.getListaEquipamento(),
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)
      agenda: [{
        dataRetirada: this.dataRetirada,
        horaRetirada: this.horaRetirada,
        dataDevolucao: this.dataDevolucao,
        horaDevolucao: this.horaDevolucao
      }]
    }

<<<<<<< HEAD
     console.log('submit: ',this.reservaDTO)
    // console.log(this.responsavel)
    // console.log(this.setor)

    // const teste = this.equipamentoComponent.getEquipamentos()    // teste falhou
    // console.log('Lista vinda de equipamento component', teste)
=======
    console.log('submit: ',this.reservaDTO)  //{Debug}\\

    try {
      this.serviceApiCreateReservation.createEventualReservation(this.reservaDTO)
        .then((response) => {
          // Lógica para lidar com a resposta do servidor, se necessário
          console.log('Resposta do servidor:', response);
        })        
    } catch (error) {
      // Lógica para lidar com exceções caso ocorram
      console.error('Erro ao tentar criar reserva:', error);
    }
    
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)




    

  }



// getters
 
getListaEquipamento() {

  this.listaEquipamento.forEach(deleteId => {
    delete deleteId.id;
  })
   
  return this.listaEquipamento;
}


  getEquipamentos(equipamentos: EquipamentoInterface[]): void {
    this.equipamentos = equipamentos;
  }



  testeCarregarEquipamentos(event: Array<any>) {
    console.log('Lista vinda de equipamentos', event)
  }


}
