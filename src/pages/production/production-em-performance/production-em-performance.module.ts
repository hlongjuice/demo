import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductionEmPerformancePage } from './production-em-performance';

@NgModule({
  declarations: [
    ProductionEmPerformancePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductionEmPerformancePage),
  ],
  exports: [
    ProductionEmPerformancePage
  ]
})
export class ProductionEmPerformancePageModule {}
