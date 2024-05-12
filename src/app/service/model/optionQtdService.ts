export class OptionQtdService {


    getQuantidade(): { descricao: string, valor: string }[] {
      return [
        { descricao: '', valor: '' },
        { descricao: '1', valor: '1' },
        { descricao: '2', valor: '2' },
        { descricao: '3', valor: '3' }
      ];
    }
  
    /**
     * O evento procura o option selecionado, captura o elemento e
     * retorna convertendo para number para que possa ser integrado
     * ao JSON corretamente
     * @param event 
     * @returns 
     */
    getOptionQuantidadeSelecionado(event: Event): number {
      const element = event.target as HTMLSelectElement;
      const opcaoSelecionada = element.value;
      // console.log('opção: ', opcaoSelecionada);  //{Debug}\\
  
      // Faça a conversão para número antes de retornar
      return parseInt(opcaoSelecionada, 10);
    }
  
  }