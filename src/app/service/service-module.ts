import { ErroServiceService } from './erro/reservas/erro-service.service';
import { FormEquipamentoValidationService } from './model/formEquipamentoValidationService';
import { ServiceApiRead } from './service-api-read';
import { NgModule } from '@angular/core';
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
import { FormValidation } from './model/formValidation';






@NgModule({
  providers: [
    HorasService, ServiceApiCreateEquipament, ServiceApiDeleteEquipament, ServiceApiReadEquipament, ServiceApiUpdateEquipament,
    ServiceApiCreateReservation, ServiceApiDeleteReservation, ServiceApiReadReservation, ServiceApiUpdateReservation, OptionQtdService,
    FormValidation, ServiceApiRead, FormEquipamentoValidationService, ErroServiceService
  ]
})
export class ServiceModule {}
