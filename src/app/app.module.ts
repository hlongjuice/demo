import { QcRecorderResultPage } from './../pages/qc/qc-recorder-result/qc-recorder-result';
import { QcShrimpResultService } from './../services/qc/shrimp_result.service';

import { QcRecorderListPage } from './../pages/qc/qc-shrimp-recorder/qc-recorder-list/qc-recorder-list';
import { QcRecorderDetailsPage } from './../pages/qc/qc-shrimp-recorder/qc-recorder-details/qc-recorder-details';
import { QcAddReceivingPage } from './../pages/qc/qc-shrimp-recorder/qc-add-receiving/qc-add-receiving';
import { SupplierService } from './../services/supplier.service';
import { QcShrimpRecorderPage } from './../pages/qc/qc-shrimp-recorder/qc-shrimp-recorder';
import { QcShrimpReceivingService } from './../services/qc/shrimp_receiving.service';
import { CarUsagePage } from './../pages/human-resource/car/car-usage/car-usage';
import { CarUsageService } from './../services/human-resource/car/car-usage.service';
import { RankService } from './../services/rank.service';
import { CarResponseHistoryPage } from './../pages/human-resource/car/car-response-history/car-response-history';
import { CarAccessService } from './../services/human-resource/car/car-access.service';
import { CarAccessControlPage } from './../pages/human-resource/car/car-access-control/car-access-control';
import { CarDriverService } from './../services/human-resource/car/car-driver.service';
import { NextPageService } from './../services/next-page.service';
import { CarResponseService } from './../services/human-resource/car/car-response.service';
import { CarManageService } from './../services/human-resource/car/car-manage.service';
import { CarResponsePage } from './../pages/human-resource/car/car-response/car-response';
import { CarRequestPage } from './../pages/human-resource/car/car-request/car-request';
import { CarManagePage } from './../pages/human-resource/car/car-manage/car-manage';
import { DepartmentService } from './../services/department.service';
import { PopupDivisionDepartmentPage } from './../pages/human-resource/employee/popup-division-department/popup-division-department';
import { EmployeeEditPage } from './../pages/human-resource/employee/employee-edit/employee-edit';
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
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
import { DivisionPage } from "../pages/human-resource/division/division";
import { DivisionAddPage } from "../pages/human-resource/division/division-add/division-add";
import { DivisionEditPage } from "../pages/human-resource/division/division-edit/division-edit";
import { HumanResourcePage } from "../pages/human-resource/human-resource";
import { DivisionService } from "../services/division.service";
import { ProductionResultPage } from "../pages/production/production-result/production-result";
import { ProductionWorkFormPage } from "../pages/production/production-work-form/production-work-form";
import { ProductionActivityService } from "../services/production/activity.service";
import { ProductionShrimpTypeService } from "../services/production/shrimp-type.service";
import { ProductionShrimpSizeService } from "../services/production/shrimp-size.service";
import { ProductionEmployeeService } from "../services/production/employee.service";
import { ProductionWorkService } from "../services/production/work.service";
import { CarRequestService } from "../services/human-resource/car/car-request.service";
import { QcSupplierPage } from "../pages/qc/qc-supplier/qc-supplier";







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
    /*Human Resource*/
    EmployeePage,
    EmployeeEditPage,
    PopupDivisionDepartmentPage,
    DivisionPage,
    DivisionAddPage,
    DivisionEditPage,
    HumanResourcePage,
    CarManagePage,
    CarRequestPage,
    CarResponsePage,
    CarResponseHistoryPage,
    CarAccessControlPage,
    CarUsagePage,
    /*End Human Resource*/
    /* QC */
    QcShrimpRecorderPage,
    QcAddReceivingPage,
    QcRecorderDetailsPage,
    QcRecorderListPage,
    QcSupplierPage,
    QcRecorderResultPage
    /* End QC */
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    }),
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
    /*Human Resource*/
    EmployeePage,
    EmployeeEditPage,
    PopupDivisionDepartmentPage,
    DivisionPage,
    DivisionAddPage,
    DivisionEditPage,
    HumanResourcePage,
    CarManagePage,
    CarRequestPage,
    CarResponsePage,
    CarResponseHistoryPage,
    CarAccessControlPage,
    CarUsagePage,
    /*End Human Resource*/
    /* QC */
    QcShrimpRecorderPage,
    QcAddReceivingPage,
    QcRecorderDetailsPage,
    QcRecorderListPage,
    QcSupplierPage,
    QcRecorderResultPage
    /* End QC */
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
    ScreenOrientation,

    /*Service*/
    EmployeeService,
    UserService,
    AuthService,
    WebUrlService,
    DivisionService,
    DepartmentService,
    RankService,
    DateService,
    NextPageService,
    CarDriverService,
    SupplierService,
    /*Production*/
    ProductionActivityService,
    ProductionShrimpTypeService,
    ProductionShrimpSizeService,
    ProductionEmployeeService,
    ProductionWorkService,
    /*Human Resource*/
    CarManageService,
    CarResponseService,
    CarRequestService,
    CarAccessService,
    CarUsageService,
    /* Qc */
    QcShrimpReceivingService,
    QcShrimpResultService
  ]
})
export class AppModule { }
