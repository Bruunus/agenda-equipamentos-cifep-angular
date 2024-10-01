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
   * Método validador que no formulário realiza a validação
   */
  public naoPodeAddEquip2Vezes(equipamentoSelecionado: string, lista: Array<any>): boolean {

    if(lista.length === 0) {
      // console.log('A lista está vazia,  autorizado !')  //{Debug}\\
      return true;
    } else {
      // console.log('A lista não está vazia\nAinda tem item nela', lista)  //{Debug}\\
      for (const equipamento of lista) {
          // console.log('Itens da lista: ', equipamento)   //{Debug}\\
        if (equipamento.descricao === equipamentoSelecionado) {
          alert('Este equipamento já foi adicionado.')
          return false;
        }
      }
      return false;
    }


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

  private quantidadeOutrosNaoPodemEstarVazios(quantidade: string): boolean {
    if(quantidade === '' || quantidade === null) {
      alert('Selecione uma quantidade para o equipamento fora da lista')
      return false;
    } else {
      return true;
    }
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
  public validacaoDeQuantidadeAPI(listaEquipamentoQuantidade: EstoquePollInterface[] = [], getEquipamentoSelect:string,
    getStatusInputHabilitado: boolean, getQuantidadeSelect: string
  ): boolean {

    this.subscription = this.serviceApiReadEquipament.getListEquipamentsPoll()
      .subscribe(
        (lista: EstoquePollInterface[]) => {
          listaEquipamentoQuantidade = lista
          // console.log('Recebendo lista de equipamentos... ', this.listaEquipamentoQuantidade)  //{Debug}\\
        })

    // console.log(this.listaEquipamentoQuantidade)   //{Debug}\\


    for(let i = 0; i < listaEquipamentoQuantidade.length; i++) {
      if(listaEquipamentoQuantidade[i].valor === getEquipamentoSelect) {
        // {Debugger}
        // console.log(
        //   'Achado valor igual ', this.listaEquipamentoQuantidade[i].valor ,
        //   ' Com o valor = ', this.getEquipamentoSelect.value, '\n',
        //   'Qtd. estoque = ', this.listaEquipamentoQuantidade[i].quantidade,
        //   ' Com Qtd. solicitada = ', this.getQuantidadeSelect.value
        // )

        // console.log('Valor do banco ', this.listaEquipamentoQuantidade[i].quantidade)  //{Debug}\\
        // console.log('Valor do form ', this.getQuantidadeSelect.value)    //{Debug}\\

        if(!getStatusInputHabilitado) {

          const quantidadeNumber: number = parseInt(getQuantidadeSelect, 10);
          if(listaEquipamentoQuantidade[i].quantidade < quantidadeNumber)  {
            // console.log('Quantidade indisponível para reservar!')     //{Debug}\\
            alert('Quantidade indisponível para empréstimo deste equipamento! ')
            return false;
          }
        }

      }
    }
    return true;
  }




  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }


}
