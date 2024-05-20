import { ConnectableObservable } from "rxjs";

export class FormValidation {

  private dataFimValidation: string = '';
  private today: Date = new Date();
  private year: number;
  private month: string;
  private day: string;


  public constructor() {
    this.year = this.today.getFullYear();
    this.month = String(this.today.getMonth() + 1).padStart(2, '0');
    this.day = String(this.today.getDate()).padStart(2, '0');

  }


  validationListEmpty(list: Array<any>) {

    if(list.length === 0) {
      console.error("A lista está vazia", list);
      alert('Adicione um equipamento para realizar a reserva')
      return;
    }

  }

  validacaoDataMaiorEMenor(dataFim: string, dataInicio: string) {
    console.log('Entrado na validação da data')
    if(dataFim < dataInicio) {
      console.error('Incongruência do esquema de datas - formato incorreto');
      alert('Parâmetro de data incorreto - A data de devolução não poder ser anterior a data de retirada');
      return;
    } else  {
      console.log('A data está correta - A data menor é igual ou maior a de inicio')
    }
  }

  validacaoDataMenorParaDataAtual(dataInicio: string) {

    const hoje = `${this.year}-${this.month}-${this.day}`;
    console.log('teste data de hoje ', hoje)

    if(dataInicio < hoje) {
      alert('A data da agenda não poder ser menor que a data do dia atual '+ this.day);
      console.error('Parâmetro incorreto no agendamento das datas');
    } else {
      console.log('As datas estão de acordo!')
    }

  }

  validacaoHoraMaiorEMenor(horaFim: string, horaInicio: string, dataIncio: string, dataFim: string) {
    console.log('Análise de data de devolução: ',dataFim)
    if(horaFim < horaInicio) {
      if(
        window.confirm('A hora de devolução excede o tempo limite do dia, ' +
      'se você confirmar a data de devolução será lançada para o próximo dia disponível, ' +
      'deseja prosseguir ?')
      ) {
        console.log('data menor detectada')   //{Debug}\\



          // entre segunda e quinta então atribuia o valor do campo dataFim para o dia seguite data.setDate(data.getDate() + 1);

        // pega o valor do dataFim
        const dataFimDate = new Date(dataFim)
        dataFimDate.setDate(dataFimDate.getDate() + 1)    // iniciar sempre no mes 01 (jan) e assim por diante

        // verifica em qual dia da semana que cai o valor do dataFim
        const diaDaSemana = dataFimDate.toLocaleDateString('en-US', { weekday: 'long' });
        var ultimoDiaDoMes = null;

        // última dia do mês
        // último dia do ano

        let dia = dataFimDate.getDate();
        const mes = dataFimDate.getMonth();
        const ano = dataFimDate.getFullYear();

        // console.log(dia,' ',mes,' ',ano)   //{Debug}\\

        /**
         * Lógica para avançar a data caso hora de devolução estiver maior que hora da retirada
         *
         */

        ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
        // console.log('Último dia do mês', ultimoDiaDoMes)


        const dataPreAgendada = new Date(dataIncio);
        const mesPreAgendado = String(dataPreAgendada.getMonth() + 1).padStart(2, '0');    // pegando o mes em que se quer agenda independente do mês
        const anoPreAgendado = dataPreAgendada.getFullYear();
        const diaPreAgendado = String(dataPreAgendada.getDate()).padStart(2, '0');
        const dataPreAgendadaFormater = `${anoPreAgendado}-${mesPreAgendado}-${diaPreAgendado}`;

        console.log('Datas para serem comparadas\n' +
        dataPreAgendadaFormater +' \n' +
        ' '+ dataFim

        );




        // se cair em uma sexta-feira então adicione + 3 para cair na segunda-feira data.setDate(data.getDate() + 1);
        if(diaDaSemana !== 'Friday' && dataPreAgendadaFormater === dataFim) {
          // de segunda à quinta
          dia = dataFimDate.getDate() + 1
        } else  {
          // sexta feira
          dia = dataFimDate.getDate() + 3
        }




        console.log('data inicio coletada '+ dataPreAgendada)


        let diaFormat = dia.toString().padStart(2, '0');  //  coloca o 0 no dia após ser manipulado


        const dataDevolucaoReagendada = `${anoPreAgendado}-${mesPreAgendado}-${diaFormat}`;





        // OUTRO DESAFIO. VOCE PRECISA VERIFICAR SE A DATAFIM É IGUAL A DATA DE INICIO POIS SE NÃO FOR
        // NÃO PRECISA APLICAR ESTA LÓGICA POIS SIGNIFICA QUE A DATA DE DEVOLUÇÃO É MAIS PRA FRENTE
        // ENTÃO NÃO PRECISA  ADIAR PARA O DIA SEGUINTE




        // const dataSeguinte = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        // console.log('Data para o dia seguinte:', dataSeguinte);
        this.dataFimValidationSet = dataDevolucaoReagendada;


      } else {
        console.log('Agendamento normal com a data de devolução ')
      }
    }




  }












  get dataFimValidationReturn(): string {
    console.log('executando o método dataFimValidationReturn \n',)
    return this.dataFimValidation;
  }

  set dataFimValidationSet(data: string) {
   this.dataFimValidation = data;
  }


}
