import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionResultsPage } from './production-results';

@NgModule({
  declarations: [
    ProductionResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionResultsPage),
  ],
  exports: [
    ProductionResultsPage
  ]
})
export class ProductionResultsPageModule {}
