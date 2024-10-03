import { Injectable } from '@angular/core';
import { Observable, timer, switchMap, takeUntil, tap, Subscription } from 'rxjs';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { EstoquePollInterface } from 'src/app/service/model/interfaces/equipamento/estoque-poll-interface';

@Injectable()
export class FormEquipamentoValidationService {

  subscription: Subscription = Subscription.EMPTY;


  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament) {

  }

  public validacaoFormAdicionarEquipamento(
    equipamentoSelecionado: string, quantidadeSelecionada: string, lista: Array<any>, campoHabilitado: boolean
  ): boolean {





    const equipamentoEQuantidadeVazios =
      this.equipamentoEQuantidadeNaoPodemEstarVazios(equipamentoSelecionado, quantidadeSelecionada, campoHabilitado)

    if ( equipamentoEQuantidadeVazios) {
      return true
    } else {
      return false
    }
  }

  public validacaoFormCampoOutros(quantidade: string): boolean {
    const validacaoQuantidadeOutros = this.quantidadeOutrosNaoPodemEstarVazios(quantidade);
    if (validacaoQuantidadeOutros) {
      return true;
    } else {
      return false;
    }
  }

  public calculoDisponivelEmEstoque(list: Array<any>, selectEquipamento: string, selectEquipamentoQuantidade: number): boolean {

    for(let i = 0; i < list.length; i++) {
      if(list[i].valor === selectEquipamento) {
        console.log(
          'Achado valor igual ', list[i].valor ,
          ' Com o valor = ', selectEquipamento, '\n',
          'Qtd. estoque = ', list[i].quantidade,
          ' Com Qtd. solicitada = ', selectEquipamentoQuantidade
        )

        // console.log('Valor do banco ', this.listaEquipamentoQuantidade[i].quantidade)  //{Debug}\\
        // console.log('Valor do form ', this.getQuantidadeSelect.value)    //{Debug}\\
        if(list[i].quantidade < selectEquipamentoQuantidade)  {
          console.log('Quantidade indisponível para reservar!')
          alert('Quantidade indisponível para empréstimo! ')
          return false;
        }
      }
    }
    return true;
  }





  /**
   * Validação para não permitir adicionar dois equipamentos iguais na reserva.
   * Essa lógica do if é para evitar de apresentar 2 mensagens de erro em seguida, se o select de
   * quantidade de equipamento estiver vazio, então este metodo retorna true para que a outra
   * validação cuide da correção, esta validação só é aplicada caso tenha o equipamento igual
   * e que a quantidade seja definida, ou seja, que não tenha um valor zero ou nulo.
   * @param equipamentoSelecionado
   * @param quantidadeEquipamento
   * @param lista
   * @returns
   */
  public naoPodeAddEquip2Vezes(equipamentoSelecionado: string, quantidadeEquipamento: string, lista: Array<any> = []): boolean {

    let equipamentoJaAdicionado = false;

    for (let i = 0; i < lista.length; i++) {

      if (lista[i].descricao === equipamentoSelecionado &&
          (quantidadeEquipamento !== '' && quantidadeEquipamento !== null))
      {
        alert('Este equipamento já foi adicionado.');
        equipamentoJaAdicionado = true;
        break;
      }
    }

    if (equipamentoJaAdicionado) {
      return false;
    }

    return true;

  }


  /**
   * Validação que não permite adicionar um equipamento sem definir a sua quantidade na criação da reserva e vise
   * e versa.
   * [Adicionado na documentação]
   * @param equipamento
   * @param quantidade
   * @param campoHabilitado
   * @returns
   */
  public equipamentoEQuantidadeNaoPodemEstarVazios(equipamento: string, quantidade: string, campoHabilitado: boolean): boolean {
    if(!campoHabilitado) {
      if(equipamento === '' || equipamento === null) {
        alert('Selecione um equipamento para reservar')
        return false;
      } else
        if(quantidade === '' || quantidade === null) {
          alert('Selecione uma quantidade')
          return false;
      }
      return true;
    }
    return true;
  }

  /**
   * Validação que não permite adicionar um equipamento sem definir a sua quantidade na criação da reserva e vise
   * e versa dos campos de "Outros Equipamentos".
   *
   * @param equipamento
   * @param quantidade
   * @returns
   */
  public equipamentoOutrosEQuantidadeOutrosNaoPodemEstarVazios(equipamento: string, quantidade: string, campoHabilitado: boolean): boolean {
    if(campoHabilitado) {
      if(equipamento === '' || equipamento === null) {
        alert('Insira um equipamento para reservar')
        return false;
      } else
        if(quantidade === '' || quantidade === null) {
          alert('Selecione uma quantidade')
          return false;
      }
      return true;
    }
    return true;
  }

  private quantidadeOutrosNaoPodemEstarVazios(quantidade: string): boolean {
    if(quantidade === '' || quantidade === null) {
      alert('Selecione uma quantidade para o equipamento fora da lista')
      return false;
    } else {
      return true;
    }
  }









  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }


}
