import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionTimesAddPage } from './production-times-add';

@NgModule({
  declarations: [
    ProductionTimesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionTimesAddPage),
  ],
  exports: [
    ProductionTimesAddPage
  ]
})
export class ProductionTimesAddPageModule {}
