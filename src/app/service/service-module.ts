import { NgModule } from '@angular/core';
<<<<<<< HEAD



import { ServiceApiDelete } from './service-api-delete';
import { ServiceApiUpdate } from './service-api-update';
import { ServiceApiCreate } from './service-api-create';
import { ServiceApiRead } from './service-api-read';
import { ServiceEquipamentos } from './service-equipamentos';

import { HorasService } from './model/horasService';
import { OptionQuantidadeService } from './model/optionQuantidadeService';

@NgModule({
  providers: [
    HorasService, ServiceEquipamentos, ServiceApiRead, ServiceApiCreate, ServiceApiUpdate,
    ServiceApiDelete, OptionQuantidadeService
  ]
})
export class ServiceModule {}
=======
import { HorasService } from './model/horasService';

import { ServiceApiCreateEquipament } from './api/equipamentos/service-api-create-equipament';
import { ServiceApiDeleteEquipament } from './api/equipamentos/service-api-delete-equipament';
import { ServiceApiReadEquipament } from './api/equipamentos/service-api-read-equipament';
import { ServiceApiUpdateEquipament } from './api/equipamentos/service-api-update-equipament';

import { ServiceApiCreateReservation } from './api/reservas/service-api-create-reservation';
import { ServiceApiDeleteReservation } from './api/reservas/service-api-delete-reservation';
import { ServiceApiReadReservation } from './api/reservas/service-api-read-reservation';
import { ServiceApiUpdateReservation } from './api/reservas/service-api-update-reservation';
import { OptionQtdService } from './model/optionQtdService';


 

@NgModule({
  providers: [
    HorasService, ServiceApiCreateEquipament, ServiceApiDeleteEquipament, ServiceApiReadEquipament, ServiceApiUpdateEquipament,
    ServiceApiCreateReservation, ServiceApiDeleteReservation, ServiceApiReadReservation, ServiceApiUpdateReservation, OptionQtdService
  ]
})
export class ServiceModule {}
>>>>>>> bea3652 (Finalizado spring: Criar reserva eventual completa)
