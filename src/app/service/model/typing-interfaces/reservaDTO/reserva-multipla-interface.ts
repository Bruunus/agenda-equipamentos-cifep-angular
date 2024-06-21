import { FormControl } from "@angular/forms";

export interface ReservaMultipĺaInterface {

  nome: FormControl;
  sobrenome: FormControl;
  setor: FormControl;
  agenda: [{}]

}
