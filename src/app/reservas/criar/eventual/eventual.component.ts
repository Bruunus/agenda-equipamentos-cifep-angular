
import {  Component, ElementRef, EventEmitter, OnInit, QueryList, ViewChildren, } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";
import { EquipamentoInterface } from 'src/app/service/model/equipamento-interface';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { OptionQtdService } from 'src/app/service/model/optionQtdService';
import { ServiceApiCreateReservation } from 'src/app/service/api/reservas/service-api-create-reservation';
import { Router } from '@angular/router';




@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

  // data class
  reservaDTO = {}

  //equipamentos = [{}]
  equipamentos: EquipamentoInterface[] = [];
  listaEquipamento: Array<any> = [];
  optionsListaEquipamento: any[] = [];
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];
  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  selectedOptionListaEquipamento: string = '';
  selectedOptionListaQuantidade: string = '';
  equipamentoContId = 0;
  isEmpty = false;

  // data-biding form
  nome: string = '';
  sobrenome: string = '';
  setor: string = '';
  dataRetirada: string = '';
  horaRetirada: string = '';
  dataDevolucao: string = '';
  horaDevolucao: string = '';
  opcaoSelecionada: string = '';
  opcaoEquipamentoSelecionado: string = '';
  opcaoQuantidadeSelecionado: string = '';

  // data share
  selectedOptionQuantidadeChange: EventEmitter<string> = new EventEmitter<string>();
  selectedOptionEquipamentoChange: EventEmitter<string> = new EventEmitter<string>()

  // valid form
  @ViewChildren('valid') valid!: QueryList<ElementRef>;
  @ViewChildren('equipamentoValid') equipamentoValid!: QueryList<ElementRef>;
  // @ViewChildren('equipamentoValid') equipamentoValid!: QueryList<ElementRef>;







  ;




  constructor(
    private horasService: HorasService, private serviceApiReadEquipament: ServiceApiReadEquipament,
    private optionQtdService: OptionQtdService, private serviceApiCreateReservation: ServiceApiCreateReservation,
    private router: Router
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


  if(this.selectedOptionListaEquipamento === '' || this.selectedOptionListaEquipamento === null) {
    alert('Selecione um equipamento para reservar')  // future response personality
  } else if(this.selectedOptionListaQuantidade === '' || this.selectedOptionListaQuantidade === null) {
    alert('Selecione uma quantidade')
  } else {

    this.equipamentoContId++

    const quantidade = parseInt(this.selectedOptionListaQuantidade, 10)

    this.objectEquipamentos = {
      id: this.equipamentoContId,
      descricao: this.selectedOptionListaEquipamento,
      quantidade: quantidade
    }

    this.listaEquipamento.push(this.objectEquipamentos)


      console.log(this.listaEquipamento);  //{Debug}\\


    this.selectedOptionListaEquipamento = ''
    this.selectedOptionListaQuantidade = ''

  }












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


  processForm() {

    const isEmpty = false;


    // first validation
    this.valid.forEach(input => {
      if (input.nativeElement.value === '' || input.nativeElement.value === null) {
        this.isEmpty = true;
      }

    })

    if (this.isEmpty && this.listaEquipamento.length === 0) {
      alert('Preencha todos os campos.');
      console.error('A lista de equipamentos está vazia')
    } else {

      if(this.listaEquipamento.length === 0) {
        alert('Criação de reserva incorreta, verifique os dados. Obrigatório adicionar equipamento')
        console.log('A lista está vazia, é necessário um equipamento para reservar')
        console.error('Prencha todos so campos para adicionar um equipamento')
      } else if (this.validationForm()) {
        alert('Nome ou cobrenome ou data inicio estão vazios')
      }

      else  {

        this.reservaDTO = {
          setor: this.setor,
          responsavel : this.nome,  // alterar de responsavel => nome (quando alterar no backend)
          // sobrenome: this.sobrenome    // liberar campo quando alterar no backend
          equipamentos: this.getListaEquipamento(),
          agenda: [{
            dataRetirada: this.dataRetirada,
            horaRetirada: this.horaRetirada,
            dataDevolucao: this.dataDevolucao,
            horaDevolucao: this.horaDevolucao
          }]
        }


        console.log(this.reservaDTO)

        this.nome = ''
        // this.sobrenome   // liberar campo quando o backend estiver ajustado para receber
        this.setor = ''
        this.dataRetirada = ''
        this.dataDevolucao = ''
        this.horaRetirada = ''
        this.horaDevolucao = ''
        this.selectedOptionListaEquipamento = ''
        this.selectedOptionListaQuantidade  = ''

        // limpar o DOM da lista de equipamentos




        console.log('submit: ',this.reservaDTO)  //{Debug}\\
        console.log('submit: ',this.reservaDTO)  //{Debug}\\

        try {
          this.serviceApiCreateReservation.createEventualReservation(this.reservaDTO)
            .then((response) => {
              // Lógica para lidar com a resposta do servidor, se necessário
            console.log('Resposta do servidor:', response);
            this.router.navigate(['/reservas/teste-redirect']).then(() => {
              window.location.reload();
            });



            })
        } catch (error) {
          // Lógica para lidar com exceções caso ocorram
          console.error('Erro ao tentar criar reserva:', error);
        }











        }












  }











  }



// getters

getListaEquipamento() {

  this.listaEquipamento.forEach(deleteId => {
    delete deleteId.id;
  })

  return this.listaEquipamento;
}

validationForm(): boolean {

  const nome = this.nome === '' || this.nome === null;
  const sobrenome = this.sobrenome === '' || this.sobrenome === null;
  const dataInicio = this.dataRetirada === '' || this.dataRetirada === null;


  if (
      nome || sobrenome || dataInicio
  ) {

    return false;
  } else {
    return true
  }






}






}



