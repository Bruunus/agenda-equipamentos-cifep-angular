import { ErrorObject } from './error-object';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErroServiceService {

  er0001: string = 'EstoqueInsuficienteException (code: er0001)';

  constructor() { }

  // Error code: er0001
  estoqueInsuficienteException(error: ErrorObject): void {
    if(error.status === 500 && error.error.trace.includes('EstoqueInsuficienteException')) {
      const msn: string = `Erro: ${this.er0001} - Quantidade em estoque insuficiente para o(s) equipamento(s) selecionados. `+
      'Favor atualizar o estoque, verifique o radar de equipamentos e tente novamente.'
      console.error(msn)
    }
  }
}
