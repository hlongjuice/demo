import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { ImagePicker } from '@ionic-native/image-picker';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// tslint:disable-next-line:no-unused-variable
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductionPage } from "../pages/production/production";

import { UserPage } from "../pages/user/user";
import { ProductionScheduleAddPage } from "../pages/production/production-schedule-add/production-schedule-add";
import { ProductionTimeperiodsPage } from "../pages/production/production-timeperiods/production-timeperiods";
import { ProductionEmPerformancePage } from "../pages/production/production-em-performance/production-em-performance";
import { LoginPage } from "../pages/login/login";
import { ProductionDatePage } from "../pages/production/production-date/production-date";

import { EmployeeService } from "../services/employee.service";
import { ProductionScheduleService } from "../services/production-schedule.service";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { ProductionService } from "../services/production.service";
import { WebUrlService } from "../services/weburl.service";
import { EmployeePage } from "../pages/human-resource/employee/employee";
import { EmployeeAddPage } from "../pages/human-resource/employee/employee-add/employee-add";
import { EmployeeDetailsPage } from "../pages/human-resource/employee/employee-details/employee-details";
import { DivisionPage } from "../pages/human-resource/division/division";
import { DivisionAddPage } from "../pages/human-resource/division/division-add/division-add";
import { DivisionEditPage } from "../pages/human-resource/division/division-edit/division-edit";
import { HumanResourcePage } from "../pages/human-resource/human-resource";
import { DivisionService } from "../services/division.service";
import { ErrorPage } from "../pages/error/error";
import { ProductionResultPage } from "../pages/production/production-result/production-result";
import { ProductionWorkFormPage } from "../pages/production/production-work-form/production-work-form";






@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ProductionPage,
    ProductionScheduleAddPage,
    ProductionTimeperiodsPage,
    ProductionEmPerformancePage,
    ProductionDatePage,
    ProductionResultPage,
    ProductionWorkFormPage,
    UserPage,
    EmployeePage,
    EmployeeAddPage,
    EmployeeDetailsPage,
    DivisionPage,
    DivisionAddPage,
    DivisionEditPage,
    HumanResourcePage,
    ErrorPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
      {
        name: '__mydb',
        // driverOrder:['indexeddb']
        //  driverOrder: ['indexeddb']
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProductionPage,
    ProductionScheduleAddPage,
    ProductionTimeperiodsPage,
    ProductionDatePage,
    ProductionEmPerformancePage,
    ProductionResultPage,
    ProductionWorkFormPage,
    UserPage,
    EmployeePage,
    EmployeeAddPage,
    EmployeeDetailsPage,
    DivisionPage,
    DivisionAddPage,
    DivisionEditPage,
    HumanResourcePage,
    ErrorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    Transfer,
    TransferObject,
    FileChooser,
    FilePath,
    ImagePicker,

    /*Service*/
    EmployeeService,
    ProductionScheduleService,
    UserService,
    AuthService,
    ProductionService,
    WebUrlService,
    DivisionService
  ]
})
export class AppModule { }
