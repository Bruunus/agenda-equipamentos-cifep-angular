import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { EstoqueInterface } from 'src/app/service/model/interfaces/equipamento/estoque-interface';
import { Deletar } from '../../deletar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InterfaceEquipamento } from 'src/app/model/interface-equipamento';
import { OptionQtdService } from '../../optionQtdService';

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
            <option *ngFor="let item of optionsListaEquipamento" [value]="item.descricao" >
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
          <input type="text" formControlName="equipamentoSelectOutros">
        </td>

        <td>
          <label for="quantidade-outros">Quantidade</label>

          <select #quantidadeValid formControlName="quantidadeSelectOutros" >
            <option name="selectedOptionListaQuantidadeOutros" *ngFor="let qtd of optionQuantidade" [value]="qtd.valor">
              {{ qtd.descricao }}
            </option>
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
                <!-- template -->
                <li id="template-li" class="row"
                *ngFor="let equipamento of listaEquipamento; let i = index" [attr.data-id]="equipamento.id">
                  <td class="col">{{ equipamento.descricao }}</td>
                  <td class="col-6">

                    <div class="row justify-content-between">
                        <span>{{ equipamento.quantidade }}</span>
                        <span (click)="removerEquipamento($event)" class="delete">x</span>
                    </div>
                  </td>
                </li>
                <!-- template -->
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

  // @Input() equipamento: InterfaceEquipamento[] = [{ descricao: '', quantidade: 0}]

  valorDescricao: string = '';
  equipamentoContId: number = 0;
  status_input_habilitado: boolean = false;

  // lista dos equipamentos da api
  optionsListaEquipamento: EstoqueInterface[] = [{id: 0, descricao: '', quantidade: 0}];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];

  listaEquipamentoApresentacao: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
   listaEquipamento: Array<any> = [];    // Tipo any por conta da manipulação do id para ficar de acordo com a regra de negócio
  @Output() listaAtualizada  = new EventEmitter<Array<{ descricao: string; quantidade: number }>>();

  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  objectEquipamentosApresentacao: {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}

  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament, private deletarItem: Deletar,
    private optionQtdService: OptionQtdService
  ) {
    this.formValidation = new FormGroup({
      equipamentoSelect: new FormControl(''),
      quantidadeSelect: new FormControl(''),
      equipamentoSelectOutros: new FormControl({value: '', disabled: true}, Validators.maxLength(40)),
      quantidadeSelectOutros: new FormControl({value: '', disabled: true}),
      habilitaOutros: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.loadListEquipaments()
    this.loadListQuantidade()
    this.onCheckboxOutrosChange()
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
    this.optionsListaEquipamento = await this.serviceApiReadEquipament.getListEquipaments();
  }

  /**
   * Serviço de carregamento da lista de quantidade da option quantidade
   */
  private loadListQuantidade(): Object[]   {
    return this.optionQuantidade = this.optionQtdService.getQuantidade();
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
    console.log(this.equipamentoSelect?.value)

    if(this.statusInputHabilitado) {
      // equipamento outros

      this.adicionarEquipamentoAsListas(this.equipamentoSelectOutros?.value, this.quantidadeSelectOutros?.value);
    } else {
      // fluxo normal
      this.adicionarEquipamentoAsListas(this.equipamentoSelect?.value, this.quantidadeSelect?.value);
    }














    /*
    this.objectEquipamentos = {
        id: this.equipamentoContId,
        descricao: equipamentoEscolhido,
        quantidade: quantidade
      }

       this. objectEquipamentosApresentacao = {
        id: this.equipamentoContId,
        descricao: equipamentoEscolhidoApresentacao,
        quantidade: quantidade
      }


      // this.formatadorDeListaParaApresentacao(this.objectEquipamentosApresentacao)
      this.listaEquipamentoApresentacao.push(this.objectEquipamentosApresentacao);
      this.listaEquipamento.push(this.objectEquipamentos)


      // console.log('Valor adicionado a lista original ', this.listaEquipamento);  //{Debug}\\

      this.formValidation.get('equipamentoSelect')!.reset();
      this.formValidation.get('quantidadeSelect')!.reset();
      this.formValidation.get('outros')!.reset();
    */













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

  private adicionarEquipamentoAsListas(equipamentoSelect: string, quantidadeSelect: string): void {
    this.equipamentoContId++;
    const quantidadeFormatter = parseInt(quantidadeSelect, 10);

    this.objectEquipamentos = {
      id: this.equipamentoContId,
      descricao: equipamentoSelect,
      quantidade: quantidadeFormatter
    }

    this.listaEquipamento.push(this.objectEquipamentos);
    console.log('Lista de equipamentos: ', this.listaEquipamento);
    this.listaAtualizada.emit(this.listaEquipamento);

  }



  /**
   * Método para remover um equipamento pelo botão fechar. É invocado um metodo do modelo de reservas e,
   * realiza a remoção da lista original e da lista de apresentação
   */
  protected removerEquipamento(event: Event): void {
    event.preventDefault();
    this.deletarItem.deletarElemento(event, this.listaEquipamento/*, this.listaEquipamentoApresentacao*/);
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

    const habilitaOutrosControl = this.formValidation.get('equipamentoSelectOutros');
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
        this.statusInputHabilitado = true;
        // console.log('status do input outros ', this.getStatusInputHabilitado)  //{Debug}\\
        return true;
      } else {
        // console.log('desabilitado')  //{Debug}\\
        selectEquipamentos?.enable();
        selectQuantidade?.enable();

        habilitaOutrosControl?.reset();
        habilitaOutrosControl?.disable();
        habilitarSelectOutrosControl?.disable();
        this.statusInputHabilitado = false;
        // console.log('status do input outros ', this.getStatusInputHabilitado)  //{Debug}\\
        return false;
      }
    })

    return false;
  }






  get equipamentoSelect() {
    return this.formValidation.get('equipamentoSelect');
  }

  get quantidadeSelect() {
    return this.formValidation.get('quantidadeSelect');
  }

  get equipamentoSelectOutros() {
    return this.formValidation.get('equipamentoSelectOutros');
  }

  get quantidadeSelectOutros() {
    return this.formValidation.get('quantidadeSelectOutros');
  }

  get statusInputHabilitado(): boolean {
    return this.status_input_habilitado;
  }

  set statusInputHabilitado(status: boolean) {
    this.status_input_habilitado = status;
  }



}
