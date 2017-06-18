import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionDatePage } from './production-date';

@NgModule({
  declarations: [
    ProductionDatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionDatePage),
  ],
  exports: [
    ProductionDatePage
  ]
})
export class ProductionDatePageModule {}
