import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductionService } from "../../../services/production.service";
import { ProductionScheduleAddPage } from "../production-schedule-add/production-schedule-add";
import { ProductionTimeperiodsPage } from "../production-timeperiods/production-timeperiods";
import { ProductionDateModel } from "../../../models/production-date";

/**
 * Generated class for the ProductionDatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-date',
  templateUrl: 'production-date.html',
})
export class ProductionDatePage {

  scheduleAddPage = ProductionScheduleAddPage;
  productionTimeperiodsPage = ProductionTimeperiodsPage;
  public schedules:string;
  public scheduleDates:string[];
  private timeStartInput: string;
  private timeEndInput: string;
  private activityInput: string;
  private productionDate:ProductionDateModel[]=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private productionService:ProductionService
  ) {
  }
  ngOnInit() {
    this.productionService.getAllProductionScheduleDate().then(
      (dates:ProductionDateModel[])=>{
        this.productionDate=dates;
      }
    )
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionSchedulePage');
  }

  /*Open Schedule*/
  openSchedule(dateID) {
    this.navCtrl.push(this.productionTimeperiodsPage,dateID);
  }

  addSchedule() {
    let modal = this.modalCtrl.create(this.scheduleAddPage, {
      timeStart: this.timeStartInput,
      timeEnd: this.timeEndInput,
      activity: this.activityInput
    });
    modal.present();
    modal.onDidDismiss(
      (data: any) => {
        if (data != null) {
          this.timeStartInput = data.timeStart;
          this.timeEndInput = data.timeEnd,
            this.activityInput = data.activity;
        }
      }
    )

  }
}