import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { ListaAgendaInterface } from '../typing-interfaces/agenda/lista-agenda-interface';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HorasService } from '../horasService';
import * as moment from 'moment';
import { empty, Subject, takeUntil } from 'rxjs';

@Injectable()
export class FormValidationMultipla {


  private dataFimValidation: string = '';
  private today: Date = new Date();
  private year: number;
  private month: string;
  private day: string;
  private dataAtual: string;
  private unsubscribe$ = new Subject<void>();


  public constructor(private horasService: HorasService, private service_api_read_equipament: ServiceApiReadEquipament) {
    this.year = this.today.getFullYear();
    this.month = String(this.today.getMonth() + 1).padStart(2, '0');
    this.day = String(this.today.getDate()).padStart(2, '0');

    this.dataAtual = moment().format('YYYY-MM-DD');

  }




  /**
   * Este método irá trabalhar diretamente na função de adicionar uma reserva multipla. Para cada criação de uma agenda
   * no formulário de multipla deve passar por todas as validações do método.
   * @param horaFim
   * @param horaInicio
   * @param dataRetirada
   * @param dataFim
   * @param list
   * @returns
   */
  public validacaoCompletaDaAgendaMultipla(
    dataRetirada: string, dataFim: string, horaInicio: string,  horaFim: string
  ): boolean {

    const validacaoDasDatas = this.validationAgendaCamposDeDatas(dataRetirada, dataFim);
    const validacoesDosSelects = this.validationAgendaHorarios(horaInicio, horaFim);
    const dataInicioNaoPodeSerMenorADoSistema = this.validacaoDataMenorParaDataAtual(dataRetirada, dataFim)
    const dataFimNaoPodeSerManiorADataInicio = this.validacaoDataMaiorEMenor(dataFim, dataRetirada)
    const validacaoHoraFim = this.validacaoHoraFim(horaFim, horaInicio, dataRetirada, dataFim)
    const horasIguaisNãoPodem = this.horasNãoPodemSerIguais(horaInicio, horaFim, dataRetirada, dataFim)


    if (
      validacaoDasDatas && validacoesDosSelects && dataInicioNaoPodeSerMenorADoSistema &&
      dataInicioNaoPodeSerMenorADoSistema && dataFimNaoPodeSerManiorADataInicio &&
      validacaoHoraFim && horasIguaisNãoPodem
    ) {
      return true
    }
    // Adicionar mensagem de erro e log de erro
    return false;

  }

  public async pesquisaDisponibilidadeDeAgendamento(dataRetirada: any[], listaEquipamentos: any[]): Promise<boolean> {
    const verificarAgenda = await this.validacaoDeEstoqueDisponivelMULTIPLA(dataRetirada, listaEquipamentos)

    if(verificarAgenda) {
      return true;
    }
      return false;


  }




  /**
   * Este validador é específico para as reservas multiplas pois, sem ele você consegue criar uma agenda
   * sem as datas preenchjidas de forma válida.
   *
   * @param dataInicio
   * @param dataFim
   * @returns
   */
  public validationAgendaCamposDeDatas(dataInicio: string, dataFim: string): boolean {
    if(dataInicio === '' || dataInicio.length === 0) {
      alert('Selecione uma data de retirada para o agendamento')
      return false;
    } else if(dataFim === '' || dataFim.length === 0) {
      alert('Selecione uma data de devolução para o agendamento')
      return false;
    }
    return true;
  }



  /**
   * Este validador é específico para as reservas multiplas pois, sem ele você consegue criar uma agenda
   * sem um valor válido, ou seja, passando o campo vazio no estado -- select --
   * @param horaRetirada
   * @param horaDevolucao
   * @returns
   */
  public validationAgendaHorarios(horaRetirada: string, horaDevolucao: string): boolean {
    if(horaRetirada === '' || horaRetirada.length === 0) {
      alert('Selecione um horário para início da agenda')
      return false;
    } else if(horaDevolucao === '' || horaDevolucao.length === 0) {
      alert('Selecione um horário para a devolução da agenda')
      return false;
    }
    return true;
  }


  public validationListEquipmentEmpty(list: Array<any>): boolean {

    if(list.length === 0) {
      console.error("A lista está vazia", list);
      alert('Adicione um equipamento para realizar a reserva')
      // Adicionar mensagem de erro e log de erro
      return false;

    }

    return true;

  }

  public validationListAgendaEmpty(list: ListaAgendaInterface[]): boolean {
    if(list.length === 0) {
      console.error("A lista está vazia", list);
      alert('Adicione um agendamento para realizar a reserva')
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


  private horasNãoPodemSerIguais(horaInicio: string, horaFim: string, dataInicio: string, dataFim: string): boolean {
    if (dataInicio === dataFim  && horaFim === horaInicio) {
      alert('A hora de retirada não pode ser igual a hora de devolução se a devolução é para o mesmo em que foi retirado.')
      console.log('hora devolução ', horaFim, ' hora de retirada ', horaInicio)
      return false;
    } else {
      return true;
    }
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
   * Método de validação de disponibilidade junto ao estoque do banco para
   * descobrir disponibilidade
   */
  async validacaoDeEstoqueDisponivelMULTIPLA(datas: any[], listaEquipamento: Array<any> = []): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.service_api_read_equipament.getReservasFuturas(datas).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (listaInsuficiente: any) => {
          console.log('Disponibilizador da datas agendas');
          console.log(listaInsuficiente);


          // let correspondenciaEncontrada = true; // Variável para rastrear se uma correspondência foi encontrada

          // for (let itemInsuficiente of listaInsuficiente) {
          //   let correspondenciaEquipamentoEncontrada = false; // Variável para rastrear se uma correspondência específica foi encontrada
          //   for (let equipamento of listaEquipamento) {
          //     if (equipamento.descricao === itemInsuficiente.descricao) {
          //       let msn = `O equipamento ${itemInsuficiente.descricao} não possui disponibilidade reservar para a data ${itemInsuficiente.dataRetirada} agendada.`;
          //       alert(msn);
          //       correspondenciaEquipamentoEncontrada = true;
          //       break;
          //     }
          //   }
          //   if (correspondenciaEquipamentoEncontrada) {
          //     correspondenciaEncontrada = false;
          //     break;
          //   }
          // }

          // if (correspondenciaEncontrada) {
          //   console.log('Agenda e equipamentos permitidos');
          //   resolve(true);
          // } else {
          //   resolve(false);
          // }
        },
        (error: any) => {
          console.error('Erro ao invocar o método:', error);
          resolve(false);
        }
      );
    });
  }







  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
