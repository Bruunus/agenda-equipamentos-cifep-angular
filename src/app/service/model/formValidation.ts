import { ConnectableObservable } from "rxjs";

export class FormValidation {

  private dataFimValidation: string = '';


  validationListEmpty(list: Array<any>) {

    if(list.length === 0) {
      console.error("A lista está vazia", list);
      alert('Adicione um equipamento para realizar a reserva')
      return;
    }

  }

  validationDateHighestAndLowestValue(dataFim: string, dataInicio: string) {
    console.log('Entrado na validação da data')
    if(dataFim < dataInicio) {
      console.error('Incongruência do esquema de datas - formato incorreto');
      alert('Parâmetro de data incorreto - A data de devolução não poder ser anterior a data de retirada');
      return;
    } else  {
      console.log('A data está correta - A data menor é igual ou maior a de inicio')
    }
  }

  validationDateSmallerThanTheCurrent(dataInicio: string) {
    const today = new Date();
    const hoje = today.toString();
    console.log('teste data de hoje ', hoje)
    if(dataInicio > hoje) {
      alert('A data da agenda não poder ser menor que a data do dia atual');
      console.error('Parâmetro incorreto no agendamento das datas');
    } else {
      console.log('As datas estão de acordo!')
    }
  }

  validationHourHighesAndLowestValue(horaFim: string, horaInicio: string, dataFim: string) {
    if(horaFim < horaInicio) {
      if(
        window.confirm('A hora de devolução excede o tempo limite do dia, ' +
      'se você confirmar a data de devolução será lançada para o próximo dia disponível, ' +
      'deseja prosseguir ?')
      ) {
        // console.log('confirmou')   //{Debug}\\
        // pega o valor do dataFim
        // verifica em qual dia da semana que cai o valor do dataFim
          // entre segunda e quinta então atribuia o valor do campo dataFim para o dia seguite data.setDate(data.getDate() + 1);
          // se cair em uma sexta-feira então adicione + 3 para cair na segunda-feira data.setDate(data.getDate() + 1);

        const dataFimDate = new Date(dataFim)
        dataFimDate.setDate(dataFimDate.getDate() + 1)

        const diaDaSemana = dataFimDate.toLocaleDateString('en-US', { weekday: 'long' });
        var ultimoDiaDoMes = null;

        // última dia do mês
        // último dia do ano

        let dia = dataFimDate.getDate();
        const mes = dataFimDate.getMonth();
        const ano = dataFimDate.getFullYear();

        // console.log(dia,' ',mes,' ',ano)   //{Debug}\\

        /**
         * Lógica para avançar a data caso hora de devolução estiver mano que hora da retirada
         *
         */

        ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
        console.log('Último dia do mês', ultimoDiaDoMes)


        if(diaDaSemana !== 'Friday') {
          // de segunda à quinta
          dia = dataFimDate.getDate() + 1
        } else {
          // sexta feira
          dia = dataFimDate.getDate() + 3
        }










        const dataSeguinte = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        console.log('Data para o dia seguinte:', dataSeguinte);
        this.dataFimValidationSet = dataSeguinte


      } else {
        // console.log('desistiu') //{Debug}\\
        const PADRAO = this.dataFimValidationSet = dataFim;
        // console.log('DE ', PADRAO) //{Debug}\\
        return
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
