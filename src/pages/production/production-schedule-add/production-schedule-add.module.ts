import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionScheduleAddPage } from './production-schedule-add';

@NgModule({
  declarations: [
    ProductionScheduleAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionScheduleAddPage),
  ],
  exports: [
    ProductionScheduleAddPage
  ]
})
export class ProductionScheduleAddPageModule {}
