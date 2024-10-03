import { EstoquePollInterface } from '../../../service/model/interfaces/equipamento/estoque-poll-interface';

import { EstoqueInterface } from '../../../service/model/interfaces/equipamento/estoque-interface';
import { FormEquipamentoValidationService } from '../../../validators/equipamento/formEquipamentoValidationService';
import { Router } from '@angular/router';
import { ServiceApiCreateReservation } from './../../../service/api/reservas/service-api-create-reservation';
import { FormValidationEventual } from '../../../validators/reserva/form-validation-eventual';

import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { HorasService } from "../utilits/horasService";
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ReservaEventualInterface } from 'src/app/service/model/interfaces/reserva/reserva-eventual-interface';
import { Deletar } from '../utilits/deletar';
import { OptionQtdService } from '../utilits/optionQtdService';
import { FormValidationApp } from 'src/app/validators/reserva/form-validation-app';


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
  objectTeste: {} = {}

  optionsHours: { descricao: string, valor: string }[] = [];

  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];
  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];

  // lists
  listaEquipamento: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  listaEquipamentoApresentacao: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  listaTeste: Array<any> = [];
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
    private optionQtdService: OptionQtdService, private formValidationApp: FormValidationApp,
    private serviceApiCreateReservation: ServiceApiCreateReservation, private router: Router,
    private formEquipamentoValidationService: FormEquipamentoValidationService, private deletarData: Deletar,
    private cdr: ChangeDetectorRef
  ) { this.dataAtual = moment().format('YYYY-MM-DD') }


  ngOnInit(): void {

    this.optionsHours = this.horasService.loadOptionsDay()  /* PAUSA - Precisa vir como uma lista para preencher o select */



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
      inputOutros: new FormControl({value: '', disabled: true}, Validators.maxLength(40)),
      quantidadeSelectOutros: new FormControl({value: '', disabled: true}),
      habilitaOutros: new FormControl('')

    })



    // events
    this.onInputValueDataDevolucao()
    this.onDataInicioChange()
    this.onDataDevolucaoChange()
    this.onCheckboxOutrosChange()


    // TESTE DA FUNCIONALIDADE DE PESQUISA DA AGENDA - (TEMPORARIA AQUI)
    // let datas: string[] = ["2024-07-04"];
    // console.log('Impressão das datas')

    // this.objectTeste = {
    //   descricao: '',
    //   quantidade: ''
    // }

    // this.formValidationService.validacaoDeEstoqueDisponivelEVETUAL(datas, this.listaTeste)

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
            alert('Quantidade indisponível para empréstimo deste equipamento! ')
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
      const isSexta = this.formValidationApp.programacaoDeHorasParaSextaFeiraDataInicio(value);
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
      const isSexta = this.formValidationApp.programacaoDeHorasParaSextaFeiraDataFim(value);
      if (isSexta) {
        this.optionsHours = this.horasService.getHoursSexta()
      } else {
        this.optionsHours = this.horasService.getHoursSegAQuint()
      }
    })
  }

  /**
   * Ativa o input do campo  "Outros Equipamentos" através do checkbox
   * Evento do checkbox para permitir adicionar um equipamento que não esteja incluso na lista.
   * O FormControl nos permite atribuir um evento pelo estado por um valor boleano do checkbox,
   * dessa forma retornando verdadeiro desabilitamos o select para a lista de equipamentos e
   * atualizamos o valor da variável de status e vice e versa no caso do valor voltar a ser false.
   * o
   */
  protected onCheckboxOutrosChange(): boolean {

    const habilitaOutrosControl = this.formValidation.get('inputOutros');
    const habilitarSelectOutrosControl = this.formValidation.get('quantidadeSelectOutros');
    const selectEquipamentos = this.formValidation.get('equipamentoSelect');
    const selectQuantidade = this.formValidation.get('quantidadeSelect');

    this.formValidation.get('habilitaOutros')?.valueChanges.subscribe((value) => {

      if (value) {
        // console.log('habilitado')  //{Debug}\\
        selectEquipamentos?.disable();
        selectEquipamentos?.reset();
        selectQuantidade?.disable();
        selectQuantidade?.reset();

        habilitaOutrosControl?.enable();
        habilitarSelectOutrosControl?.enable();
        this.setStatusInputHabilitado = true;
        // console.log('status do input outros ', this.getStatusInputHabilitado)  //{Debug}\\
        return true;
      } else {
        // console.log('desabilitado')  //{Debug}\\
        selectEquipamentos?.enable();
        selectQuantidade?.enable();

        habilitaOutrosControl?.reset();
        habilitaOutrosControl?.disable();
        habilitarSelectOutrosControl?.disable();
        this.setStatusInputHabilitado = false;
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
   * diretamente na classe para melhor performance em tempo de execução.
   *  * Um equipamento não pode ser adicionado sem antes ser validado
   *  * Um equipamento não pode ser adicionado 2 vezes e a quantidade antes de adicionar é validada no estoque,
   *  se a quantidade passada tem disponível é aceita, do contrário o andamento do método é bloqueado impedindo
   *  o avanço no preenchimento do formulário.
   */
  protected adicionarEquipamento(event: Event): void {

    event.preventDefault();

    const statusInputOutroEquipamento = this.getStatusInputHabilitado;

    console.log('Entrado no metodo ')
    console.log('Segunda linha após ...')


    if(statusInputOutroEquipamento) {
      /** Sessão Adicionar Outros Equipamentos **/

      let valorEquipamentoOutros = this.getInputOutros.value;
      let valorQuandtidadeSelecionadaOutros = this.getQuantidadeSelectOutros.value;

      let validacaoDoCampoOutros =
      this.formEquipamentoValidationService.equipamentoOutrosEQuantidadeOutrosNaoPodemEstarVazios(
        valorEquipamentoOutros,
        valorQuandtidadeSelecionadaOutros,
        statusInputOutroEquipamento
      );

      if (!validacaoDoCampoOutros) {
        return;
      } else {
        alert('Este equipamento não será monitorado no painel de estoque. Para isso cadastre esse novo equipamentos em \"Configurações > Adicionar novo equipamento\"')
        this.adicionarLista(this.equipamentoContId++,valorEquipamentoOutros, valorQuandtidadeSelecionadaOutros);
        this.formValidation.get('inputOutros')!.reset();
        this.formValidation.get('quantidadeSelectOutros')!.reset();
      }

    } else {
      /** Sessão Adicionar nomalmente **/

      const valorEquipamentoSelecionado = this.getEquipamentoSelect.value;
      const valorQuantidadeSelecionada = this.getQuantidadeSelect.value;

      /*** [Testado -  ok] ***/
      const equipEQtdNaoPodemEstarVazios =
        this.formEquipamentoValidationService.equipamentoEQuantidadeNaoPodemEstarVazios(
          valorEquipamentoSelecionado,
          valorQuantidadeSelecionada,
          statusInputOutroEquipamento
      );

      /*** [Testado - ok] ***/
      const naoPodeAdicionarEquipDuasVezes =
          this.formEquipamentoValidationService.naoPodeAddEquip2Vezes(
            valorEquipamentoSelecionado,
            valorQuantidadeSelecionada,
            this.listaEquipamento
      );

      const validacaoQuantidadeEmEstoqueAPI = this.validacaoDeQuantidade();

      if (!equipEQtdNaoPodemEstarVazios || !naoPodeAdicionarEquipDuasVezes || !validacaoQuantidadeEmEstoqueAPI)
        return;
        this.adicionarLista(this.equipamentoContId++,valorEquipamentoSelecionado, valorQuantidadeSelecionada);
        this.formValidation.get('equipamentoSelect')!.reset();
        this.formValidation.get('quantidadeSelect')!.reset();
    }


  }


  /**
   * Metodo exclusivo para receber os dados para adicionar na lista de equipamentos que vem do médoto
   * adicionarEquipamento()
   */
  private adicionarLista(id: number, descricao: string, quantidade: string): boolean {
    // event.preventDefault()

      const quantidadeNumber = parseInt(quantidade, 10);
      const descricaoApresentacaoFormatter = this.formatacaoDeTextoApresentacaoOutros(descricao);

      this.objectEquipamentos = {
        id: id,
        descricao: descricao,
        quantidade: quantidadeNumber
      }

      this. objectEquipamentosApresentacao = {
        id: id,
        descricao: descricaoApresentacaoFormatter,
        quantidade: quantidadeNumber
      }


      // this.formatadorDeListaParaApresentacao(this.objectEquipamentosApresentacao)
      this.listaEquipamentoApresentacao.push(this.objectEquipamentosApresentacao);
      this.listaEquipamento.push(this.objectEquipamentos)

      this.cdr.detectChanges();

      this.formValidation.get('equipamentoSelect')!.reset();
      this.formValidation.get('quantidadeSelect')!.reset();

      console.log(
        'Lista apresentação: ', this.listaEquipamentoApresentacao +'\n'+
        'Lista equipamento: ', this.listaEquipamento
      )

      return true;

  }



  /**
   * Método para remover um equipamento pelo botão fechar. É invocado um metodo do modelo de reservas e,
   * realiza a remoção da lista original e da lista de apresentação
   */
  protected removerEquipamento(event: Event): void {
    event.preventDefault();
    this.deletarData.deletarElemento(event, this.listaEquipamento, this.listaEquipamentoApresentacao)
  }


  /**
   * Limpa a lista de equipamento de apresentação do usuário
   */
  private limpartListaDeEquipamentoSubmit(): void {
    var elementsLi = document.querySelectorAll('#table-equipamento tbody tr td ul li');

    elementsLi.forEach(function(element) {
      element.parentNode?.removeChild(element);
    })
    // console.log('Lista de LI ',elementLi)  //{Debug}\\
  }



  /**
   *
   */
  private formatacaoDeTextoApresentacaoOutros(texto: string): string {
    // console.log('Entrado na formatação do campo com o valor passado: ',texto)
    texto = texto.replace(/_/g, ' ');   // Substituir underscores por espaços
    var palavras = texto.split(' ');
    var textoFormatado = palavras.map((palavra) => {
        if (palavra.length === 0) {
            return '';
        }
        var primeiraLetra = palavra.charAt(0).toUpperCase();
        var demaisLetras = palavra.slice(1).toLowerCase();
        return primeiraLetra + demaisLetras;
    });

    var textoFinal = textoFormatado.join(' ');
    // console.log('Resultado: ', textoFinal);

    return textoFinal;
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

      // const validation = this.formValidationApp
      //   .validationFormFullEventual(horaFim, horaInicio, dataIncio, dataFim, this.listaEquipamento);

      const listaVazia = this.formValidationApp.validationListEquipmentEmpty(this.listaEquipamento);





      console.log("A lista não está vazia", this.listaEquipamento)     //{Debug}\\

      // Retorna o campo dataDevolucao ajustada caso o valor de horas seja inaceitável
      if (this.formValidation.controls.hasOwnProperty('dataDevolucao')) {
        let dataDevolucaoReformada = this.formValidationApp.dataFimValidationReturn;
        this.formValidation.controls['dataDevolucao'].setValue(dataDevolucaoReformada);
      }

      /**
       * Aqui na validação precisa entrar um ultima validação de estoque de equipamento
       */

      if(listaVazia) {

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

        // try {



        //   this.serviceApiCreateReservation.createEventualReservation(this.reservaDTO)
        //     .then(() => {
        //       // Lógica para lidar com a resposta do servidor, se necessário
        //     this.formValidation.reset('nome')  // VALIDAR SE ESTÁ LIMPANDA (ROLLBACK 24/09)
        //     this.formValidation.reset('sobrenome')
        //     this.formValidation.reset('setor')
        //     this.formValidation.reset('dataRetirada')
        //     this.formValidation.reset('horaInicioSelect')
        //     this.formValidation.reset('dataDevolucao')
        //     this.formValidation.reset('horaDevolucaoSelect')
        //     this.formValidation.reset('equipamentoSelect')
        //     this.formValidation.reset('quantidadeSelect')

        //     this.limpartListaDeEquipamentoSubmit()

        //     alert('Reserva realizada com sucesso !!!')

        //     // console.log('Resposta do servidor:', response);
        //     this.router.navigate(['reservas/redirect']).then(() => {
        //       window.location.reload();
        //     });



        //     })
        // } catch (error) {
        //   // Lógica para lidar com exceções caso ocorram
        //   console.error('Erro ao tentar criar reserva:', error);
        // }


        console.log(this.reservaDTO)     //{Debug}\\

      } else {
        console.error('Falha na validação dos métodos')
        return
      }

      return
    }

  }








  ngOnDestroy(): void {

    if (this.subscription) {
      console.log('ngOnDestroy chamado');
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

get getInputOutros(): AbstractControl<string, any> {
  return this.formValidation.get('inputOutros')!;
}

get getQuantidadeSelectOutros(): AbstractControl<string, any> {
  return this.formValidation.get('quantidadeSelectOutros')!;
}




get getStatusInputHabilitado(): boolean {
  return this.status_input_habilitado
}

set setStatusInputHabilitado(status: boolean) {
  this.status_input_habilitado = status;
}




}



