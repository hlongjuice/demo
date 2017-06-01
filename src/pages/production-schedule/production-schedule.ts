import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductionScheduleAddPage } from "../production-schedule-add/production-schedule-add";
import { ProductionScheduleModel } from "../../models/production-schedule";
import { ProductionScheduleService } from "../../services/production-schedule";
import { ProductionTimeperiodsPage } from "../production-timeperiods/production-timeperiods";

/**
 * Generated class for the ProductionSchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-schedule',
  templateUrl: 'production-schedule.html',
})
export class ProductionSchedulePage {

  scheduleAddPage = ProductionScheduleAddPage;
  productionTimeperiodsPage=ProductionTimeperiodsPage;
  public schedules: ProductionScheduleModel[]=[];
  private timeStartInput: string;
  private timeEndInput: string;
  private activityInput: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public productionScheduleService: ProductionScheduleService
  ) {
  }
  ngOnInit(){
    let keys:string;
    let result:any;
    /*Get All Schedule*/
    console.log('ProducitonSchedule OnInit Function Start');
    this.schedules=this.productionScheduleService.getAllSchedules();
    console.log('ProducitonSchedule OnInit Function End');
    console.log(this.schedules);
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionSchedulePage');
  }

  /*Open Schedule*/
  openSchedule(schedule){
    this.navCtrl.push(this.productionTimeperiodsPage,schedule);
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
        if (data!=null) {
          this.timeStartInput = data.timeStart;
          this.timeEndInput = data.timeEnd,
            this.activityInput = data.activity;
            this.schedules=this.productionScheduleService.getAllSchedules();
            console.log('After Dismiss');
            console.log(this.schedules);
            //  this.schedules=this.productionScheduleService.getAllSchedules();
        }
      }
    )

  }

}
