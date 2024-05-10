import { OptionQuantidadeService } from './../../../service/model/optionQuantidadeService';
import { ServiceEquipamentos } from '../../../service/service-equipamentos';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EquipamentoInterface } from 'src/app/service/model/equipamento-interface';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosComponent implements OnInit {

  // listaDeEquipamentos: any[] = [];
  optionsListaEquipamento: any[] = [];

  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  equipamentoId = 0;
  selectedOptionListaEquipamento: string = '';
  selectedOptionListaQuantidade: string = '';
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];

  // events
  @Output() selectedOptionEquipamentoChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedOptionQuantidadeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() listaEquipamentosEvent: EventEmitter<EquipamentoInterface[]>
      = new EventEmitter<EquipamentoInterface[]>();


    // teste do youtube
    @Output() userEmitter: EventEmitter<any> = new EventEmitter()




  equipamentos: EquipamentoInterface[] = [];


  constructor(
    private services: ServiceEquipamentos, private optionQuantidadeService: OptionQuantidadeService,


  ) { }



  ngOnInit(): void {

    // teste do youtube
    this.userEmitter.emit(this.equipamentos)

    // carregamento dos selects's
    this.getListEquipaments()
    this.getListQuantidade()
  }


  getListQuantidade() {
    return this.optionQuantidade = this.optionQuantidadeService.getQuantidade();
  }

  getListEquipaments() {

    const subscription = this.services.getListEquipaments().subscribe({
      next: (listaDeEquipamentos: any[]) => {

        this.optionsListaEquipamento = listaDeEquipamentos;

        // console.log(this.listaDeEquipamentos)

         this.optionsListaEquipamento.sort((a, b) => {
          const descricaoA = a.descricao.toUpperCase();
          const descricaoB = b.descricao.toUpperCase();
          if (descricaoA < descricaoB) {
            return -1;
          }
          if (descricaoA > descricaoB) {
            return 1;
          }
          return 0;
        });

        subscription.unsubscribe();
      },
      error: (error) => {
        console.error('Erro ao carregar lista de equipamentos', error);
      }
    });

  }





  onOptionQuantidadeChange(event: Event) {
    const quantidadeSelecionada = this.optionQuantidadeService.getOptionQuantidadeSelecionado(event);
    const quantidadeSelecionadaString = quantidadeSelecionada.toString();
    this.selectedOptionQuantidadeChange.emit(quantidadeSelecionadaString);
  }

  onOptionEquipamentoChange(event: any) {
    const selectedValue = event.target.value;
    this.selectedOptionListaEquipamento = selectedValue;
    this.selectedOptionEquipamentoChange.emit(selectedValue);
  }





  adicionarEquipamento(event: Event) {
     event.preventDefault()

    const quantidade = parseInt(this.selectedOptionListaQuantidade, 10)
    this.equipamentoId++;


    this.objectEquipamentos = {
      id: this.equipamentoId,
      descricao: this.selectedOptionListaEquipamento, // faz um getter
      quantidade: quantidade
    }

    this.equipamentos.push(this.objectEquipamentos);

    console.log(this.equipamentos);

  }




  // removerEquipamento(id: number) {

  // }




}
