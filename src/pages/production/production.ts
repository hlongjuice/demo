import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductionSchedulePage } from "../production-schedule/production-schedule";

/**
 * Generated class for the ProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production',
  templateUrl: 'production.html',
})
export class ProductionPage {

  productionSchedulePage=ProductionSchedulePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionPage');
  }

  setDate(){
    this.navCtrl.push(this.productionSchedulePage);
  }

}
