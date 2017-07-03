import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductionActivityService } from "../../../services/production/activity.service";
import { ProductionShrimpTypeService } from "../../../services/production/shrimp-type.service";
import { ProductionShrimpSizeService } from "../../../services/production/shrimp-size.service";

/**
 * Generated class for the ProductionWorkFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-work-form',
  templateUrl: 'production-work-form.html',
})
export class ProductionWorkFormPage {

  dateInput: any;
  startTimeInput: any;
  endTimeInput: any;
  activityInput: any;
  shrimpSizeInput: any;
  shrimpTypeInput: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productionActivityService: ProductionActivityService,
    public productionShrimpTypeSerivce: ProductionShrimpTypeService,
    public productionShrimpSizeService: ProductionShrimpSizeService
  ) {
    let today = new Date();
    let DD: any = today.getDate();
    let MM: any = today.getMonth() + 1;
    let YY = today.getFullYear();
    let hh: any = today.getHours();
    let mm: any = today.getMinutes();
    let hhEnd: any = hh + 1;

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
    /*Timer*/
    this.startTimeInput = hh + ':' + mm;
    this.endTimeInput = hhEnd + ':' + mm;

  }
  ngOnInit() {
    /*Get Activity*/
    this.productionActivityService.getActivity()
      .then(
      result => {
        this.activityInput = result;
        console.log(result);

      }
      ).catch(err => { console.log(err) });

    /*Get Shrimp Size*/
    this.productionShrimpSizeService.getAllShrimpSize()
      .then(
      result => { this.shrimpSizeInput = result; }
      ).catch(err => console.log(err));

    /*Get Shrimp Type*/
    this.productionShrimpTypeSerivce.getAllShrimpType()
      .then(result => {this.shrimpTypeInput = result;})
      .catch(err => console.log(err))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionWorkFormPage');
  }

}
