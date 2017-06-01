import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import{Storage} from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductionPage } from "../pages/production/production";
import { ProductionDatesPage } from "../pages/production-dates/production-dates";
import { ProductionDatesAddPage } from "../pages/production-dates-add/production-dates-add";

import { ProductionSchedulePage } from "../pages/production-schedule/production-schedule";
import { ProductionScheduleAddPage } from "../pages/production-schedule-add/production-schedule-add";
import { ProductionScheduleService } from "../services/production-schedule";
import { ProductionTimeperiodsPage } from "../pages/production-timeperiods/production-timeperiods";
import { ProductionEmPerformancePage } from "../pages/production-em-performance/production-em-performance";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductionPage,
    ProductionSchedulePage,
    ProductionScheduleAddPage,
    ProductionTimeperiodsPage,
    ProductionEmPerformancePage
  ],
  imports: [
    BrowserModule,
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProductionPage,
    ProductionSchedulePage,
    ProductionScheduleAddPage,
    ProductionTimeperiodsPage,
    ProductionEmPerformancePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductionScheduleService
    // Storage
  ]
})
export class AppModule {}
