import { Injectable } from "@angular/core";

@Injectable()
export class Utilits {

  /**
   *
   */
  private formatacaoDeTextoApresentacaoOutros(texto: string): string {
    // console.log('Entrado na formatação do campo com o valor passado: ',texto)
    texto = texto.replace(/_/g, ' ');   // Substituir underscores por espaços
    var palavras = texto.split(' ');
    var textoFormatado = palavras.map((palavra) => {
        if (palavra.length === 0) {
            return '';
        }
        var primeiraLetra = palavra.charAt(0).toUpperCase();
        var demaisLetras = palavra.slice(1).toLowerCase();
        return primeiraLetra + demaisLetras;
    });

    var textoFinal = textoFormatado.join(' ');
    // console.log('Resultado: ', textoFinal);

    return textoFinal;
  }




}
