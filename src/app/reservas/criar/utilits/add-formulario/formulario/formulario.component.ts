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

      <div *ngIf="nome?.invalid && (formSubmitted || nome?.touched)" class="validation-error">
        <ng-container *ngIf="nome?.errors?.['required']">
          <p style="font-size: 0.8rem; color: tomato;">
            Nome obrigatório
          </p>
        </ng-container>
        <ng-container *ngIf="nome?.errors?.['minlength']">
          <p style="font-size: 0.8rem; color: tomato;">
            Descrição de nome inválido
          </p>
        </ng-container>
      </div>

      <br>

      <label for="setor">Matrícula</label> &nbsp;
      <input type="number" name="matricula" formControlName="matricula" required maxlength="9">

      <div *ngIf="matricula?.invalid && (formSubmitted || matricula?.touched)" class="validation-error">
        <ng-container *ngIf="matricula?.errors?.['required']; else minlengthError">
          <p style="font-size: 0.8rem; color: tomato;">
            Insira a matricula obrigatório
          </p>
        </ng-container>
        <ng-template #minlengthError>
          <p *ngIf="matricula?.errors?.['minlength']" style="font-size: 0.8rem; color: tomato;">
            Formato de matrícula invalidos, quantidade de digitos não aceito
          </p>
        </ng-template>
      </div>

      <br>

      <label for="setor">Setor</label> &nbsp;
      <input type="text" name="setor" formControlName="setor" required maxlength="40">

      <div *ngIf="setor?.invalid && (formSubmitted || setor?.touched)" class="validation-error">

          <p *ngIf="setor?.errors?.['required']" style="font-size: 0.8rem; color: tomato;">
            Setor obrigatório
          </p>


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
  @Input() formSubmitted: boolean = false;
  @Output() updateFormulario = new EventEmitter<any>();

  constructor() {
    this.formValidation = new FormGroup({
      nome: new FormControl('Bruno Fernandes', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      matricula: new FormControl('1032556', [
        Validators.required,
        Validators.minLength(5)
      ]),
      setor: new FormControl('TI', [
        Validators.required
      ]),
      contato: new FormControl('6238', [
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
