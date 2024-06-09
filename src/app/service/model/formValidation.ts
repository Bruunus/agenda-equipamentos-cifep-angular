import { Injectable } from '@angular/core';
import { HorasService } from './horasService';
import * as moment from 'moment';

@Injectable()
export class FormValidation {

  private dataFimValidation: string = '';
  private today: Date = new Date();
  private year: number;
  private month: string;
  private day: string;

  private dataAtual: string;


  public constructor(private horasService: HorasService) {
    this.year = this.today.getFullYear();
    this.month = String(this.today.getMonth() + 1).padStart(2, '0');
    this.day = String(this.today.getDate()).padStart(2, '0');

    this.dataAtual = moment().format('YYYY-MM-DD');

  }


  /**
   * Método validador da lista de equipamentos, o processo não pode seguir
   * caso a lista esteja vazia. É obrigatório adicionar no mínimo um
   * equipamento na reserva.
   */
  private validationListEmpty(list: Array<any>): boolean {

    if(list.length === 0) {
      console.error("A lista está vazia", list);
      alert('Adicione um equipamento para realizar a reserva')
      // Adicionar mensagem de erro e log de erro
      return false;

    }

    return true;

  }

  /**
   * Método validador onde a data de devolução não pode ser menor que a data de retirada
   * @param dataFim
   * @param dataInicio
   * @returns
   */
  private validacaoDataMaiorEMenor(dataFim: string, dataInicio: string): boolean {
    // console.log('Entrado na validação da data')    //{Debug}\\
    if(dataFim < dataInicio) {
      console.error('Incongruência do esquema de datas - formato incorreto');
      alert('Parâmetro de data incorreto - A data de devolução não poder ser anterior a data de retirada');
      this.dataFimValidationSet = dataFim;
      return false;
    }
    return true;
  }

  /**
   * Método validador onde a data de retirada não pode ser menor que a do sistema no
   * momento da realização da reserva.
   * @param dataInicio
   * @param dataFim
   * @returns
   */
  private validacaoDataMenorParaDataAtual(dataInicio: string, dataFim: string): boolean {

    const hoje = moment().format('YYYY-MM-DD');
    // console.log('teste data de hoje ', hoje)   //{Debug}\\

    if(dataInicio < hoje) {
      alert('A data da agenda não poder ser menor que a data do dia atual '+ this.day);
      console.error('Parâmetro incorreto no agendamento das datas');
      this.dataFimValidationSet = dataFim;
      return  false;
    } else {
      return true;
    }



  }


  /**
   * Método validador mais importante para reajustar a data de devolução caso ela seja incongluente.
   *
   * @param horaFim
   * @param horaInicio
   * @param dataInicio
   * @param dataFim
   * @returns
   */
  private validacaoHoraFim(horaFim: string, horaInicio: string, dataInicio: string, dataFim: string): boolean {
    if(horaFim < horaInicio) {
      if(
        window.confirm('A hora de devolução excede o tempo limite do dia, ' +
      'se você confirmar a data de devolução será lançada para o próximo dia disponível, ' +
      'deseja prosseguir ?')
      ) {
        if(dataInicio === dataFim) {
          console.log('As datas são iguais')    //{Debug}\\
          this.reajusteDeAgendamentoDeDataDeDevolucao(dataFim);
          return true;
        } else {
          console.log('As datas são diferentes')    //{Debug}\\
          console.log('A devolução ficou para: ', dataFim)    //{Debug}\\
          this.dataFimValidationSet = dataFim;
          return false;
        }

      } else {
        this.dataFimValidationSet = dataFim;
        return false
      }

    } else {
      this.dataFimValidationSet = dataFim;
      return true
    }



  }


  /**
   * Método validador final de todos os outro submodulos validadores, retorna verdadeiro se todas as condições
   * forem verdadeiras segundo a regra de negócio.
   * @param horaFim
   * @param horaInicio
   * @param dataInicio
   * @param dataFim
   * @param list
   * @returns
   */
  validacaoHoraMaiorEMenor(horaFim: string, horaInicio: string, dataInicio: string, dataFim: string, list: Array<any>): boolean {
    // console.log('Análise de data de devolução: ',dataFim)    //{Debug}\\

    const validarSeListaDeEquipamentosEstaVazia = this.validationListEmpty(list)
    const dataInicioNaoPodeSerMenorADoSistema = this.validacaoDataMenorParaDataAtual(dataInicio, dataFim)
    const dataFimNaoPodeSerManiorADataInicio = this.validacaoDataMaiorEMenor(dataFim, dataInicio)
    const validacaoHoraFim = this.validacaoHoraFim(horaFim, horaInicio, dataInicio, dataFim)
    const horasIguaisNãoPodem = this.horasNãoPodemSerIguais(horaInicio, horaFim, dataInicio, dataFim)


    if (
      dataInicioNaoPodeSerMenorADoSistema && dataFimNaoPodeSerManiorADataInicio && validacaoHoraFim &&
      validarSeListaDeEquipamentosEstaVazia && horasIguaisNãoPodem
    ) {
      return true
    }
    // Adicionar mensagem de erro e log de erro
    return false;

  }







  /**
   * Funcionalidade para reajustar a data de devolução de acordo com o horário de devolução.
   * O Reajuste serve para de seg a qui e sex.
   * @param data
   * @returns
   */
  private reajusteDeAgendamentoDeDataDeDevolucao(data: string): boolean {

    const dataFimAddDay = moment(data, 'YYYY-MM-DD');
    const dataFimMomentString = moment(data, 'YYYY-MM-DD');
    const dataFimMomentValue = dataFimMomentString.format('dddd');

    if(dataFimMomentValue === 'Friday') {
      const dataFimMoment = dataFimAddDay
        .add(3, 'day')
        // console.log('A semana cai na sexta')   //{Debug}\\
        // console.log('Nova data de devolução a ser redirecionada: ', dataFimMoment.format('dddd'))   //{Debug}\\
        const toString = dataFimMoment.format('YYYY-MM-DD')
        this.dataFimValidationSet = toString;
        return true;
    } else  {
      const dataFimMoment = dataFimAddDay
        .add(1, 'day')
        .format('YYYY-MM-DD')
        // console.log('A semana cai entre seg a qui')   //{Debug}\\
        // console.log('Nova data de devolução a ser redirecionada: ', dataFimMoment)   //{Debug}\\
        this.dataFimValidationSet = dataFimMoment;
        return true;
    }
    this.dataFimValidationSet = data
    return false;

  }





  /**
   * Metodo responsável por verificar se a data de retirada fornecia cai em uma sexta-feira com retorno booleano
   */
  programacaoDeHorasParaSextaFeiraDataInicio(dataRetirada: string): boolean {
    const dataRetiradaMoment = moment(dataRetirada, 'YYYY-MM-DD');
    const dataRetiradaToString = dataRetiradaMoment.format('dddd');
    // console.log('Dia recebido foi ', dataRetiradaToString)  //{Debug}\\
    if(dataRetiradaToString === 'Friday') {
      return true
    } else {
      return false
    }
  }

  /**
   * Metodo responsável por verificar se a data de devolução fornecia cai em uma sexta-feira com retorno booleano
   */
  programacaoDeHorasParaSextaFeiraDataFim(dataDevolucao: string): boolean {
    // console.log('Alterado data de devolução {Debug}')  //{Debug}\\
    const dataDevolucaoMoment = moment(dataDevolucao, 'YYYY-MM-DD');
    const dataDevolucaoToString = dataDevolucaoMoment.format('dddd');
    // console.log('Dia recebido foi ', dataDevolucaoToString)  //{Debug}\\
    if(dataDevolucaoToString === 'Friday') {
      return true
    } else {
      return false
    }
  }


  private horasNãoPodemSerIguais(horaInicio: string, horaFim: string, dataInicio: string, dataFim: string): boolean {
    if (dataInicio === dataFim  && horaFim === horaInicio) {
      alert('A hora de retirada não pode ser igual a hora de devolução se a devolução é para o mesmo em que foi retirado.')
      return false;
    } else {
      return true;
    }
  }



  //sessão de getters e setters

  get dataFimValidationReturn(): string {
    return this.dataFimValidation;

  }

  set dataFimValidationSet(data: string) {
    // console.log('setando novo valor ', this.dataFimValidationReturn)   //{Debug}\\
   this.dataFimValidation = data;
  }


}
