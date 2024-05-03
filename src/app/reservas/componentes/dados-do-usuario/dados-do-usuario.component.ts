import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dados-do-usuario',
  templateUrl: './dados-do-usuario.component.html',
  styleUrls: ['./dados-do-usuario.component.scss']
})
export class DadosDoUsuarioComponent implements OnInit {

  @Output() responsavelChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() setorChange: EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }


  getResponsavelChange(event: any): void {
    this.responsavelChange.emit(event.target.value);
  }

  getSetorChange(event: any): void {
    this.setorChange.emit(event.target.value);
  }

}
