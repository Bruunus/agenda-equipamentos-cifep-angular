import { Router } from '@angular/router';
import { ServiceApiCreateReservation } from './../../../service/api/reservas/service-api-create-reservation';
import { FormValidation } from './../../../service/model/formValidation';

import {  Component, OnInit, } from '@angular/core';
import { HorasService } from "../../../service/model/horasService";
import { EquipamentoInterface } from 'src/app/service/model/equipamento-interface';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';
import { OptionQtdService } from 'src/app/service/model/optionQtdService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-eventual',
  templateUrl: './eventual.component.html',
  styleUrls: ['./eventual.component.scss']
})
export class EventualComponent implements OnInit {

  // Angular services
  formValidation!: FormGroup;
  subscription: Subscription = Subscription.EMPTY;


  // objects
  reservaDTO = {}
  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];
  options: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];

  // lists
  equipamentos: EquipamentoInterface[] = [];
  listaEquipamento: Array<any> = [];
  optionsListaEquipamento: any[] = [];
  listaEquipamentoQuantidade: any[] = [];

  // vars
  equipamentoContId = 0;
  isEmpty = false;
  dataAtual: string = ''
  status_connetion: boolean = true;
  interval: any;



  constructor(private horasService: HorasService, private serviceApiReadEquipament: ServiceApiReadEquipament,
    private optionQtdService: OptionQtdService, private formValidationService: FormValidation,
    private serviceApiCreateReservation: ServiceApiCreateReservation, private router: Router
  ) { this.dataAtual = moment().format('YYYY-MM-DD') }


  ngOnInit(): void {

    this.loadOptionsDay()
    this.loadListEquipaments()
    this.getListQuantidade()
    this.validacaoDeQuantidade()


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

    // events
    this.onInputValueDataDevolucao()
    this.onDataInicioChange()
    this.onDataDevolucaoChange()



  }







  /**
   * Serviço de carregamento das options conferindo pelo dia da
   * semana.
   */
  private loadOptionsDay(): void {
    const dataAtualMoment = moment(this.dataAtual, 'YYYY-MM-DD');
    const dataAtualMomentValue = dataAtualMoment.format('dddd');

    if(dataAtualMomentValue !== 'Friday') {
      // console.log('Hoje não sexta   {Debug}') //{Debug}\\
      this.optionsHours = this.horasService.getHoursSegAQuint();
    } else {
      // console.log('Hoje é sexta   {Debug}') //{Debug}\\
      this.optionsHours = this.horasService.getHoursSexta();
    }

  }

  /**
   * API de carregamento dos equipamentos
   */
  private loadListEquipaments(): void {
    this.serviceApiReadEquipament.getListEquipaments()
      .then((lista: any[]) => {
        //  console.log(lista)   //{debug}\\
        this.optionsListaEquipamento = lista;
      })
  }


  /**
   * Serviço de carregamento da lista de quantidade da option quantidade
   */
  private getListQuantidade(): Object[]   {
    return this.optionQuantidade = this.optionQtdService.getQuantidade();
  }























  private validacaoDeQuantidade(): boolean {

    this.interval = setInterval(() => {
      this.status_connetion = this.serviceApiReadEquipament.getListaDeEquipamentosPoll;    
      if (this.status_connetion) {

        console.log('status ', this.status_connetion, '(true)')   //{Debug}\\

      } else {
        console.log('status ', this.status_connetion, '(false)')   //{Debug}\\
        
      }
    },2000)
 
    this.subscription = this.serviceApiReadEquipament.getListEquipamentsPoll()
      .subscribe(
        (lista: any[]) => {

          this.listaEquipamentoQuantidade = lista

          this.listaEquipamentoQuantidade.forEach(find => {
            // para cada item procure o item selecionado de equipamentos
            // quando encontrar puxe a quantidade 
            // se a quantidade for menor que a quantidade solicitada no formulário então 
              // apresenta o erro "Equipamento indisponível em estoque"
              
          })




          console.log('Recebendo lista de equipamentos ', this.listaEquipamentoQuantidade)
          return true

        })

        return false

   

    
  }





















  // events

  protected onListaEquipamentosEvent(equipamentos: EquipamentoInterface[]): void {
    this.equipamentos = equipamentos;
    console.log('Lista vinda de equipamentos', this.equipamentos)
  }

  private onInputValueDataDevolucao(): void {
    this.formValidation.controls['dataRetirada'].valueChanges.subscribe((value) => {
      if (value) {
        this.formValidation.controls['dataDevolucao'].patchValue(value);
      }
    });
  }

  private onDataInicioChange(): void {
    this.formValidation.get('dataRetirada')?.valueChanges.subscribe((value) => {
      const isSexta = this.formValidationService.programacaoDeHorasParaSextaFeiraDataInicio(value);
      if (isSexta) {
        this.optionsHours = this.horasService.getHoursSexta()
      } else {
        this.optionsHours = this.horasService.getHoursSegAQuint()
      }
    })

  }

  private onDataDevolucaoChange(): void {
    this.formValidation.get('dataDevolucao')?.valueChanges.subscribe((value) => {
      const isSexta = this.formValidationService.programacaoDeHorasParaSextaFeiraDataFim(value);
      if (isSexta) {
        this.optionsHours = this.horasService.getHoursSexta()
      } else {
        this.optionsHours = this.horasService.getHoursSegAQuint()
      }
    })
  }



  /**
   * Funcionalidade para adicionar um equipamento à lista de agendamento que será
   * salva do submit do formulário
   */
  protected adicionarEquipamento(event: Event) {

    event.preventDefault()
    let equipamentoIgual = false;
    let getDescricao = this.equipamentoSelect.value;

    for (const equipamento of this.listaEquipamento) {
      if (equipamento.descricao === getDescricao) {
          equipamentoIgual = true;
          break;
      }
    }


    // VALIDAÇÃO DE QUANTIDADE COM O ESTOQUE
    this.validacaoDeQuantidade()






















     

    if (equipamentoIgual) {
      alert('Este equipamento já foi adicionado.')
    } else {
      // alert('Evento adicionar equipamentos')  //{Debug}\\

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
    }




  }


  /**
   * Método para removar um equipamento pelo botão fechar. Remove tanto do DOM
   * quanto da lista
   */
  protected removerEquipamento(event: Event) {

    // alert('remover item')    //{debug}\\
    const deletar = (event.target as HTMLElement).classList.contains('delete');
    // console.log('O id foi datectado? ',deletar)   //{debug}\\

    if (deletar) {
      const liElement = (event.target as HTMLElement).closest('li');
      console.log(liElement)  //{debug}\\

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



  /**
   * Método final para salvar a reserva
   */
  protected processForm() {

    const dataIncio = this.formValidation.get('dataRetirada')?.value;
    const dataFim = this.formValidation.get('dataDevolucao')?.value;
    const horaInicio = this.formValidation.get('horaInicioSelect')?.value;
    const horaFim = this.formValidation.get('horaDevolucaoSelect')?.value;

    if(this.formValidation.invalid) {
    // Prende na validação
     return;

    } else {

      const validation = this.formValidationService
        .validacaoHoraMaiorEMenor(horaFim, horaInicio, dataIncio, dataFim, this.listaEquipamento);
      // console.log("A lista não está vazia", this.listaEquipamento) //{Debug}\\

      // Retorna o campo dataDevolucao ajustada caso o valor de horas seja inaceitável
      if (this.formValidation.controls.hasOwnProperty('dataDevolucao')) {
        let dataDevolucaoReformada = this.formValidationService.dataFimValidationReturn;
        this.formValidation.controls['dataDevolucao'].setValue(dataDevolucaoReformada);
      }

      if(validation) {

        this.reservaDTO = {
          setor: this.setor.value,
          nome: this.nome.value,
          sobrenome: this.sobrenome.value,
          equipamentos: this.getListaEquipamentoDelete(),
          agenda: [{
            dataRetirada: this.dataRetirada.value,
            horaRetirada: this.horaInicioSelect.value,
            dataDevolucao: this.dataDevolucao.value,
            horaDevolucao: this.horaDevolucaoSelect.value
          }]

        }

        console.log(this.reservaDTO)


        try {
          this.serviceApiCreateReservation.createEventualReservation(this.reservaDTO)
            .then((response) => {
              // Lógica para lidar com a resposta do servidor, se necessário
            this.formValidation.reset('nome')  // Limpar campos
            this.formValidation.reset('sobrenome')
            this.formValidation.reset('setor')
            this.formValidation.reset('dataRetirada')
            this.formValidation.reset('horaInicioSelect')
            this.formValidation.reset('dataDevolucao')
            this.formValidation.reset('horaDevolucaoSelect')
            this.formValidation.reset('equipamentoSelect')
            this.formValidation.reset('quantidadeSelect')

            console.log('Resposta do servidor:', response);
            this.router.navigate(['reservas/redirect']).then(() => {
              window.location.reload();
            });



            })
        } catch (error) {
          // Lógica para lidar com exceções caso ocorram
          console.error('Erro ao tentar criar reserva:', error);
        }

        console.log('Reserva realizada com sucesso !!!')
        console.log(this.reservaDTO)

      } else {
        console.error('Falha na validação dos métodos')
        return
      }

      return
    }
  
  }








  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.interval) {
      clearInterval(this.interval);
    }
    
  }



// getters

getListaEquipamentoDelete() {



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



