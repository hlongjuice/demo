import { CarResponseService } from './../../../../services/human-resource/car/car-response.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CarResponsePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-response',
  templateUrl: 'car-response.html',
})
export class CarResponsePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carResponseService:CarResponseService) {
  }

  ngOnInit() {

  }

  /*St Checked Request*/
  setCheckedRequest(){
    
  }

}
