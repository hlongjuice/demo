import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductionEmPerformancePage } from "../production-em-performance/production-em-performance";
import { ProductionTimePeriodModel } from "../../../models/production-time-period";
import { ProductionScheduleService } from "../../../services/production-schedule";
import { ProductionScheduleModel } from "../../../models/production-schedule";
import { ProductionService } from "../../../services/production.service";


/**
 * Generated class for the ProductionTimeperiodsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-timeperiods',
  templateUrl: 'production-timeperiods.html',
})
export class ProductionTimeperiodsPage {

  productionEmPerformancePage = ProductionEmPerformancePage;
  private scheduleDate: string;
  private timePeriods:ProductionTimePeriodModel[]=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productionService:ProductionService) {
  }
  ngOnInit() {
    this.productionService.getProductionSchedule(this.navParams.data)
    .then(
      schedule=>{
        console.log(schedule);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionTimeperiodsPage');
  }

  /*Pust to List of Production Employee Performance Page*/
  openEmPerformance(timePeriod) {
    this.navCtrl.push(this.productionEmPerformancePage, timePeriod);
  }

}
