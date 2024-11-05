import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormularioComponent } from '../utilits/add-formulario/formulario/formulario.component';
import { AdicionarEquipamentoComponent } from '../utilits/add-equipamento/adicionar-equipamento/adicionar-equipamento.component';


@Component({
  selector: 'app-eventual',
  template: `

  <h4>Reserva Eventual</h4>
  <app-formulario #formulario [formulario]="dadosFormulario" (updateFormulario)="atualizarFormulario($event)"></app-formulario>
  <br>
  <app-adicionar-equipamento #equipamento [equipamento]="dadosEquipamento"]></app-adicionar-equipamento>
  <button (click)="formReserva()">Reservar</button>`,


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
  dadosEquipamento = [{ descricao: '', quantidade: 0}]



  atualizarFormulario(dados: any) {
    this.dadosFormulario = dados;
    // Aqui você pode enviar os dados via API, se necessário
    console.log(this.dadosFormulario)
  }

  formReserva() {

    this.formularioComponent.nome?.markAsTouched();
    this.formularioComponent.setor?.markAsTouched();

    // Verificar se o formulário é válido
    if (this.formularioComponent.formValidation.valid) {
      // Lógica para reservar...
      console.log('Formulário válido!');

      // processa os dados
      const formValues = this.formularioComponent.formValidation.value;
      console.log('Dados do formulário:', formValues);

      // Limpar os campos do formulário
      this.formularioComponent.limparCampos();
    } else {
      console.log('Formulário inválido!');
      // Aqui você pode adicionar lógica adicional, como exibir uma mensagem de erro global
    }

  }




}



