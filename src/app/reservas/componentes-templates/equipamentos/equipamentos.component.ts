import { OptionQuantidadeService } from './../../../service/model/optionQuantidadeService';
import { ServiceEquipamentos } from '../../../service/service-equipamentos';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosComponent implements OnInit {

  listaDeEquipamentos: any[] = [];
  optionsListaEquipamento: any[] = [];
  equipamentos = [] = [{}];
  objectEquipamentos : {id: number, descricao: string, quantidade: number } = {id:0, descricao:'', quantidade:0}
  equipamentoId = 0;
  selectedOptionListaEquipamento: string = '';
  selectedOptionListaQuantidade: string = '';
  optionQuantidade: { descricao: string, valor: string } [] = [] as { descricao: string, valor: string }[];

  // events
  @Output() selectedOptionEquipamentoChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedOptionQuantidadeChange: EventEmitter<string> = new EventEmitter<string>();



  constructor(private services: ServiceEquipamentos, private optionQuantidadeService: OptionQuantidadeService) { }



  ngOnInit(): void {

    this.services.getListEquipaments().subscribe({
      next: (listaDeEquipamentos: any[]) => {

        this.listaDeEquipamentos = [{ id: null, descricao: '' }, ...listaDeEquipamentos];
        // console.log(this.listaDeEquipamentos)

         this.listaDeEquipamentos.sort((a, b) => {
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
      },
      error: (error) => {
        console.error('Erro ao carregar lista de equipamentos', error);
      }
    });

    // this.getListEquipaments()
    this.optionQuantidade = this.optionQuantidadeService.getQuantidade();
    this.getListEquipaments()

  }



  getListEquipaments() {
    this.services.getListEquipaments().subscribe((response) => {
      this.optionsListaEquipamento = response
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


  // onOptionChange(event: Event) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   this.selectedOptionListaEquipamento = selectedValue;
  //   this.selectedOptionEquipamentoChange.emit(selectedValue);
  // }


  adicionarEquipamento() {

    this.equipamentoId++;


    this.objectEquipamentos = {
      id: this.equipamentoId,
      descricao: this.selectedOptionListaEquipamento, // faz um getter
      quantidade: 1    // ERRO: Preciesa fazer a conversão  this.selectedOptionListaQuantidade
    }

    this.equipamentos.push(this.objectEquipamentos);


    console.log(this.equipamentos)



  }





}
