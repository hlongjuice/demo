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
  rootPage = ProductionWorkFormPage;
  productionPage = ProductionPage;
  productionWorkFormPage=ProductionWorkFormPage;
  humanResourcePage=HumanResourcePage
  homePage = HomePage;
  loginPage=LoginPage;
  private authState: boolean;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    http: Http,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    this.authState = false;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit() {
    this.authState=this.authService.getAuthState();
    this.menuCtrl.enable(true,'masterMenu');
    this.menuCtrl.enable(false,'productionMenu');
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
