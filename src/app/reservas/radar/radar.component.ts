import { Component, OnInit } from '@angular/core';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {

  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament) { }
  listaQuantidade: { [key: string]: number } = {};
  loading: boolean = true;

  ngOnInit(): void {
    this.loadListEquipaments()

    
  }



  /**
   * API de carregamento dos equipamentos. Realizamos um map para mapear dentro do objeto 
   * a quantidade e a descrição para poderem ser renderizadas no ngIf e ngFor
   */
  private loadListEquipaments(): void {
 
    this.serviceApiReadEquipament.getListEquipaments()
      .then((lista: any[]) => {

        if(lista.length === 0) {
          this.loading = true
        } else {
          this.loading = false
          lista.forEach((item) => {
            this.listaQuantidade[item.descricao] = item.quantidade;
          });
        }

        console.log(this.listaQuantidade)
      })
      
      this.loading = true; // Define o status de carregamento como false em caso de erro
     
  }

}
