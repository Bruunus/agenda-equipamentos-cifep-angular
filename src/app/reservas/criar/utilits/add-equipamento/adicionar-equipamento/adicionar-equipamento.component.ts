import { Component, Input, OnInit } from '@angular/core';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { EstoqueInterface } from 'src/app/service/model/interfaces/equipamento/estoque-interface';
import { Deletar } from '../../deletar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InterfaceEquipamento } from 'src/app/model/interface-equipamento';

@Component({
  selector: 'app-adicionar-equipamento',
  template: `

    <div [formGroup]="formValidation">
      <table id="table-adicionar" >
      <tr>
        <td>
          <label for="equipamento">Equipamento</label>
          <select #equipamentoValid  name="equipamento" formControlName="equipamentoSelect"
          (change)="onDescricaoValorChange(equipamentoValid.options[equipamentoValid.selectedIndex].text)">
            <option value=""></option>
            <option *ngFor="let item of optionsListaEquipamento" [value]="item.valor" >
              {{ item.descricao }}
            </option>
          </select>
        </td>

        <td>
          <label for="quantidade">Quantidade</label>
          <select #quantidadeValid formControlName="quantidadeSelect" >
            <option name="selectedOptionListaQuantidade" *ngFor="let qtd of optionQuantidade" [value]="qtd.valor">{{ qtd.descricao }}</option>
          </select>
        </td>

        <td >
          <button (click)="adicionarEquipamento($event)">Adicionar</button>
        </td>

      </tr>
      <tr>
        <td>
          <label for="">Outros equipamentos</label>
          <input type="text" formControlName="inputOutros">
        </td>

        <td>
          <label for="quantidade-outros">Quantidade</label>

          <select #quantidadeValid formControlName="quantidadeSelectOutros" >
            <option name="selectedOptionListaQuantidadeOutros" *ngFor="let qtd of optionQuantidade" [value]="qtd.valor">{{ qtd.descricao }}</option>
          </select>
        </td>

        <td>
          <input style="margin-left: 8pt;" name="habilitaOutros" type="checkbox" formControlName="habilitaOutros" maxlength="40">
          <label for="habilitaOutros" style="margin-left: 8pt;">Adicionar</label>
        </td>



      </tr>

    </table>


    <table id="table-equipamento">
        <thead>
          <th>Equipamento</th>
          <th>Quantidade</th>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">
              <ul>
                template
                <li id="template-li" class="row"
                *ngFor="let equipamento of listaEquipamentoApresentacao; let i = index" [attr.data-id]="equipamento.id">
                  <td class="col">{{ equipamento.descricao }}</td>
                  <td class="col-6">
                    <div class="row justify-content-between">
                        <span>{{ equipamento.quantidade }}</span>
                        <span (click)="removerEquipamento($event)" class="delete">x</span>
                    </div>
                  </td>
                </li>
                template
              </ul>
            </td>
          </tr>
        </tbody>
      </table>


    </div>

  `,
  styleUrls: ['./adicionar-equipamento.component.scss']
})
export class AdicionarEquipamentoComponent implements OnInit {

  formValidation: FormGroup;
  subscription!: Subscription;

  @Input() equipamento: InterfaceEquipamento[] = [{ descricao: '', quantidade: 0}]

  valorDescricao: string = '';
  optionsListaEquipamento: EstoqueInterface[] = [{id: 0, descricao: '', valor: '', quantidade: 0}];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];
  listaEquipamentoApresentacao: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  listaEquipamento: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio


  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament, private deletarItem: Deletar) {
    this.formValidation = new FormGroup({
      equipamentoSelect: new FormControl(''),
      quantidadeSelect: new FormControl(''),
      inputOutros: new FormControl({value: '', disabled: true}, Validators.maxLength(40)),
      quantidadeSelectOutros: new FormControl({value: '', disabled: true}),
      habilitaOutros: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.loadListEquipaments()
  }


  protected onDescricaoValorChange(descricao: string): void {
    this.valorDescricao = descricao;
    // console.log('Valor de descricao: ',descricao)
  }


  /**
   * API de carregamento dos equipamentos direto da api onde o metodo loadListEquipaments aguarda
   * a lista do servidor.
   */
  private async loadListEquipaments(): Promise<void> {
    this.optionsListaEquipamento = await this.serviceApiReadEquipament.loadListEquipaments();
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

    // const statusInputOutroEquipamento = this.getStatusInputHabilitado;

    console.log('Entrado no metodo ')
    console.log('Segunda linha após ...')


    // if(statusInputOutroEquipamento) {
      /** Sessão Adicionar Outros Equipamentos

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


    **/

      /** Sessão Adicionar nomalmente **/

      // const valorEquipamentoSelecionado = this.getEquipamentoSelect.value;
      // const valorQuantidadeSelecionada = this.getQuantidadeSelect.value;

      /*** [Testado -  ok] ***/
      // const equipEQtdNaoPodemEstarVazios =
      //   this.formEquipamentoValidationService.equipamentoEQuantidadeNaoPodemEstarVazios(
      //     valorEquipamentoSelecionado,
      //     valorQuantidadeSelecionada,
      //     statusInputOutroEquipamento
      // );

      /*** [Testado - ok] ***/
      // const naoPodeAdicionarEquipDuasVezes =
      //     this.formEquipamentoValidationService.naoPodeAddEquip2Vezes(
      //       valorEquipamentoSelecionado,
      //       valorQuantidadeSelecionada,
      //       this.listaEquipamento
      // );

      // const validacaoQuantidadeEmEstoqueAPI = this.validacaoDeQuantidade();

      // if (!equipEQtdNaoPodemEstarVazios || !naoPodeAdicionarEquipDuasVezes || !validacaoQuantidadeEmEstoqueAPI)
      //   return;
      //   this.adicionarLista(this.equipamentoContId++,valorEquipamentoSelecionado, valorQuantidadeSelecionada);
      //   this.formValidation.get('equipamentoSelect')!.reset();
      //   this.formValidation.get('quantidadeSelect')!.reset();
    // }


  }



  /**
   * Método para remover um equipamento pelo botão fechar. É invocado um metodo do modelo de reservas e,
   * realiza a remoção da lista original e da lista de apresentação
   */
  protected removerEquipamento(event: Event): void {
    event.preventDefault();
    this.deletarItem.deletarElemento(event, this.listaEquipamento, this.listaEquipamentoApresentacao)
  }



}
