import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionTimesPage } from './production-times';

@NgModule({
  declarations: [
    ProductionTimesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionTimesPage),
  ],
  exports: [
    ProductionTimesPage
  ]
})
export class ProductionTimesPageModule {}
