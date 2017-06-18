import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm, NgModel } from "@angular/forms";
import { ProductionScheduleService } from "../../../services/production-schedule.service";
import { ProductionService } from "../../../services/production.service";
import { AuthService } from "../../../services/auth.service";
import { UserModel } from "../../../models/users";



@IonicPage()
@Component({
  selector: 'page-production-schedule-add',
  templateUrl: 'production-schedule-add.html',
})

export class ProductionScheduleAddPage {

  dateInput: any;
  timeStartInput: any;
  timeEndInput: any;
  activityInput: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public productionScheduleService: ProductionScheduleService,
    private productionService:ProductionService,
    private authService:AuthService) {

    let today = new Date();
    let DD: any = today.getDate();
    let MM: any = today.getMonth()+1;
    let YY = today.getFullYear();
    let hh: any = today.getHours();
    let mm: any = today.getMinutes();
    let hhEnd: any = hh + 1;
    this.activityInput = "";

    if (MM < 10)
      MM = "0" + MM;
    if (DD < 10)
      DD = "0" + DD;
    if (hh < 10)
      hh = "0" + hh;
    if (hhEnd < 10)
      hhEnd = "0" + hhEnd;
    if (mm < 10)
      mm = "0" + mm;

    /*Default Ionic Date Format is YY-MM-DD*/
    this.dateInput = YY + '-' + MM + '-' + DD;
    /*Time is HH:mm*/
    this.timeStartInput = hh + ':' + mm;
    this.timeEndInput = hhEnd + ':' + mm;
  }

  ngOnInit() {
    if (this.navParams.get('timeStart'))
      this.timeStartInput = this.navParams.get('timeStart');
    if (this.navParams.get('timeEnd'))
      this.timeEndInput = this.navParams.get('timeEnd');
    if (this.navParams.get('activity'))
      this.activityInput = this.navParams.get('activity');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionScheduleAddPage');
  }

  onClosed() {
    this.viewCtrl.dismiss();
  }

  onSubmit(formInput: NgForm) {
    this.authService.getUser()
    .then(
      (user:UserModel)=>{
        /*Store New Schedule*/
        this.productionService.setProductionSchedule(formInput,user.id);

      }
    )
    
    
   
  /*  let timePeriod = formInput.value.timeStart + ' - ' + formInput.value.timeEnd;
    // this.productionScheduleService.testSetValue(formInput);
   this.productionScheduleService.setSchedule(
      formInput.value.date,
      timePeriod,
      formInput.value.activity,
      formInput.value.emID,
      formInput.value.weight)
      .then(
      () => {
        this.viewCtrl.dismiss({
          timeStart: formInput.value.timeStart,
          timeEnd: formInput.value.timeEnd,
          activity: formInput.value.activity
        }
        );
      }
      )
      .catch(
      err => {
        console.log(err);
      }
      );*/
  }


}
