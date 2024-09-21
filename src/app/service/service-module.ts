import { ErroServiceService } from './erro/reservas/erro-service.service';
import { FormEquipamentoValidationService } from '../validators/equipamento/formEquipamentoValidationService';
import { NgModule } from '@angular/core';
import { HorasService } from '../reservas/criar/utilits/horasService';

import { ServiceApiCreateEquipament } from './api/equipamentos/service-api-create-equipament';
import { ServiceApiDeleteEquipament } from './api/equipamentos/service-api-delete-equipament';
import { ServiceApiReadEquipament } from './api/equipamentos/service-api-read-equipament';
import { ServiceApiUpdateEquipament } from './api/equipamentos/service-api-update-equipament';

import { ServiceApiCreateReservation } from './api/reservas/service-api-create-reservation';
import { ServiceApiDeleteReservation } from './api/reservas/service-api-delete-reservation';
import { ServiceApiReadReservation } from './api/reservas/service-api-read-reservation';
import { ServiceApiUpdateReservation } from './api/reservas/service-api-update-reservation';
import { OptionQtdService } from '../reservas/criar/utilits/optionQtdService';
import { FormValidationEventual } from '../validators/reserva/form-validation-eventual';
import { DatePipe } from '@angular/common';
import { Deletar } from '../reservas/criar/utilits/deletar';
import { FormValidationMultipla } from '../validators/reserva/form-validation-multipla';






@NgModule({
  providers: [
    HorasService, ServiceApiCreateEquipament, ServiceApiDeleteEquipament, ServiceApiReadEquipament, ServiceApiUpdateEquipament,
    ServiceApiCreateReservation, ServiceApiDeleteReservation, ServiceApiReadReservation, ServiceApiUpdateReservation, OptionQtdService,
    FormValidationEventual, FormEquipamentoValidationService, ErroServiceService, DatePipe, Deletar, FormValidationMultipla
  ]
})
export class ServiceModule {}
