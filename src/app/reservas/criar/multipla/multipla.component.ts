import { FormValidation } from './../../../service/model/formValidation';
import { OptionQtdService } from './../../../service/model/optionQtdService';
import { ListaAgendaInterface } from './../../../service/model/typing-interfaces/agenda/lista-agenda-interface';

import { EstoqueInterface } from '../../../service/model/typing-interfaces/equipamento/estoque-interface';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HorasService } from 'src/app/service/model/horasService';
import { ReservaMultipĺaInterface } from 'src/app/service/model/typing-interfaces/reservaDTO/reserva-multipla-interface';
import { DeletarService } from 'src/app/service/model/reservas/deletar-service';

@Component({
  selector: 'app-multipla',
  templateUrl: './multipla.component.html',
  styleUrls: ['./multipla.component.scss']
})
export class MultiplaComponent implements OnInit {

  //  angular
  formValidationGroup!: FormGroup;

  // vars API's
  optionsListaEquipamento: EstoqueInterface[] = [{id: 0, descricao: '', valor: '', quantidade: 0}];

  //  model
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];

  // vars class
  idObjectDatas = 0;
  idObjectDatasApresentacao = 0;
  equipamentoContId = 0;
  valorDescricao: string = '';
  status_input_habilitado: boolean = false; // não habilitado
  equipamentos: Array<any>[] = [];  // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  objectEquipamentosApresentacao: {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  listaEquipamento: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  listaEquipamentoApresentacao: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio

  reservaDTO: ReservaMultipĺaInterface[] = [{
    nome: new FormControl,
    sobrenome: new FormControl,
    setor: new FormControl,
    agenda: [{}],
    equipamentos: this.equipamentos
  }];

  listaAgenda: ListaAgendaInterface[] = []
  listaAgendaApresentacao: Array<any> = [];

  objectDatas:  {
    id: number,
    dataRetirada: FormControl,
    horaRetirada: FormControl,
    dataDevolucao: FormControl,
    horaDevolucao: FormControl
  } = {
    id: 0,
    dataRetirada: new FormControl(),
    horaRetirada: new FormControl(),
    dataDevolucao: new FormControl(),
    horaDevolucao: new FormControl()
  };

  objectDatasApresentacao: {
    id: number,
    dataRetirada: FormControl,
    horaRetirada: FormControl,
    dataDevolucao: FormControl,
    horaDevolucao: FormControl
  } = {
    id: 0,
    dataRetirada: new FormControl(),
    horaRetirada: new FormControl(),
    dataDevolucao: new FormControl(),
    horaDevolucao: new FormControl()
  }



  constructor(
    private horasService: HorasService, private deletarDataService: DeletarService, private serviceApiReadEquipament: ServiceApiReadEquipament,
    private optionQtdService: OptionQtdService, private formValidation: FormValidation

  ) {
    this.objectDatas = {
      id: 0,
      dataRetirada: new FormControl(''),
      horaRetirada: new FormControl(''),
      dataDevolucao: new FormControl(''),
      horaDevolucao: new FormControl('')
    };
   }


  ngOnInit(): void {
    this.optionsHours = this.horasService.getHoursSegAQuint()
    this.loadListEquipaments()
    this.getListQuantidade()

    this.formValidationGroup = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      sobrenome: new FormControl('Fernandes',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      setor: new FormControl('Tecnologia',[Validators.required]),
      dataRetirada: new FormControl('', [Validators.required]),
      horaInicioSelect: new FormControl('', [Validators.required]),
      dataDevolucao: new FormControl('', [Validators.required]),
      horaDevolucaoSelect: new FormControl('', [Validators.required]),
      equipamentoSelect: new FormControl('', [Validators.required]),
      quantidadeSelect: new FormControl(''),
      outros: new FormControl({value: '', disabled: true}, Validators.maxLength(40)),
      habilitaOutros: new FormControl('')
    });
  }


  // API's services

  /**
   * API de carregamento dos equipamentos direto da api onde o metodo loadListEquipaments aguarda
   * a lista do servidor.
   */
  protected async loadListEquipaments(): Promise<void> {
    this.optionsListaEquipamento = await this.serviceApiReadEquipament.loadListEquipaments();
    console.log('Lista de options API ',this.optionsListaEquipamento)
  }


  /**
   * Serviço de carregamento da lista de quantidade da option quantidade
   */
  private getListQuantidade(): Object[]   {
    return this.optionQuantidade = this.optionQtdService.getQuantidade();
  }

  /**
   * Método para remover um equipamento pelo botão fechar. É invocado um metodo do modelo de reservas e,
   * realiza a remoção da lista original e da lista de apresentação
   */
  protected removerAgenda(event: Event): void {
    event.preventDefault();
    this.deletarDataService.deletarElemento(event, this.listaAgenda, this.listaAgendaApresentacao)
  }

  /**
   * Método para remover um equipamento pelo botão fechar. É invocado um metodo do modelo de reservas e,
   * realiza a remoção da lista original e da lista de apresentação
   */
  protected removerEquipamento(event: Event): void {
    event.preventDefault();
    this.deletarDataService.deletarElemento(event, this.listaEquipamento, this.listaEquipamentoApresentacao)
  }


  // Events

  protected onDescricaoValorChange(descricao: string): void {
    this.valorDescricao = descricao;
    console.log('Valor de descricao: ',descricao)
  }



  // Methods class

  /**
   *
   * @param event
   */
  protected adicionarAgenda(event: Event): void {
    event.preventDefault();

    this.idObjectDatas++
    this.idObjectDatasApresentacao++

    this.objectDatas = {
      id: this.idObjectDatas,
      dataRetirada: this.dataRetirada.value,
      horaRetirada: this.horaInicioSelect.value,
      dataDevolucao: this.dataDevolucao.value,
      horaDevolucao: this.horaDevolucaoSelect.value
    }

     this.objectDatasApresentacao = {
      id: this.idObjectDatasApresentacao,
      dataRetirada: this.dataRetirada.value,
      horaRetirada: this.horaInicioSelect.value,
      dataDevolucao: this.dataDevolucao.value,
      horaDevolucao: this.horaDevolucaoSelect.value
    }

    this.listaAgenda.push(this.objectDatas);
    this.listaAgendaApresentacao.push(this.objectDatasApresentacao);


    console.log('listaAgenda ', this.listaAgenda)   //{Debug}\\


  }


   /**
   * Funcionalidade para adicionar um equipamento à lista de agendamento que será
   * salva do submit do formulário. Existe algumas validações necessárias que foram tratadas
   * diretamente na classe para melhor performance em tempo de execução. Um equipamento não pode
   * ser adicionado sem antes ser validado. Um equipamento não pode ser adicionado 2 vezes e a
   * quantidade antes de adicionar é validada no estoque se a quantidade passada tem disponível,
   * do contrário o andamento do método é bloqueado impedindo o avanço no preenchimento do
   * formulário.
   */
   protected adicionarEquipamento(event: Event): void {

    event.preventDefault()
    this.equipamentoContId++


    this.objectEquipamentos = {
      id: this.equipamentoContId,
      descricao: this.getEquipamentoSelect.value,
      quantidade: this.getQuantidadeSelect.value
    }

     this. objectEquipamentosApresentacao = {
      id: this.equipamentoContId,
      descricao: this.getEquipamentoSelect.value,
      quantidade: this.getQuantidadeSelect.value
    }

    this.listaEquipamentoApresentacao.push(this.objectEquipamentosApresentacao);
    this.listaEquipamento.push(this.objectEquipamentos)

  // console.log('Valor adicionado a lista original ', this.listaEquipamento);  //{Debug}\\

  }













/**
   * Método final para salvar a reserva
   */
  protected processForm(): void {

    const listaDeItemParaValidacao: any[] = [];
    let validacaoDeTodosOsItems: boolean = true;







    validacaoDeTodosOsItems = this.formValidation.validationFormFull(listaDeItemParaValidacao)


    if(this.formValidationGroup.invalid || !validacaoDeTodosOsItems) {
      return;
    } else {

      this.reservaDTO = [{
        nome: this.nome.value,
        sobrenome: this.sobrenome.value,
        setor: this.setor.value,
        agenda: [this.listaAgenda],
        equipamentos: this.listaEquipamento
      }]

    }




  console.log(this.reservaDTO)




  }


  // getters e setters

  get nome(): AbstractControl<FormControl, any> {
    return this.formValidationGroup.get('nome')!;
  }

  get sobrenome(): AbstractControl<FormControl, any> {
    return this.formValidationGroup.get('sobrenome')!;
  }

  get setor(): AbstractControl<FormControl, any> {
    return this.formValidationGroup.get('setor')!;
  }

  get dataRetirada(): AbstractControl<FormControl, any> {
    return this.formValidationGroup.get('dataRetirada')!;
  }

  get horaInicioSelect(): AbstractControl<FormControl, any> {
    return this.formValidationGroup.get('horaInicioSelect')!;
  }

  get dataDevolucao(): AbstractControl<FormControl, any> {
    return this.formValidationGroup.get('dataDevolucao')!;
  }

  get horaDevolucaoSelect(): AbstractControl<FormControl, any> {
    return this.formValidationGroup.get('horaDevolucaoSelect')!;
  }

  get getEquipamentoSelect(): AbstractControl<string, any> {
    return this.formValidationGroup.get('equipamentoSelect')!;
  }

  get getQuantidadeSelect(): AbstractControl<number, any> {
    return this.formValidationGroup.get('quantidadeSelect')!;
  }

  get getOutros(): AbstractControl<string, any> {
    return this.formValidationGroup.get('outros')!;
  }


  get getStatusInputHabilitado(): boolean {
    return this.status_input_habilitado;
  }

  set setStatusInputHabilitado(status: boolean) {
    this.status_input_habilitado = status;
  }



}
