import { EstoquePollInterface } from './../../../service/model/typing-interfaces/equipamento/estoque-poll-interface';
// import { EquipamentoInterface } from 'src/app/service/model/typing-interfaces/equipamento-interface';
import { EquipamentoInterface } from 'src/app/service/model/typing-interfaces/equipamento/equipamento-interface';
// import { EquipamentoInterface } from 'src/app/service/model/typing-interfaces/equipamento/equipamento-interface';


import { EstoqueInterface } from '../../../service/model/typing-interfaces/equipamento/estoque-interface';
import { FormEquipamentoValidationService } from './../../../service/model/formEquipamentoValidationService';
import { Router } from '@angular/router';
import { ServiceApiCreateReservation } from './../../../service/api/reservas/service-api-create-reservation';
import { FormValidation } from './../../../service/model/formValidation';

import { Component, OnInit, } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { OptionQtdService } from 'src/app/service/model/optionQtdService';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ReservaEventualInterface } from 'src/app/service/model/typing-interfaces/reservaDTO/reserva-eventual-interface';
import { DeletarService } from 'src/app/service/model/reservas/deletar-service';


@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

  // Angular services
  formValidation!: FormGroup;
  subscription: Subscription = Subscription.EMPTY;

  //formControl
  habilitaOutros: FormControl = new FormControl(false);

  equipamentos: Array<any>[] = [];  // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio


  // objects
  reservaDTO: ReservaEventualInterface = {
    setor: new FormControl,
    nome: new FormControl,
    sobrenome: new FormControl,
    equipamentos: this.equipamentos
    ,
    agenda: [{
      dataRetirada: new FormControl,
      horaRetirada: new FormControl,
      dataDevolucao: new FormControl,
      horaDevolucao: new FormControl
    }]
  }

  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  objectEquipamentosApresentacao: {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];
  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];

  // lists
  listaEquipamento: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  listaEquipamentoApresentacao: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  optionsListaEquipamento: EstoqueInterface[] = [{id: 0, descricao: '', valor: '', quantidade: 0}];
  listaEquipamentoQuantidade: EstoquePollInterface[] = [];

  // vars
  equipamentoContId = 0;
  isEmpty = false;
  dataAtual: string = ''
  status_connetion: boolean = true;
  interval: any;
  inputOutrosDisabled: boolean = true;
  status_input_habilitado: boolean = false; // não habilitado
  valorDescricao: string = '';



  constructor(private horasService: HorasService, private serviceApiReadEquipament: ServiceApiReadEquipament,
    private optionQtdService: OptionQtdService, private formValidationService: FormValidation,
    private serviceApiCreateReservation: ServiceApiCreateReservation, private router: Router,
    private formEquipamentoValidationService: FormEquipamentoValidationService, private deletarData: DeletarService
  ) { this.dataAtual = moment().format('YYYY-MM-DD') }


  ngOnInit(): void {
    this.loadOptionsDay()
    this.loadListEquipaments()
    this.getListQuantidade()
    this.validacaoDeQuantidade()


    this.formValidation = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      sobrenome: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      setor: new FormControl('',[Validators.required]),
      dataRetirada: new FormControl('',[Validators.required]),
      horaInicioSelect: new FormControl('',[Validators.required]),
      dataDevolucao: new FormControl('',[Validators.required]),
      horaDevolucaoSelect: new FormControl('',[Validators.required]),
      equipamentoSelect: new FormControl(''),
      quantidadeSelect: new FormControl(''),
      outros: new FormControl({value: '', disabled: true}, Validators.maxLength(40)),
      habilitaOutros: new FormControl('')

    })



    // events
    this.onInputValueDataDevolucao()
    this.onDataInicioChange()
    this.onDataDevolucaoChange()
    this.onCheckboxOutrosChange()



  }







  /**
   * Serviço de carregamento das options conferindo pelo dia da
   * semana.
   */
  private loadOptionsDay(): void {
    const dataAtualMoment = moment(this.dataAtual, 'YYYY-MM-DD');
    const dataAtualMomentValue = dataAtualMoment.format('dddd');

    if(dataAtualMomentValue !== 'Friday') {
      // console.log('Hoje não sexta   {Debug}') //{Debug}\\
      this.optionsHours = this.horasService.getHoursSegAQuint();
    } else {
      // console.log('Hoje é sexta   {Debug}') //{Debug}\\
      this.optionsHours = this.horasService.getHoursSexta();
    }

  }

  /**
   * API de carregamento dos equipamentos direto da api onde o metodo loadListEquipaments aguarda
   * a lista do servidor.
   */
  private async loadListEquipaments(): Promise<void> {
    this.optionsListaEquipamento = await this.serviceApiReadEquipament.loadListEquipaments();
  }


  /**
   * Serviço de carregamento da lista de quantidade da option quantidade
   */
  private getListQuantidade(): Object[]   {
    return this.optionQuantidade = this.optionQtdService.getQuantidade();
  }







  /**
   * Esse método recebe em intervalo de tempo uma nova lista atualizada do servidor para poder
   * realizar a checagem de equipamento em tempo de execução recebendo o valor mais exato.
   * Iteramos sobre a lista para procurar o valor passado pelo usuário com o valor da lista,
   * tendo uma igualdade fazemos uma cerificação do campo select de equipamento se caso o
   * usuário não desabilito-o acionando o campo de "outros de equipamentos" que não estão na lista.
   * A sequência só prosegue daqui se estiver habilitado, o campo estando habilitado então é
   * realizado a lógica do estoque onde o valor do usuário não pode ultrapassar o valor disponível
   * em estoque, o valor sendo ultrapassado o formulário gera um aviso não permite prosseguir até
   * um novo valor ser passado novamente.
   */
  private validacaoDeQuantidade(): boolean {

    this.subscription = this.serviceApiReadEquipament.getListEquipamentsPoll()
      .subscribe(
        (lista: EstoquePollInterface[]) => {
          this.listaEquipamentoQuantidade = lista
          // console.log('Recebendo lista de equipamentos... ', this.listaEquipamentoQuantidade)  //{Debug}\\
        })

    // console.log(this.listaEquipamentoQuantidade)   //{Debug}\\


    for(let i = 0; i < this.listaEquipamentoQuantidade.length; i++) {
      if(this.listaEquipamentoQuantidade[i].valor === this.getEquipamentoSelect.value) {
        // {Debugger}
        // console.log(
        //   'Achado valor igual ', this.listaEquipamentoQuantidade[i].valor ,
        //   ' Com o valor = ', this.getEquipamentoSelect.value, '\n',
        //   'Qtd. estoque = ', this.listaEquipamentoQuantidade[i].quantidade,
        //   ' Com Qtd. solicitada = ', this.getQuantidadeSelect.value
        // )

        // console.log('Valor do banco ', this.listaEquipamentoQuantidade[i].quantidade)  //{Debug}\\
        // console.log('Valor do form ', this.getQuantidadeSelect.value)    //{Debug}\\

        if(!this.getStatusInputHabilitado) {

          const quantidadeNumber: number = parseInt(this.getQuantidadeSelect.value, 10);
          if(this.listaEquipamentoQuantidade[i].quantidade < quantidadeNumber)  {
            // console.log('Quantidade indisponível para reservar!')     //{Debug}\\
            alert('Quantidade indisponível para empréstimo! ')
            return false;
          }
        }

      }
    }
    return true;
  }


  // events

  /**
   * Evento criado para copiar a data de retirada para o campo de data de devolução.
   *
   */
  private onInputValueDataDevolucao(): void {
    this.formValidation.controls['dataRetirada'].valueChanges.subscribe((value) => {
      if (value) {
        this.formValidation.controls['dataDevolucao'].patchValue(value);
      }
    });
  }

  /**
   * Evento com o campo de data de retirada para observar em qual dia da semana o usuário
   * realizou a seleção tendo como regra de negócio se a devolução for um horário antes do
   * horario de retirada. O evento precisa observa se o valor selecionado cai em um sexta-feira.
   * Caindo em uma sexta feira o sistema notifica que prorrogará a data de devolução para segunda
   * da próxima semana, e se no caso de ser qualquer outro dia além deste o sistema avança para o
   * dia seguinte.
   */
  private onDataInicioChange(): void {
    this.formValidation.get('dataRetirada')?.valueChanges.subscribe((value) => {
      const isSexta = this.formValidationService.programacaoDeHorasParaSextaFeiraDataInicio(value);
      if (isSexta) {
        this.optionsHours = this.horasService.getHoursSexta()
      } else {
        this.optionsHours = this.horasService.getHoursSegAQuint()
      }
    })

  }

  /**
   * Evento com o campo de data de devolução para observar em qual dia da semana o usuário
   * realizou a seleção tendo como regra de negócio se a devolução for um horário antes do
   * horario de retirada. O evento precisa observa se o valor selecionado cai em um sexta-feira.
   * Caindo em uma sexta feira o sistema notifica que prorrogará a data de devolução para segunda
   * da próxima semana, e se no caso de ser qualquer outro dia além deste o sistema avança para o
   * dia seguinte.
   */
  private onDataDevolucaoChange(): void {
    this.formValidation.get('dataDevolucao')?.valueChanges.subscribe((value) => {
      const isSexta = this.formValidationService.programacaoDeHorasParaSextaFeiraDataFim(value);
      if (isSexta) {
        this.optionsHours = this.horasService.getHoursSexta()
      } else {
        this.optionsHours = this.horasService.getHoursSegAQuint()
      }
    })
  }

  /**
   * Evento do checkbox para permitir adicionar um equipamento que não esteja incluso na lista.
   * O FormControl nos permite atribuir um evento pelo estado por um valor boleano do checkbox,
   * dessa forma retornando verdadeiro desabilitamos o select para a lista de equipamentos e
   * atualizamos o valor da variável de status e vice e versa no caso do valor voltar a ser false.
   * o
   */
  protected onCheckboxOutrosChange(): boolean {

    const habilitaOutrosControl = this.formValidation.get('outros')
    const selectEquipamentos = this.formValidation.get('equipamentoSelect')

    this.formValidation.get('habilitaOutros')?.valueChanges.subscribe((value) => {

      if (value) {
        // console.log('habilitado')  //{Debug}\\
        selectEquipamentos?.disable()
        selectEquipamentos?.reset()
        habilitaOutrosControl?.enable()
        this.setStatusInputHabilitado = true
        // console.log('status do input outros ', this.getStatusInputHabilitado)  //{Debug}\\
        return true;
      } else {
        // console.log('desabilitado')  //{Debug}\\
        selectEquipamentos?.enable()
        habilitaOutrosControl?.reset()
        habilitaOutrosControl?.disable()
        this.setStatusInputHabilitado = false
        // console.log('status do input outros ', this.getStatusInputHabilitado)  //{Debug}\\
        return false;
      }
    })
    return false;
  }

  protected onDescricaoValorChange(descricao: string): void {
    this.valorDescricao = descricao;
    // console.log('Valor de descricao: ',descricao)
  }



  /**
   * Funcionalidade para adicionar um equipamento à lista de agendamento que será
   * salva do submit do formulário. Existe algumas validações necessárias que foram tratadas
   * diretamente na classe para melhor performance em tempo de execução. Um equipamento não pode
   * ser adicionado sem antes ser validado. Um equipamento não pode ser adicionado 2 vezes e a
   * quantidade antes de adicionar é validada no estoque, se a quantidade passada tem disponível
   * é aceita, do contrário o andamento do método é bloqueado impedindo o avanço no preenchimento do
   * formulário.
   */
  protected adicionarEquipamento(event: Event): void {

    event.preventDefault()

    let valorEquipamentoSelecionado = this.getEquipamentoSelect.value;
    let valorQuantidadeSelecionada = this.getQuantidadeSelect.value;
    let validacaoQuantidade = this.validacaoDeQuantidade();
    this.onCheckboxOutrosChange();
    let equipamentoEscolhido = '';
    let equipamentoEscolhidoApresentacao = '';
    let campoHabilitado = this.getStatusInputHabilitado;

    const validacaoDoCampoOutros =
      this.formEquipamentoValidationService.validacaoFormCampoOutros(valorQuantidadeSelecionada)

    // console.log('valor retornado ', teste)

    const validation = this.formEquipamentoValidationService.validacaoFormAdicionarEquipamento(
      valorEquipamentoSelecionado, valorQuantidadeSelecionada, this.listaEquipamento, campoHabilitado
    )

    if (!validation || !validacaoQuantidade) {
     return;
    }
    else {
      // console.log('Validação quantidade passou')
      // console.log('Entrado no else após validação de quantidade');

      if(campoHabilitado) {
        if (validacaoDoCampoOutros) {
          alert('Este equipamento não será monitorado no painel de estoque. Para isso cadastre esse novo equipamentos em \"Configurações > Adicionar novo equipamento\"')
          equipamentoEscolhido =  this.getOutros.value;

          if(equipamentoEscolhido === null || equipamentoEscolhido === '') {
            alert('Adicione um equipamento não monitorado')
            return;
          } else {
            equipamentoEscolhido.toUpperCase()
            let valorCampoOutros = this.getOutros.value;
            equipamentoEscolhidoApresentacao = this.formatacaoDeTextoApresentacaoOutros(valorCampoOutros);
            // console.log('Valor do campo Outros coletado: ', equipamentoEscolhido);   //{Debug}\\
          }


        } else { return; }
      } else {
        equipamentoEscolhido = valorEquipamentoSelecionado;
        equipamentoEscolhidoApresentacao = this.valorDescricao;
        // console.log(this.valorDescricao) //{Debug}\\
      }


      this.equipamentoContId++
      const quantidade = parseInt(valorQuantidadeSelecionada, 10);

      this.objectEquipamentos = {
        id: this.equipamentoContId,
        descricao: equipamentoEscolhido,
        quantidade: quantidade
      }

       this. objectEquipamentosApresentacao = {
        id: this.equipamentoContId,
        descricao: equipamentoEscolhidoApresentacao,
        quantidade: quantidade
      }




      // this.formatadorDeListaParaApresentacao(this.objectEquipamentosApresentacao)
      this.listaEquipamentoApresentacao.push(this.objectEquipamentosApresentacao);
      this.listaEquipamento.push(this.objectEquipamentos)


      // console.log('Valor adicionado a lista original ', this.listaEquipamento);  //{Debug}\\

      this.formValidation.get('equipamentoSelect')!.reset();
      this.formValidation.get('quantidadeSelect')!.reset();
      this.formValidation.get('outros')!.reset();
    }
  }





  /**
   * Método para remover um equipamento pelo botão fechar. É invocado um metodo do modelo de reservas e,
   * realiza a remoção da lista original e da lista de apresentação
   */
  protected removerEquipamento(event: Event): void {
    event.preventDefault();
    this.deletarData.deletarElemento(event, this.listaEquipamento, this.listaEquipamentoApresentacao)
  }


  private limpartListaDeEquipamentoSubmit(): void {
    var elementsLi = document.querySelectorAll('#table-equipamento tbody tr td ul li');

    elementsLi.forEach(function(element) {
      element.parentNode?.removeChild(element);
    })
    // console.log('Lista de LI ',elementLi)  //{Debug}\\
  }

  private formatacaoDeTextoApresentacaoOutros(texto: string): string {
    console.log('Entrado na formatação do campo \'Outros\' com o valor passado: ',texto)
    var espaco = texto.split(' ')
    var mapaDoTexto = espaco.map((palavra) => {
      var primeiraLetra = palavra.charAt(0).toUpperCase();
      var demaisPalavras = palavra.slice(1);
      return primeiraLetra + demaisPalavras;
    });

    var juntandoTexto = mapaDoTexto.join(' ');
    console.log(juntandoTexto)

    return juntandoTexto;
  }



  /**
   * Método final para salvar a reserva
   */
  protected processForm(): void {

    const dataIncio = this.formValidation.get('dataRetirada')?.value;
    const dataFim = this.formValidation.get('dataDevolucao')?.value;
    const horaInicio = this.formValidation.get('horaInicioSelect')?.value;
    const horaFim = this.formValidation.get('horaDevolucaoSelect')?.value;

    if(this.formValidation.invalid) {
    // Prende na validação
     return;

    } else {

      const validation = this.formValidationService
        .validacaoHoraMaiorEMenor(horaFim, horaInicio, dataIncio, dataFim, this.listaEquipamento);
      // console.log("A lista não está vazia", this.listaEquipamento)     //{Debug}\\

      // Retorna o campo dataDevolucao ajustada caso o valor de horas seja inaceitável
      if (this.formValidation.controls.hasOwnProperty('dataDevolucao')) {
        let dataDevolucaoReformada = this.formValidationService.dataFimValidationReturn;
        this.formValidation.controls['dataDevolucao'].setValue(dataDevolucaoReformada);
      }

      if(validation) {

        this.reservaDTO = {
          setor: this.setor.value,
          nome: this.nome.value,
          sobrenome: this.sobrenome.value,
          equipamentos: this.getListaEquipamentoRevisados(),
          agenda: [{
            dataRetirada: this.dataRetirada.value,
            horaRetirada: this.horaInicioSelect.value,
            dataDevolucao: this.dataDevolucao.value,
            horaDevolucao: this.horaDevolucaoSelect.value
          }]

        }

        console.log(this.reservaDTO)     //{Debug}\\

        try {



          this.serviceApiCreateReservation.createEventualReservation(this.reservaDTO)
            .then(() => {
              // Lógica para lidar com a resposta do servidor, se necessário
            this.formValidation.reset('nome')  // Limpar campos
            this.formValidation.reset('sobrenome')
            this.formValidation.reset('setor')
            this.formValidation.reset('dataRetirada')
            this.formValidation.reset('horaInicioSelect')
            this.formValidation.reset('dataDevolucao')
            this.formValidation.reset('horaDevolucaoSelect')
            this.formValidation.reset('equipamentoSelect')
            this.formValidation.reset('quantidadeSelect')

            this.limpartListaDeEquipamentoSubmit()

            alert('Reserva realizada com sucesso !!!')

            // console.log('Resposta do servidor:', response);
            this.router.navigate(['reservas/redirect']).then(() => {
              window.location.reload();
            });



            })
        } catch (error) {
          // Lógica para lidar com exceções caso ocorram
          console.error('Erro ao tentar criar reserva:', error);
        }


        // console.log(this.reservaDTO)     //{Debug}\\

      } else {
        console.error('Falha na validação dos métodos')
        return
      }

      return
    }

  }








  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.interval) {
      clearInterval(this.interval);
    }

  }




// getters

getListaEquipamentoRevisados(): Array<any>[]  {

  this.listaEquipamento.forEach(deleteId => {
    delete deleteId.id;
  })

  return this.listaEquipamento;
}




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

get getEquipamentoSelect(): AbstractControl<string, any> {
  return this.formValidation.get('equipamentoSelect')!;
}

get getQuantidadeSelect(): AbstractControl<string, any> {
  return this.formValidation.get('quantidadeSelect')!;
}

get getOutros(): AbstractControl<string, any> {
  return this.formValidation.get('outros')!;
}




get getStatusInputHabilitado(): boolean {
  return this.status_input_habilitado
}

set setStatusInputHabilitado(status: boolean) {
  this.status_input_habilitado = status;
}




}



