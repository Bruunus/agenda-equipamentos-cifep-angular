import { EstoqueInterface } from './../../../service/model/typing-interfaces/estoque-interface';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HorasService } from 'src/app/service/model/horasService';

@Component({
  selector: 'app-multipla',
  templateUrl: './multipla.component.html',
  styleUrls: ['./multipla.component.scss']
})
export class MultiplaComponent implements OnInit {

  //  angular
  formValidation!: FormGroup;

  //  model
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];



  // reservaDTO = {setor: FormControl, nome: FormControl, sobrenome: FormControl, equipamentos: [{}], agenda: [{}]} tipada
  reservaDTO = [{}]



  constructor(private horasService: HorasService) { }

  ngOnInit(): void {
    this.optionsHours = this.horasService.getHoursSegAQuint();


    this.formValidation = new FormGroup({
      nome: new FormControl('Bruno', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      sobrenome: new FormControl('Fernandes',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      setor: new FormControl('Tecnologia',[Validators.required]),
      dataRetirada: new FormControl('', [Validators.required]),
      horaInicioSelect: new FormControl('', [Validators.required])
    });
  }


  // services


  protected processForm(): void {

    this.reservaDTO = [{
      nome: this.nome.value,
      sobrenome: this.sobrenome.value,
      setor: this.setor.value,
      dataRetirada: this.dataRetirada.value,
      horaRetirada: this.horaInicioSelect.value
    }]


    console.log(this.reservaDTO)




  }


  // getters e setters

  get nome() {
    return this.formValidation.get('nome')!;
  }

  get sobrenome() {
    return this.formValidation.get('sobrenome')!;
  }

  get setor() {
    return this.formValidation.get('setor')!;
  }

  get dataRetirada() {
    return this.formValidation.get('dataRetirada')!;
  }

  get horaInicioSelect() {
    return this.formValidation.get('horaInicioSelect')!;
  }

}
