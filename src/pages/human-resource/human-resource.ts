import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DivisionPage } from "./division/division";
import { EmployeePage } from "./employee/employee";

/**
 * Generated class for the HumanResourcePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-human-resource',
  templateUrl: 'human-resource.html',
})
export class HumanResourcePage {

  divisionPage=DivisionPage;
  employeePage=EmployeePage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HumanResourcePage');
  }

  openDivisionPage(){
    this.navCtrl.push(this.divisionPage);
  }
  openEmployeePage(){
    this.navCtrl.push(this.employeePage);
  }

}
