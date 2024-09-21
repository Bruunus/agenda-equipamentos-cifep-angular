import { ListaAgendaInterface } from '../../service/model/interfaces/agenda/lista-agenda-interface';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { Injectable } from '@angular/core';
import { Observable, timer, switchMap, takeUntil, tap } from 'rxjs';

@Injectable()
export class FormEquipamentoValidationService {



  public validacaoFormAdicionarEquipamento(
    equipamentoSelecionado: string, quantidadeSelecionada: string, lista: Array<any>, campoHabilitado: boolean
  ): boolean {


    const validacaoEquipamentoIgual = this.naoPodeEquipamentoIgual(equipamentoSelecionado, lista);


    const equipamentoEQuantidadeVazios =
      this.equipamentoEQuantidadeNaoPodemEstarVazios(equipamentoSelecionado, quantidadeSelecionada, campoHabilitado)

    if (validacaoEquipamentoIgual && equipamentoEQuantidadeVazios) {
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
  private naoPodeEquipamentoIgual(equipamentoSelecionado: string, lista: Array<any>): boolean {

    if(lista.length === 0) {
      // console.log('A lista está vazia')  //{Debug}\\
      return true
    } else {
      // console.log('A lista não está vazia\nAinda tem item nela', lista)  //{Debug}\\
      for (const equipamento of lista) {
        if (equipamento.descricao === equipamentoSelecionado) {
          alert('Este equipamento já foi adicionado.')
          return false;
        }
      }
    }


    return true
  }


  private equipamentoEQuantidadeNaoPodemEstarVazios(equipamento: string, quantidade: string, campoHabilitado: boolean): boolean {

    if(!campoHabilitado) {
      if(equipamento === '' || equipamento === null) {
        alert('Selecione um equipamento para reservar')
        return false;

      } else if(quantidade === '' || quantidade === null) {
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




}
