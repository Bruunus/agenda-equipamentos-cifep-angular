import { FormValidation } from './../../../service/model/formValidation';

import {  Component, OnInit, } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";
import { EquipamentoInterface } from 'src/app/service/model/equipamento-interface';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { OptionQtdService } from 'src/app/service/model/optionQtdService';
import { FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {


  formValidation!: FormGroup;


  // data class
  reservaDTO = {}
  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}


  //Arrays
  //equipamentos = [{}]
  equipamentos: EquipamentoInterface[] = [];
  listaEquipamento: Array<any> = [];
  optionsListaEquipamento: any[] = [];
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];
  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];


  equipamentoContId = 0;
  isEmpty = false;

  // data-biding form













  constructor(
    private horasService: HorasService, private serviceApiReadEquipament: ServiceApiReadEquipament,
    private optionQtdService: OptionQtdService, private formValidationService: FormValidation

    ) {

    }

  ngOnInit(): void {
    this.optionsHours = this.horasService.getHours();
    this.loadListEquipaments()
    this.getListQuantidade()

    this.formValidation = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      sobrenome: new FormControl('',[Validators.required]),
      setor: new FormControl('',[Validators.required]),
      dataRetirada: new FormControl('',[Validators.required]),
      horaInicioSelect: new FormControl('',[Validators.required]),
      dataDevolucao: new FormControl('',[Validators.required]),
      horaDevolucaoSelect: new FormControl('',[Validators.required]),
      equipamentoSelect: new FormControl(''),
      quantidadeSelect: new FormControl('')
    })



  }




  // get datas

  loadListEquipaments(): void {
    this.serviceApiReadEquipament.getListEquipaments()
      .then((lista: any[]) => {
        //  console.log(lista)   //{debug}\\
        this.optionsListaEquipamento = lista;

        // this.optionsListaEquipamento.forEach(data => {   //{debug}\\
        //   console.log(data)
        // })

      })
  }

  getListQuantidade() {
    return this.optionQuantidade = this.optionQtdService.getQuantidade();
  }






  // teste

  onListaEquipamentosEvent(equipamentos: EquipamentoInterface[]): void {
    this.equipamentos = equipamentos;
    console.log('Lista vinda de equipamentos', this.equipamentos)
  }





  adicionarEquipamento(event: Event) {
  event.preventDefault()

  // alert('Evento adicionar equipamentos')  //{Debug}\\


  // console.log(this.equipamentoSelect.value)  quantidadeSelect



  if(this.equipamentoSelect.value === '' || this.equipamentoSelect.value === null) {
    return alert('Selecione um equipamento para reservar')  // future response personality
  } else if(this.quantidadeSelect.value === '' || this.quantidadeSelect.value === null) {
    return alert('Selecione uma quantidade')
  } else {

    this.equipamentoContId++

    const quantidade = parseInt(this.quantidadeSelect.value, 10)

    this.objectEquipamentos = {
      id: this.equipamentoContId,
      descricao: this.equipamentoSelect.value,
      quantidade: quantidade
    }

    this.listaEquipamento.push(this.objectEquipamentos)


    console.log(this.listaEquipamento);  //{Debug}\\

    this.formValidation.get('equipamentoSelect')!.reset();
    this.formValidation.get('quantidadeSelect')!.reset();






  }

/**/










  }



  removerEquipamento(event: Event) {

    // alert('remover item')

    const deletar = (event.target as HTMLElement).classList.contains('delete');

    // console.log('O id foi datectado? ',deletar)   //{debug}\\

    if (deletar) {
      const liElement = (event.target as HTMLElement).closest('li');

      console.log(liElement)

      if (liElement) {

            const idLi = liElement.dataset['id'];   // get id for remove

            if (idLi !== undefined) {
              const id = parseInt(idLi, 10);        // convert this for type number

              this.listaEquipamento.forEach((objectElements, item) => {
                if (objectElements.id === id) {
                    this.listaEquipamento.splice(item, 1);
                }
              })

              console.log(this.listaEquipamento)  //{Debug}\\
            }

        }
    }


  }



  // submit


  processForm() {

    const dataIncio = this.formValidation.get('dataRetirada')?.value;
    const dataFim = this.formValidation.get('dataDevolucao')?.value;
    const horaInicio = this.formValidation.get('horaInicioSelect')?.value;
    const horaFim = this.formValidation.get('horaDevolucaoSelect')?.value;

    if(this.formValidation.invalid) {
    // Prende na validação
     return;

    } else {

      this.formValidationService.validationListEmpty(this.listaEquipamento);
      this.formValidationService.validacaoDataMaiorEMenor(dataFim, dataIncio);
      this.formValidationService.validacaoDataMenorParaDataAtual(dataIncio);


      this.formValidationService.validacaoHoraMaiorEMenor(horaFim, horaInicio, dataIncio, dataFim);
      // if(horaFim < horaInicio) {
      //   alert('Hora devolução menor')
      // }

      // console.log("A lista não está vazia", this.listaEquipamento) //{Debug}\\

      // Retorna o campo dataDevolucao ajustada caso o valor de horas seja inaceitável
      if (this.formValidation.controls.hasOwnProperty('dataDevolucao')) {
        const dataDevolucaoReformada = this.formValidationService.dataFimValidationReturn;
        this.formValidation.controls['dataDevolucao'].setValue(dataDevolucaoReformada);
      }


      this.reservaDTO = {
        setor: this.setor.value,
        responsavel : this.nome.value,  // alterar de responsavel => nome (quando alterar no backend)
        sobrenome: this.sobrenome.value,
        equipamentos: this.getListaEquipamento(),
        agenda: [{
          dataRetirada: this.dataRetirada.value,
          horaRetirada: this.horaInicioSelect.value,
          dataDevolucao: this.dataDevolucao.value,
          horaDevolucao: this.horaDevolucaoSelect.value
        }]
      }


      console.log(this.reservaDTO)

      return
    }










        // Chamada para API

        // console.log('submit: ',this.reservaDTO)  //{Debug}\\
        // console.log('submit: ',this.reservaDTO)  //{Debug}\\

        // try {
        //   this.serviceApiCreateReservation.createEventualReservation(this.reservaDTO)
        //     .then((response) => {
        //       // Lógica para lidar com a resposta do servidor, se necessário
        //       this.formValidation.reset('nome')  // Limpar campos

        //     console.log('Resposta do servidor:', response);
        //     this.router.navigate(['/reservas/redirect']).then(() => {
        //       window.location.reload();
        //     });



        //     })
        // } catch (error) {
        //   // Lógica para lidar com exceções caso ocorram
        //   console.error('Erro ao tentar criar reserva:', error);
        // }



















  }



// getters

getListaEquipamento() {

  this.listaEquipamento.forEach(deleteId => {
    delete deleteId.id;
  })

  return this.listaEquipamento;
}




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

get dataDevolucao() {
  return this.formValidation.get('dataDevolucao')!;
}

get horaDevolucaoSelect() {
  return this.formValidation.get('horaDevolucaoSelect')!;
}

get equipamentoSelect() {
  return this.formValidation.get('equipamentoSelect')!;
}

get quantidadeSelect() {
  return this.formValidation.get('quantidadeSelect')!;
}



}



