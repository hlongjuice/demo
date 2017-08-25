import { QcRecorderResultPage } from './../pages/qc/qc-recorder-result/qc-recorder-result';
import { QcSupplierPage } from './../pages/qc/qc-supplier/qc-supplier';
import { QcShrimpRecorderPage } from './../pages/qc/qc-shrimp-recorder/qc-shrimp-recorder';
import { CarResponseHistoryPage } from './../pages/human-resource/car/car-response-history/car-response-history';
import { CarAccessControlPage } from './../pages/human-resource/car/car-access-control/car-access-control';
import { CarResponsePage } from './../pages/human-resource/car/car-response/car-response';
import { CarRequestPage } from './../pages/human-resource/car/car-request/car-request';
import { CarManagePage } from './../pages/human-resource/car/car-manage/car-manage';
import { EmployeePage } from './../pages/human-resource/employee/employee';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ProductionSettingPage } from './../pages/production/production-setting/production-setting';
import { ProductionEmployeePage } from './../pages/production/production-employee/production-employee';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { ProductionPage } from "../pages/production/production";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { AuthService } from "../services/auth.service";
import { HumanResourcePage } from "../pages/human-resource/human-resource";
import { ProductionResultPage } from "../pages/production/production-result/production-result";
import { ProductionWorkFormPage } from "../pages/production/production-work-form/production-work-form";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  /*Page*/
  // rootPage=HomePage;
  rootPage = LoginPage;
  productionEmployeePage=ProductionEmployeePage;
  productionPage = ProductionPage;
  productionWorkFormPage=ProductionWorkFormPage;
  productionResultPage=ProductionResultPage;
  productionSettingPage=ProductionSettingPage;
  /*Human Resource Page*/
  humanResourcePage=HumanResourcePage;
  carAccessControlPage=CarAccessControlPage
  carManagePage=CarManagePage;
  carRequestPage=CarRequestPage;
  carResponsePage=CarResponsePage;
  carResponseHistoryPage=CarResponseHistoryPage
  employeePage=EmployeePage;
  homePage = HomePage;
  loginPage=LoginPage;
  /*End Page*/
  /* QC */
  qcShrimpRecorderPage=QcShrimpRecorderPage
  qcSupplierPage=QcSupplierPage
  qcRecorderResultPage=QcRecorderResultPage
  /* End QC */
  private authState: boolean;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    http: Http,
    private menuCtrl: MenuController,
    private authService: AuthService,
    // private screenOrientation: ScreenOrientation
  ) {
    this.authState = false;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit() {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.authState=this.authService.getAuthState();
    console.log(this.menuCtrl.getMenus());
    this.menuCtrl.enable(false,'masterMenu');
    this.menuCtrl.enable(false,'productionMenu');
    this.menuCtrl.enable(true,'humanResourceMenu');
  }
  openPage(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  logout() {
    this.nav.setRoot(this.loginPage);
    console.log('Log Out');
  }
}
