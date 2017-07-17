import { ProductionShrimpSizeService } from './../../../services/production/shrimp-size.service';
import { ProductionShrimpTypeService } from './../../../services/production/shrimp-type.service';
import { ProductionActivityService } from './../../../services/production/activity.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProductionSettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-setting',
  templateUrl: 'production-setting.html',
})
export class ProductionSettingPage {

  test = [];
  activity2 = [];
  activities: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productionActivity: ProductionActivityService,
    public productionShrimpType: ProductionShrimpTypeService,
    public productionShrimpSize: ProductionShrimpSizeService,
    public alertCtrl: AlertController

  ) {
  }

  ngOnInit() {
    /*Get Activity*/
    this.productionActivity.getAllActivity()
      .then(result => {
        console.log('Activities')
        console.log(result);
        this.activities = result;
      }
      ).catch(err => { console.log(err) })
    /*Get Shrimp Type*/
    this.productionShrimpType.getAllShrimpType()
      .then(result => {
        console.log('Shrimp Type')
        console.log(result)
      }).catch(err => { console.log(err) })
    /*Get Shrimp Size*/
    this.productionShrimpSize.getAllShrimpSize()
      .then(result => {
        console.log('Shrimp Size')
        console.log(result)
      })
  }

  /*Toggle Status*/
  toggleStatus(event, i) {
    let eventStat = event.checked;
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถแก้ไขได้'
    })
    let status;
    if (event.checked) {
      status = 1;
    } else status = 0;
    this.productionActivity.updateStatus(this.activities[i].id, status)
      .then(result => {
        console.log(result)
      }).catch(err => {
        console.log(err)
        alert.present();
      });
    alert.onDidDismiss(() => {
      event.ionChange.isStopped = true;
      event.checked = !eventStat;
      event.ionChange.isStopped = false;
    });
  }

  /*Edit Activity*/
  editActivity(index) {
    let alert = this.alertCtrl.create({
      title: 'แก้ไขชื่อ',
      inputs: [
        {
          name: 'name',
          value: this.activities[index].name
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionActivity.update(this.activities[index].id, data.name)
              .then((result: any) => {
                this.activities[index].name = result.name
              }).catch(err => { console.log(err) })
          }
        }
      ]
    })
    alert.present();

  }
  /*Delete Activity*/
  deleteActivity(index) {
  }
  /*Add Activity*/
  addActivity() {
    let alert = this.alertCtrl.create({
      title: 'เพิ่มงาน',
      inputs: [{
        name: 'name'
      }],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionActivity.addActivity(data.name)
            .then(
              (result:any)=>{
                console.log(result);
              }).catch(err=>{console.log(err)})
          }
        }
      ]
    })
  }


}
