import { ProductionWorkService } from './../../../../services/production/work.service';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProductionResultDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-result-details',
  templateUrl: 'production-result-details.html',
})
export class ProductionResultDetailsPage {

  work: any;
  selected_em_id: any;
  work_id: number;
  em_work_list: any;
  em_ids: any[];
  em_weight_list: any;
  em_amount_weight: number;
  date: Date;
  time_period: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productionWorkService: ProductionWorkService,
    public alertCtrl: AlertController) {
  }
  ngOnInit() {
    this.work = this.navParams.get('work');
    this.time_period = this.navParams.get('timePeriod');
    this.date = this.navParams.get('date');
    // this.work_id=this.navParams.data.id;
    // console.log(this.navParams.data.id)
    console.log(this.navParams);

    this.productionWorkService.getWorkDetials(this.work.id)
      .then(result => {
        this.em_work_list = result;
        this.em_ids = Object.keys(result);
      }).catch(err => { console.log(err) });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionResultDetailsPage');
  }

  /*Get Details*/
  getDetails(em_id) {
    this.selected_em_id = em_id;
    this.em_amount_weight = 0;
    this.em_weight_list = this.em_work_list[em_id];
    this.em_weight_list.forEach(em_weight => {
      this.em_amount_weight += parseFloat(em_weight.weight);
    })
  }
  /*Delete Em Weight*/
  deleteWeight(weight_id, weight_index) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        /*Cancel*/
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
          },
          cssClass: 'alertDanger'
        },
        /*Confirm*/
        /*Add Work*/
        {
          text: 'ยืนยัน',
          handler: () => {
            this.productionWorkService.deleteWeight(weight_id)
              .then(result => {
                /*Remove Item*/
                this.em_amount_weight = 0;//clear old amount weight
                this.em_weight_list.splice(weight_index, 1);
                this.em_weight_list.forEach(em_weight => {
                  this.em_amount_weight += parseFloat(em_weight.weight);
                })

              }).catch(err => { console.log(err) });
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    alert.present();

  }

}
