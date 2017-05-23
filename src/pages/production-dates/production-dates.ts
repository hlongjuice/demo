import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductionDatesAddPage } from "../production-dates-add/production-dates-add";
import{ Storage } from "@ionic/storage";

/**
 * Generated class for the ProductionDatesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-dates',
  templateUrl: 'production-dates.html',
})
export class ProductionDatesPage {
  
  public dateSelected:any;
  public dateData:any[];
  productionDatesAdd=ProductionDatesAddPage;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public modalCtrl:ModalController,
  public storage:Storage) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ProductionDatesPage');
    this.storage.get('date').then(
      (val:any[])=>{
        console.log(val);
      }
    )
  }
  addDate(){
    let addModal= this.modalCtrl.create(this.productionDatesAdd);
    addModal.present();
    addModal.onDidDismiss(
      (data:any)=>{
        this.dateSelected=data;
      }
    )
  }

}
