import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionTimeperiodsPage } from './production-timeperiods';

@NgModule({
  declarations: [
    ProductionTimeperiodsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionTimeperiodsPage),
  ],
  exports: [
    ProductionTimeperiodsPage
  ]
})
export class ProductionTimeperiodsPageModule {}
