import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionSchedulePage } from './production-schedule';

@NgModule({
  declarations: [
    ProductionSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionSchedulePage),
  ],
  exports: [
    ProductionSchedulePage
  ]
})
export class ProductionSchedulePageModule {}
