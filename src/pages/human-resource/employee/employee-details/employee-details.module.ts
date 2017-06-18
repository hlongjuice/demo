import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeDetailsPage } from './employee-details';

@NgModule({
  declarations: [
    EmployeeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeDetailsPage),
  ],
  exports: [
    EmployeeDetailsPage
  ]
})
export class EmployeeDetailsPageModule {}
