import { ProductionResultDetailsPage } from './production-result-details/production-result-details';
import { ProductionWorkService } from './../../../services/production/work.service';
import { DateService } from './../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductionResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-result',
  templateUrl: 'production-result.html',
})
export class ProductionResultPage {

  /*Page*/
    productionResultDetailsPage=ProductionResultDetailsPage;
  /*EndPage*/
  dateHistory;
  timePeriods:any;
  works:any;
  selectedTime:any;
  selectedDate:Date;
  amountWeight:number[];
  averageWeight:number[];


  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public dateService:DateService,
  public productionWorkService:ProductionWorkService) {
  }

  ngOnInit(){
    let currentDate=this.dateService.getCurrentDateTime()
    this.dateHistory=currentDate.YY+'-'+currentDate.MM+'-'+currentDate.DD;
    this.productionWorkService.getTimePeriod(this.dateHistory)
    .then(result=>{
      this.timePeriods=result.production_time_period;
    })
    .catch(err=>{console.log(err)});
    console.log(currentDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionResultPage');
  }

  /*Get Time Period*/
  getTimePeriod(date:Date){
    this.selectedDate=date;
    this.productionWorkService.getTimePeriod(date)
    .then(result=>{
      console.log(result);
      this.timePeriods=result.production_date_time;
    })
    .catch(err=>{console.log(err)});
    console.log(date);
  }

  /*Get Work List*/
  getWorkList(time){
    let time_period_id=time.id;
    this.selectedTime=time.time_period;
    console.log(time_period_id);
    this.productionWorkService.getWorkList(time_period_id)
    .then(
      result=>{
        let workList:any={
          'production_work':[],
          'amount_weight':[],
          'average_weight':[]
        }
        this.works=result.production_work;
        console.log(result);
        // console.log(workList);
        // console.log(result.production_work);
        // result.production_work.forEach(work=>{
          // workList.production_work.push(work)
        // });
      }
    ).catch(err=>{console.log(err)})
  }
  /*Get Details*/
  getWorkDetails(work){
    this.navCtrl.push(this.productionResultDetailsPage,{
      'date':this.selectedDate,
      'timePeriod':this.selectedTime,
      'work':work
    })
  }
}
