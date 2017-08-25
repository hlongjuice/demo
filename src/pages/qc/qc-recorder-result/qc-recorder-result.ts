import { DateService } from './../../../services/date.service';
import { QcShrimpResultService } from './../../../services/qc/shrimp_result.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import 'chart.js/src/chart';
declare var Chart

/**
 * Generated class for the QcRecorderResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-recorder-result',
  templateUrl: 'qc-recorder-result.html',
})
export class QcRecorderResultPage {
  _loader: any
  _toast: any
  _alert: any
  @ViewChild('qcChart')el:ElementRef
  m_results: any;
  date: string;
  month: string;
  year: string;
  isHighlightVisible: boolean[];
  result_type: string;
  /* Monthly Result */
  total_result_shrimp_weight: any;
  total_result_shrimp_dead_percent: any;
  total_result_last_five_shrimp_dead_percent: any;
  total_result_total_shrimp_dead_percent: any;
  /* Yearly Result */
  year_receivings:any;
  month_names:string[];
  year_headers:number[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public qcShrimpResultService: QcShrimpResultService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService
  ) {
  }

  ngOnInit() {
    this.year_headers=[];
    this.month_names=this.dateService.getMonthName();
    console.log(this.month_names)
    this.result_type = '1';
    this.isHighlightVisible = [];
    this.isHighlightVisible[0] = true;
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
    this.date = this.dateService.getDate();
    this.qcShrimpResultService.getMonthlyResult(this.year, this.month)
      .then(result => {
        for(let i=parseInt(this.year)-3;i<parseInt(this.year);i++){
          this.year_headers.push(i);
        }
        console.log(result)
        this.m_results = result;
        //Calculate Total Result
        //Shrimp Weight
        this.total_result_shrimp_weight = this.m_results.reduce((sum, item) => {
          return sum + item.total_shrimp_weight;
        }, 0);
        //Last Five Percent
        this.total_result_last_five_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.last_five_shrimp_dead_percent);
        }, 0);
        //Shrimp Dead Percent
        this.total_result_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.shrimp_dead_percent);
        }, 0);
        //Total Shrimp Dead Percent
        this.total_result_total_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.total_shrimp_dead_percent);
        }, 0)
        //Set 2 Digit
        // console.log(this.total_result_last_five_shrimp_dead_percent,this.total_result_shrimp_dead_percent)
        this.total_result_last_five_shrimp_dead_percent = this.total_result_last_five_shrimp_dead_percent.toFixed(2)
        this.total_result_shrimp_dead_percent = this.total_result_shrimp_dead_percent.toFixed(2)
        this.total_result_total_shrimp_dead_percent = this.total_result_total_shrimp_dead_percent.toFixed(2)


      }).catch(err => { console.log(err) })

  }

  setHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
    console.log(this.isHighlightVisible);
  }

  /* Get Receiving */
  getReceiving() {
    switch (this.result_type) {
      case '1': this.getMonthlyReceiving();
        break;
      case '2': this.getYearlyReceiving()
        break;
      default: break;
    }
  }

  getMonthlyReceiving() {
    this.showLoader()
    let date = new Date(this.date);
    console.log(this.date)
    this.month = (date.getMonth() + 1).toString();
    this.year = date.getFullYear().toString();
    console.log(this.month, this.year)
    this.qcShrimpResultService.getMonthlyResult(this.year, this.month)
      .then(result => {
        this.m_results = result;
        //Calculate Total Result
        //Shrimp Weight
        this.total_result_shrimp_weight = this.m_results.reduce((sum, item) => {
          return sum + item.total_shrimp_weight;
        }, 0);
        //Last Five Percent
        this.total_result_last_five_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.last_five_shrimp_dead_percent);
        }, 0);
        //Shrimp Dead Percent
        this.total_result_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.shrimp_dead_percent);
        }, 0);
        //Total Shrimp Dead Percent
        this.total_result_total_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.total_shrimp_dead_percent);
        }, 0)
        //Set 2 Digit
        // console.log(this.total_result_last_five_shrimp_dead_percent,this.total_result_shrimp_dead_percent)
        this.total_result_last_five_shrimp_dead_percent = this.total_result_last_five_shrimp_dead_percent.toFixed(2)
        this.total_result_shrimp_dead_percent = this.total_result_shrimp_dead_percent.toFixed(2)
        this.total_result_total_shrimp_dead_percent = this.total_result_total_shrimp_dead_percent.toFixed(2)
        this.dismissLoader();

      }).catch(err => { console.log(err); this.dismissLoader(); })
  }

  getYearlyReceiving() {
    this.qcShrimpResultService.getYearlyResult(this.year)
      .then(result => {
        console.log(result);
        this.year_receivings=result;
        // console.log(this.year_receivings)

      }).catch(err => { console.log(err) })
  }

  //Draw Chart
  drawChart(){
    let ctx = this.el.nativeElement
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    });

  }

  //Loader
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  //disMiss
  dismissLoader() {
    this._loader.dismiss()
  }
  //Alert
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  //Toast
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000, position: 'top' })
    this._toast.present()
  }



}
