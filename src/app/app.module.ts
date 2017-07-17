import { ProductionSettingPage } from './../pages/production/production-setting/production-setting';
import { ProductionEmployeePage } from './../pages/production/production-employee/production-employee';
import { ProductionResultDetailsPage } from './../pages/production/production-result/production-result-details/production-result-details';
import { DateService } from './../services/date.service';
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
import { LoginPage } from "../pages/login/login";

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
import { ProductionActivityService } from "../services/production/activity.service";
import { ProductionShrimpTypeService } from "../services/production/shrimp-type.service";
import { ProductionShrimpSizeService } from "../services/production/shrimp-size.service";
import { ProductionEmployeeService } from "../services/production/employee.service";
import { ProductionWorkService } from "../services/production/work.service";






@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ProductionPage,
    ProductionResultPage,
    ProductionResultDetailsPage,
    ProductionEmployeePage,
    ProductionWorkFormPage,
    ProductionSettingPage,
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
    ProductionResultPage,
    ProductionResultDetailsPage,
    ProductionWorkFormPage,
    ProductionEmployeePage,
    ProductionSettingPage,
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
    UserService,
    AuthService,
    WebUrlService,
    DivisionService,
    DateService,
    /*Production*/
    ProductionActivityService,
    ProductionShrimpTypeService,
    ProductionShrimpSizeService,
    ProductionEmployeeService,
    ProductionWorkService
  ]
})
export class AppModule { }
