import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable()
export class FormValidationApp {


  private dataFimValidation: string = '';





  /**
   * Método validador da lista de equipamentos, o processo não pode seguir
   * caso a lista esteja vazia. É obrigatório adicionar no mínimo um
   * equipamento na reserva.
   */
  public validationListEquipmentEmpty(list: Array<any>) {

    if(list.length === 0) {
      console.error("A lista está vazia", list);
      alert('Adicione um equipamento para realizar a reserva')
      // Adicionar mensagem de erro e log de erro
      return ;

    }

    return true;

  }





  /**
   * Metodo responsável por verificar se a data de retirada fornecia cai em uma sexta-feira com retorno booleano
   */
  public programacaoDeHorasParaSextaFeiraDataInicio(dataRetirada: string): boolean {
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
  public programacaoDeHorasParaSextaFeiraDataFim(dataDevolucao: string): boolean {
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




  get   dataFimValidationReturn(): string {
    return this.dataFimValidation;

  }


}
