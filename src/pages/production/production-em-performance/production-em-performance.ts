import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductionEmPerformanceModel } from "../../../models/production-em-performance";



/**
 * Generated class for the ProductionEmPerformancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-em-performance',
  templateUrl: 'production-em-performance.html',
})
export class ProductionEmPerformancePage {

  private timePeriod:string;
  private employees:ProductionEmPerformanceModel[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(){
    this.timePeriod=this.navParams.get('time');
    this.employees=this.navParams.get('employees')
    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionEmPerformancePage');
  }

}
