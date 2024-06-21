import { ListaAgendaInterface } from './../../../service/model/typing-interfaces/agenda/lista-agenda-interface';

import { EstoqueInterface } from '../../../service/model/typing-interfaces/equipamento/estoque-interface';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HorasService } from 'src/app/service/model/horasService';
import { ReservaMultipĺaInterface } from 'src/app/service/model/typing-interfaces/reservaDTO/reserva-multipla-interface';
import { Deletar } from 'src/app/service/model/reservas/deletar';

@Component({
  selector: 'app-multipla',
  templateUrl: './multipla.component.html',
  styleUrls: ['./multipla.component.scss']
})
export class MultiplaComponent implements OnInit {

  //  angular
  formValidation!: FormGroup;

  //  model
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];


  // vars class

  idObjectDatas = 0;
  idObjectDatasApresentacao = 0;
   //reservaDTO = {setor: FormControl, nome: FormControl, sobrenome: FormControl, equipamentos: [{}], agenda: [{}]} tipada
  reservaDTO: ReservaMultipĺaInterface[] = [{
    nome: new FormControl,
    sobrenome: new FormControl,
    setor: new FormControl,
    agenda: [{
    }]
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


  // vars API's
  optionsListaEquipamento: EstoqueInterface[] = [{id: 0, descricao: '', valor: '', quantidade: 0}];



  constructor(private horasService: HorasService, private deletarData: Deletar, private serviceApiReadEquipament: ServiceApiReadEquipament) {
    this.objectDatas = {
      id: 0,
      dataRetirada: new FormControl(''),
      horaRetirada: new FormControl(''),
      dataDevolucao: new FormControl(''),
      horaDevolucao: new FormControl('')
    };
   }

  ngOnInit(): void {
    this.optionsHours = this.horasService.getHoursSegAQuint();

    this.formValidation = new FormGroup({
      nome: new FormControl('Bruno', [
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
      horaDevolucaoSelect: new FormControl('', [Validators.required])
    });
  }


  /**
   * API de carregamento dos equipamentos direto da api onde o metodo loadListEquipaments aguarda
   * a lista do servidor.
   */
  protected async loadListEquipaments(): Promise<void> {
    this.optionsListaEquipamento = await this.serviceApiReadEquipament.loadListEquipaments();
  }


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
   * Método para remover um equipamento pelo botão fechar. É invocado um metodo do modelo de reservas e,
   * realiza a remoção da lista original e da lista de apresentação
   */
  protected removerAgenda(event: Event): void {
    event.preventDefault();
    this.deletarData.deletarElemento(event, this.listaAgenda, this.listaAgendaApresentacao)
  }



  // services


  protected processForm(): void {

    this.reservaDTO = [{
      nome: this.nome.value,
      sobrenome: this.sobrenome.value,
      setor: this.setor.value,
      agenda: [this.listaAgenda]

    }]


    console.log(this.reservaDTO)




  }


  // getters e setters

  get nome(): AbstractControl<FormControl, any> {
    return this.formValidation.get('nome')!;
  }

  get sobrenome(): AbstractControl<FormControl, any> {
    return this.formValidation.get('sobrenome')!;
  }

  get setor(): AbstractControl<FormControl, any> {
    return this.formValidation.get('setor')!;
  }

  get dataRetirada(): AbstractControl<FormControl, any> {
    return this.formValidation.get('dataRetirada')!;
  }

  get horaInicioSelect(): AbstractControl<FormControl, any> {
    return this.formValidation.get('horaInicioSelect')!;
  }

  get dataDevolucao(): AbstractControl<FormControl, any> {
    return this.formValidation.get('dataDevolucao')!;
  }

  get horaDevolucaoSelect(): AbstractControl<FormControl, any> {
    return this.formValidation.get('horaDevolucaoSelect')!;
  }






}
