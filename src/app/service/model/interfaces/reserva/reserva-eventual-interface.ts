import { FormControl } from "@angular/forms";
import { EquipamentoInterface } from "../equipamento/equipamento-interface";

export interface ReservaEventualInterface {
  setor: FormControl,
  nome: FormControl,
  equipamentos: Array<any>[],
  agenda: [{
    dataRetirada: FormControl,
    horaRetirada: FormControl,
    dataDevolucao: FormControl,
    horaDevolucao: FormControl
  }]
}
