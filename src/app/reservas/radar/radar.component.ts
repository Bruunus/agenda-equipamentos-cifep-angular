import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceApiReadEquipament } from 'src/app/service/api/equipamentos/service-api-read-equipament';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit, OnDestroy  {

  constructor(private serviceApiReadEquipament: ServiceApiReadEquipament) { }
  listaQuantidade: { [key: string]: number } = {};
  loading: boolean = true;
  subscription: Subscription | null = null;

  ngOnInit(): void {
    this.loadListEquipaments()


  }



  /**
   * API de carregamento dos equipamentos. Realizamos um map para mapear dentro do objeto
   * a quantidade e a descrição para poderem ser renderizadas no ngIf e ngFor
   */
  private loadListEquipaments(): void {

    this.subscription = this.serviceApiReadEquipament.getListEquipamentsPoll().subscribe(data => {
      this.loading = false
      this.listaQuantidade = data; // Cast to the correct type



      console.log('Dados do estoque atualizados:', this.listaQuantidade);
    });

    // this.serviceApiReadEquipament.getListEquipamentsPoll()
    //   .then((lista: any[]) => {

    //     if(lista.length === 0) {
    //       this.loading = true
    //     } else {
    //       this.loading = false
    //       lista.forEach((item) => {
    //         this.listaQuantidade[item.valor] = item.quantidade;
    //       });
    //     }

    //     console.log(this.listaQuantidade)
    //   })

    //   this.loading = true; // Define o status de carregamento como false em caso de erro

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
