import { Component, Input, OnInit, ViewChild, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormularioComponent } from '../utilits/add-formulario/formulario/formulario.component';
import { AdicionarEquipamentoComponent } from '../utilits/add-equipamento/adicionar-equipamento/adicionar-equipamento.component';
import { invalid } from 'moment';


@Component({
  selector: 'app-eventual',
  template: `

  <h4>Reserva Eventual</h4>

  <form (ngSubmit)="formReserva()">

    <app-formulario #formulario [formulario]="dadosFormulario" (updateFormulario)="atualizarFormulario($event)"
    [formSubmitted]="formSubmitted"></app-formulario>
    <br>
    <app-adicionar-equipamento #equipamento [equipamento]="dadosEquipamento"></app-adicionar-equipamento>
    <button type="submit">Reservar</button>

  </form>
  `,


  styleUrls: [
    './eventual-large.component.scss',
    './eventual-middle.component.scss',
    './eventual-small.component.scss'
  ]
})
export class EventualComponent  {

  formValidation!: FormGroup;
  subscription: Subscription = Subscription.EMPTY;

  @ViewChild('formulario') formularioComponent!: FormularioComponent;
  @ViewChild('equipamento') adicionarEquipamentoComponent!: AdicionarEquipamentoComponent;


  dadosFormulario = { nome: '', matricula: '', setor: '', contato: '' };
  dadosEquipamento = [{ descricao: '', quantidade: 0 }]

  @Input() formSubmitted: boolean = false;



  atualizarFormulario(dados: any) {
    this.dadosFormulario = dados;
    // Aqui você pode enviar os dados via API, se necessário
    console.log(this.dadosFormulario)
  }

  formReserva() {

    this.formSubmitted = true;


    // Verificar se o formulário é válido
    if (this.validateForm()) {

      console.log('Formulário válido!');

      // processa os dados
      const formValues = this.formularioComponent.formValidation.value;
      console.log('Dados do formulário:', formValues);

      // Limpar os campos do formulário
      this.formularioComponent.limparCampos();
      this.formSubmitted = false;
    } else {
      console.log('Formulário inválido!');
      this.formSubmitted = false;
      // this.formularioComponent.matricula?.markAsTouched();
      // this.formularioComponent.setor?.markAllAsTouched();
    }

  }


  /**
   * Validação dos inputs do formulário do template filho formulário.
   */
  private validateForm(): boolean {

    let valido = true;

    if (this.formularioComponent.nome?.invalid) {
      this.formularioComponent.nome?.markAsTouched();
      valido = false; // Marca como inválido

    }


    if (this.formularioComponent.matricula?.invalid) {
      this.formularioComponent.matricula?.markAsTouched();
      valido = false; // Marca como inválido

    }

    if(this.formularioComponent.setor?.invalid) {
      this.formularioComponent.setor?.markAllAsTouched();
      valido = false;
    }


    return valido;





  }





}



