import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { EngDefrostTimeService } from "../../../../services/eng/defrost-time.service";

/**
 * Generated class for the EngDefrostTimeEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-defrost-time-edit',
  templateUrl: 'eng-defrost-time-edit.html',
})
export class EngDefrostTimeEditPage {


  _loader:any
  _toast:any
  _alert:any
  _submit_status:boolean;
  time_records:any[];

  recorder:any;
  count:any;
  storageID:any;
  all_recorders:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public engDefrostTimeService:EngDefrostTimeService
  ) {
  }

  ngOnInit(){
    this.all_recorders=[];
    this.time_records=[];
    for(let i=1;i<=24;i++){
      this.time_records.push(i+':00')
    }
    this._submit_status=false;
    this.recorder=this.navParams.data.recorder;
    this.storageID=this.recorder.storage_id;
  }
    //getRecords
    getRecords() {
      if(this.count>0){
        console.log('In get Records')
        this.showLoader()
        console.log()
        this.engDefrostTimeService.getRecord(this.storageID)
          .then((result: any) => {
            console.log(result)
            this.all_recorders = result;
            this.timeRecordFilter();
            this.dismissLoader()
          }).catch(err => {
            console.log(err)
            this.showAlert(err)
            this.dismissLoader();
          })
      }
      this.count++;
    }
    
    //Time Record Filter
    timeRecordFilter() {
      this.time_records = [];
      for (let i = 1; i <= 24; i++) {
        this.time_records.push(i + ':00')
      }
      //Remove already time
      this.all_recorders.forEach(record => {
        let index = this.time_records.indexOf(record.time_record)
        this.time_records.splice(index, 1)
      })
    }

  //Update Supply
  updateRecord(formInputs){
    formInputs.id=this.recorder.id;
    this.showLoader()
    this.engDefrostTimeService.updateRecord(formInputs)
    .then(result=>{
      this._submit_status=true;
      this.dismissLoader();
      this.showToast('แก้ไขเสร็จสมบูรณ์')
      this.viewCtrl.dismiss(this._submit_status)
    }).catch(err=>{
      console.log(err)
      this.dismissLoader();
      this.showAlert(err)
    })
  }
  //Dismiss
  dismiss(){
    this.viewCtrl.dismiss(this._submit_status);
  }
  //Loader
  showLoader(){
    this._loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    this._loader.present()
  }
  //disMiss Loader
  dismissLoader(){
    this._loader.dismiss()
  }
  //Alert
  showAlert(textInput){
    this._alert=this.alertCtrl.create({title:textInput})
    this._alert.present()
  }
  //Toast
  showToast(textInput){
    this._toast=this.toastCtrl.create({message:textInput,duration:2000,position:'top'})
    this._toast.present()
  }

}
