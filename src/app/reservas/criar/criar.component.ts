import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss']
})
export class CriarComponent implements OnInit {


  reservaDTO: any = {
    setor : '',
    responsavel : ''

  }


  constructor() {}
  ngOnInit(): void {}


  processForm() {
    

     if (false) {
      
      this.reservaYearly(this.reservaDTO)

     } else if(false) {

      this.reserveRecurrent(this.reservaDTO)
      
     } else {

      this.reserveEventual(this.reservaDTO)

     }

    

  }

  // metodos para processar as 3 reservas

  private reserveEventual(reservaDTO: any[]) : void {  }

  private reserveRecurrent(reservaDTO: any[]) : void {}

  private reservaYearly(reservaDTO: any[]) : void {}

  listeningMulipleReservationButton() {
    alert('Botão Multiplas')
  }



}
