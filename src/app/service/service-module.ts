import { NgModule } from '@angular/core';



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
