export class HorasService {

  constructor() {  }


  getHours(): { descricao: string, valor: string }[] {
    return [
      { descricao: '-- select --', valor: '' },
      { descricao: '07:00', valor: '07:00' },
      { descricao: '08:00', valor: '08:00' },
      { descricao: '09:00', valor: '09:00' },
      { descricao: '10:00', valor: '10:00' },
      { descricao: '11:00', valor: '11:00' },
      { descricao: '12:00', valor: '12:00' },
      { descricao: '13:00', valor: '13:00' },
      { descricao: '14:00', valor: '14:00' },
      { descricao: '15:00', valor: '15:00' },
      { descricao: '16:00', valor: '16:00' },
      { descricao: '17:00', valor: '17:00' },
      { descricao: '18:00', valor: '18:00' },
      { descricao: '19:00', valor: '19:00' },
      { descricao: '20:00', valor: '20:00' },
      { descricao: '21:00', valor: '21:00' },
      { descricao: '22:00', valor: '22:00' }

    ];
  }

  getOptionSelecionado(event: Event): string {
    const element = event.target as HTMLSelectElement;
    const opcaoSelecionada = element.value;
    console.log('opção: ',opcaoSelecionada)
    return opcaoSelecionada;
  }


  getValidationData(dataInicio:string, dataFim:string): boolean {

    // verifique se para comparar Datas pode ser em string, do contrário faça o parse para number


    return true;
  }


  getValidationHours(horaInicio:string, horaFim:string): boolean {
    return true;
  }



}
