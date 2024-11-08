export class Deletar {


  /**
   * Método para remover um equipamento pelo botão fechar. Remove tanto do DOM
   * quanto da lista
   */
  public deletarElemento(event: Event, listaEquipamento: Array<any>/*, listaEquipamentoApresentacao: Array<any>*/):void {
    // alert('remover item')    //{debug}\\
    const deletar = (event.target as HTMLElement).classList.contains('delete');
    // console.log('Contém algum id? ',deletar)   //{debug}\\

    if (deletar) {
      const liElement = (event.target as HTMLElement).closest('li');
      // console.log(liElement)  //{debug}\\

      if (liElement) {
            const idLi = liElement.dataset['id'];   // get id for remove
            if (idLi !== undefined) {
              const id = parseInt(idLi, 10);        // convert this for type number
              // arrisquei mudar aqui
              listaEquipamento.forEach((objectElements, item) => {
                if (objectElements.id === id) {
                    listaEquipamento.splice(item, 1);
                    // listaEquipamentoApresentacao.splice(item, 1);  // para remoção de lista de apresentação

                }
              })
              // console.log('Lista de equipamento após delete ',listaEquipamento)  //{Debug}\\
              // console.log('Lista de equipamento de apresentação após delete ',listaEquipamentoApresentacao)  //{Debug}\\
              liElement.parentNode?.removeChild(liElement)
              // listaEquipamento.length = 0; // Zera a lista listaEquipamento apenas para //{Debug}\\
              // listaEquipamentoApresentacao.length = 0; // Zera a lista listaEquipamentoApresentacao apenas para //{Debug}\\

              // console.log('tentativa de zerar a lista - resultado => ',listaEquipamento)   //{Debug}\\
              console.log("Status da lista após o delete: ", listaEquipamento)
            }
        }
    }

  }

}
