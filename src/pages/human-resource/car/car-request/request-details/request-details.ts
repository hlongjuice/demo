import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RequestDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage {

  requestDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(){
    this.requestDetails=this.navParams.data.requestDetails;
    console.log(this.requestDetails);
  }

}
