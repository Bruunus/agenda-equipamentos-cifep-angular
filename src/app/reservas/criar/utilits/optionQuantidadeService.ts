export class OptionQuantidadeService {


  getQuantidade(): { descricao: string, valor: string }[] {
    return [
      { descricao: '', valor: '' },
      { descricao: '1', valor: '1' },
      { descricao: '2', valor: '2' },
      { descricao: '3', valor: '3' }
    ];
  }

  getOptionQuantidadeSelecionado(event: Event): number {
    const element = event.target as HTMLSelectElement;
    const opcaoSelecionada = element.value;
    // console.log('opção: ', opcaoSelecionada);

    // Faça a conversão para número antes de retornar
    return parseInt(opcaoSelecionada, 10);
  }

}
