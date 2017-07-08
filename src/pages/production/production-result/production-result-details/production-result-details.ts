import { ProductionWorkService } from './../../../../services/production/work.service';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  work:any;
  work_id:number;
  em_work_list:any;
  em_ids:any[];
  em_weight_list:any;
  em_amount_weight:number;
  date:Date;
  time_period:string;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public productionWorkService:ProductionWorkService) {
  }
  ngOnInit(){
    this.work=this.navParams.get('work');
    this.time_period=this.navParams.get('timePeriod');
    this.date=this.navParams.get('date');
    // this.work_id=this.navParams.data.id;
    // console.log(this.navParams.data.id)
    console.log(this.navParams);

    this.productionWorkService.getWorkDetials(this.work.id)
    .then(result=>{
      this.em_work_list=result;
      this.em_ids=Object.keys(result);
    }).catch(err=>{console.log(err)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionResultDetailsPage');
  }

  getDetails(em_id){
    this.em_amount_weight=0;
    console.log(em_id);
    console.log(this.em_work_list);
    console.log(this.em_work_list[em_id]);
    this.em_weight_list=this.em_work_list[em_id];
    this.em_weight_list.forEach(em_weight=>{
      this.em_amount_weight+=parseFloat(em_weight.weight);
    })
  }

}
