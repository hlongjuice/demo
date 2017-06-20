import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ErrorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
  // template:this.webBody
})
export class ErrorPage {

  public webBody:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorPage');
  }

}
