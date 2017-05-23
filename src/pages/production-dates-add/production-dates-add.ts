import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Storage } from '@ionic/storage'


/**
 * Generated class for the ProductionDatesAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-dates-add',
  templateUrl: 'production-dates-add.html',
})
export class ProductionDatesAddPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage
  ) {
  }

  onClosed() {
    this.viewCtrl.dismiss();
  }
  addDate(form: NgForm) {
    this.storage.set('date',form.value.date);
   this.viewCtrl.dismiss(form.value.date);
  }

}
