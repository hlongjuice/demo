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
  productionResultDetailsPage = ProductionResultDetailsPage;
  /*EndPage*/
  dateHistory;
  selectedTimePeriod: any;
  timePeriods: any;
  works: any;
  selectedTime: any;
  selectedDate: Date;
  amountWeight: number[];
  averageWeight: number[];
  isHighlightVisible:boolean[];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dateService: DateService,
    public productionWorkService: ProductionWorkService) {
    let currentDate = this.dateService.getCurrentDateTime()
    this.dateHistory = currentDate.YY + '-' + currentDate.MM + '-' + currentDate.DD;

  }

  ngOnInit() {
    this.isHighlightVisible=[];
    this.productionWorkService.getTimePeriod(this.dateHistory)
      .then(result => {
        console.log(result)
        this.timePeriods = result.production_date_time;
      })
      .catch(err => { console.log(err) });
    console.log(this.dateHistory);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionResultPage');
  }

  /*Get Time Period*/
  getTimePeriod(date: Date) {
    console.log(date);
    this.selectedDate = date;
    this.productionWorkService.getTimePeriod(date)
      .then(result => {
        this.timePeriods = result.production_date_time;
      })
      .catch(err => { console.log(err) })
  }

  /*Get Work List*/
  getWorkList(time) {
    let time_period_id = time.id;
    this.selectedTime = time.time_period;
    this.productionWorkService.getWorkList(time_period_id)
      .then(
      result => {
        this.works = result.production_work;
      }
      ).catch(err => { console.log(err) })
  }
  /*Get Details*/
  getWorkDetails(work) {
    this.navCtrl.push(this.productionResultDetailsPage, {
      'date': this.selectedDate,
      'timePeriod': this.selectedTime,
      'work': work
    })
  }
  setHighlight(i){
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i]=true;
    console.log(this.isHighlightVisible);
  }
}
