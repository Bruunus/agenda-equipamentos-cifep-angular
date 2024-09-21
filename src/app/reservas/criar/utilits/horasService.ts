import * as moment from "moment";

export class HorasService {

  dataAtual: string = '';
  optionsHours: { descricao: string, valor: string }[] = [] as { descricao: string, valor: string }[];

  constructor() {  }


  /**
   *
   * @returns Prenchimento dos selects
   */
  getHoursSegAQuint(): { descricao: string, valor: string }[] {
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
      { descricao: '18:00', valor: '18:00' }  // seg-quinta

    ];
  }

  /**
   *
   * @returns Prenchimento dos selects
   */
  getHoursSexta(): { descricao: string, valor: string }[] {
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
      { descricao: '15:00', valor: '15:00' }

    ];
  }

  // getOptionSelecionado(event: Event): string {
  //   const element = event.target as HTMLSelectElement;
  //   const opcaoSelecionada = element.value;
  //   console.log('opção: ',opcaoSelecionada)
  //   return opcaoSelecionada;
  // }


  /**
   * Serviço de carregamento das options conferindo pelo dia da
   * semana.
   */
  loadOptionsDay(): void {
    const dataAtualMoment = moment(this.dataAtual, 'YYYY-MM-DD');
    const dataAtualMomentValue = dataAtualMoment.format('dddd');

    if(dataAtualMomentValue !== 'Friday') {
      // console.log('Hoje não sexta   {Debug}') //{Debug}\\
      this.optionsHours = this.getHoursSegAQuint();
    } else {
      // console.log('Hoje é sexta   {Debug}') //{Debug}\\
      this.optionsHours = this.getHoursSexta();
    }

  }





}
