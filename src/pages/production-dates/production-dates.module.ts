import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionDatesPage } from './production-dates';

@NgModule({
  declarations: [
    ProductionDatesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionDatesPage),
  ],
  exports: [
    ProductionDatesPage
  ]
})
export class ProductionDatesPageModule {}
