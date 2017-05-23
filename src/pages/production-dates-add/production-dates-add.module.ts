import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionDatesAddPage } from './production-dates-add';

@NgModule({
  declarations: [
    ProductionDatesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionDatesAddPage),
  ],
  exports: [
    ProductionDatesAddPage
  ]
})
export class ProductionDatesAddPageModule {}
