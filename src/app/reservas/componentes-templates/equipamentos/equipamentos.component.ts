import { ServiceEquipamentos } from '../../../service/service-equipamentos';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-equipamentos',
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.scss']
})
export class EquipamentosComponent implements OnInit {

  listaDeEquipamentos: any[] = [];

  @Output() opcaoSelecionadaChange: EventEmitter<string> = new EventEmitter<string>();  //parei aqui

  constructor(private services: ServiceEquipamentos) { }



  ngOnInit(): void {

    this.services.getListEquipaments().subscribe({
      next: (listaDeEquipamentos: any[]) => {

        this.listaDeEquipamentos = [{ id: null, descricao: '' }, ...listaDeEquipamentos];
        console.log(this.listaDeEquipamentos)

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

  }







}
