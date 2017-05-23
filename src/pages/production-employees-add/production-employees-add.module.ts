import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionEmployeesAddPage } from './production-employees-add';

@NgModule({
  declarations: [
    ProductionEmployeesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionEmployeesAddPage),
  ],
  exports: [
    ProductionEmployeesAddPage
  ]
})
export class ProductionEmployeesAddPageModule {}
