import { DateService } from './../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { EngHighTankService } from "../../../services/eng/high-tank.service";

/**
 * Generated class for the EngHighTankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-high-tank',
  templateUrl: 'eng-high-tank.html',
})
export class EngHighTankPage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engHighTankService: EngHighTankService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService
  ) {
  }

  ngOnInit() {
    this.date = this.dateService.getDate();
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
    this.getRecords();
  }

  //Get Supply
  getRecords() {
    this.showLoader()
    this.engHighTankService.getRecordByDate(this.date)
      .then(result => {
        console.log(result)
        this.recorders = result;
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        this.dismissLoader();
      })
  }

  //Add Supply
  addRecord() {
    let modal = this.modalCtrl.create('EngHighTankAddPage', null, { enableBackdropDismiss: false })
    modal.present()
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }

  //Edit Supply
  editRecord(recorder_input) {
    let recorder = Object.create(recorder_input);
    let modal = this.modalCtrl.create('EngHighTankEditPage', {
      'recorder': recorder
    }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }
  //Delete Supply
  deleteRecord(recorder) {
    let confirm = this.alertCtrl.create({
      title:'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลอก',
          role: 'cancel',
          cssClass: 'alertCancel'
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.showLoader();
            this.engHighTankService.deleteRecord(recorder.id)
              .then(result => {
                this.dismissLoader();
                this.getRecords();
                this.showToast('ลบข้อมูลเสร็จสิ้น')
              }).catch(err => { this.dismissLoader();this.showAlert(err);  })
          },
          cssClass:'alertConfirm'
        }
      ]
    })
    confirm.present();
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
