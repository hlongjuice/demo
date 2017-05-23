import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionEmployeesPage } from './production-employees';

@NgModule({
  declarations: [
    ProductionEmployeesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionEmployeesPage),
  ],
  exports: [
    ProductionEmployeesPage
  ]
})
export class ProductionEmployeesPageModule {}
