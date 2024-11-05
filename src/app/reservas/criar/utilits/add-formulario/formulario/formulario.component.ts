import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { InterfaceFormulario } from 'src/app/model/formulario';


@Component({
  selector: 'app-formulario',
  template: `
    <form [formGroup]="formValidation">
      <label for="responsavel">Nome</label> &nbsp;
      <input type="text" name="nome" formControlName="nome" required maxlength="40">
      <div *ngIf="nome?.invalid && (nome?.touched || nome?.dirty)" class="validation-error">
        <p *ngIf="nome?.errors?.['required']" style="font-size: 0.8rem; color: tomato;">
          Nome obrigatório
        </p>
        <p *ngIf="nome?.errors?.['minlength']" style="font-size: 0.8rem; color: tomato;">
          Descrição de nome inválido
        </p>
        <!-- <p *ngIf="nome?.errors?.['maxlength']">Até 40 caracteres</p> -->
      </div>
      <br>
      <label for="setor">Matrícula</label> &nbsp;
      <input type="text" name="matricula" formControlName="matricula" required maxlength="9">
      <div *ngIf="matricula?.invalid && (matricula?.touched || matricula?.dirty)" class="validation-error">
        <p *ngIf="matricula?.errors?.['required']" style="font-size: 0.8rem; color: tomato;">
          Insira a matricula obrigatório
        </p>
        <!-- <p *ngIf="setor?.errors?.['maxlength']">Até 40 caracteres</p> -->
      </div>
      <br>
      <label for="setor">Setor</label> &nbsp;
      <input type="text" name="setor" formControlName="setor" required maxlength="40">
      <div *ngIf="setor?.invalid && (setor?.touched || setor?.dirty)" class="validation-error">
        <p *ngIf="setor?.errors?.['required']" style="font-size: 0.8rem; color: tomato;">
          Setor obrigatório
        </p>
        <!-- <p *ngIf="setor?.errors?.['maxlength']">Até 40 caracteres</p> -->
      </div>
      <br>
      <label for="setor">Contato</label> &nbsp;
      <input type="text" name="contato" formControlName="contato" required maxlength="40" placeholder="Telefone ou ramal">
      <div *ngIf="contato?.invalid && (contato?.touched || contato?.dirty)" class="validation-error">
        <p *ngIf="contato?.errors?.['required']" style="font-size: 0.8rem; color: tomato;">
          Insira um telefone ou ramal
        </p>
        <!-- <p *ngIf="setor?.errors?.['maxlength']">Até 40 caracteres</p> -->
      </div>
    </form>

  `,
})
export class FormularioComponent implements OnInit {
  formValidation: FormGroup;
  subscription!: Subscription;

  @Input() formulario: InterfaceFormulario = { nome: '', matricula: '', setor: '', contato: '' };
  @Output() updateFormulario = new EventEmitter<any>();

  constructor() {
    this.formValidation = new FormGroup({
      nome: new FormControl('Bruno Fernandes', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      matricula: new FormControl('', [
        Validators.required,
        Validators.maxLength(9)
      ]),
      setor: new FormControl('TI', [
        Validators.required
      ]),
      contato: new FormControl('', [
        Validators.required
      ])
    });
  }

  limparCampos() {
    this.formValidation.reset(); // Limpa todos os campos do formulário
  }

  ngOnInit(): void {
    this.formValidation.patchValue(this.formulario);
  }

  ngOnChanges() {
    this.formValidation.patchValue(this.formulario);
  }

  get nome() {
    return this.formValidation.get('nome');
  }

  get matricula() {
    return this.formValidation.get('matricula');
  }

  get setor() {
    return this.formValidation.get('setor');
  }

  get contato() {
    return this.formValidation.get('contato');
  }



}
